window.onload = function () {
  const startButton = document.getElementById("start-button");

  let game;

  startButton.addEventListener("click", function () {
    game = new Game();
    
    game.startGame();

    //Placeholder & check
    console.log(
      `Vikings: ${game.vikings.map(v => v.id).join(", ")}, ` +
      `Saxons: ${game.saxons.map(s => s.id).join(", ")}`
    );
  });


};

