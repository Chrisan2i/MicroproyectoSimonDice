document.addEventListener("DOMContentLoaded", () => {
    //Definimos los colores del juego
    const colors = ["red", "green", "blue", "yellow"];

    // Pantallas del juego
    const menuScreen = document.getElementById("menu-screen");
    const gameScreen = document.getElementById("game-screen");
    const scoreScreen = document.getElementById("score-screen");

    // Boton Jugar
    startGameBtn.addEventListener("click", () => {
        menuScreen.style.display = "none"; // Ocultar el menú
        gameScreen.style.display = "block"; // Mostrar la pantalla del juego
        messageDisplay.textContent = "Ingresa tu nombre para empezar";
    });

    // Boton para ver Puntajes
    viewScoresBtn.addEventListener("click", () => {
        menuScreen.style.display = "none"; // Ocultar el menú
        scoreScreen.style.display = "block"; // Mostrar la pantalla de puntajes
        updateScoreTable(); // Actualizar la tabla de puntajes
    });

    // Boton volver al menu desde los puntajes
    backToMenuBtn.addEventListener("click", () => {
        scoreScreen.style.display = "none"; // Ocultar pantalla de puntajes
        menuScreen.style.display = "flex"; // Mostrar el menú principal
    });

    //Boton para volver al menu desde el juego
    backToMenuGameBtn.addEventListener("click", () => {
        gameScreen.style.display = "none"; // Ocultar pantalla del juego
        menuScreen.style.display = "flex"; // Mostrar el menú principal
    });

    // Guarda el nombre del jugador
    saveNameBtn.addEventListener("click", () => {
        playerName = playerNameInput.value.trim(); // Guardar el nombre ingresado
        if (playerName) {
            messageDisplay.textContent = `¡Bienvenido, ${playerName}!`;
        } else {
            messageDisplay.textContent = "Por favor, ingresa tu nombre.";
        }
    });



});