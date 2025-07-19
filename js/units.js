class Soldier {
    constructor(name, health, strength, elementId) {
        this.name = name;
        this.health = health;
        this.strength = strength;
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
    
                // ✅ GAME OVER CHECK
                const allVikingsDead = [Viking1, Viking2, Viking3, Viking4].every(v => v.health <= 0);
                const allSaxonsDead = [Saxon1, Saxon2, Saxon3, Saxon4].every(s => s.health <= 0);
                if (allVikingsDead || allSaxonsDead) {
                    document.getElementById("game-screen").style.display = "none";
                    document.getElementById("game-end").style.display = "flex";
                }
            }, 300);
        }, 300);
    }
    
    
}


// Vikings
class Viking extends Soldier{
    constructor(name, health, strength, id) {
        super(name, health, strength, id)

    }
    
}

// Saxons
class Saxon extends Soldier{

    constructor(name, health, strength, id) {
        super(name, health, strength, id)
    }

}


    // Hard-coded soldiers

    const Viking1 = new Viking("Viking1", 10, 5, "viking-one")
    const Viking2 = new Viking("Viking2", 10, 5, "viking-two")
    const Viking3 = new Viking("Viking3", 10, 5, "viking-three")
    const Viking4 = new Viking("Viking4", 10, 5, "viking-four")


    const Saxon1 = new Saxon("Saxon1", 20, 5, "saxon-one")
    const Saxon2 = new Saxon("Saxon2", 10, 5, "saxon-two")
    const Saxon3 = new Saxon("Saxon2", 10, 5, "saxon-three")
    const Saxon4 = new Saxon("Saxon4", 10, 5, "saxon-four")


