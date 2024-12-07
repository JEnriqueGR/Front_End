// Obtener el ID del logro desde la URL
const params = new URLSearchParams(window.location.search);
const logroId = params.get('logroId');

// Obtener los detalles del logro desde el backend y mostrar en la página
fetch(`https://backend-production-4746.up.railway.app/logro/${logroId}`)
  .then(response => response.json())
  .then(logro => {
    // Crear el HTML para mostrar los detalles del logro
    const detalleLogroDiv = document.getElementById('detalle-logro');

    const logroHTML = `
        <img src="${logro.imagen}" alt="Imagen del logro">
        <h1>${logro.nombre}</h1>
        <p><strong>Descripción:</strong> ${logro.descripcion}</p>
        <p class="dificultad"><strong>Dificultad:</strong> ${logro.dificultad}</p>
        <div class="detalle"><strong>Detalles:</strong> ${logro.detalle}</div>
    `;

    // Insertar el contenido en el contenedor
    detalleLogroDiv.innerHTML = logroHTML;
  })
  .catch(error => console.error('Error al cargar el detalle del logro:', error));
