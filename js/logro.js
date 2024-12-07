const detalleLogro = document.getElementById('detalle-logro');
const params = new URLSearchParams(window.location.search);
const logroId = params.get('logroId');

if (!logroId) {
    console.error('logroId no está presente en la URL');
    detalleLogro.innerHTML = '<p>Error: No se ha especificado un logro.</p>';
} else {
    async function cargarLogro() {
        try {
            const respuesta = await fetch(`https://backend-production-4746.up.railway.app/logros/${logroId}`);
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
            <p><strong>Detalles:</strong> ${logro.detalles || 'No hay detalles disponibles'}</p>
            <button onclick="volverAtras()">Volver</button>
        `;
    }

    function volverAtras() {
        window.history.back();
    }

    cargarLogro();
}

