import Player from "./player.js";
import { LOGS, getTime, generateLogs } from "./logs.js";
import { $form } from "./elements.js";
import Game from './game.js';

const game = new Game();
game.start();
generateLogs("start", game.player1,game.player2);
$form.addEventListener("submit", function (event) {
  event.preventDefault();
  game.mainFight();
  game.disableAllButtons();
});