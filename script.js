/** My JS Game */

/** Function Game 
 * 1) Randomization/random function of roll of a dice game.
 * 2) Reset Game, Reinit, or begin a new game
 * 3) Click on dice, for change player
 * 4) Addition of score, hold, and if score >= to max, player winner, with win animation (css)
 * 5) change the user
 * 6) change total score
 * 7) change dice (random image of dice)
 * 8) put in place dice images with random function
 * 9) ... Maybe ?
*/

/** Class Game 
 * Manage the Game
 * Class player
 * Class dice
*/


// Random Dice
function getRandomInt(max) {
    return Math.floor(Math.random() * max)
}


/** Class Game */
class Player {
    constructor(name) {
        this.name = name
        this.currentScore = 0
        this.totalScore = 0
    }
}
class Dice {
    rollDice() {
        this.oldFace = this.myCurrentFace
        //random +1 for have a number 1 to 6
        this.myCurrentFace = getRandomInt(6) + 1

    }
}

// Construct Object fo manage my roll dice's Game.
class ManageGame {

    //game's default variable
    static myGame = null
    currentUser = 0
    player = 1
    scoreId = 'scorePlayer1'
    playerZone = 'playerZone1'
    playerWinner = 'playerWinner1'
    scoreMax = 100

    //game's principal class
    static getNewgame(){
        if(ManageGame.myGame === null) 
            ManageGame.myGame = new ManageGame()
        return ManageGame.myGame
    }
    constructor () {
        this.players = []
        this.players.push(new Player('Player 1'))
        this.players.push(new Player('Player 2'))
        this.myDice = new Dice()

    }
     // Reset Game 

}














/** Modal option */
const btnCloseModal = document.querySelector('.closeModal')
const overlay = document.querySelector('.overlay')
const modal = document.querySelector('.modal')

function closeModal(){
    modal.style.display = "none"
    overlay.style.display = "none"
}
btnCloseModal.addEventListener('click', closeModal)