const playerOneIconClass = ".p-one-command";
const playerTwoIconClass = ".p-two-command";
const iconSize = "fa-3x";
let faIconStarter = "fa-hand-";
let playerOneIcon;
let playerTwoIcon;

/**
 * Sets the icon for the command that player one issued.
 * 
 * @param {String} icon the name of the icon to display (i.e., the command string)
 */
function setPlayerOneCommandIcon(icon) {
    $(playerOneIconClass).addClass(faIconStarter + icon);
    $(playerOneIconClass).addClass(iconSize);
    playerOneIcon = faIconStarter + icon;
}

/**
 * Sets the icon for the command that player two issued.
 * 
 * @param {String} icon the name of the icon to display (i.e., the command string)
 */
function setPlayerTwoCommandIcon(icon) {
    $(playerTwoIconClass).addClass(faIconStarter + icon);
    $(playerTwoIconClass).addClass(iconSize)
    playerTwoIcon = faIconStarter + icon;
}

/**
 * Removes the command icon classes for both players.
 */
function removeCommandIcons() {
    $(playerOneIconClass).removeClass(playerOneIcon);
    $(playerTwoIconClass).removeClass(playerTwoIcon);
}

/**
 * Sets the text in .game-text.
 * 
 * @param {String} text the text to display in .game-text.
 */
function setGameText(text) {
    $(".game-text").text(text);
}

/**
 * Sets the scoreboard text for player one and player two.
 * 
 * @param {Number} p1 player one's score 
 * @param {Number} p2 player two's score
 */
function setScoreboardText(p1, p2) {
    $(".player-one-score").text(p1);
    $(".player-two-score").text(p2);
}