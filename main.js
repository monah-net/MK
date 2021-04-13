const $arena = document.querySelector('.arenas');
const $randomButton = document.querySelector('.control .button');
const $control = document.querySelector('.arenas .control');
const $reloadButton = document.querySelector('.reloadWrap .button');

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

function mathRandom(number) {
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
    this.hp -= mathRandom(20);
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
    const $playerLife = document.querySelector('.player' + this.player + ' .life');
    this.elHP().style.width = this.hp + '%';
}

function clickHandler(event) {
    player1.changeHP(mathRandom(20));
    player1.renderHP();
    player2.changeHP(mathRandom(20));
    player2.renderHP();

    checkHP(player1, player2);
    if(checkStatus()){
        createReloadButton();
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
        $randomButton.disabled = true;
        $arena.appendChild(playerWins());
    } else if (player1.hp == 0) {
        $randomButton.disabled = true;
        $arena.appendChild(playerWins(player2.name));
    } else if (player2.hp == 0) {
        $randomButton.disabled = true;
        $arena.appendChild(playerWins(player1.name));
    };
}

function createReloadButton(){
    $reloadWrap = createElement('div','reloadWrap');
    $createReloadButton = createElement('button','button');
    $createReloadButton.textContent = 'reload';
    $reloadWrap.appendChild($createReloadButton);
    $arena.appendChild($reloadWrap);
    $createReloadButton.addEventListener('click',function(){window.location.reload()});
}

function checkStatus(){
    let result;
    const winStatus = document.getElementsByClassName('loseTitle');
    if(winStatus[0]){
        result = true;
    } else { result = false};
    return result;
}

createPlayer(player1);
createPlayer(player2);
$randomButton.addEventListener('click', clickHandler);

