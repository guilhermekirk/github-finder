const input = document.querySelector("#input-github");
const button = document.querySelector("#btn-buscar");
const resultado = document.querySelector("#resultado");

function buscarUsuario() {
  const username = input.value.trim();

  if (!username) {
    resultado.textContent = "Por favor, digite um nome de usuário!";
    return;
  }

  resultado.textContent = "Carregando...";

  fetch(`https://api.github.com/users/${username}`)
    .then((res) => {
      if (!res.ok) {
        throw new Error("Usuário não encontrado");
      }
      return res.json();
    })

    .then((data) => {
      resultado.innerHTML = `
    <img src="${data.avatar_url}" alt = "Avatar do ${data.login}" />
    <h2>${data.name || data.login}</h2>
    <p>${data.bio || `O usuário não possui uma biografia no perfil`}</p>
    <p>Repositórios públicos: ${data.public_repos}</p>
    <p>Seguidores: ${data.followers}</p>
    <a href="${data.html_url}" target="_blank">Ver perfil no Github</a>
    `;
    })

    .catch((err) => {
      resultado.textContent = err.message;
    });
}

button.addEventListener("click", buscarUsuario);

input.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    buscarUsuario();
  }
});
