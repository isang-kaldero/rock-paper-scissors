const CHOICES = ["rock", "paper", "scissors"];

//array values: tie, win, lose
let CHOICE_STANDING = [];
CHOICE_STANDING["rock"] = ["rock", "scissors", "paper"];
CHOICE_STANDING["paper"] = ["paper", "rock", "scissors"];
CHOICE_STANDING["scissors"] = ["scissors", "paper", "rock"];

//co

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

function game() {

    const DEAD = 0;
    let player_hp = 100;
    let computer_hp = 100;



    /*for (let ctr = 0; ctr < BESTOF; ctr++) {

        let player_card = prompt("Gimme your best shot. Enter rock, paper or scissors.");
        let computer_card = getComputerChoice();

        let result = playRound(player_card.toLowerCase(), computer_card);
        let result_txt = "";

        switch (result) {

            case 0:
                result_txt = `It's a tie!`;
            break;

            case 1:
                result_txt = `You won! ${player_card.toUpperCase()} beats ${computer_card.toUpperCase()}`;
                player_score++;
            break;

            case 2:
                result_txt = `You lose! ${computer_card.toUpperCase()} beats ${player_card.toUpperCase()}`;
                computer_score++;
            break;

            default:
                result_txt = `You entered ${player_card}. Is that even ROCK, PAPER or SCISSORS?`;
            break;
        }        
        console.log(result_txt);
        console.log(`you:${player_score}   computer:${computer_score}`);
    }*/

}

//game();