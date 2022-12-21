/*
GAME FUNCTION:
- Player must guess a number between a min and max
- Player gets a certain amount of guesses
- Notify player of guesses remaining
- Notify the player of the correct answer if loose
- Let player choose to play again
*/

//Game Values

    let min = 1,
        max = 10,
        winningNum = getRandomNum(min, max),
        guessesLeft = 3;

//UI Elements

    const game = document.querySelector('#game'),
        minNum = document.querySelector('.min-num'), 
        maxNum = document.querySelector('.max-num'),
        guessBtn = document.querySelector('#guess-btn'),
        guessInput = document.querySelector('#guess-input'),
        message = document.querySelector('.message');

//Assigning UI Min and Max

    minNum.textContent = min;
    maxNum.textContent = max;

//Adding a Play Again Event Listener

    game.addEventListener('mousedown', function(e){

        if(e.target.className === 'play-again'){

            window.location.reload();

        }
    });

// Listening for what the Guess is

    guessBtn.addEventListener('click', function(){

        let guess = parseInt(guessInput.value);

//Validating the Guess to see if it is a Proper Guess

    if(isNaN(guess) || guess < min || guess > max){

        setMessage(`Please Enter A Number Between ${min} and ${max}`, 'red');

    }

//Checking If the User Won

    if(guess === winningNum){

        gameOver(true, `${winningNum} Is Correct, YOU WIN!`, 'green');

    } else {

        //Taking Away One Guess if the User Guesses Wrong
        guessesLeft -= 1;

        //Checking to See if Any Guesses are Left
        if(guessesLeft === 0){
            
        //If There Are No Guesses Left this Message Will Output

            gameOver(false, `Game Over, YOU LOSE! The Correct Number Was ${winningNum}`, 'red');

        } else {

            //Changing the Border Color
            guessInput.style.borderColor = 'red';

            //Clearing the Input After a Guess
            guessInput.value = '';

            //Telling the User Their Guess Was Wrong
            setMessage(`${guess} Is Not Correct, ${guessesLeft} Guesses Left`, 'red');


        }
    }
});

//Game Over
function gameOver(won, msg){

    let color;

    won === true ? color = 'green' : color = 'red';

        //Disabling the Text Input
        guessInput.disabled = true;

        //Changing the Border Color
        guessInput.style.borderColor = color;

        //Setting the Text Color
        message.style.color = color;

        //Setting the Winning Message
        setMessage(msg);

        //Turning the Guess Button into the Play Again Button
        guessBtn.value = 'Play Again';
        guessBtn.className = 'play-again';
}

//Making The Winning Number Random Each Time

function getRandomNum(min, max){

  return Math.floor(Math.random()*(max-min+1)+min);

}

//Creating the Message That Will Pop Up When An Invalid Guess is Made

function setMessage(msg, color){

    message.style.color = color;
    message.textContent = msg;

}


