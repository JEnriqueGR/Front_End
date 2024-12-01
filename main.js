document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("juegos-container");

    fetch("http://localhost:8080/api/juegos")
        .then(response => response.json())
        .then(juegos => {
            juegos.forEach(juego => {
                const juegoCard = document.createElement("div");
                juegoCard.classList.add("juego-card");

                juegoCard.innerHTML = `
                    <div>
                        <h3>${juego.titulo}</h3>
                        <p>Plataformas: ${juego.plataforma}</p>
                    </div>
                    <button onclick="consultarLogros(${juego.id})">Consultar logros</button>
                `;

                container.appendChild(juegoCard);
            });
        });
});

function consultarLogros(juegoId) {
    window.location.href = `logros.html?juegoId=${juegoId}`;
}
