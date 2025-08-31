const API_NEWSAPI = "705146d826d94538b4449f55ce704203"; // coloque sua chave real
const container = document.getElementById("lista-noticias");

// Função para carregar notícias
function carregarNoticias(termo) {
  container.innerHTML = "<p>Carregando notícias...</p>";

  const URL = `https://newsapi.org/v2/everything?q=${encodeURIComponent(termo)}&language=pt&pageSize=10&apiKey=${API_NEWSAPI}`;

  fetch(URL)
    .then(res => res.json())
    .then(data => {
      container.innerHTML = "";

      if (!data.articles || data.articles.length === 0) {
        container.innerHTML = "<p>Nenhuma notícia encontrada.</p>";
        return;
      }

      data.articles.forEach(n => {
        const artigo = document.createElement("article");
        artigo.classList.add("noticia");
        artigo.innerHTML = `
          <img src="${n.urlToImage || 'img/default.jpg'}" alt="${n.title}">
          <div>
            <h2>${n.title}</h2>
            <p>${n.description || 'Sem descrição disponível'}</p>
            <a href="${n.url}" target="_blank">Ler mais</a>
          </div>
        `;
        container.appendChild(artigo);
      });
    })
    .catch(err => {
      console.error("Erro ao carregar notícias:", err);
      container.innerHTML = "<p>Erro ao carregar notícias.</p>";
    });
}

// Carrega notícias de games por padrão
window.onload = () => carregarNoticias("games");



let noticias = [];

// Carrega as notícias do JSON
fetch("noticias.json")
  .then(response => response.json())
  .then(data => {
    noticias = data;
    mostrarNoticias("todas");
  });

function mostrarNoticias(categoria) {
  const container = document.getElementById("lista-noticias");
  container.innerHTML = "";

  const filtradas = categoria === "todas"
    ? noticias
    : noticias.filter(n => n.categoria === categoria);

  if (filtradas.length === 0) {
    container.innerHTML = "<p>Nenhuma notícia encontrada.</p>";
    return;
  }

  filtradas.forEach(n => {
    const artigo = document.createElement("article");
    artigo.classList.add("noticia");
    artigo.innerHTML = `
      <img src="${n.imagem}" alt="${n.titulo}">
      <div>
        <h2>${n.titulo}</h2>
        <p>${n.descricao}</p>
        <a href="#">Ler mais</a>
      </div>
    `;
    container.appendChild(artigo);
  });
}

function filtrarNoticias(categoria) {
  mostrarNoticias(categoria);
}