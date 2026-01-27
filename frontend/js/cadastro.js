const form = document.querySelector(".form-cadastro");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const inputs = form.querySelectorAll("input");

  const name = inputs[0].value;
  const email = inputs[1].value;
  const password = inputs[2].value;
  const confirm = inputs[3].value;

  if (password !== confirm) {
    alert("As senhas não coincidem!");
    return;
  }

  const response = await fetch("http://localhost:3000/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name,
      email,
      password
    })
  });

  const data = await response.json();

  if (data.message) {
    alert("Conta criada com sucesso!");
    window.location.href = "login.html";
  } else {
    alert("Erro ao cadastrar usuário");
  }
});
