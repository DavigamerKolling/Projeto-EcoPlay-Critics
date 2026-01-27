const params = new URLSearchParams(window.location.search);
const token = params.get("token");

async function resetar(){
  const password = document.getElementById("password").value;
  const confirm = document.getElementById("confirm").value;

  if(password !== confirm){
    alert("As senhas não coincidem");
    return;
  }

  const res = await fetch("http://localhost:3000/auth/reset", {
    method:"POST",
    headers:{ "Content-Type":"application/json" },
    body: JSON.stringify({ token, password })
  });

  const data = await res.json();

  if(data.message){
    alert("Senha alterada com sucesso!");
    window.location.href = "login.html";
  } else {
    alert("Token inválido ou expirado");
  }
}
