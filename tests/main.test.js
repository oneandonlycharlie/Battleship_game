import  {Ship, Gameboard, Player} from "../src/main"

let testPlayer = null;
let testShip = null;
beforeAll(()=> {
    testPlayer = new Player("testname");
    testShip = testPlayer.gameboard.placeShip("Carrier", 5, 1, "h")
})

test("place ship successful", ()=>{
    expect(testShip).toBeInstanceOf(Ship)
})

test("test receiveAttack returns false by default", ()=> {
    expect(testPlayer.gameboard.receiveAttack(1,"A")).toBe(false)
})

test("missedshot recorded", ()=>{
    expect(testPlayer.gameboard.recordMissShot(2,"h")).toBe(1)
})

test("all ships safe", ()=>{
    expect(testPlayer.gameboard.shipsSafe()).toBe(true)
})

test("cordinates set", ()=>{
    expect(testShip.cordinates[4]).toEqual([5,"h"])
})

test("test ship length",()=>{
    expect(testShip.length).toEqual(5)
})