// Obtener el ID del juego desde la URL
const params = new URLSearchParams(window.location.search);
const juegoId = params.get('juegoId');

// Obtener los logros del backend y renderizarlos en la página
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
        <div class="contenido">
          <h3>${logro.nombre}</h3>
          <p>${logro.descripcion}</p>
        </div>
        <div class="derecha">
          <img src="${logro.imagen}" alt="Imagen del logro">
          <span class="dificultad ${dificultadClase}">${logro.dificultad}</span>
          <button class="detalles-btn" onclick="verDetalles(${logro.id})">Detalles</button>
          <img src="${estadoIcono}" alt="Estado del logro" onclick="cambiarEstado(${logro.id}, ${!logro.estado})">
        </div>
      `;

      logrosLista.appendChild(logroDiv);
    });
  })
  .catch(error => console.error('Error al cargar logros:', error));

// Función para cambiar el estado del logro
function cambiarEstado(logroId, nuevoEstado) {
  fetch(`https://backend-production-4746.up.railway.app/logros/${logroId}/estado`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ estado: nuevoEstado }),
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Error al cambiar el estado del logro');
      }
      return response.json();
    })
    .then(() => {
      // Actualizar directamente el estado sin recargar la página
      const iconoEstado = document.querySelector(`img[onclick="cambiarEstado(${logroId}, ${nuevoEstado})"]`);
      iconoEstado.src = nuevoEstado
        ? 'https://www.iconpacks.net/icons/2/free-check-icon-3278-thumb.png'
        : 'https://cdn-icons-png.flaticon.com/512/232/232443.png';
    })
    .catch(error => console.error('Error:', error));
}

// Función para ver los detalles del logro
function verDetalles(logroId) {
  window.location.href = `logro.html?logroId=${logroId}`;
}
