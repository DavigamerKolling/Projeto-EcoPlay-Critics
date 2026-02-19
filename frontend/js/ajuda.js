async function enviarRelatorio() {
  const tipo = document.getElementById("tipoProblema").value;
  const desc = document.getElementById("descricao").value.trim();

  if (!tipo || !desc) {
    alert("Por favor, selecione o tipo de problema e descreva o ocorrido.");
    return;
  }

  try {
    const res = await fetch("http://localhost:3000/api/help/report", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tipo, desc })
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      alert(data.message || "Erro ao enviar relatório.");
      return;
    }

    document.getElementById("formBox").style.display = "none";
    document.getElementById("successBox").style.display = "block";
  } catch (err) {
    console.error(err);
    alert("Falha de conexão com o servidor.");
  }
}

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
