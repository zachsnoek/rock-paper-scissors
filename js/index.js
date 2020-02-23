// Rock paper scissors game commands
const commands = {
    "null": {"name": "null", "value": 0},
    "rock": {"name": "rock", "value": 1},
    "paper": {"name": "paper", "value": 2},
    "scissors": {"name": "scissors", "value": 3}
};

// Score values for player one and player two
let playerOneScore;
let playerTwoScore;

// Command objects for the command issued by the players
let playerOneCommand;
let playerTwoCommand;

// Variables used to determine if a control command (reset and start) or 
// game command (rock/paper/scissors) can be issued
let controlCommandsAllowed = true;  // for reset and start commands
let gameCommandsAllowed = false;    // for rock/paper/scissors commands

// Variables for setting the countdown text
const countdownText = ["Paper", "Scissors", "Shoot!"];
let i = 0;
let interval;

reset();

$(document).bind("keypress", function(e) {
    const key = e.originalEvent.key;

    if (controlCommandsAllowed) {
        switch (key) {
            case "n": start(); break;
            case "r": reset(); break;
            default: break;
        }
    }

    if (gameCommandsAllowed) {
        switch (key) {
            case "a": setPlayerOneCommand(commands.rock); break;
            case "s": setPlayerOneCommand(commands.paper); break;
            case "d": setPlayerOneCommand(commands.scissors); break;
            case "j": setPlayerTwoCommand(commands.rock); break;
            case "k": setPlayerTwoCommand(commands.paper); break;
            case "l": setPlayerTwoCommand(commands.scissors); break;
            default: break;
        }
    }
})

/**
 * Starts the round; resets the commands of both players, removes the 
 * command icons, and starts the countdown text.
 */
function start() {
    controlCommandsAllowed = false;
    playerOneCommand = playerTwoCommand = commands.null;
    removeCommandIcons();
    setGameText("Rock");
    i = 0;
    interval = setInterval(countdown, 1000);
}

/**
 * Resets the scores and commands of both players, updates the scoreboard
 * text, removes command icons, and clears .game-text.
 */
function reset() {
    playerOneScore = playerTwoScore = 0;
    playerOneCommand = playerTwoCommand = commands.null;
    updateScoreboard();
    removeCommandIcons();
    setGameText("");
}

/**
 * Counts down from 3 to 1 and then allows player commands to be entered for 
 * two seconds. Then, the score is computed and the scoreboard is updated.
 */
function countdown() {
    setGameText(countdownText[i]);  // Sets .game-text to the next item in countdownText

    if (++i == 3) {
        clearInterval(interval);
        gameCommandsAllowed = true;

        setTimeout(function() {
            gameCommandsAllowed = false;
            controlCommandsAllowed = true;
            score();
            updateScoreboard();
        }, 2000);
    }
}

/**
 * Sets the command for player one and sets its command icon.
 * 
 * @param {Command} command the command issued by player one.
 */
function setPlayerOneCommand(command) {
    if (playerOneCommand.value == commands.null.value) {
        playerOneCommand = command;
        setPlayerOneCommandIcon(command.name);
    }
}

/**
 * Sets the command for player two and sets the its command icon.
 * 
 * @param {Command} command the command issued by player two.
 */
function setPlayerTwoCommand(command) {
    if (playerTwoCommand.value == commands.null.value) {
        playerTwoCommand = command;
        setPlayerTwoCommandIcon(command.name);
    }
}

/**
 * Determines the winner of the round and updates the scores and 
 * .game-text.
 */
function score() {
    let p1 = playerOneCommand.value;
    let p2 = playerTwoCommand.value;

    if (p1 == p2) {
        setGameText("Draw!");
    } else if (p1 == 0) {
        playerTwoScore++;
        setGameText("Player 1 forfeits!");
    } else if (p2 == 0) {
        playerOneScore++;
        setGameText("Player 2 forfeits!");
    } else if (p1 > p2) {
        if (p1 - p2 == 1) {
            playerOneScore++;
            setGameText("Player 1 wins!");
        } else {
            playerTwoScore++;
            setGameText("Player 2 wins!");
        }
    } else {
        if (p2 - p1 == 1) {
            playerTwoScore++;
            setGameText("Player 2 wins!");
        } else {
            playerOneScore++;
            setGameText("Player 1 wins!");
        }
    }
}

/**
 * Helper function that updates the scoreboard text with the players' scores.
 */
function updateScoreboard() {
    setScoreboardText(playerOneScore, playerTwoScore);
}