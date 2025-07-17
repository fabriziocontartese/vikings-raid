class Soldier {
    constructor(name, health, strength, elementId) {
        this.name = name;
        this.health = health;
        this.strength = strength;
        this.id = document.getElementById(elementId);
    }

    receiveDamage(damage) {
        this.health -= damage;
        if (this.health <= 0) {
            this.id.style.opacity = 0.5; // Visual cue for dead
            this.id.style.pointerEvents = "none";
        }
    }

    attack(enemy) {
        console.log(`${this.name} attacks ${enemy.name}`);
        enemy.receiveDamage(this.strength);
    
        // Only call if game instance exists
        if (typeof game !== "undefined" && !game.gameIsOver) {
            game.checkGameOver();
        }
    }
    
}


// Vikings
class Viking extends Soldier{
    constructor(name, health, strength, id) {
        super(name, health, strength, id)

    }
    
}

    /*
    class VikingMelee extends Viking {

        constructor( ) {
            super()

        }
    }

    class VikingArcher extends Viking {

        constructor( ) {
            super()
            
        }
    }

    class VikingHero extends Viking {

        constructor( ) {
            super()
            
        }
    }


    */


// Saxons
class Saxon extends Soldier{

    constructor(name, health, strength, id) {
        super(name, health, strength, id)
    }

}



    /*
    class SaxonMelee extends Viking {

        constructor( ) {
            super()
            
        }
    }

    class SaxonArcher extends Viking {

        constructor( ) {
        super()
            
        }
    }


    */



    // Hard-coded soldiers

    const Viking1 = new Viking("Viking1", 10, 5, "viking-one")
    const Viking2 = new Viking("Viking2", 10, 5, "viking-two")
    const Viking3 = new Viking("Viking3", 10, 5, "viking-three")
    const Viking4 = new Viking("Viking4", 10, 5, "viking-four")


    const Saxon1 = new Saxon("Saxon1", 20, 5, "saxon-one")
    const Saxon2 = new Saxon("Saxon2", 10, 5, "saxon-two")
    const Saxon3 = new Saxon("Saxon2", 10, 5, "saxon-three")
    const Saxon4 = new Saxon("Saxon4", 10, 5, "saxon-four")


