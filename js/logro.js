const detalleLogro = document.getElementById('detalle-logro');
const id = new URLSearchParams(window.location.search).get('id');  // Cambié 'logroId' por 'id'

async function cargarLogro() {
  try {
    const respuesta = await fetch(`https://backend-production-4746.up.railway.app/logros/${id}`);  // Cambié 'logroId' por 'id'
    if (!respuesta.ok) {
      throw new Error(`Error al obtener el logro: ${respuesta.status}`);
    }
    const logro = await respuesta.json();
    mostrarDetalleLogro(logro);
  } catch (error) {
    console.error(error);
    detalleLogro.innerHTML = `<p>Error al cargar el logro. Inténtalo más tarde.</p>`;
  }
}

function mostrarDetalleLogro(logro) {
  detalleLogro.innerHTML = `
    <h2>${logro.nombre}</h2>
    <img src="${logro.imagen}" alt="${logro.nombre}">
    <p><strong>Descripción:</strong> ${logro.descripcion}</p>
    <p><strong>Estado:</strong> ${logro.estado ? 'Completado' : 'Pendiente'}</p>
    <button onclick="volverAtras()">Volver</button>
  `;
}

function volverAtras() {
  window.history.back();
}

cargarLogro();
