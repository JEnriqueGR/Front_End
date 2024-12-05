fetch('https://backend-production-4746.up.railway.app/juegos')
  .then(response => response.json())
  .then(data => {
    const juegosLista = document.getElementById('juegos-lista');
    data.forEach(juego => {
      const juegoDiv = document.createElement('div');
      juegoDiv.classList.add('juego-card');

      // Calcular porcentaje de logros completados
      const totalLogros = juego.logros.length;
      const logrosCompletados = juego.logros.filter(logro => logro.estado).length;
      const porcentajeCompletado = (logrosCompletados / totalLogros) * 100;

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
      }

      juegoDiv.innerHTML = `
        <img src="${juego.imagen}" alt="${juego.titulo}" />
        <h3>${juego.titulo}</h3>
        ${plataformaImg}
        <div class="barra-progreso">
          <div class="progreso" style="width: ${porcentajeCompletado}%"></div>
        </div>
        <button onclick="verLogros(${juego.id})">Consultar logros</button>
      `;

      juegosLista.appendChild(juegoDiv);
    });
  });

function verLogros(juegoId) {
  window.location.href = `logros.html?juegoId=${juegoId}`;
}
