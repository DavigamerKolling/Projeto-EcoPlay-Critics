(async () => {

  const PLATFORM_ICONS = {
    steam: "img/platforms/steam.png",
    epic: "img/platforms/epic.png",
    linux: "img/platforms/linux.png",
    apple: "img/platforms/apple.png",
    playstation: "img/platforms/playstation.png",
    xbox: "img/platforms/xbox.png",
    switch: "img/platforms/switch.png",
    android: "img/platforms/android.png"
  };

  const GAMES = {};
  
    const LOCKED_SLUGS = new Set([
    "beyond-blue",
    "plasticity",
    "terra-nil",
    "alba",
    "endling",
    "eco",
    "flower",
    "seeds-of-resilience",
    "fate-of-the-world"
  ]);

  const SYSTEM_GAME_SLUGS = new Set([
    "beyond-blue",
    "plasticity",
    "terra-nil",
    "alba",
    "endling",
    "seeds-of-resilience",
    "eco",
    "fate-of-the-world",
    "flower"
  ]);

  async function loadFromApi(slug) {
    const res = await fetch(
      `http://localhost:3000/api/games/slug/${encodeURIComponent(slug)}`
    );

    if (!res.ok) throw new Error("notfound");

    const data = await res.json();

    const media = [];
    if (data.media && data.media.length) media.push(...data.media);
    if (data.youtubeId) media.push({ type: "video", youtube: data.youtubeId });

    return {
      id: data.id,
      created_by: data.created_by,
      slug: data.slug,
      title: data.title,
      cover: data.cover,
      media,
      platforms: data.platforms || [],
      links: data.links || {},
      textHtml: `<p>${(data.description || "").replace(/\n/g, "<br>")}</p>`
    };
  }

  function getOrCreatePlatformsWrap() {
    let el = document.getElementById("platforms");
    if (el) return el;

    const side = document.querySelector(".side");
    if (!side) return null;

    el = document.createElement("div");
    el.id = "platforms";
    el.className = "platforms";
    side.appendChild(el);

    return el;
  }

  function getQueryParam(name) {
    const url = new URL(window.location.href);
    return url.searchParams.get(name);
  }

  function getLoggedUserId() {
    const token = localStorage.getItem("token");
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      const id = payload.id;
      if (id === undefined || id === null) return null;
      const n = Number(id);
      return Number.isFinite(n) ? n : null;
    } catch {
      return null;
    }
  }

  const id = getQueryParam("id");

  let game = GAMES[id];

  if (!game) {
    try {
      game = await loadFromApi(id);
    } catch (err) {
      document.title = "EcoPlay Critics - Jogo não encontrado";
      const text = document.getElementById("gameText");
      if (text) text.innerHTML = "<p>Jogo não encontrado.</p>";
      return;
    }
  }

  document.title = `EcoPlay Critics - ${game.title}`;

  const coverImg = document.getElementById("coverImg");
  if (coverImg) coverImg.src = game.cover;

  let platformsWrap = document.getElementById("platforms");
  if (!platformsWrap) {
    const side = document.querySelector(".side") || document.body;
    platformsWrap = document.createElement("div");
    platformsWrap.id = "platforms";
    side.appendChild(platformsWrap);
  }

  if (platformsWrap) {
    platformsWrap.innerHTML = "";

    (game.platforms || []).forEach((p) => {
      const icon = PLATFORM_ICONS[p];
      const url = game.links?.[p];

      const item = document.createElement(url ? "a" : "div");
      item.className = "platform";
      if (url) {
        item.href = url;
        item.target = "_blank";
        item.rel = "noopener noreferrer";
        item.title = `Abrir na plataforma: ${p}`;
      }

      item.innerHTML = icon
        ? `<img src="${icon}" alt="${p}">`
        : `<span style="font-family: Arial, sans-serif; font-size: 12px;">${p}</span>`;

      platformsWrap.appendChild(item);
    });
  }

  const gameText = document.getElementById("gameText");
  if (gameText) gameText.innerHTML = game.textHtml || "<p>Sem descrição.</p>";

  const mediaFrame = document.getElementById("mediaFrame");
  const prevBtn = document.getElementById("prevBanner");
  const nextBtn = document.getElementById("nextBanner");

  const mediaList =
    game.media ??
    (game.banners ? game.banners.map((src) => ({ type: "image", src })) : []);

  let mediaIndex = 0;

  function renderMedia(item) {
    if (!mediaFrame) return;
    mediaFrame.innerHTML = "";

    if (!item) {
      mediaFrame.innerHTML = `<div style="display:flex;align-items:center;justify-content:center;height:100%;font-family:Arial,sans-serif;">Sem mídia</div>`;
      return;
    }

    if (item.type === "image") {
      const img = document.createElement("img");
      img.src = item.src;
      img.alt = "Mídia do jogo";
      mediaFrame.appendChild(img);
      return;
    }

    if (item.type === "video" && item.youtube) {
      const iframe = document.createElement("iframe");
      iframe.src = `https://www.youtube.com/embed/${item.youtube}`;
      iframe.allow =
        "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
      iframe.allowFullscreen = true;
      mediaFrame.appendChild(iframe);
      return;
    }

    if ((item.type === "video" || item.type === "video_file") && item.src) {
      const video = document.createElement("video");
      video.src = item.src;
      video.controls = true;
      video.playsInline = true;
      mediaFrame.appendChild(video);
      return;
    }

    mediaFrame.innerHTML = `<div style="display:flex;align-items:center;justify-content:center;height:100%;font-family:Arial,sans-serif;">Mídia inválida</div>`;
  }

  renderMedia(mediaList[0]);

    const deleteBtn = document.getElementById("deleteGameBtn");
  const editBtn = document.getElementById("editGameBtn");
  const token = localStorage.getItem("token");

  const loggedUserId = getLoggedUserId();

  const createdByRaw = game?.created_by;
  const createdBy =
    createdByRaw === undefined || createdByRaw === null || createdByRaw === ""
      ? null
      : Number(createdByRaw);

  const isOwner =
    loggedUserId !== null &&
    createdBy !== null &&
    Number.isFinite(createdBy) &&
    loggedUserId === createdBy;
  
  const isLocked = LOCKED_SLUGS.has(String(game?.slug || id || "").toLowerCase());
  const canEditDelete = isOwner && !isLocked;

  if (deleteBtn) deleteBtn.style.display = "none";
  if (editBtn) editBtn.style.display = "none";

  if (deleteBtn && game?.id && token && canEditDelete) {
    deleteBtn.style.display = "inline-block";

    deleteBtn.addEventListener("click", async () => {
      const ok = confirm("Tem certeza que deseja apagar este jogo? Isso não pode ser desfeito.");
      if (!ok) return;

      const res = await fetch(`/api/games/${game.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        alert(data.message || "Erro ao apagar jogo.");
        return;
      }

      alert("Jogo apagado!");
      window.location.href = "jogos.html";
    });
  }

  if (editBtn && game?.id && token && canEditDelete) {
    editBtn.style.display = "inline-block";

    editBtn.addEventListener("click", () => {
      window.location.href = `editarjogo.html?id=${game.slug}`;
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      if (mediaList.length === 0) return;
      mediaIndex = (mediaIndex - 1 + mediaList.length) % mediaList.length;
      renderMedia(mediaList[mediaIndex]);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      if (mediaList.length === 0) return;
      mediaIndex = (mediaIndex + 1) % mediaList.length;
      renderMedia(mediaList[mediaIndex]);
    });
  }

  (function initComments() {
    const listEl =
      document.getElementById("commentsList") ||
      document.getElementById("comments") ||
      document.querySelector(".comments-list");

    const inputEl =
      document.getElementById("commentText") ||
      document.getElementById("comment") ||
      document.querySelector('textarea[name="comment"]');

    const formEl =
      document.getElementById("commentForm") ||
      document.querySelector("form.comments") ||
      (inputEl ? inputEl.closest("form") : null);

    const sendBtn =
      document.getElementById("sendComment") ||
      document.getElementById("sendCommentBtn") ||
      document.getElementById("btnComment") ||
      document.querySelector(".send-comment");

    if (!listEl || !sendBtn || !inputEl) return;

    const storageKey = `comments:${game.slug || game.id || id}`;

    function getLoggedUsername() {
      const lsName =
        (localStorage.getItem("username") || "").trim() ||
        (localStorage.getItem("name") || "").trim() ||
        (localStorage.getItem("userName") || "").trim();
      if (lsName) return lsName;

      const token = localStorage.getItem("token");
      if (!token) return "Usuário";

      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        if (payload.username) return payload.username;
        if (payload.name) return payload.name;
        if (payload.id) return `Usuário #${payload.id}`;
        return "Usuário";
      } catch {
        return "Usuário";
      }
    }

    function loadComments() {
      try {
        return JSON.parse(localStorage.getItem(storageKey) || "[]");
      } catch {
        return [];
      }
    }

    function saveComments(arr) {
      localStorage.setItem(storageKey, JSON.stringify(arr));
    }

    function moveListBelowForm() {
      const section = document.querySelector("section.comments") || listEl.parentElement;
      if (!section) return;

      const formBox = section.querySelector(".comment-form");
      if (formBox && listEl) {
        formBox.insertAdjacentElement("afterend", listEl);
      }
    }

    function render() {
      const comments = loadComments();
      listEl.innerHTML = "";

      if (!comments.length) {
        const empty = document.createElement("p");
        empty.textContent = "Ainda não há comentários.";
        empty.style.opacity = "0.8";
        listEl.appendChild(empty);
        return;
      }

      comments.forEach((c) => {
        const item = document.createElement("div");
        item.className = "comment";

        const meta = document.createElement("div");
        meta.className = "comment-meta";
        meta.textContent = `${c.author || "Usuário"} • ${c.date || ""}`;

        const text = document.createElement("div");
        text.className = "comment-text";
        text.textContent = c.text || "";

        item.appendChild(meta);
        item.appendChild(text);
        listEl.appendChild(item);
      });
    }

    async function handleSend(e) {
      if (e) e.preventDefault();

      const txt = (inputEl.value || "").trim();
      if (!txt) return;

      const comments = loadComments();
      comments.unshift({
        text: txt,
        date: new Date().toLocaleString("pt-BR"),
        author: getLoggedUsername()
      });

      saveComments(comments);
      inputEl.value = "";
      render();
    }

    if (formEl) formEl.addEventListener("submit", handleSend);
    if (sendBtn) sendBtn.addEventListener("click", handleSend);

    moveListBelowForm();
    render();
  })();

})();

function logout() {
  localStorage.removeItem("token");
  window.location.href = "login.html";
}

function toggleMenu() {
  const dropdown = document.getElementById("dropdown");
  if (dropdown) dropdown.classList.toggle("active");
}

document.addEventListener("click", (e) => {
  const dropdown = document.getElementById("dropdown");
  const profileArea = document.querySelector(".profile-area");
  if (!dropdown || !profileArea) return;

  if (!profileArea.contains(e.target)) {
    dropdown.classList.remove("active");
  }
});
