const params = new URLSearchParams(window.location.search);
const slug = params.get("id");

const token = localStorage.getItem("token");

const PLATFORMS = [
  { value: "steam", label: "Steam" },
  { value: "epic", label: "Epic Games" },
  { value: "linux", label: "Linux" },
  { value: "apple", label: "Apple" },
  { value: "playstation", label: "PlayStation" },
  { value: "xbox", label: "Xbox" },
  { value: "switch", label: "Nintendo Switch" },
  { value: "android", label: "Android" }
];

function fillSelect(id) {
  const sel = document.getElementById(id);
  if (!sel) return;

  const alreadyFilled = sel.querySelectorAll("option").length > 1;
  if (alreadyFilled) return;

  PLATFORMS.forEach((p) => {
    const opt = document.createElement("option");
    opt.value = p.value;
    opt.textContent = p.label;
    sel.appendChild(opt);
  });
}

const platformIds = ["plat1","plat2","plat3","plat4","plat5","plat6","plat7","plat8"];
platformIds.forEach(fillSelect);

function updatePlatformOptions(){
  const selects = platformIds.map(id => document.getElementById(id)).filter(Boolean);

  const selected = selects
    .map(s => (s.value || "").trim())
    .filter(Boolean);

  selects.forEach(sel => {
    const current = (sel.value || "").trim();
    Array.from(sel.options).forEach(opt => {
      const v = (opt.value || "").trim();
      if (!v) return;
      opt.disabled = selected.includes(v) && v !== current;
    });
  });
}

platformIds.forEach(id => {
  const sel = document.getElementById(id);
  if (!sel) return;
  sel.addEventListener("change", updatePlatformOptions);
});

fetch(`/api/games/slug/${slug}`)
  .then(res => res.json())
  .then(game => {
    document.getElementById("title").value = game.title;
    document.getElementById("description").value = game.description;

    const plats = Array.isArray(game.platforms) ? game.platforms : [];
    platformIds.forEach((id, i) => {
      const sel = document.getElementById(id);
      if (sel) sel.value = plats[i] || "";
    });

    updatePlatformOptions();

    const links = game.links || {};
    const setVal = (id, val) => {
      const el = document.getElementById(id);
      if (el) el.value = val || "";
    };

    setVal("linkSteam", links.steam);
    setVal("linkEpic", links.epic);
    setVal("linkPlaystation", links.playstation);
    setVal("linkXbox", links.xbox);
    setVal("linkSwitch", links.switch);
    setVal("linkAndroid", links.android);
    setVal("linkApple", links.apple);
    setVal("linkLinux", links.linux);

    const currentCover = document.getElementById("currentCover");
    if (currentCover && game.cover) {
      currentCover.src = game.cover;
      currentCover.style.display = "block";
    }

    const currentMedia = document.getElementById("currentMedia");
    if (currentMedia) {
      currentMedia.innerHTML = "";

      const medias = Array.isArray(game.media) ? game.media : [];

      medias.forEach((m) => {
        const type = m.type || m.media_type || "";
        const src = m.src || m.url || "";

        if (!src) return;

        if (type === "image") {
          const img = document.createElement("img");
          img.src = src;
          img.alt = "Mídia";
          img.style.width = "110px";
          img.style.height = "70px";
          img.style.objectFit = "cover";
          img.style.borderRadius = "6px";
          currentMedia.appendChild(img);
          return;
        }

        if (type === "video_file") {
          const v = document.createElement("video");
          v.src = src;
          v.controls = true;
          v.playsInline = true;
          v.style.width = "160px";
          v.style.height = "90px";
          v.style.borderRadius = "6px";
          currentMedia.appendChild(v);
          return;
        }

        const a = document.createElement("a");
        a.href = src;
        a.target = "_blank";
        a.rel = "noopener noreferrer";
        a.textContent = "Abrir mídia";
        a.style.fontSize = "12px";
        currentMedia.appendChild(a);
      });
    }
  });

document.getElementById("submitGame").addEventListener("click", async (e) => {
  e.preventDefault();

  const formData = new FormData();

  formData.append("title", document.getElementById("title").value);
  formData.append("description", document.getElementById("description").value);

  const platforms = platformIds
    .map(id => (document.getElementById(id)?.value || "").trim())
    .filter(Boolean);

  const uniquePlatforms = Array.from(new Set(platforms));
  if (platforms.length !== uniquePlatforms.length) {
    alert("Você não pode selecionar a mesma plataforma mais de uma vez.");
    return;
  }

  if (uniquePlatforms.length === 0) {
    alert("Selecione pelo menos uma plataforma.");
    return;
  }

  formData.append("platforms", JSON.stringify(uniquePlatforms));

  const getVal = (id) => (document.getElementById(id)?.value || "").trim();
  const links = {
    steam: getVal("linkSteam"),
    epic: getVal("linkEpic"),
    playstation: getVal("linkPlaystation"),
    xbox: getVal("linkXbox"),
    switch: getVal("linkSwitch"),
    android: getVal("linkAndroid"),
    apple: getVal("linkApple"),
    linux: getVal("linkLinux")
  };

  const platformLabel = (p) => (PLATFORMS.find(x => x.value === p)?.label || p);
  for (const p of uniquePlatforms) {
    const url = (links[p] || "").trim();
    if (!url) {
      alert(`O link da plataforma ${platformLabel(p)} é obrigatório.`);
      return;
    }
  }

  Object.keys(links).forEach(k => { if (!links[k]) delete links[k]; });

  formData.append("links", JSON.stringify(links));

  const coverFile = document.getElementById("cover")?.files?.[0];
  if (coverFile) formData.append("cover", coverFile);

  const mediaFiles = Array.from(document.getElementById("mediaFiles")?.files || []);
  mediaFiles.forEach(f => formData.append("media", f));

  const res = await fetch(`/api/games/${slug}`, {
    method: "PUT",
    headers: {
      "Authorization": `Bearer ${token}`
    },
    body: formData
  });

  const data = await res.json();
  alert(data.message);

  window.location.href = `jogo.html?id=${slug}`;
});
