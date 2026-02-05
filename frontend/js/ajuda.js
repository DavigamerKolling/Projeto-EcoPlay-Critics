function enviarRelatorio(){
  const tipo = document.getElementById("tipoProblema").value;
  const desc = document.getElementById("descricao").value.trim();

  if(!tipo || !desc){
    alert("Por favor, selecione o tipo de problema e descreva o ocorrido.");
    return;
  }

  // Aqui futuramente você pode enviar pro backend (fetch)
  // Por enquanto, só simula o envio

  document.getElementById("formBox").style.display = "none";
  document.getElementById("successBox").style.display = "block";
}
