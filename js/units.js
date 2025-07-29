class Soldier {
    constructor(name, health, strength, elementId, game) {
        this.name = name;
        this.health = health;
        this.strength = strength;
        this.game = game;
        this.id = document.getElementById(elementId);
    
        this.id.style.position = "absolute";
    
        const computedStyles = window.getComputedStyle(this.id);
        this.originalTop = parseInt(computedStyles.top, 10);
        this.originalLeft = parseInt(computedStyles.left, 10);
    
        this.id.style.top = `${this.originalTop}px`;
        this.id.style.left = `${this.originalLeft}px`;

        this.statsDiv = document.createElement('div');
        this.statsDiv.style.position = "absolute";
        this.statsDiv.style.top = "110%";
        this.statsDiv.style.left = "0";
        this.statsDiv.style.width = "100%";
        this.statsDiv.style.fontSize = "12px";
        this.statsDiv.style.color = "white";
        this.statsDiv.style.textAlign = "center";
        this.statsDiv.style.pointerEvents = "none"; // allow clicks to pass through
        
        this.id.appendChild(this.statsDiv);
        this.updateStats();
    
    }
    
    updateStats() {
        this.statsDiv.innerText = `❤️ ${this.health} | ⚔️ ${this.strength}`;
    }
    

    receiveDamage(damage) {
        this.health -= damage;
        if (this.health <= 0) {
            this.id.style.opacity = 0.5;
            this.id.style.pointerEvents = "none";
        }
        this.updateStats();
    }
    

    moveTo(x, y) {
        this.id.style.left = `${x}px`;
        this.id.style.top = `${y}px`;
    }

    returnToOriginalPosition() {
        this.moveTo(this.originalLeft, this.originalTop);
    }

    attack(enemy) {
        const enemyTop = parseInt(enemy.id.style.top, 10);
        const enemyLeft = parseInt(enemy.id.style.left, 10);
    
        const offsetX = this instanceof Viking ? -80 : 80;
        const offsetY = 0;
    
        const attackerX = enemyLeft + offsetX;
        const attackerY = enemyTop + offsetY;
    
        this.moveTo(attackerX, attackerY);
        enemy.moveTo(enemyLeft, enemyTop);
    
        setTimeout(() => {
            console.log(`${this.name} attacks ${enemy.name}`);
            enemy.receiveDamage(this.strength);
    
            setTimeout(() => {
                this.returnToOriginalPosition();
                enemy.returnToOriginalPosition();
    
                this.game.checkGameOver();


            }, 300);
        }, 300);
    }
    
    
}


// Vikings
class Viking extends Soldier{
    constructor(name, health, strength, id, game) {
        super(name, health, strength, id, game)

    }
    
}

// Saxons
class Saxon extends Soldier{

    constructor(name, health, strength, id, game) {
        super(name, health, strength, id, game)
    }

}