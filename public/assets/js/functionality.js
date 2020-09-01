// constructor function which can take in a series of values and create objects
// with the properties contained inside
function Character(name, strength, hitpoints) {
    this.name = name;
   
    this.strength = strength;
    this.hitpoints = hitpoints;
  }
    // method which prints all of the stats for a character
  Character.prototype.printStats = function() {
      console.log("Name: " + this.name +  "\nStrength: " +
      this.strength + "\nHitPoints: " + this.hitpoints);
      console.log("\n-------------\n");
  };
  
  // method which determines whether or not a character's "hitpoints" are less than zero
  // and returns true or false depending upon the outcome
  Character.prototype.isAlive = function() {
      if (this.hitpoints > 0) {
          console.log(this.name + " is still alive!");
          console.log("\n-------------\n");
          return true;
      }
      console.log(this.name + " has died!");
      return false;
  };
  
  // method which takes in a second object and decreases their "hitpoints" by this character's strength
  Character.prototype.attack = function(character2) {
      character2.hitpoints -= this.strength;
  };
  
  // method which increases this character's stats when called
  Character.prototype.levelUp = function() {
    
      this.strength += 5;
      this.hitpoints += 25;
  };
  
  
  // creates two unique characters using the "character" constructor
  const warrior = new Character("Crusher", 10, 75);
  const rogue = new Character("Dodger", 20, 50);
  
  warrior.printStats();
  rogue.printStats();
  
  rogue.attack(warrior);
  warrior.printStats();
  warrior.isAlive();
  
  rogue.levelUp();
  rogue.printStats();