const PLATFORMS = [
  { value: "steam", label: "Steam" },
  { value: "epic", label: "Epic Games" },
  { value: "linux", label: "Linux" },
  { value: "apple", label: "Apple" },
  { value: "playstation", label: "PlayStation" },
  { value: "xbox", label: "Xbox" },
  { value: "switch", label: "Nintendo Switch" },
  { value: "android", label: "Android" } // você disse que já adicionou
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
    // youtu.be/ID
    if (u.hostname.includes("youtu.be")) return u.pathname.replace("/", "");
    // youtube.com/watch?v=ID
    if (u.searchParams.get("v")) return u.searchParams.get("v");
    // youtube.com/embed/ID
    const parts = u.pathname.split("/");
    const embedIndex = parts.indexOf("embed");
    if (embedIndex >= 0 && parts[embedIndex+1]) return parts[embedIndex+1];
  } catch (e) {}
  return "";
}

// Só pra “ficar igual ao mockup” (botões Enviar que não precisam realmente enviar)
document.getElementById("btnCoverInfo").onclick = () => alert("Capa selecionada.");
document.getElementById("btnMediaInfo").onclick = () => alert("Mídias selecionadas.");

document.getElementById("createGameForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const msg = document.getElementById("msg");
  msg.textContent = "";

  const token = localStorage.getItem("token"); // seu JWT do login
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

  // monta o multipart/form-data
  const fd = new FormData();
  fd.append("title", title);
  fd.append("description", description);
  fd.append("platforms", JSON.stringify(platforms));
  if (youtubeId) fd.append("youtubeId", youtubeId);

  fd.append("cover", coverFile);
  mediaFiles.forEach(f => fd.append("media", f)); // múltiplos

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
    // redireciona pra “página própria” do jogo (dinâmica)
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

// Fecha o dropdown clicando fora
document.addEventListener("click", (e) => {
  const dropdown = document.getElementById("dropdown");
  const profileArea = document.querySelector(".profile-area");
  if (!dropdown || !profileArea) return;

  if (!profileArea.contains(e.target)) {
    dropdown.classList.remove("active");
  }
});
