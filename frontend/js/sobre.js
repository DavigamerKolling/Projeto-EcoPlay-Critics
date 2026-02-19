function toggleMenu() {
  const menu = document.getElementById("dropdown");
  if (!menu) return;

  menu.style.display = (menu.style.display === "block") ? "none" : "block";
}

function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");

  window.location.href = "login.html";
}

document.addEventListener("click", (e) => {
  const menu = document.getElementById("dropdown");
  const profileArea = document.querySelector(".profile-area");

  if (!menu || !profileArea) return;

  if (!profileArea.contains(e.target)) {
    menu.style.display = "none";
  }
});
