// Obtener el ID del logro desde la URL
const params = new URLSearchParams(window.location.search);
const logroId = params.get('logroId');

// Validar que logroId esté presente en la URL
if (!logroId) {
    document.getElementById('detalle-logro').innerHTML = `
        <p>Error: No se especificó un logro válido.</p>
    `;
    throw new Error("Logro ID no especificado.");
}

// Obtener los detalles del logro desde el backend y mostrar en la página
fetch(`https://backend-production-4746.up.railway.app/logros/logro/${logroId}`)
    .then(response => {
        if (!response.ok) {
            throw new Error("Error al obtener los detalles del logro.");
        }
        return response.json();
    })
    .then(logro => {
        const detalleLogroDiv = document.getElementById('detalle-logro');

        const logroHTML = `
            <img src="${logro.imagen}" alt="Imagen del logro" class="logro-imagen">
            <h1 class="logro-nombre">${logro.nombre}</h1>
            <p><strong>Descripción:</strong> ${logro.descripcion}</p>
            <p class="dificultad"><strong>Dificultad:</strong> ${logro.dificultad}</p>
            <div class="detalle"><strong>Detalles:</strong> ${logro.detalle}</div>
        `;

        detalleLogroDiv.innerHTML = logroHTML;
    })
    .catch(error => {
        console.error('Error al cargar el detalle del logro:', error);
        document.getElementById('detalle-logro').innerHTML = `
            <p>Error al cargar el detalle del logro. Por favor, inténtalo de nuevo más tarde.</p>
        `;
    });
