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

    //Boton Jugar
    startGameBtn.addEventListener("click", () => {
        menuScreen.style.display = "none"; // Ocultar el menú
        gameScreen.style.display = "block"; // Mostrar la pantalla del juego
        messageDisplay.textContent = "Ingresa tu nombre para empezar";
    });

    //Boton para iniciar el juego
    startBtn.addEventListener("click", () => {
        if (!playerName) {
            messageDisplay.textContent = "Ingresa tu nombre para jugar.";
            return;
        }
        resetGame(); // Reiniciar el juego antes de comenzar
        nextRound(); // Iniciar la primera ronda
    });


    //Boton para ver Puntajes
    viewScoresBtn.addEventListener("click", () => {
        menuScreen.style.display = "none"; // Ocultar el menú
        scoreScreen.style.display = "block"; // Mostrar la pantalla de puntajes
        updateScoreTable(); // Actualizar la tabla de puntajes
    });

    //Boton volver al menu desde los puntajes
    backToMenuBtn.addEventListener("click", () => {
        scoreScreen.style.display = "none"; // Ocultar pantalla de puntajes
        menuScreen.style.display = "flex"; // Mostrar el menú principal
    });

    //Boton para volver al menu desde el juego
    backToMenuGameBtn.addEventListener("click", () => {
        gameScreen.style.display = "none"; // Ocultar pantalla del juego
        menuScreen.style.display = "flex"; // Mostrar el menú principal
    });

    //Botones de colores
    buttons.forEach(button => {
        button.addEventListener("click", (event) => {
            const color = event.target.dataset.color;
            flashButton(color); // Resaltar el botón presionado
            playerSequence.push(color); // Guardar la secuencia ingresada por el jugador
            checkSequence(playerSequence.length - 1); // Verificar si la secuencia es correcta
        });
    });


    //Guarda el nombre del jugador
    saveNameBtn.addEventListener("click", () => {
        playerName = playerNameInput.value.trim(); // Guardar el nombre ingresado
        if (playerName) {
            messageDisplay.textContent = `¡Bienvenido, ${playerName}!`;
        } else {
            messageDisplay.textContent = "Por favor, ingresa tu nombre.";
        }
    });

    //Funcion para comenzar una nueva ronda
    function nextRound() {
        playerSequence = []; // Reiniciar la secuencia del jugador
        gameSequence.push(colors[Math.floor(Math.random() * colors.length)]); // Agregar un nuevo color a la secuencia
        scoreDisplay.textContent = `Puntaje: ${score}`; // Mostrar el puntaje actual
        playSequence(); // Reproducir la secuencia
    }

    // Funcion para mostrar la secuencia del juego
    function playSequence() {
        let i = 0;
        messageDisplay.textContent = "Observa la secuencia...";
    
        function showNext() {
            if (i >= gameSequence.length) {
                messageDisplay.textContent = "Tu turno!";
                return;
            }
            flashButton(gameSequence[i]); // Mostrar color actual
            setTimeout(() => {
                i++;
                showNext(); // Pasar al siguiente color
            }, levelSpeed); // Mantener velocidad fija
        }
        showNext();
    }

    //Funcion para resaltar el boton cuando se muestra en la secuencia
    function flashButton(color) {
        const button = document.getElementById(color);
        button.classList.add("active");
        setTimeout(() => button.classList.remove("active"), 500); // Quitar el efecto después de 500ms
    }

    // Función para verificar si el jugador sigue correctamente la secuencia
    function checkSequence(index) {
        if (playerSequence[index] !== gameSequence[index]) {
            messageDisplay.textContent = "¡Perdiste! Fin del juego.";
            saveHighScore(); // Guardar el puntaje en caso de récord
            resetGame(); // Reiniciar el juego
            return;
        }

        // Si el jugador completó la secuencia correctamente, pasa a la siguiente ronda
        if (playerSequence.length === gameSequence.length) {
            score++;
            setTimeout(nextRound, 1000); // Iniciar la siguiente ronda después de 1 segundo
        }
    }

    // Función para guardar el puntaje más alto en localStorage
    function saveHighScore() {
        if (playerName) {
            if (!highScores[playerName] || score > highScores[playerName]) {
                highScores[playerName] = score; // Guardar nuevo récord
                localStorage.setItem("highScores", JSON.stringify(highScores)); // Guardar en localStorage
            }
        }
        updateScoreTable(); // Actualizar la tabla de puntajes
    }

    // Función para reiniciar el juego cuando el jugador pierde
    function resetGame() {
        gameSequence = [];
        playerSequence = [];
        score = 0;
        scoreDisplay.textContent = "Puntaje: 0";
    }
    // Función para actualizar la tabla de puntajes
    function updateScoreTable() {
        scoreTableBody.innerHTML = ""; // Limpiar la tabla
        const sortedScores = Object.entries(highScores).sort((a, b) => b[1] - a[1]); // Ordenar de mayor a menor
        sortedScores.forEach(([name, score]) => {
            let row = <tr><td>${name}</td><td>${score}</td></tr>;
            scoreTableBody.innerHTML += row; // Agregar fila a la tabla
        });
    }

    // Cargar la tabla de puntajes al inicio
    updateScoreTable();
});