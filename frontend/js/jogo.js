// Ícones (coloque esses arquivos em frontend/img/platforms/)
const PLATFORM_ICONS = {
  steam: "img/platforms/steam.png",
  epic: "img/platforms/epic.png",
  linux: "img/platforms/linux.png",
  apple: "img/platforms/apple.png",
  playstation: "img/platforms/playstation.png",
  xbox: "img/platforms/xbox.png",
  switch: "img/platforms/switch.png",
  android: "img/plataforms/android.png"
};

// Base de dados local (depois você pode trocar por MySQL)
const GAMES = {
  "beyond-blue": {
    title: "Beyond Blue",
    cover: "img/beyond-blue.jpg",

    // ✅ GALERIA: imagens + vídeo (youtube OU arquivo local)
    media: [
      { type: "image", src: "img/banners/beyond1.jpg" },
      { type: "image", src: "img/banners/beyond2.jpg" },
      // YouTube: use só o ID do vídeo
      { type: "video", youtube: "ABCDEFG1234" }
      // ou vídeo local:
      // { type: "video", src: "videos/beyond-trailer.mp4" }
    ],

    platforms: ["steam", "epic", "linux", "apple"],

    textHtml: `
      <p><b>Beyond Blue</b> é uma narrativa de aventura individual que leva você ao fundo do coração azul do nosso planeta.</p>

      <p>
        Em um futuro próximo, Beyond Blue explora os mistérios do nosso oceano através dos olhos de Mirai,
        cientista e exploradora do fundo do mar. Faça parte de uma nova equipe de pesquisa e use
        tecnologias inovadoras para ver, ouvir e interagir com o oceano de forma mais reveladora do que nunca.
      </p>

      <p><b>Incluindo:</b></p>
      <ul>
        <li>Uma narrativa intrigante totalmente dublada</li>
        <li>Exploração e aventura em um mundo jamais tocado</li>
        <li>Trilha sonora envolvente e composições originais</li>
        <li>Minidocumentários com imagens e entrevistas de especialistas</li>
      </ul>

      <p>
        Adotando um processo de desenvolvimento inclusivo, o jogo foi criado em parceria com especialistas
        para trazer uma experiência que reflete o mistério infinito e as maravilhas incríveis do coração azul do nosso planeta.
      </p>
    `
  },

  // Exemplos mínimos pros outros (você pode editar depois)
  "plasticity": {
    title: "Plasticity",
    cover: "img/plasticity.jpg",
    media: [{ type: "image", src: "img/banners/plasticity1.jpg" }],
    platforms: ["steam"],
    textHtml: `<p><b>Plasticity</b> é uma experiência narrativa sobre consumo e impacto ambiental...</p>`
  },

  "terra-nil": {
    title: "Terra Nil",
    cover: "img/terra-nil.jpg",
    media: [{ type: "image", src: "img/banners/terra1.jpg" }],
    platforms: ["steam", "epic"],
    textHtml: `<p><b>Terra Nil</b> é um jogo de estratégia reversa: você recupera um ecossistema devastado...</p>`
  }
};

// ---------- helpers ----------
function getQueryParam(name) {
  const url = new URL(window.location.href);
  return url.searchParams.get(name);
}

// ---------- main ----------
const id = getQueryParam("id");
const game = GAMES[id];

if (!game) {
  document.title = "EcoPlay Critics - Jogo não encontrado";
  const text = document.getElementById("gameText");
  if (text) text.innerHTML = "<p>Jogo não encontrado.</p>";
} else {
  document.title = `EcoPlay Critics - ${game.title}`;

  // Capa
  const coverImg = document.getElementById("coverImg");
  if (coverImg) coverImg.src = game.cover;

  // Plataformas
  const platformsWrap = document.getElementById("platforms");
  if (platformsWrap) {
    platformsWrap.innerHTML = "";
    (game.platforms || []).forEach((p) => {
      const div = document.createElement("div");
      div.className = "platform";
      const icon = PLATFORM_ICONS[p];

      // se não achar ícone, mostra texto
      div.innerHTML = icon
        ? `<img src="${icon}" alt="${p}">`
        : `<span style="font-family: Arial, sans-serif; font-size: 12px;">${p}</span>`;

      platformsWrap.appendChild(div);
    });
  }

  // Texto
  const gameText = document.getElementById("gameText");
  if (gameText) gameText.innerHTML = game.textHtml || "<p>Sem descrição.</p>";

  // ---------- GALERIA (imagem + vídeo) ----------
  const mediaFrame = document.getElementById("mediaFrame");
  const prevBtn = document.getElementById("prevBanner");
  const nextBtn = document.getElementById("nextBanner");

  // compatibilidade: se ainda existir game.banners antigo, converte para imagens
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

    // IMAGEM
    if (item.type === "image") {
      const img = document.createElement("img");
      img.src = item.src;
      img.alt = "Mídia do jogo";
      mediaFrame.appendChild(img);
      return;
    }

    // VÍDEO YOUTUBE (ID)
    if (item.type === "video" && item.youtube) {
      const iframe = document.createElement("iframe");
      iframe.src = `https://www.youtube.com/embed/${item.youtube}`;
      iframe.allow =
        "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
      iframe.allowFullscreen = true;
      mediaFrame.appendChild(iframe);
      return;
    }

    // VÍDEO LOCAL (mp4/webm)
    if (item.type === "video" && item.src) {
      const video = document.createElement("video");
      video.src = item.src;
      video.controls = true;
      video.playsInline = true;
      mediaFrame.appendChild(video);
      return;
    }

    // fallback
    mediaFrame.innerHTML = `<div style="display:flex;align-items:center;justify-content:center;height:100%;font-family:Arial,sans-serif;">Mídia inválida</div>`;
  }

  // render inicial
  renderMedia(mediaList[0]);

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
}
