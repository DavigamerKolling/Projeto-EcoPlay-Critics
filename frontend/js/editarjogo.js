const params = new URLSearchParams(window.location.search);
const slug = params.get("id");

const token = localStorage.getItem("token");

// carregar dados atuais
fetch(`/api/games/slug/${slug}`)
  .then(res => res.json())
  .then(game => {
    document.getElementById("title").value = game.title;
    document.getElementById("description").value = game.description;
  });

document.getElementById("submitGame").addEventListener("click", async () => {

  const formData = new FormData();

  formData.append("title", document.getElementById("title").value);
  formData.append("description", document.getElementById("description").value);

  const res = await fetch(`/api/games/${slug}`, {
    method: "PUT",
    headers: {
      "Authorization": `Bearer ${token}`
    },
    body: formData
  });

  const data = await res.json();
  alert(data.message);

  window.location.href = `jogo.html?id=${slug}`;
});
