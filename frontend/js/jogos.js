function toggleMenu() {
  const menu = document.getElementById("dropdown");
  menu.style.display = menu.style.display === "block" ? "none" : "block";
}

function logout() {
  localStorage.removeItem("token");
  window.location.href = "login.html";
}

if (!localStorage.getItem("token")) {
  window.location.href = "login.html";
}

const searchInput = document.getElementById("searchInput");
const noResults = document.getElementById("noResults");

searchInput.addEventListener("input", () => {
  const q = searchInput.value.trim().toLowerCase();
  let visible = 0;

  document.querySelectorAll(".game[data-name]").forEach((game) => {
    const name = game.dataset.name.toLowerCase();
    const show = name.includes(q);
    game.style.display = show ? "flex" : "none";
    if (show) visible++;
  });

  noResults.style.display = (q && visible === 0) ? "block" : "none";
});

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".arrow[data-target]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const row = document.getElementById(btn.dataset.target);
      if (!row) return;

      const dir = Number(btn.dataset.dir || "1"); // 1 = direita, -1 = esquerda
      const firstCard = row.querySelector(".game");
      const step = firstCard ? (firstCard.offsetWidth + 22) * 3 : 600;

      row.scrollBy({ left: step * dir, behavior: "smooth" });
    });
  });
});

async function loadUserGames() {
  const res = await fetch("/api/games/list");
  if (!res.ok) return;

  const games = await res.json();

  // Onde vai inserir: row-all e row-recent
  const rowAll = document.getElementById("row-all");
  const rowRecent = document.getElementById("row-recent");

  if (!rowAll) return;

  // Cria cards e adiciona DEPOIS do "+"
  // (o + é o primeiro filho)
  const addCard = rowAll.querySelector(".game.add");

  games.forEach((g) => {
    // evita duplicar: se já existe algum card com esse slug/título
    if (rowAll.querySelector(`[data-slug="${g.slug}"]`)) return;

    const a = document.createElement("a");
    a.className = "game usergame";
    a.href = `jogo.html?id=${encodeURIComponent(g.slug)}`;
    a.dataset.name = g.title;
    a.dataset.slug = g.slug;

    const img = document.createElement("img");
    img.src = g.cover_url || "img/placeholder.jpg";
    img.alt = g.title;

    a.appendChild(img);

    // coloca depois do "+"
    if (addCard && addCard.nextSibling) {
      rowAll.insertBefore(a, addCard.nextSibling);
    } else {
      rowAll.appendChild(a);
    }

    // Também adiciona no "Mais Recente" (ex: top 10)
    if (rowRecent && rowRecent.querySelectorAll(".game.usergame").length < 10) {
      const b = a.cloneNode(true);
      rowRecent.appendChild(b);
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  loadUserGames();
});
