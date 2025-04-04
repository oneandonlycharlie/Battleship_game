
class Ship{

     constructor(
          name, 
          length,
          hitReceived=0, 
          isActive=true,
          cordinates = []
     ){
          this.name = name,
          this.length = length,
          this.hitReceived = hitReceived,
          this.isActive = isActive,
          this.cordinates = cordinates
     }

     hit(){
          this.hitReceived++
          return this.hitReceived
     }

     isSunk(){
          if (this.hitReceived >= this.length) {
               this.isActive = false
          };
          return !this.isActive
     }

     setCordinate(num){
          let cordinate = null;
          for (let i = 0; i < this.length; i++){
               cordinate = num+i;
               this.cordinates.push(cordinate);
          }
          return this.cordinates
     }
}


/* Gameboard has a placeship()function to connect cordinate with ships */

class Gameboard {

     constructor(
          shipLocations = [],
          assets = [],
          missedLocations = [],
          missedAttacks = 0
     ){
          this.shipLocations = shipLocations,
          this.assets = assets,
          this.missedLocations = missedLocations,
          this.missedAttacks = missedAttacks
     }

     
     placeShip(name,length, num){
          let newShip = new Ship(name,length);
          this.assets.push(newShip);
          let coridantes = newShip.setCordinate(num);
          this.shipLocations.push(coridantes);
          return newShip
     }

     receiveAttack(num){
          let targetShip = this.assets.find((ship) => ship.cordinates.includes(num));
          if (targetShip){
               targetShip.hit();
               return true
          } else {
               this.recordMissShot(num);
               return false
          }
     }

     recordMissShot(num){
          let cordinate = num;
          this.missedLocations.push(cordinate);
          this.missedAttacks++;
          return this.missedAttacks
     }

     allSunk(){
          return this.assets.every(ship => ship.isSunk())
     }

     allSafe(){
          return this.assets.every(ship => ship.isActive)
     }

}

class Player {

     constructor(name, type="computer"){
          this.name = name;
          this.gameboard = new Gameboard;
          this.type = type;
     }
}

export {Ship, Gameboard, Player}