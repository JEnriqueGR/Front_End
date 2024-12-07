const detalleLogro = document.getElementById('detalle-logro');

// Obtener el logroId de la URL
const logroId = new URLSearchParams(window.location.search).get('logroId');

// Función para cargar el detalle del logro
async function cargarLogro() {
    if (!logroId) {
        detalleLogro.innerHTML = `<p>No se ha proporcionado un ID de logro válido.</p>`;
        return;
    }

    try {
        // Realizar la solicitud al backend con el logroId
        const respuesta = await fetch(`https://backend-production-4746.up.railway.app/logros/${logroId}`);
        if (!respuesta.ok) {
            throw new Error(`Error al obtener el logro: ${respuesta.status}`);
        }
        // Convertir la respuesta en formato JSON
        const logro = await respuesta.json();
        // Mostrar el detalle del logro
        mostrarDetalleLogro(logro);
    } catch (error) {
        console.error(error);
        detalleLogro.innerHTML = `<p>Error al cargar el logro. Inténtalo más tarde.</p>`;
    }
}

// Función para mostrar los detalles del logro en la página
function mostrarDetalleLogro(logro) {
    detalleLogro.innerHTML = `
        <h2>${logro.nombre}</h2>
        <img src="${logro.imagen}" alt="${logro.nombre}">
        <p><strong>Descripción:</strong> ${logro.descripcion}</p>
        <p><strong>Estado:</strong> ${logro.estado ? 'Completado' : 'Pendiente'}</p>
        <p><strong>Detalles:</strong> ${logro.detalle || 'No hay detalles disponibles'}</p> <!-- Usar "detalle" -->
        <button onclick="volverAtras()">Volver</button>
    `;
}

// Función para volver a la página anterior
function volverAtras() {
    window.history.back();
}

// Cargar el logro
cargarLogro();
