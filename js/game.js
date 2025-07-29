class Game {
    constructor(difficulty) {
        this.mainMenu = document.querySelector("#main-menu");
        this.gameScreen = document.querySelector("#game-screen");
        this.gameEndScreen = document.querySelector("#game-end");
        this.difficulty = difficulty;
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
        const Viking1 = new Viking("Erik", 10, 5, "viking-one", this);
        const Viking2 = new Viking("Leif", 10, 5, "viking-two", this);
        const Viking3 = new Viking("Bjorn", 10, 5, "viking-three", this);
        const Viking4 = new Viking("Ivar", 10, 5, "viking-four", this);
       // const Viking5 = new Viking("Viking5", 15, 10, "viking-five", this);
       // const Viking6 = new Viking("Viking6", 15, 10, "viking-six", this);
       // const Viking7 = new Viking("Viking7", 5, 20, "viking-seven", this);
       // const Viking8 = new Viking("Viking8", 20, 5, "viking-eight", this);
    
        const Saxon1 = new Saxon("Ben", 10, 5, "saxon-one", this);
        const Saxon2 = new Saxon("John", 15, 5, "saxon-two", this);
        const Saxon3 = new Saxon("Murray", 10, 5, "saxon-three", this);
        const Saxon4 = new Saxon("Abigail", 15, 5, "saxon-four", this);
       // const Saxon5 = new Saxon("Saxon5", 15, 10, "saxon-five", this);
       // const Saxon6 = new Saxon("Saxon6", 15, 10, "saxon-six", this);
       // const Saxon7 = new Saxon("Saxon7", 20, 5, "saxon-seven", this);
       // const Saxon8 = new Saxon("Saxon8", 20, 5, "saxon-eight", this);
        
        
        this.vikings.push(Viking1, Viking2, Viking3, Viking4);
        this.saxons.push(Saxon1, Saxon2, Saxon3, Saxon4);
    }

    addSoldiersMedium() {
        const Viking1 = new Viking("Erik", 10, 5, "viking-one", this);
        const Viking2 = new Viking("Leif", 10, 5, "viking-two", this);
        const Viking3 = new Viking("Bjorn", 10, 5, "viking-three", this);
        const Viking4 = new Viking("Ivar", 10, 5, "viking-four", this);
       // const Viking5 = new Viking("Viking5", 15, 10, "viking-five", this);
       // const Viking6 = new Viking("Viking6", 15, 10, "viking-six", this);
       // const Viking7 = new Viking("Viking7", 5, 20, "viking-seven", this);
       // const Viking8 = new Viking("Viking8", 20, 5, "viking-eight", this);
    
        const Saxon1 = new Saxon("Charles", 15, 10, "saxon-one", this);
        const Saxon2 = new Saxon("John", 15, 5, "saxon-two", this);
        const Saxon3 = new Saxon("James", 15, 10, "saxon-three", this);
        const Saxon4 = new Saxon("Abigail", 15, 5, "saxon-four", this);
        
        
        this.vikings.push(Viking1, Viking2, Viking3, Viking4);
        this.saxons.push(Saxon1, Saxon2, Saxon3, Saxon4);
    }

    addSoldiersHard() {
        const Viking1 = new Viking("Erik", 10, 5, "viking-one", this);
        const Viking2 = new Viking("Leif", 10, 5, "viking-two", this);
        const Viking3 = new Viking("Bjorn", 10, 5, "viking-three", this);
        const Viking4 = new Viking("Ivar", 10, 5, "viking-four", this);
    
        const Saxon1 = new Saxon("Charles", 15, 10, "saxon-one", this);
        const Saxon2 = new Saxon("Lancelot", 20, 5, "saxon-two", this);
        const Saxon3 = new Saxon("James", 15, 10, "saxon-three", this);
        const Saxon4 = new Saxon("Arthur", 20, 10, "saxon-four", this);
        
        
        this.vikings.push(Viking1, Viking2, Viking3, Viking4);
        this.saxons.push(Saxon1, Saxon2, Saxon3, Saxon4);
    }

}


/*     addSoldiersEasy() {
        const Viking1 = new Viking("Erik", 10, 5, "viking-one", this);
        const Viking2 = new Viking("Leif", 10, 5, "viking-two", this);
        const Viking3 = new Viking("Bjorn", 10, 5, "viking-three", this);
        const Viking4 = new Viking("Ivar", 10, 5, "viking-four", this);
       // const Viking5 = new Viking("Sigurd", 15, 10, "viking-five", this);
       // const Viking6 = new Viking("Harald", 15, 10, "viking-six", this);
       // const Viking7 = new Viking("Ragnar", 5, 20, "viking-seven", this);
       // const Viking8 = new Viking("Ulrich", 20, 5, "viking-eight", this);
    
        const Saxon1 = new Saxon("Ben", 10, 5, "saxon-one", this);
        const Saxon2 = new Saxon("Murray", 10, 5, "saxon-two", this);
        const Saxon3 = new Saxon("Steve", 15, 5, "saxon-three", this);
        const Saxon4 = new Saxon("Carol", 15, 5, "saxon-four", this);
       // const Saxon5 = new Saxon("John", 15, 10, "saxon-five", this);
       // const Saxon6 = new Saxon("Abigail", 15, 10, "saxon-six", this);
       // const Saxon7 = new Saxon("Lancelot", 10, 20, "saxon-seven", this);
       // const Saxon8 = new Saxon("Arthur", 20, 10, "saxon-eight", this);
        
        
        this.vikings.push(Viking1, Viking2, Viking3, Viking4);
        this.saxons.push(Saxon1, Saxon2, Saxon3, Saxon4);
    }
*/