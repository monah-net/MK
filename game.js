import Player from "./player.js";
import { $arena, $reloadButton, $form, $chat } from "./elements.js";
import { generateLogs } from "./logs.js";
import { getRandom } from "./utils.js";

class Game {
  static HIT = {
    head: 30,
    body: 25,
    foot: 20,
  };
  static ATACK = ["head", "body", "foot"];

  start = () => {
    this.player1 = new Player({
      player: 1,
      name: "Scorpion",
      hp: 100,
      img: "http://reactmarathon-api.herokuapp.com/assets/scorpion.gif",
    });

    this.player2 = new Player({
      player: 2,
      name: "Sonya",
      hp: 100,
      img: "http://reactmarathon-api.herokuapp.com/assets/sonya.gif",
    });
    this.createPlayer(this.player1);
    this.createPlayer(this.player2);
  };
  createElement = (tag, classElement) => {
    const $tag = document.createElement(tag);
    if (classElement) {
      $tag.classList.add(classElement);
    }
    return $tag;
  };

  createPlayer = ({ player, hp, name, img }) => {
    const classPlayer = `player${player}`;
    const $player = this.createElement("div", classPlayer);
    const $progressbar = this.createElement("div", "progressbar");
    const $character = this.createElement("div", "character");
    const $life = this.createElement("div", "life");
    const $name = this.createElement("div", "name");
    const $img = this.createElement("img");

    $life.style.width = hp + "%";
    $name.innerText = name;
    $img.src = img;
    $character.appendChild($img);
    $progressbar.appendChild($life);
    $progressbar.appendChild($name);
    $player.appendChild($progressbar);
    $player.appendChild($character);
    $arena.appendChild($player);
  };

  createReloadButton = () => {
    const $reloadWrap = createElement("div", "reloadWrap");
    const $createReloadButton = createElement("button", "button");
    $createReloadButton.textContent = "reload";
    $reloadWrap.appendChild($createReloadButton);
    $createReloadButton.addEventListener("click", function () {
      window.location.reload();
    });
    $arena.appendChild($reloadWrap);
  };

  mainFight = () => {
    const enemyActions = this.enemyAttack();
    const playerActions = this.playerAttack();
    if (playerActions.hit !== enemyActions.defence) {
      this.player2.changeHP(playerActions.value);
      this.player2.renderHP();
      generateLogs(
        "hit",
        this.player1,
        this.player2,
        playerActions.value,
        this.player2.hp
      );
    } else {
      generateLogs(
        "defence",
        this.player1,
        this.player2,
        playerActions.value,
        this.player2.hp
      );
    }

    if (enemyActions.hit !== playerActions.defence) {
      this.player1.changeHP(enemyActions.value);
      this.player1.renderHP();
      generateLogs(
        "hit",
        this.player2,
        this.player1,
        enemyActions.value,
        this.player1.hp
      );
    } else {
      generateLogs("defence", this.player2, this.player1, this.player1.hp);
    }
    this.checkHP;
    console.log(this.checkStatus === true)
    if (this.checkStatus) {
      this.createReloadButton;
    }
  };

  playerWins = (name) => {
    const $winTitle = createElement("div", "loseTitle");
    if (name) {
      $winTitle.innerText = name + " wins";
    } else {
      $winTitle.innerText = "draw";
      generateLogs("draw");
    }

    return $winTitle;
  };

  checkHP = (player1, player2) => {
    if (player1.hp == 0 && player2.hp == 0) {
      $arena.appendChild(playerWins());
      generateLogs("draw");
    } else if (player1.hp == 0) {
      $arena.appendChild(playerWins(player2.name));
      generateLogs("end", player2, player1);
    } else if (player2.hp == 0) {
      $arena.appendChild(playerWins(player1.name));
      generateLogs("end", player1, player2);
    }
  };

  checkStatus = () => {
    let result;
    const winStatus = document.getElementsByClassName("loseTitle");
    if (winStatus[0]) {
      result = true;
    } else {
      result = false;
    }
    return result;
  };

  enemyAttack = () => {
    const hit = Game.ATACK[getRandom(3) - 1];
    const defence = Game.ATACK[getRandom(3) - 1];
    const value = Game.HIT[hit];
    const enemyAttackObject = {
      hit: hit,
      defence: defence,
      value: value,
    };
    return enemyAttackObject;
  };

  playerAttack = () => {
    const playerAttackObj = {
      hit: " ",
      defence: " ",
      value: " ",
    };

    for (let i of $form) {
      const item = i;
      if (item.type === "radio" && item.name === "hit" && item.checked) {
        playerAttackObj.hit = item.value;
      } else if (
        item.type === "radio" &&
        item.name === "defence" &&
        item.checked
      ) {
        playerAttackObj.defence = item.value;
      }
    }
    playerAttackObj.value = Game.HIT[playerAttackObj.hit];
    return playerAttackObj;
  };

  disableAllButtons = () => {
    for (const i of $form) {
      i.checked = false;
    }
  };
}
export default Game;
