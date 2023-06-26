# Sapper The Game
Sapper is a puzzle video game. Since 1981, this game has been available on every version of Windows[1].
## Basic principles of the game 
In this game, the main rule is to discover all unmined fields. Around each mined field there are numbered boxes, the value of which indicates how many mines are near that particular one. Let me give you some graphic explanation: 

| Name     | Character | Explanation |
| ---      | ---       | ---         |
| Basic Numeration  | ![image](https://github.com/Cysiek96/Z2J/assets/113532109/2a92d42e-1ee5-421a-974b-70dae0d73a5e)        | Here we have only 1 mine, so it is surrounded by ONLY values of 1. There is no other mine in its vicinity.|
| Slightly more complicated Numration    |   ![image](https://github.com/Cysiek96/Z2J/assets/113532109/98d73749-6c01-4d14-8d8f-ad7e6db9e94a) | Here we have 2 mines in the neighborhood so values of 1 are added for each mine in the neighborhood. This means that here we have values of 2.|
|    The main rule   | ![image](https://github.com/Cysiek96/Z2J/assets/113532109/b224b6ae-ffb5-4780-8b43-34f84e9b2128) | This type of deployment is standard for a sapper game. The key skill is to understand what the neighborhood of mines is all about.|

## While playing sapper
1. At the beginning, choose the difficulty level by selecting the number 1, 2 or 3, which are associated with certain grid dimensions.
2. Start the main game:
     * Click the left mouse button to reveal a square. This means that if you click the mined button, you will lose the game.
     * Kliknięcie prawym przyciskiem myszy umożliwia utworzenie flagi, co oznacza, że jest to potencjalne miejsce miny. Ta flaga nie pozwala na kliknięcie tego przycisku lewym przyciskiem myszy. TYLKO kliknięcie flagi prawym przyciskiem myszy pozwala na jej usunięcie.
     * After winning or losing, you can click the smiley face to restart the game with the selected difficulty level

## My  sapper variation.
In this game, I implemented the basic rules of the game, which are as follows:
* Marking the fields around the mine, according to the numbering rules.
* A counter has been added, indicating how many fields are left to be marked as the potential presence of a mine.
* A timer has been implemented to measure time.
* Clicking on a mined field will display a failure message and reveal the remaining hidden mine fields.
* Programmed to automatically expose fields (including diagonally) if an empty field is exposed.
* Added message when all unmined fields are exposed, including "flagged" fields.
* Added difficulty modes selected via window:
  - 1 - 8x8 grid, and 10 min.
  - 2 - 16x16 grid, and 40 min,
  - 3 - 30x16 grid, and 99 min.
* Added resetting the game with the selected level, by clicking on the smiley face in the middle.

# Buggs:
- [ ] The game should also be won when fields containing mines are uncovered.
- [ ] Podczas resetowania gry licznik flag nie jest resetowany.

## Sources
1. [Sapper - Wikipediia](https://en.wikipedia.org/wiki/Minesweeper_(video_game))
2. [Live Preview](https://codepen.io/Cychu1996/full/YzRGmgM)
