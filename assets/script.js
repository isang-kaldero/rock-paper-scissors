//declare variables
const CHOICES = ["rock", "paper", "scissors"];
const DEAD = 0;
const DMG = 20;
const MAX_HP = 100;
const CARDS = document.querySelectorAll('.cards img');
const PLAYER_CARD = document.querySelector('.you .player-card');
const COMPUTER_CARD = document.querySelector('.enemy .player-card');
const PLAYER_SCRATCH = document.querySelector('.you .scratch');
const COMPUTER_SCRATCH = document.querySelector('.enemy .scratch');
const RESET_BTN = document.querySelector('#restart-game');
const CARDS_BOX = document.querySelector('.cards');
const STAT_H1 = document.querySelector('.round-stat h1');
const STAT_P = document.querySelector('.round-stat p');
const MSG_ROUND_WIN = [
    "You successfully hit Sworn Enemy with a ladle",
    "You're on the roll",
    "Sworn enemy's eyes spinning from your explosive fart",
    "You danced a jig, hey, rig-a-jig-jig",
    "Who else, you're the best"
];
const MSG_ROUND_LOSE = [
    "Your jaw slightly dislocated from a roundhouse kick",
    "Come on, you can do better",
    "You got distracted and Sworn Enemy poked your eye with a pencil",
    "Sworn Enemy successfully snatched your chicken",
    "Who says you can't use a katana?"
];
const MSG_FINAL_WIN = [ //just two, I can't think of anymore
    "That's the way to do it!",
    "How are you so good at this?"
];
const MSG_FINAL_LOSE = [
    "Better luck next time",
    "Sworn Enemy's laughing in your face"
];

let player_hp = MAX_HP;
let computer_hp = MAX_HP;
let player_hp_div = document.querySelector('.you .hp');
let computer_hp_div = document.querySelector('.enemy .hp');
let CHOICE_STANDING = []; //array values: tie, win, lose
CHOICE_STANDING["rock"] = ["rock", "scissors", "paper"];
CHOICE_STANDING["paper"] = ["paper", "rock", "scissors"];
CHOICE_STANDING["scissors"] = ["scissors", "paper", "rock"];

//event listeners
CARDS.forEach(card => card.addEventListener("click", playGame));
PLAYER_SCRATCH.addEventListener("animationend", detachAnimation);
COMPUTER_SCRATCH.addEventListener("animationend", detachAnimation);

PLAYER_CARD.addEventListener("animationend", detachAnimation);
COMPUTER_CARD.addEventListener("animationend", detachAnimation);
RESET_BTN.addEventListener("click", restartGame);
document.querySelector('.table').addEventListener("animationend", function(){
    document.querySelector('.intro').style.display = "none";
});

function detachAnimation(el) {
    this.classList.remove("active");
}

function restartGame() {
    player_hp = MAX_HP;
    computer_hp = MAX_HP;

    player_hp_div.style.width = `${player_hp}%`;
    player_hp_div.style.backgroundColor = "green";

    computer_hp_div.style.width = `${computer_hp}%`;
    computer_hp_div.style.backgroundColor = "green";    

    RESET_BTN.style.visibility = "hidden";
    CARDS_BOX.style.visibility = "visible";
    PLAYER_CARD.style.visibility = "hidden";
    COMPUTER_CARD.style.visibility = "hidden";
    
    STAT_H1.textContent = "";
    STAT_P.textContent = "";

}

function playGame(el) {
        
    let player_card = this.dataset.card; //returns rock, paper or scissors
    let computer_card = getComputerChoice();

    let result = playRound(player_card.toLowerCase(), computer_card);
    let msg = "Tie, dude!";
    let addition = "I'm rooting on you";

    switch(result) {

        case 0: //tie
        break;

        case 1: //player won
            computer_hp = computer_hp - DMG;
            computer_hp_div.style.width = `${computer_hp}%`;
            COMPUTER_SCRATCH.classList.add("active");

            msg = "Good, you won!"
            addition = MSG_ROUND_WIN[Math.floor(Math.random() * 5)];
            
            //change color of hp
            if(computer_hp == 40) { computer_hp_div.style.backgroundColor = "#c33803"; }
            if(computer_hp == 20) { computer_hp_div.style.backgroundColor = "red"; }
        break;

        case 2: //player lose
            player_hp = player_hp - DMG;
            player_hp_div.style.width = `${player_hp}%`;
            PLAYER_SCRATCH.classList.add("active");

            msg = "You lose!"
            addition = MSG_ROUND_LOSE[Math.floor(Math.random() * 5)];

            //change color of hp
            if(player_hp == 40) { player_hp_div.style.backgroundColor = "#c33803"; }
            if(player_hp == 20) { player_hp_div.style.backgroundColor = "red"; }            
        break
    }

    //update the cards
    PLAYER_CARD.style.visibility = "visible";
    PLAYER_CARD.setAttribute("src", `assets/images/${player_card}.png`);
    PLAYER_CARD.classList.add("active");

    COMPUTER_CARD.style.visibility = "visible";
    COMPUTER_CARD.setAttribute("src", `assets/images/${computer_card}.png`);
    COMPUTER_CARD.classList.add("active");


    //if someone died, end the game and give option to restart
    if((player_hp == DEAD) || (computer_hp == DEAD)) {

        //hide the cards and show the restart button
        RESET_BTN.style.visibility = "visible";
        CARDS_BOX.style.visibility = "hidden";

        //determine the winner
        if(player_hp > DEAD) {
            msg = "Good job!"
            addition = MSG_FINAL_WIN[Math.floor(Math.random() * 2)];
        } else {
            msg = "Too bad!"
            addition = MSG_FINAL_LOSE[Math.floor(Math.random() * 2)];            
        }

    }
    document.querySelector('.round-stat h1').textContent = msg;
    document.querySelector('.round-stat p').textContent = addition;
}

function getComputerChoice(){

    //computer loves RNG, so let's get a random number
    let random_number = Math.floor(Math.random() * 3); //returns 0-2
    let computer_choice = CHOICES[random_number]; //returns the card name via random_number as index

    return computer_choice;
}

/*
 * Determine the standing of player_card against computer_card
 * @param player_card string
 * @param computer_card string
 * 
 * @return int -1:error, 0:tie, 1:win, 2:lose
 */
function playRound(player_card, computer_card) {
      
    let outcome;
    try {
        outcome = CHOICE_STANDING[player_card].indexOf(computer_card);
    } catch(e) {
        outcome = -1;
    }
    
    return outcome;

}