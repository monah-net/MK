const $arena = document.querySelector('.arenas');
const $randomButton = document.querySelector('.control .button');

const player1 = {
    player: 1,
    name: 'SCORPION',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon: [],
    attack: function(name) {
        console.log(this.name + " Fight...")
    }
};

const player2 = {
    player: 2,
    name: 'SONYA',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/sonya.gif',
    weapon: [],
    attack: function(name) {
        ;'JSDBG';if(true)debugger; console.log(this.name + " Fight...")
    }
};

function mathRandom20(){
	return Math.ceil(Math.random() * 20);
}

function changeHP(player) {
    const $playerLife = document.querySelector('.player' + player.player + ' .life');
    player.hp -= mathRandom20();
    if (player.hp <= 0) {
        player.hp = 0;
    };
    $playerLife.style.width = player.hp + '%';
}

function clickHandler(event) {
    changeHP(player1);
    changeHP(player2);
    checkHP(player1, player2);
}

function playerWin(name) {
    const $winTitle = createElement('div', 'loseTitle');
    $winTitle.innerText = name + ' wins';

    return $winTitle;
}

function playersDraw() {
    $drawTitle = createElement('div', 'loseTitle');
    $drawTitle.innerText = 'DRAW!!!';
    return $drawTitle;
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

function checkHP(player1, player2) {
    if (player1.hp == 0 && player2.hp == 0) {
        $randomButton.disabled = 'true';
        $arena.appendChild(playersDraw());
    } else if (player1.hp == 0) {
        $randomButton.disabled = 'true';
        $arena.appendChild(playerWin(player2.name));
    } else if (player2.hp == 0) {
        $randomButton.disabled = 'true';
        $arena.appendChild(playerWin(player1.name));
    };
}

createPlayer(player1);
createPlayer(player2);
$randomButton.addEventListener('click', clickHandler);
