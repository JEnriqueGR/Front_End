fetch('https://backend-production-4746.up.railway.app/juegos')
  .then(response => response.json())
  .then(juegos => {
    const juegosLista = document.getElementById('juegos-lista');
    juegos.forEach(juego => {
      // Obtener logros del juego
      fetch(`https://backend-production-4746.up.railway.app/logros/${juego.id}`)
        .then(response => response.json())
        .then(logros => {
          const completados = logros.filter(logro => logro.estado).length;
          const total = logros.length;
          const porcentaje = total > 0 ? (completados / total) * 100 : 0;

          const juegoDiv = document.createElement('div');
          juegoDiv.classList.add('juego-card');
          juegoDiv.innerHTML = `
            <img src="${juego.imagen}" alt="${juego.titulo}" />
            <h3>${juego.titulo}</h3>
            <div class="progreso-barra">
              <div class="progreso" style="width: ${porcentaje}%;"></div>
            </div>
            <button onclick="verLogros(${juego.id})">Consultar logros</button>
          `;
          juegosLista.appendChild(juegoDiv);
        });
    });
  });

function verLogros(juegoId) {
  window.location.href = `logros.html?juegoId=${juegoId}`;
}
