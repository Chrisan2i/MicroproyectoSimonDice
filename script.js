document.addEventListener("DOMContentLoaded", () => {

    //Definimos los colores del juego
    const colors = ["red", "green", "blue", "yellow"];

    // Variables del juego
    let gameSequence = []; // Secuencia generada por el juego
    let playerSequence = []; // Secuencia ingresada por el jugador
    let score = 0; // Puntuación del jugador
    let levelSpeed = 1000; // Velocidad fija (1 segundo por color)
    let playerName = ""; // Nombre del jugador
    let highScores = JSON.parse(localStorage.getItem("highScores")) || {}; // Carga los puntajes almacenados en localStorage

    // Pantallas del juego
    const menuScreen = document.getElementById("menu-screen");
    const gameScreen = document.getElementById("game-screen");
    const scoreScreen = document.getElementById("score-screen");

    // Botones del menú principal
    const startGameBtn = document.getElementById("start-game-btn");
    const viewScoresBtn = document.getElementById("view-scores-btn");
    const backToMenuBtn = document.getElementById("back-to-menu");
    const backToMenuGameBtn = document.getElementById("back-to-menu-game");

    // Elementos del juego
    const buttons = document.querySelectorAll(".color-btn"); // Botones de colores
    const startBtn = document.getElementById("start-btn"); // Botón para iniciar el juego
    const saveNameBtn = document.getElementById("save-name"); // Botón para guardar el nombre del jugador
    const playerNameInput = document.getElementById("player-name"); // Campo de texto para el nombre
    const scoreDisplay = document.getElementById("score"); // Mostrar puntaje
    const highScoreDisplay = document.getElementById("high-score"); // Mejor puntaje
    const messageDisplay = document.getElementById("message"); // Mensajes del juego
    const scoreTableBody = document.querySelector("#score-table tbody"); // Tabla de puntajes

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

    // Boton para volver al menu desde el juego
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