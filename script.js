/** My JS Game */

/** Function Game 
 * 1) Randomization/random function of roll of a dice game.
 * 2) Reset Game, Reinit, or begin a new game
 * 3) Click on hold, for change player
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

    resetGame() {
          // Réinitialiser les valeurs du jeu
        this.players.forEach(player => {
            player.currentScore = 0;
            player.totalScore = 0;
        });

        this.currentUser = 0;
        this.player = 1;
        this.scoreId = 'scorePlayer1';
        this.playerZone1 = 'playerZone1';
        this.playerZone2 = 'playerZone2';
        this.playerWinner1 = 'playerWinner1';
        this.playerWinner2 = 'playerWinner2';
        this.scoreMax = 100;

        // Réactiver le bouton Hold 

        // Réactiver le bouton Hold - CSS Solution
        document.getElementById('myHoldButton').classList.remove('disabled');

        // Réinitialiser les éléments HTML
        document.getElementById('scorePlayer1').innerText = 0;
        document.getElementById('scorePlayer2').innerText = 0;
        document.getElementById('currentScore1').innerText = 0;
        document.getElementById('currentScore2').innerText = 0;
        document.getElementById('playerName1').innerText = this.players[0].name;
        document.getElementById('playerName2').innerText = this.players[1].name;
        document.getElementById(this.playerZone1).classList.remove('confetti');
        document.getElementById(this.playerZone2).classList.remove('confetti');
        document.getElementById(this.playerWinner1).style.display = 'none';
        document.getElementById(this.playerWinner2).style.display = 'none';
        document.getElementById('currentScoreBox1').style.display = 'block';
        document.getElementById('currentScoreBox2').style.display = 'block';
    }


    //Game's principal class
    static getNewGame() {
        if (ManageGame.myGame === null)
            ManageGame.myGame = new ManageGame()
        return ManageGame.myGame

    }
    constructor() {
        this.players = []
        this.players.push(new Player('Player 1'))
        this.players.push(new Player('Player 2'))
        this.myDice = new Dice()
    }
    
// When I click on the dice
    onDiceClick() {

        const currentPlayer = this.players[this.currentUser]

        if (currentPlayer.totalScore >= this.scoreMax) {
            // Player has already won, do nothing
            return
        }
        this.myDice.rollDice();

        if (this.myDice.myCurrentFace === 1) {
            this.changeDice();
            this.players[this.currentUser].currentScore = 0;
            document.getElementById('currentScore' + this.player).innerText = this.currentPlayer.currentScore;
            this.changeUser();
        }
        else {
            this.players[this.currentUser].currentScore += this.myDice.myCurrentFace;
            this.currentPlayer = this.players[this.currentUser];
            document.getElementById('currentScore' + this.player).innerText = this.currentPlayer.currentScore;
            document.getElementById('playerName' + this.player).innerText = this.currentPlayer.name;
            this.changeDice();

            if (this.currentPlayer.totalScore + this.currentPlayer.currentScore >= this.scoreMax) {
                document.getElementById('totalScore' + this.player).innerText = this.currentPlayer.totalScore;
            }
        }
    }

/**when I click hold; add score in total score, and if the score is > or = 100, then it sets up 
   * PlayerWinner and puts confetti, else switch player */

    onHoldClick() {
        const currentPlayer = this.players[this.currentUser];

        currentPlayer.totalScore += currentPlayer.currentScore;
        document.getElementById('scorePlayer' + this.player).innerText = currentPlayer.totalScore;

        if (currentPlayer.totalScore >= this.scoreMax) {
            // Player has won!
            document.getElementById(this.playerZone).classList.add('confetti');
            document.getElementById(this.playerWinner).style.display = 'block';
            document.getElementById('currentScoreBox' + this.player).style.display = 'none';
            document.getElementById('playerWinner' + this.player).innerText = this.players[this.currentUser].name + ' has won !';

            // Désactiver l'événement "click" du bouton
            // document.getElementById('myHoldButton').removeEventListener('click', onHoldClick);

            // Disable the Hold button - CSS Solution
            document.getElementById('myHoldButton').classList.add('disabled');
            
        } else {
            currentPlayer.currentScore = 0;
            document.getElementById('currentScore' + this.player).innerText = currentPlayer.currentScore;
            this.changeUser();
        }
    }

    changeUser() {
        document.getElementById(this.playerZone).classList.remove('active')

        if (this.currentUser === 0)
            this.currentUser = 1
        else this.currentUser = 0
        this.player = this.currentUser + 1
        this.scoreId = 'scorePlayer' + this.player
        this.playerZone = 'playerZone' + this.player
        this.playerWinner = 'playerWinner' + this.player

        document.getElementById(this.playerZone).classList.add('active')

    }

    changeTotalScore() {
        document.getElementById(this.scoreId).innerText = this.players[this.currentUser].totalScore
    }

    // but in place the random image of dice
    changeDice() {
        document.getElementById('diceImage').classList.remove(this.getMyClassName(this.myDice.oldFace))
        document.getElementById('diceImage').classList.add(this.getMyClassName(this.myDice.myCurrentFace))

    }


    //sets the images in relation to the random
    getMyClassName(myNumberOfDice) {
        if (myNumberOfDice === 1)
            return 'one'
        if (myNumberOfDice === 2)
            return 'two'
        if (myNumberOfDice === 3)
            return 'three'
        if (myNumberOfDice === 4)
            return 'four'
        if (myNumberOfDice === 5)
            return 'five'
        if (myNumberOfDice === 6)
            return 'six'
    }
}

/** click on one of this three button for play */

// event listener to "New Game" button
document.getElementById('newGameButton').addEventListener('click', () => {
    ManageGame.getNewGame().resetGame();
});

// add event listener to "Hold" button
document.getElementById('myHoldButton').addEventListener('click', () => {
    ManageGame.getNewGame().onHoldClick();
});



// add event listener to "dice" button
document.getElementById('diceButton').addEventListener('click', () => {
    ManageGame.getNewGame().onDiceClick();
});


/** Modal option */
const btnCloseModal = document.querySelector('.closeModal')
const overlay = document.querySelector('.overlay')
const modal = document.querySelector('.modal')

const btnOpenModal = document.querySelector('.rules')

// Btn Closed
function closeModal(){
    modal.style.display = "none"
    overlay.style.display = "none"
}
btnCloseModal.addEventListener('click', closeModal)

// Btn Open
function OpenModal() {
    modal.style.display = ""
    overlay.style.display = ""
}
btnOpenModal.addEventListener('click', OpenModal)


// TODO
/** A FAIRE - JS & HTML
 * Semie OK (css solution temporaire) - onHoldClick - Désac le button en removeEventListener et réac après via le resetGame (en remettant la fonction)
 * OK - onDiceClick - Corriger la valeur de fin, quand on ajoute notre résultat final, avant d'atteindre 100, qui s'addition avec 100, au lieu d'atteindre 100 tout juste
 * OK - En HTML : Modal & Game Rules, mieux faire (en utilisant Bootstrap ?) les règles, qu'elles soient plus claires.
 * OK - Ajout en HTML,CSS et JS, d'un bouton Rules, pour revoir la modal Game Rules.
 */