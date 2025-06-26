// Soldier
class Soldier {

    constructor(health, strength) {
        this.health = health;
        this.strength = strength;
    }

    attack() {
        return this.strength
    }

    receiveDamage(damage) {
        this.health -= damage
    }

}

// Viking
class Viking extends Soldier{
    constructor(name, health, strength) {
        super(health, strength)
        this.name = name;
    }

    receiveDamage(damage) {
        this.health -= damage;
        if(this.health > 0) {
            return `${this.name} has received ${damage} points of damage`;
        } else {
            return `${this.name} has died in act of combat`;
        }
    }

    battleCry() {
        return "Odin Owns You All"
    }
}

// Saxon
class Saxon extends Soldier{

    constructor(health, strength) {
        super(health, strength)
    }

    receiveDamage(damage) {
        this.health -= damage;
        if(this.health > 0) {
            return `A Saxon has received ${damage} points of damage`;
        } else {
            return `A Saxon has died in of combat`;
        }
    }

}

// War
class War {

    constructor() {
        this.vikingArmy = [];
        this.saxonArmy = [];
    }

    addViking(Viking) {
        this.vikingArmy.push(Viking)
    }

    addSaxon(Saxon) {
        this.saxonArmy.push(Saxon)
    }

    vikingAttack() {
        
        if (this.saxonArmy.length === 0 || this.vikingArmy.length === 0) {
            return "No attack possible: One of the armies has been defeated.";
        }

        const randomSaxon = this.saxonArmy[Math.floor(Math.random() * this.saxonArmy.length)];
        const randomViking = this.vikingArmy[Math.floor(Math.random() * this.vikingArmy.length)];
    
        // Special Attack: battle cry

        if (Math.floor(Math.random() * 10) === 7 || Math.floor(Math.random() * 10) === 3) {
            const battleCry = randomViking.battleCry();
            console.log(`A scream saying "${battleCry}" is heard in the distance...`);
            randomSaxon.receiveDamage(10)
        }

        const result = randomSaxon.receiveDamage(randomViking.strength);


        if (randomSaxon.health <= 0) {
            this.saxonArmy = this.saxonArmy.filter(saxon => saxon.health > 0);
        }

        return result;
    }
    
    saxonAttack() {

        if (this.saxonArmy.length === 0 || this.vikingArmy.length === 0) {
            return "No attack possible: One of the armies has been defeated.";
        }

        const randomViking = this.vikingArmy[Math.floor(Math.random() * this.vikingArmy.length)];
        const randomSaxon = this.saxonArmy[Math.floor(Math.random() * this.saxonArmy.length)];
        const result = randomViking.receiveDamage(randomSaxon.strength);
    
        if (randomViking.health <= 0) {
            this.vikingArmy = this.vikingArmy.filter(saxon => saxon.health > 0);
        }
    
        return result;
    }

    showStatus() {
        if (this.saxonArmy.length ===0) {
            return "Vikings have won the war of the century!"
        } else if (this.vikingArmy.length === 0) {
            return "Saxons have fought for their lives and survived another day..."
        } else {
            const vikingSummary = this.vikingArmy.map(viking => `${viking.name}: ${viking.health} health`).join('\n');
            const saxonSummary = this.saxonArmy.map((saxon, i) => `Saxon ${i + 1}: ${saxon.health} health`).join('\n');

            return `Vikings and Saxons are still in the thick of battle\n\nVikings:\n${vikingSummary}\n\nSaxons:\n${saxonSummary}`;
        }
    }

}

const Viking1 = new Viking("Alex", 10, 5)
const Viking2 = new Viking("Mario", 10, 5)
const Viking3 = new Viking("John", 10, 5)
const Viking4 = new Viking("Jane", 10, 5)
const Viking5 = new Viking("Serpent", 10, 5)
const Viking6 = new Viking("Koala", 10, 5)
const Viking7 = new Viking("Arr", 10, 5)
const Viking8 = new Viking("Excel", 10, 5)
const Viking9 = new Viking("Max", 10, 5)
const Viking10 = new Viking("Mati", 10, 5)

const Saxon1 = new Saxon(10, 5)
const Saxon2 = new Saxon(10, 5)
const Saxon3 = new Saxon(10, 10) 
const Saxon4 = new Saxon(10, 5)
const Saxon5 = new Saxon(10, 5)
const Saxon6 = new Saxon(10, 10)
const Saxon7 = new Saxon(10, 5)
const Saxon8 = new Saxon(10, 5)
const Saxon9 = new Saxon(10, 10)
const Saxon10 = new Saxon(10, 5)

const firstWar = new War()

firstWar.addViking(Viking1)
firstWar.addViking(Viking2)
firstWar.addViking(Viking3)
firstWar.addViking(Viking4)
firstWar.addViking(Viking5)
firstWar.addViking(Viking6)
firstWar.addViking(Viking7)
firstWar.addViking(Viking8)
firstWar.addViking(Viking9)
firstWar.addViking(Viking10)

firstWar.addSaxon(Saxon1)
firstWar.addSaxon(Saxon2)
firstWar.addSaxon(Saxon3)
firstWar.addSaxon(Saxon4)
firstWar.addSaxon(Saxon5)
firstWar.addSaxon(Saxon6)
firstWar.addSaxon(Saxon7)
firstWar.addSaxon(Saxon8)
firstWar.addSaxon(Saxon9)
firstWar.addSaxon(Saxon10)

console.log(firstWar.vikingArmy)

console.log(firstWar.saxonArmy)


firstWar.vikingAttack()
firstWar.saxonAttack()

firstWar.vikingAttack()
firstWar.saxonAttack()

firstWar.vikingAttack()
firstWar.saxonAttack()

firstWar.vikingAttack()
firstWar.saxonAttack()

firstWar.vikingAttack()
firstWar.saxonAttack()

firstWar.vikingAttack()
firstWar.saxonAttack()

firstWar.vikingAttack()
firstWar.saxonAttack()

firstWar.vikingAttack()
firstWar.saxonAttack()

firstWar.vikingAttack()
firstWar.saxonAttack()

firstWar.vikingAttack()
firstWar.vikingAttack()
firstWar.vikingAttack()
firstWar.vikingAttack()


console.log(firstWar.showStatus())