document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const juegoId = urlParams.get("juegoId");
    const container = document.getElementById("logros-container");
    const juegoTitulo = document.getElementById("juego-titulo");

    fetch(`https://backend-production-4746.up.railway.app/api/juegos/${juegoId}`)
        .then(response => response.json())
        .then(juego => {
            juegoTitulo.textContent = juego.titulo;
        });

    fetch(`https://backend-production-4746.up.railway.app/api/logros?juegoId=${juegoId}`)
        .then(response => response.json())
        .then(logros => {
            logros.forEach(logro => {
                const logroCard = document.createElement("div");
                logroCard.classList.add("logro-card");

                logroCard.innerHTML = `
                    <h3>${logro.nombre}</h3>
                    <p>${logro.descripcion}</p>
                    <p>Dificultad: ${logro.dificultad}</p>
                    <p>Estado: ${logro.estado ? "Completado" : "Pendiente"}</p>
                    <button onclick="verLogro(${logro.id})">Ver detalle</button>
                `;

                container.appendChild(logroCard);
            });
        });
});

function verLogro(logroId) {
    window.location.href = `logro.html?logroId=${logroId}`;
}
