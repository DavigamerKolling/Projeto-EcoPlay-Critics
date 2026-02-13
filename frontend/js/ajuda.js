function enviarRelatorio(){
  const tipo = document.getElementById("tipoProblema").value;
  const desc = document.getElementById("descricao").value.trim();

  if(!tipo || !desc){
    alert("Por favor, selecione o tipo de problema e descreva o ocorrido.");
    return;
  }

  document.getElementById("formBox").style.display = "none";
  document.getElementById("successBox").style.display = "block";
}

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
