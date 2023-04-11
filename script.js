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
    static gameInstance = null
    currentUser = 0
    player = 1
    scoreId = 'scorePlayer1'
    playerZone = 'playerZone1'
    playerWinner = 'playerWinner1'
    scoreMax = 100

    resetGame() {
        // Réinitialiser les valeurs des joueurs
        for (let i = 0; i < this.players.length; i++) {
            this.players[i].currentScore = 0;
            this.players[i].totalScore = 0;
        }

        // Tableaux pour stocker les noms des éléments HTML
        const scoreIds = ['scorePlayer1', 'scorePlayer2'];
        const playerZones = ['playerZone1', 'playerZone2'];
        const playerWinners = ['playerWinner1', 'playerWinner2'];
        const currentScoreIds = ['currentScore1', 'currentScore2'];

        // Réinitialiser les valeurs du jeu
        this.currentUser = 0;
        this.player = 1;
        this.scoreId = scoreIds[0];
        this.playerZone1 = playerZones[0];
        this.playerZone2 = playerZones[1];
        this.playerWinner1 = playerWinners[0];
        this.playerWinner2 = playerWinners[1];
        this.scoreMax = 100;

        // Réactiver le bouton Hold
        document.getElementById('myHoldButton').classList.remove('disabled');

        // Réinitialiser les éléments HTML
        for (let i = 0; i < scoreIds.length; i++) {
            document.getElementById(scoreIds[i]).innerText = 0;
            document.getElementById(currentScoreIds[i]).innerText = 0;
            document.getElementById('playerName' + (i + 1)).innerText = this.players[i].name;
            document.getElementById(playerZones[i]).classList.remove('confetti');
            document.getElementById(playerWinners[i]).style.display = 'none';
            document.getElementById('currentScoreBox' + (i + 1)).style.display = 'block';
        }
    }

    //Game's principal class
    static getNewGame() {
        if (ManageGame.gameInstance === null)
            ManageGame.gameInstance = new ManageGame()
        return ManageGame.gameInstance

    }
    constructor() {
        this.players = []
        this.players.push(new Player('Player 1'))
        this.players.push(new Player('Player 2'))
        this.myDice = new Dice()
    }
    

// When I click on the dice
    onDiceClick() {
        const currentPlayer = this.players[this.currentUser];

        if (currentPlayer.totalScore >= this.scoreMax) {
            return;
        }

        this.myDice.rollDice();

        const currentFace = this.myDice.myCurrentFace;
        const currentScoreElement = document.getElementById('currentScore' + this.player);
        const playerNameElement = document.getElementById('playerName' + this.player);

        if (currentFace === 1) {
            this.changeDice();
            currentPlayer.currentScore = 0;
            currentScoreElement.innerText = currentPlayer.currentScore;
            this.changeUser();
        } else {
            currentPlayer.currentScore += currentFace;
            this.currentPlayer = currentPlayer;
            currentScoreElement.innerText = currentPlayer.currentScore;
            playerNameElement.innerText = currentPlayer.name;
            this.changeDice();

            if (currentPlayer.totalScore + currentPlayer.currentScore >= this.scoreMax) {
                document.getElementById('totalScore' + this.player).innerText = currentPlayer.totalScore;
            }
        }
    }


/**when I click hold; add score in total score, and if the score is > or = 100, then it sets up 
   * PlayerWinner and puts confetti, else switch player */

    onHoldClick() {
        const currentPlayer = this.players[this.currentUser];

        currentPlayer.totalScore += currentPlayer.currentScore;
        document.getElementById(`scorePlayer${this.player}`).innerText = currentPlayer.totalScore;

        if (currentPlayer.totalScore >= this.scoreMax) {
            // Player has won!
            const playerZone = document.getElementById(this.playerZone);
            playerZone.classList.add('confetti');
            document.getElementById(this.playerWinner).style.display = 'block';
            const playerWinner = document.getElementById(`playerWinner${this.player}`);
            playerWinner.innerText = `${this.players[this.currentUser].name} has won!`;
            const currentScoreBox = document.getElementById(`currentScoreBox${this.player}`);
            currentScoreBox.style.display = 'none';

            // Disable the Hold button - CSS Solution
            const myHoldButton = document.querySelector('#myHoldButton');
            myHoldButton.classList.add('disabled');
        } else {
            currentPlayer.currentScore = 0;
            document.getElementById(`currentScore${this.player}`).innerText = currentPlayer.currentScore;
            this.changeUser();
        }
    }


    // Change the current player
    changeUser() {
        document.getElementById(this.playerZone).classList.remove('active');
        this.currentUser = (this.currentUser + 1) % 2;
        this.player = this.currentUser + 1;
        this.scoreId = `scorePlayer${this.player}`;
        this.playerZone = `playerZone${this.player}`;
        this.playerWinner = `playerWinner${this.player}`;
        document.getElementById(this.playerZone).classList.add('active');
    }

    // Update the total score of the current player
    changeTotalScore() {
        const currentPlayer = this.players[this.currentUser];
        document.getElementById(this.scoreId).innerText = currentPlayer.totalScore;
    }

    // Change the dice image
    changeDice() {
        const diceImage = document.getElementById('diceImage');
        const oldClassName = this.getMyClassName(this.myDice.oldFace);
        const newClassName = this.getMyClassName(this.myDice.myCurrentFace);

        diceImage.classList.remove(oldClassName);
        diceImage.classList.add(newClassName);
    }



    //sets the images in relation to the random
    getMyClassName(myNumberOfDice) {
        const classMap = {
            1: 'one',
            2: 'two',
            3: 'three',
            4: 'four',
            5: 'five',
            6: 'six'
        };

        return classMap[myNumberOfDice];
    }


}


/** click on one of this three button for play */

const buttons = [
    { id: 'newGameButton', fn: 'resetGame' },
    { id: 'myHoldButton', fn: 'onHoldClick' },
    { id: 'diceButton', fn: 'onDiceClick' }
];

buttons.forEach(button => {
    document.getElementById(button.id).addEventListener('click', () => {
        ManageGame.getNewGame()[button.fn]();
    });
});


/** Modal option */

// Fonction pour afficher ou masquer un élément
function toggleElement(element, show) {
    element.style.display = show ? "" : "none";
}

// Éléments HTML
const btnCloseModal = document.querySelector('.closeModal');
const overlay = document.querySelector('.overlay');
const modal = document.querySelector('.modal');
const btnOpenModal = document.querySelector('.rules');

// Btn Closed
function closeModal() {
    toggleElement(modal, false);
    toggleElement(overlay, false);
}
btnCloseModal.addEventListener('click', closeModal);

// Btn Open
function openModal() {
    toggleElement(modal, true);
    toggleElement(overlay, true);
}
btnOpenModal.addEventListener('click', openModal);



// TODO
/** A FAIRE - JS & HTML
 * Semie OK (css solution temporaire) - onHoldClick - Désac le button en removeEventListener et réac après via le resetGame (en remettant la fonction)
 * OK - onDiceClick - Corriger la valeur de fin, quand on ajoute notre résultat final, avant d'atteindre 100, qui s'addition avec 100, au lieu d'atteindre 100 tout juste
 * OK - En HTML : Modal & Game Rules, mieux faire (en utilisant Bootstrap ?) les règles, qu'elles soient plus claires.
 * OK - Ajout en HTML,CSS et JS, d'un bouton Rules, pour revoir la modal Game Rules.
 * - Refactoriser le code.
 */




