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

