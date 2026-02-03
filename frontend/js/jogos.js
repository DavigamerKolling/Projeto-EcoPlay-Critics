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

