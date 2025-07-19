window.onload = function () {
  const startButton = document.getElementById("start-button");

  let game;

  startButton.addEventListener("click", function () {
    game = new Game();
    
    game.startGame();
  });


};

