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

          // Determinar la imagen de la plataforma
          let plataformaImg = '';
          switch (juego.plataforma) {
            case 'Xbox':
              plataformaImg = '<img src="https://cdn-1.webcatalog.io/catalog/xbox-cloud-gaming/xbox-cloud-gaming-icon-filled-256.png?v=1714776527567" class="plataforma" alt="Xbox">';
              break;
            case 'PS':
              plataformaImg = '<img src="https://play-lh.googleusercontent.com/zi6QgTtIiAnGqQMizfoj2LnE85kzHyZlgTruSzJ7Zw_79NAmB3fhxuDegwxby7P0yw=s256-rw" class="plataforma" alt="PS">';
              break;
            case 'PC':
              plataformaImg = '<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Pc_game_logo.png/480px-Pc_game_logo.png" class="plataforma" alt="PC">';
              break;
            case 'Nintendo':
              plataformaImg = '<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Nintendo_Switch_logo%2C_square.png/800px-Nintendo_Switch_logo%2C_square.png" class="plataforma" alt="Nintendo">';
              break;
            default:
              plataformaImg = '';
              break;
          }

          // Crear la tarjeta del juego
          juegoDiv.innerHTML = `
            <img src="${juego.imagen}" alt="${juego.titulo}" />
            <div class="contenido">
              <h3>${juego.titulo}</h3>
              ${plataformaImg}
              <div class="barra-progreso">
                <div class="progreso" style="width: ${porcentaje}%;"></div>
              </div>
              <div class="botones">
                <button onclick="verLogros(${juego.id})">Consultar logros</button>
              </div>
            </div>
          `;

          // Agregar la tarjeta del juego a la lista
          juegosLista.appendChild(juegoDiv);
        });
    });
  });

function verLogros(juegoId) {
  window.location.href = `logros.html?juegoId=${juegoId}`;
}
