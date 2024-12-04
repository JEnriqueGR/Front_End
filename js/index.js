fetch('https://backend-production-4746.up.railway.app/juegos')
  .then(response => response.json())
  .then(data => {
    const juegosLista = document.getElementById('juegos-lista');
    data.forEach(juego => {
      const juegoDiv = document.createElement('div');
      juegoDiv.classList.add('juego');
      juegoDiv.innerHTML = `
        <img src="${juego.imagen}" alt="${juego.titulo}" />
        <h3>${juego.titulo}</h3>
        <button onclick="verLogros(${juego.id})">Consultar logros</button>
      `;
      juegosLista.appendChild(juegoDiv);
    });
  });

function verLogros(juegoId) {
  window.location.href = `logros.html?juegoId=${juegoId}`;
}
