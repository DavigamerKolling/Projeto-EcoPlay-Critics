async function recuperar(){
  const email = document.getElementById("email").value.trim();

  if(!email){
    alert("Digite seu email.");
    return;
  }

  try{
    const res = await fetch("http://localhost:3000/auth/forgot", {
      method:"POST",
      headers:{ "Content-Type":"application/json" },
      body: JSON.stringify({ email })
    });

    const data = await res.json();

    if(res.ok){
      document.getElementById("formBox").style.display = "none";
      document.getElementById("successBox").style.display = "block";
    }else{
      alert(data.error || "Erro ao enviar email.");
    }

  }catch(err){
    alert("Erro de conexão com o servidor.");
  }
}
