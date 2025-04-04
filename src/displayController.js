
const leftGrid = document.querySelector("body > div.left > div.grid-container-left")
const rightGrid = document.querySelector("body > div.right > div.grid-container-right")
const playButton = document.querySelector("body > button.play");
const window = document.querySelector("body > div.msg");
const upArrowLeft = document.querySelector("body > div.left > div.ship-container-left > p")
const upArrowRight = document.querySelector("body > div.right > div.ship-container-right > p")
const shipContainerLeft = document.querySelector("body > div.left > div.ship-container-left")
const shipContainerRight = document.querySelector("body > div.right > div.ship-container-right")


const shipListLeft = [];
const shipListRight = [];

let draggedShipLeft = {
    "name": null,
    "length": null,
    "num":null
}

let draggedShipRight = {
    "name": null,
    "length": null,
    "num":null
}

const populateGrid= function(grid){
    for (let i=0; i < 100; i++) {
        let spot = document.createElement("div");
        spot.setAttribute("data-value",i)
        spot.style.width = "60px";
        spot.style.height = "60px";
        grid.appendChild(spot);
    }
}

// populate grids and ships
populateGrid(leftGrid);
populateGrid(rightGrid);

leftGrid.addEventListener("dragover",(e)=>{
    e.preventDefault();
    let targetSpot = e.target;
    targetSpot.classList.add("dropzone"); 
})

rightGrid.addEventListener("dragover",(e)=>{
    e.preventDefault();
    let targetSpot = e.target;
    targetSpot.classList.add("dropzone"); 
})

leftGrid.addEventListener("dragleave",(e)=>{
    let targetSpot = e.target;
    targetSpot.classList.remove("dropzone");
})

rightGrid.addEventListener("dragleave",(e)=>{
    let targetSpot = e.target;
    targetSpot.classList.remove("dropzone");
})

shipContainerLeft.addEventListener("dragstart",(e)=> {
    draggedShipLeft.name = e.target.textContent;
    draggedShipLeft.length = e.target.getAttribute("data-value");
    
})

shipContainerRight.addEventListener("dragstart",(e)=> {
    draggedShipRight.name = e.target.textContent;
    draggedShipRight.length = e.target.getAttribute("data-value");
    
})

leftGrid.addEventListener("drop",(e)=>{
    e.preventDefault();
    let target = e.target;
    draggedShipLeft.num = +target.getAttribute("data-value");
    for (let i = 1; i < draggedShipLeft.length; i++){
        let spot = target.nextSibling;
        spot.classList.add("dropzone");
        target = spot;
    }
    let newShip = {
        "name": null,
        "num": null,
        "length":null,
    };
    for (const key in draggedShipLeft){
        newShip[key]=draggedShipLeft[key];
    }
    shipListLeft.push(newShip);
})

rightGrid.addEventListener("drop",(e)=>{
    e.preventDefault();
    let target = e.target;
    draggedShipRight.num = +target.getAttribute("data-value");
    for (let i = 1; i < draggedShipRight.length; i++){
        let spot = target.nextSibling;
        spot.classList.add("dropzone");
        target = spot;
    }
    let newShip = {
        "name": null,
        "num": null,
        "length":null,
    };
    for (const key in draggedShipRight){
        newShip[key]=draggedShipRight[key];
    }
    shipListRight.push(newShip);
})

// game control during play session

const highlight = function(player){
    if (player.name == "Right player"){
        rightGrid.classList.add("highlight");
        leftGrid.classList.remove("highlight");
    } else if (player.name == "Left player"){
        leftGrid.classList.add("highlight");
        rightGrid.classList.remove("highlight")
    }
}

const markHit = function(element){
    element.classList.add("hitmark");
    element.textContent = "X";
}

const retireShip = function(ship,shipContainer){
    let targetShip = shipContainer.find((e)=> e.getAttribute("data-value")==ship.name);
    targetShip.style.textDecoration = "line-through";
}



export {
    shipListLeft, shipListRight,
    leftGrid, rightGrid,
    shipContainerLeft,shipContainerRight,
    retireShip,
    playButton, window, highlight, markHit
};