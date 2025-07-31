window.onload = function () {
  const startButton = document.getElementById("start-button");
  const settingsScreen = document.getElementById("settings-screen");
  const vikingSelector = document.getElementById("viking-selector");
  const vikingsAvailable = document.querySelectorAll(".viking-select");
  const difficultySelector = document.getElementById("difficulty-selector");
  const mainMenu = document.getElementById("main-menu");
  const difficultyButtons = document.querySelectorAll(".difficulty-button");

  let selectedDifficulty = null;
  let game;
  let selectedVikings = [];

  // Stats for each selectable Viking
  const stats = {
    "viking-one-select":  { health: 10, strength: 5 },
    "viking-two-select":  { health: 10, strength: 5 },
    "viking-three-select":{ health: 10, strength: 5 },
    "viking-four-select": { health: 10, strength: 5 },
    "viking-five-select": { health: 15, strength: 10 },
    "viking-six-select":  { health: 15, strength: 10 },
    "viking-seven-select":{ health: 5, strength: 20 },
    "viking-eight-select":{ health: 20, strength: 5 }
  };

  // Setup stats display and click handler for each viking on the ship
  vikingsAvailable.forEach(viking => {
    // Add stats display below Viking
    const info = stats[viking.id];
    if (info) {
      const statDiv = document.createElement('div');
      statDiv.innerText = `❤️ ${info.health} | ⚔️ ${info.strength}`;
      statDiv.style.position = "absolute";
      statDiv.style.top = "110%";
      statDiv.style.left = "0";
      statDiv.style.width = "100%";
      statDiv.style.fontSize = "6px";
      statDiv.style.color = "white";
      statDiv.style.textAlign = "center";
      statDiv.style.pointerEvents = "none";
      statDiv.style.textShadow = "1px 1px 2px black";
      statDiv.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
      statDiv.style.borderRadius = "4px";
      statDiv.style.padding = "2px";
      viking.appendChild(statDiv);
    }

    // On click: select Viking
    viking.addEventListener("click", () => {
      if (selectedVikings.length < 4 && !viking.classList.contains("selected")) {
        viking.classList.add("selected");
        viking.classList.add("viking-active"); // gold glow
        selectedVikings.push(viking.id);

        // Disable further clicks
        viking.style.pointerEvents = "none";

        if (selectedVikings.length === 4) {
          difficultySelector.style.display = "block";
        }
      }
    });
  });

  // Clicking "Start Game" shows settings screen
  startButton.addEventListener("click", function () {
    mainMenu.style.display = "none";
    settingsScreen.style.display = "flex";
  });

  // Clicking difficulty starts the game
  difficultyButtons.forEach(button => {
    button.addEventListener("click", () => {
      selectedDifficulty = button.getAttribute("data-difficulty");
      game = new Game(selectedDifficulty, selectedVikings);
      settingsScreen.style.display = "none";
      game.startGame();
    });
  });
};
