const params = new URLSearchParams(window.location.search);
const token = params.get("token");

if(!token){
  alert("Link inválido ou incompleto.");
  window.location.href = "login.html";
}

async function resetar(){
  const password = document.getElementById("password").value.trim();
  const confirm = document.getElementById("confirm").value.trim();

  if(!password || !confirm){
    alert("Preencha todos os campos.");
    return;
  }

  if(password.length < 4){
    alert("A senha deve ter pelo menos 4 caracteres.");
    return;
  }

  if(password !== confirm){
    alert("As senhas não coincidem.");
    return;
  }

  try{
    const res = await fetch("http://localhost:3000/auth/reset", {
      method:"POST",
      headers:{ "Content-Type":"application/json" },
      body: JSON.stringify({ token, password })
    });

    const data = await res.json();

    if(res.ok){
      alert("Senha alterada com sucesso!");
      window.location.href = "login.html";
    }else{
      alert(data.error || "Token inválido ou expirado.");
    }
  }catch(err){
    alert("Erro de conexão com o servidor.");
  }
}
