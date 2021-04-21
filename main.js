import {player1,player2} from './player.js';
import {logs,getTime,generateLogs} from './logs.js';
import {createPlayer, mainFight,disableAllButtons} from './utils.js';
import {$form} from './elements.js';

createPlayer(player1);
createPlayer(player2);
generateLogs('start', player1, player2);
$form.addEventListener('submit', function(event) {
    event.preventDefault();
    mainFight();
    disableAllButtons();
});