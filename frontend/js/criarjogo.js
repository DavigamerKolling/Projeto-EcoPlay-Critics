const PLATFORMS = [
  { value: "steam", label: "Steam", icon: "/img/platforms/steam.png" },
  { value: "epic", label: "Epic Games", icon: "/img/platforms/epic.png" },
  { value: "linux", label: "Linux", icon: "/img/platforms/linux.png" },
  { value: "apple", label: "Apple", icon: "/img/platforms/apple.png" },
  { value: "playstation", label: "PlayStation", icon: "/img/platforms/playstation.png" },
  { value: "xbox", label: "Xbox", icon: "/img/platforms/xbox.png" },
  { value: "switch", label: "Nintendo Switch", icon: "/img/platforms/switch.png" },
  { value: "android", label: "Android", icon: "/img/platforms/android.png" }
];

function fillSelect(id){
  const sel = document.getElementById(id);
  PLATFORMS.forEach(p => {
    const opt = document.createElement("option");
    opt.value = p.value;
    opt.textContent = p.label;
    sel.appendChild(opt);
  });
}

["plat1","plat2","plat3","plat4","plat5","plat6","plat7","plat8"].forEach(fillSelect);

function extractYouTubeId(url) {
  if (!url) return "";
  try {
    const u = new URL(url);
    if (u.hostname.includes("youtu.be")) return u.pathname.replace("/", "");
    if (u.searchParams.get("v")) return u.searchParams.get("v");
    const parts = u.pathname.split("/");
    const embedIndex = parts.indexOf("embed");
    if (embedIndex >= 0 && parts[embedIndex+1]) return parts[embedIndex+1];
  } catch (e) {}
  return "";
}

const btnCover = document.getElementById("btnCoverInfo");
if (btnCover) btnCover.onclick = () => alert("Capa selecionada.");

const btnMedia = document.getElementById("btnMediaInfo");
if (btnMedia) btnMedia.onclick = () => alert("Mídias selecionadas.");

document.getElementById("createGameForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const msg = document.getElementById("msg");
  msg.textContent = "";

  const token = localStorage.getItem("token");
  if (!token) {
    msg.textContent = "Você precisa estar logado para criar jogos.";
    return;
  }

  const title = document.getElementById("title").value.trim();
  const description = document.getElementById("description").value.trim();
  const coverFile = document.getElementById("cover").files[0];
  const mediaFiles = Array.from(document.getElementById("mediaFiles").files || []);
  const youtubeUrl = document.getElementById("youtube").value.trim();
  const youtubeId = extractYouTubeId(youtubeUrl);

  const platforms = ["plat1","plat2","plat3","plat4","plat5","plat6","plat7","plat8"]
    .map(id => document.getElementById(id).value)
    .filter(Boolean);

  if (!title || !description || !coverFile) {
    msg.textContent = "Preencha nome, descrição e selecione a capa.";
    return;
  }

  const fd = new FormData();
  fd.append("title", title);
  fd.append("description", description);
  fd.append("platforms", JSON.stringify(platforms));
  if (youtubeId) fd.append("youtubeId", youtubeId);
  
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

fd.append("links", JSON.stringify(links));

  fd.append("cover", coverFile);
  mediaFiles.forEach(f => fd.append("media", f));

  try {
    const res = await fetch("http://localhost:3000/api/games/create", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: fd
    });
    
    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      msg.textContent = data.message || "Erro ao criar jogo.";
      return;
    }

    msg.textContent = "Jogo criado com sucesso! Abrindo página...";
    window.location.href = `jogo.html?id=${encodeURIComponent(data.slug)}`;
  } catch (err) {
    console.error(err);
    msg.textContent = "Falha de conexão com o servidor.";
  }
});

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
