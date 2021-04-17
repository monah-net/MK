const $arena = document.querySelector('.arenas');
const $reloadButton = document.querySelector('.reloadWrap .button');
const $form = document.querySelector('.control');

const HIT = {
    head: 30,
    body: 25,
    foot: 20,
}
const ATTACK = ['head', 'body', 'foot'];

const player1 = {
    player: 1,
    name: 'SCORPION',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon: [],
    attack: function(name) {
        console.log(this.name + " Fight...")
    },
    changeHP: changeHP,
    elHP: elHP,
    renderHP: renderHP
};

const player2 = {
    player: 2,
    name: 'SONYA',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/sonya.gif',
    weapon: [],
    attack: function(name) {
        console.log(this.name + " Fight...")
    },
    changeHP: changeHP,
    elHP: elHP,
    renderHP: renderHP
};


function getRandom(number) {
    return Math.ceil(Math.random() * number);
}

function createElement(tag, classElement) {
    $tag = document.createElement(tag);
    if (classElement) {
        $tag.classList.add(classElement);
    };
    return $tag;
}

function createPlayer(playerObj) {
    const classPlayer = 'player' + playerObj.player;
    const $player = createElement('div', classPlayer);
    const $progressbar = createElement('div', 'progressbar');
    const $character = createElement('div', 'character');
    const $life = createElement('div', 'life');
    const $name = createElement('div', 'name');
    const $img = createElement('img');

    $life.style.width = playerObj.hp + '%';
    $name.innerText = playerObj.name;
    $img.src = playerObj.img;
    $character.appendChild($img);
    $progressbar.appendChild($life);
    $progressbar.appendChild($name);
    $player.appendChild($progressbar);
    $player.appendChild($character);
    $arena.appendChild($player);
}

function changeHP(changeHP) {
    this.hp -= getRandom(20);
    if (this.hp <= 0) {
        this.hp = 0;
    }
    return this.hp;
}

function elHP() {
    const $playerLife = document.querySelector('.player' + this.player + ' .life');
    return $playerLife;
}

function renderHP() {
    this.elHP().style.width = this.hp + '%';
}

function mainFight() {
    const enemyActions = enemyAttack();
    const playerActions = playerAttack();

    if (playerActions.hit !== enemyActions.defence) {
        player2.changeHP(playerActions.value);
        player2.renderHP();
    }

    if (enemyActions.hit !== playerActions.defence) {
        player1.changeHP(enemyActions.value);
        player1.renderHP();

    }
    
    checkHP(player1, player2);
    if (checkStatus()) {
        $arena.appendChild(createReloadButton());
    };
}

function playerWins(name) {
    const $winTitle = createElement('div', 'loseTitle');
    if (name) {
        $winTitle.innerText = name + ' wins';
    } else {
        $winTitle.innerText = 'draw';
    };

    return $winTitle;
}

function checkHP(player1, player2) {
    if (player1.hp == 0 && player2.hp == 0) {
        $arena.appendChild(playerWins());
    } else if (player1.hp == 0) {
        $arena.appendChild(playerWins(player2.name));
    } else if (player2.hp == 0) {
        $arena.appendChild(playerWins(player1.name));
    };
}

function createReloadButton() {
    $reloadWrap = createElement('div', 'reloadWrap');
    $createReloadButton = createElement('button', 'button');
    $createReloadButton.textContent = 'reload';
    $reloadWrap.appendChild($createReloadButton);
    $createReloadButton.addEventListener('click', function() { window.location.reload() });
    return $reloadWrap;
}

function checkStatus() {
    let result;
    const winStatus = document.getElementsByClassName('loseTitle');
    if (winStatus[0]) {
        result = true;
    } else { result = false };
    return result;
}

function enemyAttack() {
    const hit = ATTACK[getRandom(3) - 1];
    const defence = ATTACK[getRandom(3) - 1];
    const value = HIT[hit];
    const enemyAttackObject = {
        hit: hit,
        defence: defence,
        value: value
    };
    return enemyAttackObject;
}

function playerAttack() {
    const playerAttackObj = {
        hit: ' ',
        defence: ' ',
        value: ' ',
    };

    for (let i of $form) {
        const item = i;
        if (item.type === 'radio' && item.name === 'hit' && item.checked) {
            playerAttackObj.hit = item.value;
        } else if (item.type === 'radio' && item.name === 'defence' && item.checked) {
            playerAttackObj.defence = item.value;
        }
    }
    playerAttackObj.value = HIT[playerAttackObj.hit];
    return playerAttackObj;
}

function disableAllButtons() {
    for (i of $form) {
        i.checked = false;
    };
}

createPlayer(player1);
createPlayer(player2);
$form.addEventListener('submit', function(event) {
    event.preventDefault();
    mainFight();
    disableAllButtons();
});