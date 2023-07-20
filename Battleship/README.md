
# Battle Ship

[<img alt="Static Badge" src="https://img.shields.io/badge/LivePreview-BattleShip_Game-blue">](https://codepen.io/Cychu1996/full/LYXmdQY)

Battle Ship is a guessing game for two players. The main objective of the game is to sink the opponent's ships, which are of different lengths, based on the table below.

| Ship Name |   Length  | 
|:-----:|:--------:|
| Carrier   | 5 | 
| Battle Ship   | 4 |   
| Destroyer   |  3  |   
| Submarine   | 3 |   
| Patrol Boat   | 2 |   

This game ends after any side has destroyed every ship on the opponent's side.


## How to play

In this implementation, I wrote code that allows the user to go through several steps in the game. The main steps are described below:

### The first view - Preperation
![image](https://github.com/Cysiek96/Z2J/assets/113532109/a4009022-8062-4733-a64d-db8b2daabfe5)

There are two different sections in this menu:
* A - This is the player board, in this view you can only drag and drop ships from the Ship Layout section (B).
* B - The ships section - allows the user to drag and drop ships and place them on the player board (A).
* 1 - The ships section contains all the ships that must be dropped on the player board in order to start the game.
* 2 - Direction button - this is the item used to change the row and column of the catalog when you click on it.
Each ship has a specially added cursor to make it easier to see what can be done with the item.

In the player board menu, you will be able to see the place where you can drop the ship, only if it is a valid place. The drop location display is only available in the scheme shown below:


| Pattern |  Rule   | Description | 
|:-----:|:--------:| :---:|
| ![image](https://github.com/Cysiek96/Z2J/assets/113532109/3032d7e1-25f2-4652-ab98-b4cb500c6e9b) | Match the length of the ship to the available grid squares. |  As we can see, the carrier ship is 5 grid squares long, so if we try to paste it into the grid in the direction of the row at the G1 position, this blue shape will not be displayed, and dropdon will not be available. | 
| ![image](https://github.com/Cysiek96/Z2J/assets/113532109/94b8e61d-3426-4993-8247-489e2300a2d8) | The invisible grid rule | The principle of the invisible grid is a grid area that does not allow another ship to leave near an already abandoned ship.  It is always created when a ship is abandoned, and if one ship tries to deploy in this area, it will not be able to do so - the blue shape will not appear.|

Once all the ships are deployed in the ship list, the catalog button will change to a game start button that will allow you to play against the computer.

### The Game itself - Fire Fight
As soon as you click the Start Game button, the script will run and allow the player to use the mouse on the opponent's board. Each time you hover over an item, the cursor will change to a pointer and allow you to take a shot. If the shot was off-target, that square will be marked with an O, but if it was a direct shot instead, it will be marked with a red background and an X.   
![image](https://github.com/Cysiek96/Z2J/assets/113532109/e7390983-2674-467d-958c-23fcb6a3e495)

Each time the user shoots at the opponent's board, the computer will do the same. 
When one of the ships is destroyed, an alert will be displayed with information about the player and the ship that drowned.
![image](https://github.com/Cysiek96/Z2J/assets/113532109/ef84b5da-bf96-48ad-ba81-472cd38d299c)

Immediately after one player shoots down the last part of the ship, a message will appear and inform which player won.
![image](https://github.com/Cysiek96/Z2J/assets/113532109/545fb3d3-7352-4b9b-8a88-e4beba0fe6c7)

## Code 
### Drag And Drop Validation - Is this area good to drop?

One of the most difficult parts of this project was creating code that would allow the user to use drag and drop. The drop part was the hardest part, because every time the user changes the block or changes the direction of the placement of the ships, the code has to do the same thing. The main part was also to place these ships in the same row / column, which this code also has to verify.

```
function createValidationArea(
  targettingSquareIndexNumber,
  columnDirection,
  directoryCorrection
) {
  const validation = [];
  let firstElementInDraggingRowNumber;
  if (!columnDirection) {
    firstElementInDraggingRowNumber =
      Math.trunc(targettingSquareIndexNumber / 10) * 10;
  } else {
    while (targettingSquareIndexNumber > 10) {
      targettingSquareIndexNumber -= 10;
    }
    firstElementInDraggingRowNumber = targettingSquareIndexNumber;
  }
  for (let i = 0; i < 10; i++) {
    validation.push(i * directoryCorrection + firstElementInDraggingRowNumber);
  }
  return validation;
}
```
This code was the remedy to my problems. This function looks at the direction - row or column and the value of the adjustment (for the row it is 1, for the column 10).  In this code, regardless of the direction, the function always looks for the lowest number in the direction field. The way it calculates this number is slightly different, but at the end it takes this value and creates a validation range for the row or column (this range is always 10 wide).Once these values are obtained, the code is able to compare square by square whether the length of the ship falls within this space, as well as search for an invisible grid rule.  
```
 for (let i = 0; i < currentShip.length; i++) {
    const indexForThisIteration =
      targettingSquareIndexNumber + i * directoryCorrection;
    if (selectedGrid[indexForThisIteration]) {
      if (
        validation.includes(indexForThisIteration) &&
        !selectedGrid[indexForThisIteration].classList.contains("ship") &&
        !selectedGrid[indexForThisIteration].classList.contains("noDraggable")
      ) {
        validation.push(true);
      } else {
        validation.push(false);
      }
    } else {
      validation.push(false);
    }
```  

## Sources 
1. [Battle Ship Game](https://en.wikipedia.org/wiki/Battleship_(game))
2. [LivePreview](https://codepen.io/Cychu1996/full/LYXmdQY)
