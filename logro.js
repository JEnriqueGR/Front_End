document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const logroId = urlParams.get("logroId");
    const detalle = document.getElementById("logro-detalle");

    fetch(`https://backend-production-4746.up.railway.app/api/logros/${logroId}`)
        .then(response => response.json())
        .then(logro => {
            detalle.innerHTML = `
                <h3>${logro.nombre}</h3>
                <p>${logro.descripcion}</p>
                <p>Dificultad: ${logro.dificultad}</p>
                <p>Estado: ${logro.estado ? "Completado" : "Pendiente"}</p>
                <button onclick="actualizarEstado(${logro.id}, ${!logro.estado})">
                    Marcar como ${logro.estado ? "Pendiente" : "Completado"}
                </button>
            `;
        });
});

function actualizarEstado(logroId, nuevoEstado) {
    fetch(`https://backend-production-4746.up.railway.app/api/logros/${logroId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(nuevoEstado),
    })
        .then(response => response.json())
        .then(() => location.reload());
}
