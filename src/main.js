import  {Player} from "./classConstructor.js"
import {shipListLeft,shipListRight,
        leftGrid, rightGrid,
        shipContainerLeft,shipContainerRight,
        retireShip,
        playButton,window, highlight, markHit
} from "./displayController.js";

// default human player on the left
const playerLeft = new Player("Left player","human");
const playerRight = new Player("Right player")
const playerList = [playerLeft,playerRight];

let currentPlayer = playerLeft, currentGrid = leftGrid; 
let currentShipContainer = shipContainerLeft;

let opponent = playerList.find((player)=> player != currentPlayer );
let opponentGrid = rightGrid, opponentShipContainer = shipContainerRight;



// game control during play session

let gameOn = false;

playButton.addEventListener("click", ()=> {
        gameOn = true;
        gameStart(gameOn);
        startAttack(currentPlayer);
    }
);

const handleAttack = function(e){
    let attackLocation = e.target;
    let attackCoordinate = getCoordinate(attackLocation);
    // register attack
    markHit(attackLocation);
    opponent.gameboard.receiveAttack(attackCoordinate);
    // check sunken ships
    // let sunkenShip = opponent.gameboard.assets.filter((ship)=> ship.isSunk );
    // for (let ship of sunkenShip){
    //     retireShip(ship, currentShipContainer);
    // }
    // check if current player has won
    if (!opponent.gameboard.allSunk){
        declareWinner(currentPlayer);
    } else {
        switchPlayer()
        startAttack(currentPlayer);
    }
}

opponentGrid.addEventListener("click", handleAttack);

//evenhandling functions

const gameStart = function(gameOn){
    if (gameOn == true){
        console.log(`game on ${gameOn}`)
        shipListLeft.forEach(ship => playerLeft.gameboard.placeShip(
            ship.name, 
            ship.length, 
            ship.num)
        )
        shipListRight.forEach(ship=> playerRight.gameboard.placeShip(
            ship.name, 
            ship.length, 
            ship.num)
        )
    }
}

const switchPlayer = function(){
    currentPlayer = playerLeft? playerRight:playerLeft;
    console.log(currentPlayer);
    currentGrid = leftGrid? rightGrid:leftGrid;
    currentShipContainer = shipContainerLeft? shipContainerRight:shipContainerLeft;

    opponent = playerList.find((player)=> player != currentPlayer );
    opponentGrid = rightGrid? leftGrid:rightGrid;
    opponentShipContainer = shipContainerLeft? shipContainerRight:shipContainerLeft;
};


const startAttack = function(player){
    window.textContent = `${player.name}'s turn, select an ${opponent.name}'s target to attack`
    highlight(opponent);
}

const getCoordinate = function(e){
    let value = +e.getAttribute("data-value");
    console.log(value)
    return value
}

const declareWinner = function(player){
    window.textContent= `${player.name} has won! Game over`
    gameOn = false;
}