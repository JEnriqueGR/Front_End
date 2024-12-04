const params = new URLSearchParams(window.location.search);
const juegoId = params.get('juegoId');

fetch(`https://backend-production-4746.up.railway.app/logros/${juegoId}`)
  .then(response => response.json())
  .then(data => {
    const logrosLista = document.getElementById('logros-lista');
    data.forEach(logro => {
      const logroDiv = document.createElement('div');
      logroDiv.classList.add('logro');
      logroDiv.innerHTML = `
        <img src="${logro.imagen}" alt="${logro.nombre}" />
        <h3>${logro.nombre}</h3>
        <p>${logro.descripcion}</p>
        <button onclick="verDetalles(${logro.id})">Detalles</button>
      `;
      logrosLista.appendChild(logroDiv);
    });
  });

function verDetalles(logroId) {
  window.location.href = `logro.html?logroId=${logroId}`;
}
