const enterBtn = document.getElementById("enterBtn");

enterBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const token = localStorage.getItem("token");

  if (token) {
    window.location.href = "jogos.html";
  } 
  else {
    window.location.href = "login.html";
  }
});
