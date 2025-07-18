class Game {
    constructor() {
        this.mainMenu = document.querySelector("#main-menu");
        this.gameScreen = document.querySelector("#game-screen");
        this.gameEndScreen = document.querySelector("#game-end");
        this.vikings = [];
        this.saxons = [];
        this.turn = 0;
        this.gameIsOver = false;
        this.selectedViking = null;
        this.vikingsThatAttacked = new Set();
        this.turnText = document.getElementById("turn-text");
    }

    startGame() {
        this.mainMenu.style.display = "none";
        this.gameScreen.style.display = "flex";
        this.addSoldiers();
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
    
    
    
    

    // Saxon automated attack
    saxonsAttack() {
        const aliveVikings = () => this.vikings.filter(v => v.health > 0);
        const saxonsToAttack = this.saxons.filter(s => s.health > 0);
        let index = 0;

        const checkGameOver = () => {
            const allVikingsDead = this.vikings.every(v => v.health <= 0);
            const allSaxonsDead = this.saxons.every(s => s.health <= 0);
            if (allVikingsDead || allSaxonsDead) {
                this.gameScreen.style.display = "none";
                this.gameEndScreen.style.display = "flex";
                return true;
            }
            return false;
        };

        const attackNext = () => {
            if (index >= saxonsToAttack.length || checkGameOver()) {
                if (!checkGameOver()) {
                    this.startTurn();
                }
                return;
            }

            const saxon = saxonsToAttack[index];
            const targets = aliveVikings();
            if (targets.length === 0) {
                checkGameOver();
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
    

    addSoldiers() {
        this.vikings.push(Viking1, Viking2, Viking3, Viking4);
        this.saxons.push(Saxon1, Saxon2, Saxon3, Saxon4);
    }
}