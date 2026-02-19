const express = require("express");
const router = express.Router();
const db = require("../db");
const auth = require("../middleware/auth");

/* ====== NOVO (uploads) ====== */
const path = require("path");
const fs = require("fs");
const multer = require("multer");

function slugify(str) {
  return String(str || "")
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const UPLOAD_DIR = path.join(__dirname, "..", "..", "frontend", "uploads");
if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOAD_DIR),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 25 * 1024 * 1024 }
});

router.post("/", auth, (req, res) => {
  const { title, platform, waste_type, description } = req.body;

  db.query(
    "INSERT INTO games (title, platform, waste_type, description, created_by) VALUES (?, ?, ?, ?, ?)",
    [title, platform, waste_type, description, req.userId],
    () => res.json({ message: "Jogo cadastrado!" })
  );
});

router.get("/", (req, res) => {
  db.query("SELECT * FROM games", (err, results) => {
    res.json(results);
  });
});

router.put(
  "/:slug",
  auth,
  upload.fields([{ name: "cover", maxCount: 1 }, { name: "media", maxCount: 12 }]),
  (req, res) => {
    const slug = req.params.slug;
    const { title, description, waste_type, youtubeId } = req.body;

    let platforms = [];
    try {
      platforms = JSON.parse(req.body.platforms || "[]");
    } catch {
      platforms = [];
    }

    let links = {};
    try {
      links = JSON.parse(req.body.links || "{}");
    } catch {
      links = {};
    }
    const linksJson = Object.keys(links).length ? JSON.stringify(links) : null;

    db.query(
      "SELECT id, created_by, cover_url FROM games WHERE slug = ?",
      [slug],
      (err, rows) => {
        if (err) return res.status(500).json({ message: "Erro no servidor." });
        if (!rows || rows.length === 0) return res.status(404).json({ message: "Jogo não encontrado." });

        const game = rows[0];
        if (game.created_by !== req.userId) {
          return res.status(403).json({ message: "Você não pode editar este jogo." });
        }

        let newCoverUrl = null;
        if (req.files?.cover?.[0]) {
          newCoverUrl = `uploads/${req.files.cover[0].filename}`;
        }

        const sql = `
          UPDATE games
          SET title = ?,
              description = ?,
              youtube_id = ?,
              platforms_json = ?,
              links_json = ?,
              waste_type = ?
              ${newCoverUrl ? ", cover_url = ?" : ""}
          WHERE slug = ?
        `;

        const params = [
          title,
          description,
          youtubeId || null,
          JSON.stringify(platforms),
          linksJson,
          waste_type || null
        ];

        if (newCoverUrl) params.push(newCoverUrl);
        params.push(slug);

        db.query(sql, params, (err2) => {
          if (err2) {
            console.error(err2);
            return res.status(500).json({ message: "Erro ao atualizar jogo." });
          }

          const mediaFiles = req.files?.media || [];
          if (!mediaFiles.length) {
            return res.json({ message: "Jogo atualizado com sucesso!" });
          }

          db.query("DELETE FROM game_media WHERE game_id = ?", [game.id], (err3) => {
            if (err3) {
              console.error(err3);
              return res.status(500).json({ message: "Jogo atualizado, mas falhou ao substituir mídias." });
            }

            const inserts = mediaFiles.map((f, idx) => {
              const isVideo = (f.mimetype || "").startsWith("video/");
              const url = `uploads/${f.filename}`;
              return [game.id, isVideo ? "video_file" : "image", url, idx];
            });

            db.query(
              "INSERT INTO game_media (game_id, media_type, url, sort_order) VALUES ?",
              [inserts],
              (err4) => {
                if (err4) {
                  console.error(err4);
                  return res.status(500).json({ message: "Jogo atualizado, mas falhou ao salvar novas mídias." });
                }

                return res.json({ message: "Jogo atualizado com sucesso!" });
              }
            );
          });
        });
      }
    );
  }
);

/* ====== NOVO: CRIAR JOGO COMPLETO (capa + mídias + slug) ======
   Endpoint: POST /api/games/create
*/
router.post(
  "/create",
  auth,
  upload.fields([{ name: "cover", maxCount: 1 }, { name: "media", maxCount: 12 }]),
  (req, res) => {
    try {
      const { title, description, waste_type, youtubeId } = req.body;

      let platforms = [];
      try {
        platforms = JSON.parse(req.body.platforms || "[]");
      } catch {
        platforms = [];
      }

      let links = {};
      try {
        links = JSON.parse(req.body.links || "{}");
      } catch {
        links = {};
      }
      const linksJson = Object.keys(links).length ? JSON.stringify(links) : null;

      if (!title || !description) {
        return res.status(400).json({ message: "Informe title e description." });
      }

      if (!req.files?.cover?.[0]) {
        return res.status(400).json({ message: "Envie a capa (cover)." });
      }

      const baseSlug = slugify(title);
      if (!baseSlug)
        return res.status(400).json({ message: "Título inválido para gerar slug." });

      const coverFile = req.files.cover[0];
      const coverUrl = `uploads/${coverFile.filename}`;

      const findUniqueSlug = (trySlug, n, cb) => {
        db.query("SELECT id FROM games WHERE slug = ?", [trySlug], (err, rows) => {
          if (err) return cb(err);
          if (rows.length === 0) return cb(null, trySlug);
          const next = `${baseSlug}-${n + 1}`;
          findUniqueSlug(next, n + 1, cb);
        });
      };

      findUniqueSlug(baseSlug, 0, (err, finalSlug) => {
        if (err) return res.status(500).json({ message: "Erro ao gerar slug." });

        db.query(
          `INSERT INTO games 
          (title, slug, description, cover_url, youtube_id, platforms_json, links_json, waste_type, created_by)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            title,
            finalSlug,
            description,
            coverUrl,
            youtubeId || null,
            JSON.stringify(platforms),
            JSON.stringify(links),
            waste_type || null,
            req.userId
          ],
          (err2, result) => {
            if (err2) {
              console.error(err2);
              return res.status(500).json({ message: "Erro ao salvar jogo no banco." });
            }

            const gameId = result.insertId;
            const mediaFiles = req.files.media || [];

            if (mediaFiles.length === 0) {
              return res.status(201).json({ message: "Jogo criado!", slug: finalSlug });
            }

            const inserts = mediaFiles.map((f, idx) => {
              const isVideo = (f.mimetype || "").startsWith("video/");
              const url = `uploads/${f.filename}`;
              return [gameId, isVideo ? "video_file" : "image", url, idx];
            });

            db.query(
              "INSERT INTO game_media (game_id, media_type, url, sort_order) VALUES ?",
              [inserts],
              (err3) => {
                if (err3) {
                  console.error(err3);
                  return res.status(201).json({
                    message: "Jogo criado (mídias não foram salvas).",
                    slug: finalSlug
                  });
                }

                return res.status(201).json({ message: "Jogo criado!", slug: finalSlug });
              }
            );
          }
        );
      });
    } catch (e) {
      console.error(e);
      return res.status(500).json({ message: "Erro interno." });
    }
  }
);

/* ====== NOVO: BUSCAR JOGO POR SLUG ====== */
router.get("/slug/:slug", (req, res) => {
  const slug = req.params.slug;

  db.query("SELECT * FROM games WHERE slug = ?", [slug], (err, rows) => {
    if (err) return res.status(500).json({ message: "Erro no servidor." });
    if (!rows || rows.length === 0) return res.status(404).json({ message: "Jogo não encontrado." });

    const game = rows[0];

    db.query(
      "SELECT media_type, url, sort_order FROM game_media WHERE game_id = ? ORDER BY sort_order ASC",
      [game.id],
      (err2, mediaRows) => {
        const media = err2 || !mediaRows ? [] : mediaRows.map(m => ({
          type: m.media_type === "image" ? "image" : "video_file",
          src: m.url
        }));

        let platforms = [];
        try {
          platforms = game.platforms_json ? JSON.parse(game.platforms_json) : [];
        } catch {
          platforms = [];
        }
        if ((!platforms || platforms.length === 0) && game.platform) platforms = [game.platform];

        let links = {};
        try {
          links = game.links_json ? JSON.parse(game.links_json) : {};
        } catch {
          links = {};
        }

        return res.json({
          id: game.id,
          created_by: game.created_by,
          title: game.title,
          slug: game.slug,
          description: game.description,
          cover: game.cover_url,
          youtubeId: game.youtube_id,
          waste_type: game.waste_type,
          platforms,
          media,
          links
        });
      }
    );
  });
});

router.get("/list", (req, res) => {
  db.query(
    "SELECT id, title, slug, cover_url FROM games ORDER BY id DESC",
    (err, rows) => {
      if (err) {
        console.error("ERRO /api/games/list:", err);
        return res.status(500).json({ message: "Erro ao listar jogos." });
      }
      return res.json(rows);
    }
  );
});

router.delete("/:id", auth, (req, res) => {
  const gameId = Number(req.params.id);
  if (!gameId) return res.status(400).json({ message: "ID inválido." });

  db.query(
    "SELECT id, created_by, cover_url FROM games WHERE id = ?",
    [gameId],
    (err, rows) => {
      if (err) return res.status(500).json({ message: "Erro no servidor." });
      if (!rows || rows.length === 0) return res.status(404).json({ message: "Jogo não encontrado." });

      const game = rows[0];
      if (game.created_by !== req.userId) {
        return res.status(403).json({ message: "Você não pode apagar este jogo." });
      }

      db.query(
        "SELECT url FROM game_media WHERE game_id = ?",
        [gameId],
        (err2, mediaRows) => {
          const mediaUrls = err2 || !mediaRows ? [] : mediaRows.map((m) => m.url);

          db.query("DELETE FROM games WHERE id = ?", [gameId], (err3) => {
            if (err3) return res.status(500).json({ message: "Erro ao apagar jogo." });

            try {
              const toDelete = [];
              if (game.cover_url) toDelete.push(game.cover_url);
              toDelete.push(...mediaUrls);

              toDelete.forEach((rel) => {
                const abs = path.join(__dirname, "..", "..", "frontend", rel);
                if (fs.existsSync(abs)) fs.unlinkSync(abs);
              });
            } catch (e) {
              console.warn("Falha ao apagar arquivos, mas jogo foi removido do banco.", e);
            }

            return res.json({ message: "Jogo apagado com sucesso!" });
          });
        }
      );
    }
  );
});

module.exports = router;
