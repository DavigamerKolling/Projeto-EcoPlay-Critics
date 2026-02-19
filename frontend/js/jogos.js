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

function updateArrowsForRow(row) {
  if (!row) return;

  const targetId = row.id;
  if (!targetId) return;

  const arrows = Array.from(document.querySelectorAll(`.arrow[data-target="${targetId}"]`));
  if (!arrows.length) return;

  const leftArrow = arrows.find(a => String(a.dataset.dir || "").trim() === "-1" || a.classList.contains("left"));
  const rightArrow = arrows.find(a => String(a.dataset.dir || "").trim() !== "-1" && !a.classList.contains("left"));

  const maxScroll = Math.max(0, row.scrollWidth - row.clientWidth);
  const atStart = row.scrollLeft <= 0;
  const atEnd = row.scrollLeft >= (maxScroll - 1);
  const noScroll = maxScroll <= 1;

  if (leftArrow) leftArrow.style.display = (noScroll || atStart) ? "none" : "";
  if (rightArrow) rightArrow.style.display = (noScroll || atEnd) ? "none" : "";
}

function refreshAllArrows() {
  document.querySelectorAll(".games-row[id]").forEach((row) => updateArrowsForRow(row));
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".arrow[data-target]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const row = document.getElementById(btn.dataset.target);
      if (!row) return;

      const dir = Number(btn.dataset.dir || "1");
      const firstCard = row.querySelector(".game");
      const step = firstCard ? (firstCard.offsetWidth + 22) * 3 : 600;

      row.scrollBy({ left: step * dir, behavior: "smooth" });

      setTimeout(() => updateArrowsForRow(row), 220);
    });
  });

  document.querySelectorAll(".games-row[id]").forEach((row) => {
    row.addEventListener("scroll", () => updateArrowsForRow(row), { passive: true });
    updateArrowsForRow(row);
  });

  window.addEventListener("resize", refreshAllArrows);
});

function normalizeText(str) {
  return (str || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function alreadyInRow(row, slug) {
  return !!row.querySelector(`[data-slug="${slug}"]`);
}

function createCard(g) {
  const a = document.createElement("a");
  a.className = "game usergame";
  a.href = `jogo.html?id=${encodeURIComponent(g.slug)}`;
  a.dataset.name = g.title;
  a.dataset.slug = g.slug;

  const img = document.createElement("img");
  img.src = g.cover_url || g.cover || "img/placeholder.jpg";
  img.alt = g.title;

  a.appendChild(img);
  return a;
}

function insertAsLast(row, card) {
  row.appendChild(card);
}

function insertAsFirst(row, card) {
  row.insertBefore(card, row.firstChild);
}

function insertAlphabetically(row, card) {
  const newName = (card.dataset.name || "").toLowerCase();

  const cards = Array.from(row.querySelectorAll(".game[data-name]"));

  let inserted = false;
  for (const c of cards) {
    const cName = (c.dataset.name || "").toLowerCase();
    if (newName.localeCompare(cName, "pt-BR") < 0) {
      row.insertBefore(card, c);
      inserted = true;
      break;
    }
  }

  if (!inserted) row.appendChild(card);
}

async function getDescriptionForGame(g) {
  if (typeof g.description === "string") return g.description;

  try {
    const res = await fetch(`/api/games/slug/${encodeURIComponent(g.slug)}`);
    if (!res.ok) return "";
    const full = await res.json();
    return full.description || "";
  } catch {
    return "";
  }
}

async function placeGameInSections(g) {
  const rowAll = document.getElementById("row-all");
  const rowRecent = document.getElementById("row-recent");

  const rowAlpha = document.getElementById("row-alpha");
  const rowStory = document.getElementById("row-story");
  const rowStrategy = document.getElementById("row-strategy");

  if (!rowAll) return;

  if (!alreadyInRow(rowAll, g.slug)) {
    const cardAll = createCard(g);
    insertAsLast(rowAll, cardAll);
  }

  if (rowRecent && !alreadyInRow(rowRecent, g.slug)) {
    const cardRecent = createCard(g);
    insertAsFirst(rowRecent, cardRecent);
  }

  if (rowAlpha && !alreadyInRow(rowAlpha, g.slug)) {
    const cardAlpha = createCard(g);
    insertAlphabetically(rowAlpha, cardAlpha);
  }

  const desc = normalizeText(await getDescriptionForGame(g));

  if (rowStory && !alreadyInRow(rowStory, g.slug)) {
    if (desc.includes("aventura") || desc.includes("narrativa")) {
      const cardStory = createCard(g);
      insertAsLast(rowStory, cardStory);
    }
  }

  if (rowStrategy && !alreadyInRow(rowStrategy, g.slug)) {
    if (desc.includes("estrategia") || desc.includes("gestao")) {
      const cardStrat = createCard(g);
      insertAsLast(rowStrategy, cardStrat);
    }
  }

  updateArrowsForRow(rowAll);
  updateArrowsForRow(rowRecent);
  updateArrowsForRow(rowAlpha);
  updateArrowsForRow(rowStory);
  updateArrowsForRow(rowStrategy);
}

async function loadUserGames() {
  let res = await fetch("/api/games/list");

  if (!res.ok) {
    console.warn("Falha em /api/games/list, tentando /api/games ...");
    res = await fetch("/api/games");
    if (!res.ok) {
      console.error("Falha também em /api/games. Nada será carregado.");
      return;
    }
  }

  const games = await res.json();

  const rowAll = document.getElementById("row-all");
  if (!rowAll) return;

  for (const g of games) {
    if (!g.slug || !g.title) continue;
    await placeGameInSections(g);
  }

  refreshAllArrows();
}

document.addEventListener("DOMContentLoaded", () => {
  loadUserGames();
});
