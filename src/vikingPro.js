/*
    1. Use prompts and alerts to start the game by asking users:
        - How many Vikings have sailed on this raid?
        - How many Saxons have come to defend their land?

    2. Make the game continue until one army has won (Turns = Days)

    3. Tell the user what happened each turn and how the armies are looking. Prompt them to start the next turn.

*/


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
            return `A Saxon has died in combat`;
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
        
    const randomSaxon = this.saxonArmy[Math.floor(Math.random() * this.saxonArmy.length)];
    const randomViking = this.vikingArmy[Math.floor(Math.random() * this.vikingArmy.length)];

    let totalDamage = randomViking.strength;
    let message = "";

    // Special Attack: battle cry
    if (Math.floor(Math.random() * 10) === 7 || Math.floor(Math.random() * 10) === 3) {
        totalDamage += 10;
        const battleCry = randomViking.battleCry();
        message += `"${battleCry}" screams ${randomViking.name}... They have activated Battle Cry for this turn.\n`;
    }

    const result = randomSaxon.receiveDamage(totalDamage);

    if (randomSaxon.health <= 0) {
        this.saxonArmy = this.saxonArmy.filter(saxon => saxon.health > 0);
    }

    return message + result;
}
    
    saxonAttack() {

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
            return "Vikings have defeated the defenders and successfully raided this area!"
        } else if (this.vikingArmy.length === 0) {
            return "Saxons have fought for their lives defeated the Viking raiders..."
        } else {
            const vikingSummary = this.vikingArmy.map(viking => `${viking.name}: ${viking.health} health`).join('\n');
            const saxonSummary = this.saxonArmy.map((saxon, i) => `Saxon ${i + 1}: ${saxon.health} health`).join('\n');

            return `Vikings and Saxons are still in the thick of battle\n\nVikings:\n${vikingSummary}\n\nSaxons:\n${saxonSummary}`;
        }
    }


    startWar() {

        const vikingArmySize = prompt("How many Vikings have sailed on this raid?");
        alert("Great. " + vikingArmySize + " angry Vikings have sailed to British shores...");
        const saxonArmySize = prompt("How many Saxons have come to defend their land?")
        alert("Excellent. " + saxonArmySize + " brave Saxons are waiting for them at the beach.");

    }
    

}

function runWar() {
    const war = new War();

    const numVikings = Number(prompt("How many Vikings are joining the war?"));

    const vikingNames = [
        "Ragnar", "Bjorn", "Lagertha", "Ivar", "Floki", "Harald",
        "Leif", "Sigurd", "Torvi", "Ubbe", "Erik", "Sigrid",
        "Thora", "Knut", "Astrid", "Gunnar", "Freydis", "Hilda",
        "Rollo", "Skadi", "Arne", "Ingrid", "Sven", "Brynhild",
        "Einar", "Jorunn", "Hakon", "Torstein", "Yrsa", "Olaf"
      ];
    
    for (let i = 0; i < numVikings; i++) {
        const randomName = vikingNames[Math.floor(Math.random() * vikingNames.length)];
        war.addViking(new Viking(randomName, 10, 5));
    }

    alert(`Great. ` + numVikings + ` angry Vikings have sailed to British shores...`);

    const numSaxons = Number(prompt("How many Saxons are defending the land?"));
    for (let i = 0; i < numSaxons; i++) {
        war.addSaxon(new Saxon(10, 5));
    }

    alert("Excellent. " + numSaxons + " brave Saxons are waiting for them at the beach.");

    let day = 1;
    while (war.vikingArmy.length > 0 && war.saxonArmy.length > 0) {
        alert(`--- Day ${day} ---`);

        const vikingResult = war.vikingAttack();
        if (vikingResult) alert(vikingResult);

        if (war.saxonArmy.length === 0) break;

        const saxonResult = war.saxonAttack();
        if (saxonResult) alert(saxonResult);

        alert(war.showStatus());
        day++;
    }

    alert(war.showStatus());
}