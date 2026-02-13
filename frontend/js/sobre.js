// ===== PERFIL / LOGOUT (mesmo comportamento do jogos.html) =====

function toggleMenu() {
  const menu = document.getElementById("dropdown");
  if (!menu) return;

  // alterna display
  menu.style.display = (menu.style.display === "block") ? "none" : "block";
}

function logout() {
  // ajuste o nome da chave se você usa outro (ex: "token")
  localStorage.removeItem("token");
  localStorage.removeItem("user");

  window.location.href = "login.html";
}

// fecha dropdown clicando fora
document.addEventListener("click", (e) => {
  const menu = document.getElementById("dropdown");
  const profileArea = document.querySelector(".profile-area");

  if (!menu || !profileArea) return;

  if (!profileArea.contains(e.target)) {
    menu.style.display = "none";
  }
});
