const params = new URLSearchParams(window.location.search);
const juegoId = params.get('juegoId');

fetch(`https://backend-production-4746.up.railway.app/logros/${juegoId}`)
  .then(response => response.json())
  .then(logros => {
    const logrosLista = document.getElementById('logros-lista');
    logros.forEach(logro => {
      const logroDiv = document.createElement('div');
      logroDiv.classList.add('logro-card');

      const estadoIcono = logro.estado
        ? 'https://www.iconpacks.net/icons/2/free-check-icon-3278-thumb.png'
        : 'https://cdn-icons-png.flaticon.com/512/232/232443.png';

      const dificultadClase = logro.dificultad.toLowerCase();

      logroDiv.innerHTML = `
        <img src="${estadoIcono}" alt="Estado del logro" onclick="cambiarEstado(${logro.id}, ${!logro.estado})">
        <div class="contenido">
          <h3>${logro.nombre}</h3>
          <p>${logro.descripcion}</p>
        </div>
        <span class="dificultad ${dificultadClase}">${logro.dificultad}</span>
        <button class="detalles-btn" onclick="verDetalles(${logro.id})">Detalles</button>
      `;

      logrosLista.appendChild(logroDiv);
    });
  });

function cambiarEstado(logroId, nuevoEstado) {
  fetch(`https://backend-production-4746.up.railway.app/logros/${logroId}/estado`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ estado: nuevoEstado }),
  })
    .then(response => response.json())
    .then(() => {
      location.reload(); // Recargar la página para reflejar los cambios
    });
}

function verDetalles(logroId) {
  window.location.href = `logro.html?logroId=${logroId}`;
}
