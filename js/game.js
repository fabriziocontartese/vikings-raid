class Game {
    constructor(difficulty, selectedVikings) {
        this.mainMenu = document.querySelector("#main-menu");
        this.gameScreen = document.querySelector("#game-screen");
        this.gameEndScreen = document.querySelector("#game-end");
        this.difficulty = difficulty;
        this.selectedVikings = selectedVikings;
        this.vikings = [];
        this.saxons = [];
        this.turn = 0;
        this.gameIsOver = false;
        this.selectedViking = null;
        this.vikingsThatAttacked = new Set();
        this.turnText = document.getElementById("turn-text");

    }


      

    selectDifficulty() {

    }

  startGame() {
    this.mainMenu.style.display = "none";
    this.gameScreen.style.display = "flex";

    if (this.difficulty === "easy") {
      this.addSoldiersEasy();
    } else if (this.difficulty === "medium") {
      this.addSoldiersMedium();
    } else if (this.difficulty === "hard") {
      this.addSoldiersHard();
    }

    this.startTurn();
    
    const backToMenuBtn = document.getElementById("back-to-menu");
    backToMenuBtn.addEventListener("click", () => {
        this.gameEndScreen.style.display = "none";
        this.mainMenu.style.display = "flex";
        location.reload();
    });
}
    
    startTurn() {
        // Turn change and reset values
        this.turn++;
        console.log(`It's day number ${this.turn} of the raid`);
        this.vikingsThatAttacked.clear();
        this.selectedViking = null;
        this.updateTurnText();
        this.highlightAvailableVikings();

    
        // Viking attack selection
        if (!this.vikingListenersBound) {
            this.vikings.forEach(viking => {
                viking.id.addEventListener('click', () => {
                    if (!this.vikingsThatAttacked.has(viking)) {
                        this.selectedViking = viking;
                        this.highlightAvailableVikings();
                    }
                });
        }); 
    
        this.saxons.forEach(saxon => {
            saxon.id.addEventListener('click', () => {
                if (this.selectedViking && !this.vikingsThatAttacked.has(this.selectedViking)) {
                    this.selectedViking.attack(saxon);
                    this.vikingsThatAttacked.add(this.selectedViking);
                    this.selectedViking = null;

                    this.highlightAvailableVikings();

                    if (this.vikingsThatAttacked.size === this.vikings.filter(v => v.health > 0).length) {
                        setTimeout(() => this.saxonsAttack(), 1000);
                    }
                }
            });
        });
    
        this.vikingListenersBound = true;

        } else {
            this.highlightAvailableVikings();
        }
    }
    
    highlightAvailableVikings() {
        // If no Viking is selected yet, show all available ones
        if (!this.selectedViking) {
            this.vikings.forEach(viking => {
                const isAlive = viking.health > 0;
                const hasAttacked = this.vikingsThatAttacked.has(viking);
    
                if (typeof viking.setReadyToAttack === 'function') {
                    viking.setReadyToAttack(isAlive && !hasAttacked);
                }
    
                if (isAlive && !hasAttacked) {
                    viking.id.classList.add("viking-active");
                } else {
                    viking.id.classList.remove("viking-active");
                }
            });
        } else {
            // A Viking is selected → only highlight that one
            this.vikings.forEach(viking => {
                if (viking === this.selectedViking) {
                    viking.id.classList.add("viking-active");
                } else {
                    viking.id.classList.remove("viking-active");
                }
            });
        }
    
        // Highlight Saxons if a Viking is selected and can attack
        this.saxons.forEach(saxon => {
            const isSaxonAlive = saxon.health > 0;
            const vikingCanAttack = this.selectedViking &&
                !this.vikingsThatAttacked.has(this.selectedViking);
    
            if (isSaxonAlive && vikingCanAttack) {
                saxon.id.classList.add("saxon-targetable");
            } else {
                saxon.id.classList.remove("saxon-targetable");
            }
        });
    }
    
    
    checkGameOver() {
        const allVikingsDead = this.vikings.every(v => v.health <= 0);
        const allSaxonsDead = this.saxons.every(s => s.health <= 0);
    
        if (allVikingsDead || allSaxonsDead) {
            this.gameScreen.style.display = "none";
            this.gameEndScreen.style.display = "flex";
    
            const gameEndContent = this.gameEndScreen.querySelector("#game-end-content");
            if (!gameEndContent) {
                console.error("Could not find #game-end-content");
                return true;
            }
    
            if (allVikingsDead) {
                gameEndContent.innerHTML = `
                    <h2>Saxons Win!</h2>
                    <p><strong>THE SAXONS HAVE DEFENDED THEIR VILLAGE</strong></p>
                    <p>Victory is theirs, at least this time...</p>
                `;
            } else if (allSaxonsDead) {
                gameEndContent.innerHTML = `
                    <h2>Vikings Win!</h2>
                    <p><strong>YOU HAVE RAIDED THE SAXON VILLAGE</strong></p>
                    <p>Try again next time, with a higher difficulty...</p>
                `;
            }
    
            return true;
        }
    
        return false;
    }
    
    
    

    // Saxon automated attack
    saxonsAttack() {
        const aliveVikings = () => this.vikings.filter(v => v.health > 0);
        const saxonsToAttack = this.saxons.filter(s => s.health > 0);
        let index = 0;
    
        const attackNext = () => {
            if (index >= saxonsToAttack.length || this.checkGameOver()) {
                if (!this.checkGameOver()) {
                    this.startTurn();
                }
                return;
            }
    
            const saxon = saxonsToAttack[index];
            const targets = aliveVikings();
            if (targets.length === 0) {
                this.checkGameOver();
                return;
            }
    
            const randomIndex = Math.floor(Math.random() * targets.length);
            const target = targets[randomIndex];
    
            saxon.attack(target);
            index++;
    
            setTimeout(attackNext, 1000);
        };
    
        attackNext();
    }
    
    

    updateTurnText() {
        this.turnText.innerText = `Turn: ${this.turn}`;
    }

    addSoldiersEasy() {
        const allStats = {
            "viking-one-select":  { name: "Erik", health: 10, strength: 5, image: "../images/Viking1.png"  },
            "viking-two-select":  { name: "Leif", health: 10, strength: 5, image: "../images/Viking2.png"  },
            "viking-three-select":{ name: "Bjorn", health: 10, strength: 5, image: "../images/Viking3.png"  },
            "viking-four-select": { name: "Ivar", health: 10, strength: 5, image: "../images/Viking4.png"  },
            "viking-five-select": { name: "Sigurd", health: 15, strength: 10, image: "../images/Viking5.png"  },
            "viking-six-select":  { name: "Harald", health: 15, strength: 10, image: "../images/Viking6.png"  },
            "viking-seven-select":{ name: "Ragnar", health: 5, strength: 20, image: "../images/Viking7.png"  },
            "viking-eight-select":{ name: "Ulrich", health: 20, strength: 5, image: "../images/Viking8.png"  },
            "kraken-select":{ name: "Kraken", health: 100, strength: 100, image: "../images/Kraken.png" }
        };
      
        const gameDomIds = ["viking-one", "viking-two", "viking-three", "viking-four"];
      
        this.selectedVikings.forEach((selectId, index) => {
          const stats = allStats[selectId];
          const gameId = gameDomIds[index];
      
          if (!stats) {
            console.error(`Missing stats for selected Viking: ${selectId}`);
            return;
          }
      
          const viking = new Viking(stats.name, stats.health, stats.strength, gameId, this);
          this.vikings.push(viking);

          const vikingElement = document.getElementById(gameId);
          vikingElement.style.backgroundImage = `url('${stats.image}')`;
        });
      
        const Saxon1 = new Saxon("Ben", 15, 5, "saxon-one", this);
        const Saxon2 = new Saxon("John", 15, 5, "saxon-two", this);
        const Saxon3 = new Saxon("Murray", 15, 5, "saxon-three", this);
        const Saxon4 = new Saxon("Abigail", 15, 5, "saxon-four", this);
      
        this.saxons.push(Saxon1, Saxon2, Saxon3, Saxon4);
      }
      

    addSoldiersMedium() {
    const allStats = {
        "viking-one-select":  { name: "Erik", health: 10, strength: 5, image: "../images/Viking1.png"  },
        "viking-two-select":  { name: "Leif", health: 10, strength: 5, image: "../images/Viking2.png"  },
        "viking-three-select":{ name: "Bjorn", health: 10, strength: 5, image: "../images/Viking3.png"  },
        "viking-four-select": { name: "Ivar", health: 10, strength: 5, image: "../images/Viking4.png"  },
        "viking-five-select": { name: "Sigurd", health: 15, strength: 10, image: "../images/Viking5.png"  },
        "viking-six-select":  { name: "Harald", health: 15, strength: 10, image: "../images/Viking6.png"  },
        "viking-seven-select":{ name: "Ragnar", health: 5, strength: 20, image: "../images/Viking7.png"  },
        "viking-eight-select":{ name: "Ulrich", health: 20, strength: 5, image: "../images/Viking8.png"  },
        "kraken-select":{ name: "Kraken", health: 100, strength: 100, image: "../images/Kraken.png" }
    };

    const gameDomIds = ["viking-one", "viking-two", "viking-three", "viking-four"];

    this.selectedVikings.forEach((selectId, index) => {
        const stats = allStats[selectId];
        const gameId = gameDomIds[index];

        if (!stats) {
        console.error(`Missing stats for selected Viking: ${selectId}`);
        return;
        }

        const viking = new Viking(stats.name, stats.health, stats.strength, gameId, this);
        this.vikings.push(viking);

        const vikingElement = document.getElementById(gameId);
        vikingElement.style.backgroundImage = `url('${stats.image}')`;
    });

    const Saxon1 = new Saxon("Charles", 20, 10, "saxon-one", this);
    const Saxon2 = new Saxon("John", 20, 5, "saxon-two", this);
    const Saxon3 = new Saxon("James", 20, 10, "saxon-three", this);
    const Saxon4 = new Saxon("Abigail", 20, 5, "saxon-four", this);

    this.saxons.push(Saxon1, Saxon2, Saxon3, Saxon4);
    }
      

    addSoldiersHard() {
        const allStats = {
          "viking-one-select":  { name: "Erik", health: 10, strength: 5, image: "../images/Viking1.png"  },
          "viking-two-select":  { name: "Leif", health: 10, strength: 5, image: "../images/Viking2.png"  },
          "viking-three-select":{ name: "Bjorn", health: 10, strength: 5, image: "../images/Viking3.png"  },
          "viking-four-select": { name: "Ivar", health: 10, strength: 5, image: "../images/Viking4.png"  },
          "viking-five-select": { name: "Sigurd", health: 15, strength: 10, image: "../images/Viking5.png"  },
          "viking-six-select":  { name: "Harald", health: 15, strength: 10, image: "../images/Viking6.png"  },
          "viking-seven-select":{ name: "Ragnar", health: 5, strength: 20, image: "../images/Viking7.png"  },
          "viking-eight-select":{ name: "Ulrich", health: 20, strength: 5, image: "../images/Viking8.png"  },
          "kraken-select":{ name: "Kraken", health: 100, strength: 100, image: "../images/Kraken.png" }
        };
      
        const gameDomIds = ["viking-one", "viking-two", "viking-three", "viking-four"];
      
        this.selectedVikings.forEach((selectId, index) => {
          const stats = allStats[selectId];
          const gameId = gameDomIds[index];
      
          if (!stats) {
            console.error(`Missing stats for selected Viking: ${selectId}`);
            return;
          }
      
          const viking = new Viking(stats.name, stats.health, stats.strength, gameId, this);
          this.vikings.push(viking);

          const vikingElement = document.getElementById(gameId);
          vikingElement.style.backgroundImage = `url('${stats.image}')`;
        });
      
        const Saxon1 = new Saxon("Charles", 20, 10, "saxon-one", this);
        const Saxon2 = new Saxon("Lancelot", 30, 5, "saxon-two", this);
        const Saxon3 = new Saxon("James", 20, 10, "saxon-three", this);
        const Saxon4 = new Saxon("Arthur", 30, 10, "saxon-four", this);
      
        this.saxons.push(Saxon1, Saxon2, Saxon3, Saxon4);
      }
      

}

