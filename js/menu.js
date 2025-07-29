window.onload = function () {
  const startButton = document.getElementById("start-button");
  const difficultyScreen = document.getElementById("settings-screen");
  const mainMenu = document.getElementById("main-menu");
  const difficultyButtons = document.querySelectorAll(".difficulty-button");

  let selectedDifficulty = null;
  let game;

  // Clicking "Start Game" first shows difficulty screen
  startButton.addEventListener("click", function () {
    mainMenu.style.display = "none";
    difficultyScreen.style.display = "flex";
  });

  // Clicking on a difficulty starts the actual game
  difficultyButtons.forEach(button => {
    button.addEventListener("click", () => {
      selectedDifficulty = button.getAttribute("data-difficulty");
      game = new Game(selectedDifficulty);
      difficultyScreen.style.display = "none";
      game.startGame();
    });
  });
};
