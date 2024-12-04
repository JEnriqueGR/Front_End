const detalleLogro = document.getElementById('detalle-logro');
const logroId = new URLSearchParams(window.location.search).get('logroId');

async function cargarLogro() {
  const respuesta = await fetch(`http://localhost:8080/api/logros/${logroId}`);
  const logro = await respuesta.json();
  mostrarDetalleLogro(logro);
}

function mostrarDetalleLogro(logro) {
  detalleLogro.innerHTML = `
    <h2>${logro.nombre}</h2>
    <img src="${logro.estado ? 'img/completado.png' : 'img/pendiente.png'}" alt="${logro.estado ? 'Completado' : 'Pendiente'}">
    <p><strong>Descripción:</strong> ${logro.descripcion}</p>
    <p><strong>Estado:</strong> ${logro.estado ? 'Completado' : 'Pendiente'}</p>
    <button onclick="volverAtras()">Volver</button>
  `;
}

function volverAtras() {
  window.history.back();
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
  
cargarLogro();
