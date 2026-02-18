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

// pasta onde vai salvar uploads (ajuste se o seu static for outro)
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
  limits: { fileSize: 25 * 1024 * 1024 } // 25MB
});

/* ====== ROTAS ANTIGAS (MANTIDAS) ====== */
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

/* ====== EDITAR JOGO ====== */
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

    // monta atualização
    const fields = [
      title,
      description,
      youtubeId || null,
      JSON.stringify(platforms),
      waste_type || null,
      slug
    ];

    db.query(
      `UPDATE games
       SET title = ?, description = ?, youtube_id = ?, platforms_json = ?, waste_type = ?
       WHERE slug = ?`,
      fields,
      (err, result) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ message: "Erro ao atualizar jogo." });
        }

        return res.json({ message: "Jogo atualizado com sucesso!" });
      }
    );
  }
);

/* ====== NOVO: CRIAR JOGO COMPLETO (capa + mídias + slug) ======
   Endpoint: POST /api/games/create
   Body: multipart/form-data
   Campos:
     - title (texto)
     - description (texto)
     - waste_type (texto opcional)
     - youtubeId (texto opcional)   -> só o ID do YouTube
     - platforms (texto JSON)       -> ex: ["steam","android",...]
   Arquivos:
     - cover (1 imagem)
     - media (0..N imagens/videos)
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

      if (!title || !description) {
        return res.status(400).json({ message: "Informe title e description." });
      }
      if (!req.files?.cover?.[0]) {
        return res.status(400).json({ message: "Envie a capa (cover)." });
      }

      const baseSlug = slugify(title);
      if (!baseSlug) return res.status(400).json({ message: "Título inválido para gerar slug." });

      // caminhos relativos para servir via /uploads/...
      const coverFile = req.files.cover[0];
      const coverUrl = `uploads/${coverFile.filename}`;

      // garante slug único (callback style)
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

        // ⚠️ requer colunas novas na tabela games:
        // slug, cover_url, youtube_id, platforms_json
        db.query(
          `INSERT INTO games (title, slug, description, cover_url, youtube_id, platforms_json, waste_type, created_by)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            title,
            finalSlug,
            description,
            coverUrl,
            youtubeId || null,
            JSON.stringify(platforms),
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

            // Se você NÃO criou a tabela game_media ainda, você pode comentar esse bloco.
            if (mediaFiles.length === 0) {
              return res.status(201).json({ message: "Jogo criado!", slug: finalSlug });
            }

            // insere mídias em game_media
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
                  // Mesmo se falhar as mídias, o jogo foi criado — devolve o slug pra não travar o fluxo
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

/* ====== NOVO: BUSCAR JOGO POR SLUG (para jogo.html?id=slug) ======
   Endpoint: GET /api/games/slug/:slug
*/
router.get("/slug/:slug", (req, res) => {
  const slug = req.params.slug;

  db.query("SELECT * FROM games WHERE slug = ?", [slug], (err, rows) => {
    if (err) return res.status(500).json({ message: "Erro no servidor." });
    if (!rows || rows.length === 0) return res.status(404).json({ message: "Jogo não encontrado." });

    const game = rows[0];

    // tenta buscar mídias (se a tabela existir)
    db.query(
      "SELECT media_type, url, sort_order FROM game_media WHERE game_id = ? ORDER BY sort_order ASC",
      [game.id],
      (err2, mediaRows) => {
        // se der erro (ex: tabela não existe), ainda devolve o jogo sem mídia
        const media = err2 || !mediaRows ? [] : mediaRows.map(m => ({
          type: m.media_type === "image" ? "image" : "video_file",
          src: m.url
        }));

        // plataformas: tenta JSON, se não tiver cai na coluna antiga "platform"
        let platforms = [];
        try {
          platforms = game.platforms_json ? JSON.parse(game.platforms_json) : [];
        } catch {
          platforms = [];
        }
        if ((!platforms || platforms.length === 0) && game.platform) platforms = [game.platform];

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
         media
});

      }
    );
  });
});

module.exports = router;

// Lista resumida para a página jogos.html
router.get("/list", (req, res) => {
  db.query(
    `SELECT id, title, slug, cover_url, created_at
     FROM games
     ORDER BY id DESC`,
    (err, rows) => {
      if (err) return res.status(500).json({ message: "Erro no servidor." });
      res.json(rows);
    }
  );
});

// ===== NOVO: DELETAR JOGO (somente quem criou) =====
// DELETE /api/games/:id
router.delete("/:id", auth, (req, res) => {
  const gameId = Number(req.params.id);
  if (!gameId) return res.status(400).json({ message: "ID inválido." });

  // 1) verifica se o jogo existe e se foi criado pelo usuário logado
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

      // 2) (opcional) buscar mídias para apagar arquivos do disco
      db.query(
        "SELECT url FROM game_media WHERE game_id = ?",
        [gameId],
        (err2, mediaRows) => {
          // mesmo que falhe, seguimos com a remoção do banco
          const mediaUrls = err2 || !mediaRows ? [] : mediaRows.map((m) => m.url);

          // 3) apaga do banco (se tiver FK ON DELETE CASCADE em game_media, ótimo)
          db.query("DELETE FROM games WHERE id = ?", [gameId], (err3) => {
            if (err3) return res.status(500).json({ message: "Erro ao apagar jogo." });

            // 4) (opcional) apagar arquivos no disco (capa + mídias)
            // Se você NÃO quiser apagar arquivos, pode comentar este bloco inteiro.
            try {
              const toDelete = [];
              if (game.cover_url) toDelete.push(game.cover_url);
              toDelete.push(...mediaUrls);

              toDelete.forEach((rel) => {
                // rel vem como "uploads/arquivo.png"
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
