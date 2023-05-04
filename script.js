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
const getRandomInt = (max) => Math.floor(Math.random() * max)

/** Class Player */
class Player {
    constructor(name) {
        this.name = name
        this.currentScore = 0
        this.totalScore = 0
    }
}

/** Class Dice */
class Dice {
    constructor() {
        this.myCurrentFace = null
        this.oldFace = null
    }

    rollDice() {
        this.oldFace = this.myCurrentFace
        //random +1 for have a number 1 to 6
        this.myCurrentFace = getRandomInt(6) + 1
    }
}

class ManageGame {
    constructor() {
        this.gameInstance = null;
        this.currentUser = 0;
        this.player = 1;
        this.scoreId = 'scorePlayer1';
        this.playerZone = 'playerZone1';
        this.playerWinner = 'playerWinner1';
        this.scoreMax = 100;
        this.players = [new Player('Player 1'), new Player('Player 2')];
        this.myDice = new Dice();
    }

    resetGame() {
        // Réinitialiser les valeurs des joueurs
        for (const player of this.players) {
            player.currentScore = 0;
            player.totalScore = 0;
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

        // Stop Applause 
        this.stopApplause();

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

    static getNewGame() {
        if (!this.gameInstance) {
            this.gameInstance = new ManageGame();
        }
        return this.gameInstance;
    }

// When I click on the dice
    onDiceClick() {

        const currentPlayer = this.players[this.currentUser];

        if (currentPlayer.totalScore >= this.scoreMax) {
            return;
            // if player has already win, do nothing and return
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
            this.applause();
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
            1: 'front',
            6: 'back',
            2: 'top',
            5: 'bottom',
            3: 'right',
            4: 'left'
        };

        return classMap[myNumberOfDice];
    }

    //Applause in case of victory
    applause() {
        let playWin = document.getElementById('soundEffect')
        playWin.play();

    }

    stopApplause() {
        let playWin = document.getElementById('soundEffect')
        playWin.pause();
        playWin.currentTime = 0;

    }
}

/** click on one of this three button for play */

const buttons = [
    { id: 'newGameButton', fn: 'resetGame' },
    { id: 'myHoldButton', fn: 'onHoldClick' },
    { id: 'diceButton', fn: 'onDiceClick' },
    { id: 'Dice3dButton', fn: 'onDiceClick'}
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
 * OK - Refactoriser le code.
 * OK - Ajout d'un bruit de victoire, applaudissement
 */

// TODO 3D
/** Tester 3D 
 * Annulé - Faire 3D avec Three.js
 * OK - Faire 3D avec CSS/JS
 * OK - 2 - Faire 3D avec CSS/JS 
 */


// TODO 3D - CSS/JS
/** 3D Dice */

const dice = document.querySelector('.dice3D');
const rollBtn = document.querySelector('.dice3D');

const randomDice = () => {

    const random = Math.floor(Math.random() * 10);

    if (random >= 1 && random <= 6 ){ 
        rollDice(random);
    }else{
        randomDice();
    }
}

const  rollDice = random => {

    dice.style.animation = 'rolling 4s';

    setTimeout (() => {
        switch (random) {
            case 1:
                dice.style.transform = 'rotateX(0deg) rotateY(0deg)';
                break;
            
            case 6:
                dice.style.transform = 'rotateX(180deg) rotateY(0deg)';
                break;

            case 2:
                dice.style.transform = 'rotateX(-90deg) rotateY(0deg)';
                break;
                
            case 5:
                dice.style.transform = 'rotateX(90deg) rotateY(0deg)';
                break; 
                
            case 3:
                dice.style.transform = 'rotateX(0deg) rotateY(90deg)';
                break;

            case 4:
                dice.style.transform = 'rotateX(0deg) rotateY(-90deg)';
                break;

            default:
                break;      
        }

        dice.style.animation = 'none';
    }, 4050)

}

rollBtn.addEventListener('click', randomDice);