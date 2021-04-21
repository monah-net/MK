import { player1, player2, HIT, ATTACK } from "./player.js";
import { $arena, $reloadButton, $form, $chat } from "./elements.js";
import { generateLogs } from "./logs.js";
export function getRandom(number) {
  return Math.ceil(Math.random() * number);
}

export function createElement(tag, classElement) {
  const $tag = document.createElement(tag);
  if (classElement) {
    $tag.classList.add(classElement);
  }
  return $tag;
}

export function createPlayer(playerObj) {
  const classPlayer = "player" + playerObj.player;
  const $player = createElement("div", classPlayer);
  const $progressbar = createElement("div", "progressbar");
  const $character = createElement("div", "character");
  const $life = createElement("div", "life");
  const $name = createElement("div", "name");
  const $img = createElement("img");

  $life.style.width = playerObj.hp + "%";
  $name.innerText = playerObj.name;
  $img.src = playerObj.img;
  $character.appendChild($img);
  $progressbar.appendChild($life);
  $progressbar.appendChild($name);
  $player.appendChild($progressbar);
  $player.appendChild($character);
  $arena.appendChild($player);
}

export function changeHP(changeHP) {
  this.hp -= changeHP;
  if (this.hp <= 0) {
    this.hp = 0;
  }
  return this.hp;
}

export function elHP() {
  const $playerLife = document.querySelector(
    ".player" + this.player + " .life"
  );
  return $playerLife;
}

export function renderHP() {
  this.elHP().style.width = this.hp + "%";
}

export function mainFight() {
  const enemyActions = enemyAttack();
  const playerActions = playerAttack();
  console.log("###enemyActions.value###" + enemyActions.value);
  console.log("###playerActions.value###" + playerActions.value);

  if (playerActions.hit !== enemyActions.defence) {
    player2.changeHP(playerActions.value);
    player2.renderHP();
    generateLogs("hit", player1, player2, playerActions.value, player2.hp);
  } else {
    generateLogs("defence", player1, player2, playerActions.value, player2.hp);
  }

  if (enemyActions.hit !== playerActions.defence) {
    player1.changeHP(enemyActions.value);
    player1.renderHP();
    generateLogs("hit", player2, player1, enemyActions.value, player1.hp);
  } else {
    generateLogs("defence", player2, player1, player1.hp);
  }

  checkHP(player1, player2);
  if (checkStatus()) {
    $arena.appendChild(createReloadButton());
  }
}

export function playerWins(name) {
  const $winTitle = createElement("div", "loseTitle");
  if (name) {
    $winTitle.innerText = name + " wins";
  } else {
    $winTitle.innerText = "draw";
    generateLogs("draw");
  }

  return $winTitle;
}

export function checkHP(player1, player2) {
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
}

export function createReloadButton() {
  const $reloadWrap = createElement("div", "reloadWrap");
  const $createReloadButton = createElement("button", "button");
  $createReloadButton.textContent = "reload";
  $reloadWrap.appendChild($createReloadButton);
  $createReloadButton.addEventListener("click", function () {
    window.location.reload();
  });
  return $reloadWrap;
}

export function checkStatus() {
  let result;
  const winStatus = document.getElementsByClassName("loseTitle");
  if (winStatus[0]) {
    result = true;
  } else {
    result = false;
  }
  return result;
}

export function enemyAttack() {
  const hit = ATTACK[getRandom(3) - 1];
  const defence = ATTACK[getRandom(3) - 1];
  const value = HIT[hit];
  const enemyAttackObject = {
    hit: hit,
    defence: defence,
    value: value,
  };
  return enemyAttackObject;
}

export function playerAttack() {
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
  playerAttackObj.value = HIT[playerAttackObj.hit];
  return playerAttackObj;
}

export function disableAllButtons() {
  for (const i of $form) {
    i.checked = false;
  }
}
