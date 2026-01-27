async function recuperar(){
  const email = document.getElementById("email").value;

  const res = await fetch("http://localhost:3000/auth/forgot", {
    method:"POST",
    headers:{ "Content-Type":"application/json" },
    body: JSON.stringify({ email })
  });

  const data = await res.json();

  if(data.token){
    window.location.href = "reset.html?token=" + data.token;
  } else {
    alert("Email não encontrado");
  }
}
