const $arena = document.querySelector('.arenas');
const $reloadButton = document.querySelector('.reloadWrap .button');
const $form = document.querySelector('.control');
const $chat = document.querySelector('.chat');

const logs = {
    start: 'Часы показывали [time], когда [player1] и [player2] бросили вызов друг другу.',
    end: [
        'Результат удара [playerWins]: [playerLose] - труп',
        '[playerLose] погиб от удара бойца [playerWins]',
        'Результат боя: [playerLose] - жертва, [playerWins] - убийца',
    ],
    hit: [
        '[playerDefence] пытался сконцентрироваться, но [playerKick] разбежавшись раздробил копчиком левое ухо врага.',
        '[playerDefence] расстроился, как вдруг, неожиданно [playerKick] случайно раздробил грудью грудину противника.',
        '[playerDefence] зажмурился, а в это время [playerKick], прослезившись, раздробил кулаком пах оппонента.',
        '[playerDefence] чесал <вырезано цензурой>, и внезапно неустрашимый [playerKick] отчаянно размозжил грудью левый бицепс оппонента.',
        '[playerDefence] задумался, но внезапно [playerKick] случайно влепил грубый удар копчиком в пояс оппонента.',
        '[playerDefence] ковырялся в зубах, но [playerKick] проснувшись влепил тяжелый удар пальцем в кадык врага.',
        '[playerDefence] вспомнил что-то важное, но внезапно [playerKick] зевнув, размозжил открытой ладонью челюсть противника.',
        '[playerDefence] осмотрелся, и в это время [playerKick] мимоходом раздробил стопой аппендикс соперника.',
        '[playerDefence] кашлянул, но внезапно [playerKick] показав палец, размозжил пальцем грудь соперника.',
        '[playerDefence] пытался что-то сказать, а жестокий [playerKick] проснувшись размозжил копчиком левую ногу противника.',
        '[playerDefence] забылся, как внезапно безумный [playerKick] со скуки, влепил удар коленом в левый бок соперника.',
        '[playerDefence] поперхнулся, а за это [playerKick] мимоходом раздробил коленом висок врага.',
        '[playerDefence] расстроился, а в это время наглый [playerKick] пошатнувшись размозжил копчиком губы оппонента.',
        '[playerDefence] осмотрелся, но внезапно [playerKick] робко размозжил коленом левый глаз противника.',
        '[playerDefence] осмотрелся, а [playerKick] вломил дробящий удар плечом, пробив блок, куда обычно не бьют оппонента.',
        '[playerDefence] ковырялся в зубах, как вдруг, неожиданно [playerKick] отчаянно размозжил плечом мышцы пресса оппонента.',
        '[playerDefence] пришел в себя, и в это время [playerKick] провел разбивающий удар кистью руки, пробив блок, в голень противника.',
        '[playerDefence] пошатнулся, а в это время [playerKick] хихикая влепил грубый удар открытой ладонью по бедрам врага.',
    ],
    defence: [
        '[playerKick] потерял момент и храбрый [playerDefence] отпрыгнул от удара открытой ладонью в ключицу.',
        '[playerKick] не контролировал ситуацию, и потому [playerDefence] поставил блок на удар пяткой в правую грудь.',
        '[playerKick] потерял момент и [playerDefence] поставил блок на удар коленом по селезенке.',
        '[playerKick] поскользнулся и задумчивый [playerDefence] поставил блок на тычок головой в бровь.',
        '[playerKick] старался провести удар, но непобедимый [playerDefence] ушел в сторону от удара копчиком прямо в пятку.',
        '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.',
        '[playerKick] не думал о бое, потому расстроенный [playerDefence] отпрыгнул от удара кулаком куда обычно не бьют.',
        '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.'
    ],
    draw: 'Ничья - это тоже победа!'
};

function getTime() {
    // setInterval(getTime, 10);
    return new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds();
}

function generateLogs(type, player1, player2, playerHP, hp) {

    let temp = '';
    switch (type) {
        case 'start':
            temp = logs[type].replaceAll('[time]', getTime()).replaceAll('[player1]', player1.name).replaceAll('[player2]', player2.name);
            break;
        case 'end':
            temp = getTime() + ' ' + logs[type][getRandom(logs[type].length - 1)].replaceAll('[playerWins]', player1.name).replaceAll('[playerLose]', player2.name);
            break;
        case 'hit':
            temp = getTime() + ' ' + logs[type][getRandom(logs[type].length - 1)].replaceAll('[playerKick]', player1.name).replaceAll('[playerDefence]', player2.name) + ' -' + playerHP + 'hp ' + hp + '/100';
            break;
        case 'defence':
            temp = getTime() + ' ' + logs[type][getRandom(logs[type].length - 1)].replaceAll('[playerKick]', player1.name).replaceAll('[playerDefence]', player2.name) + ' -' + playerHP + 'hp ' + hp + '/100';
            break;
        case 'draw':
            temp = getTime() + ' ' + logs[type];
            break;
    }
    const el = `<p>${temp}</p>`;
    $chat.insertAdjacentHTML("afterbegin", el);
}

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
    this.hp -= changeHP;
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
    console.log('###enemyActions.value###' + enemyActions.value);
    console.log('###playerActions.value###' + playerActions.value);

    if (playerActions.hit !== enemyActions.defence) {
        player2.changeHP(playerActions.value);
        player2.renderHP();
        generateLogs('hit', player1, player2, playerActions.value, player2.hp);

    } else {
        generateLogs('defence', player1, player2, playerActions.value, player2.hp);
    }

    if (enemyActions.hit !== playerActions.defence) {
        player1.changeHP(enemyActions.value);
        player1.renderHP();
        generateLogs('hit', player2, player1, enemyActions.value, player1.hp);
    } else {
        generateLogs('defence', player2, player1,player1.hp);
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
        generateLogs('draw');
    };

    return $winTitle;
}

function checkHP(player1, player2) {
    if (player1.hp == 0 && player2.hp == 0) {
        $arena.appendChild(playerWins());
        generateLogs('draw');
    } else if (player1.hp == 0) {
        $arena.appendChild(playerWins(player2.name));
        generateLogs('end', player2, player1);
    } else if (player2.hp == 0) {
        $arena.appendChild(playerWins(player1.name));
        generateLogs('end', player1, player2);
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
generateLogs('start', player1, player2);
$form.addEventListener('submit', function(event) {
    event.preventDefault();
    mainFight();
    disableAllButtons();
});