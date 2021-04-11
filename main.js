const SCORPION =  'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif';
const KITANA = 'http://reactmarathon-api.herokuapp.com/assets/kitana.gif';
const LIUKANG = 'http://reactmarathon-api.herokuapp.com/assets/liukang.gif';
const SONYA = 'http://reactmarathon-api.herokuapp.com/assets/sonya.gif';
const SUBZERO = 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif';


function attack (playerName) {
	console.log(playerName + " Fight!");
};
const scorpion = {
	name : 'Scorpion',
	hp : 100,
	img : 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
	weapon : [],
	attack : function attack(name){
	console.log(scorpion.name + " Fight!")
}};
const sonya = {
	name : 'Sonya',
	hp : 100,
	img : 'http://reactmarathon-api.herokuapp.com/assets/sonya.gif',
	weapon : [],
	attack : function attack(name){
	console.log(sonya.name + " Fight!")
}};

function createPlayer (playerNumber,playerName,playerLife){
	const $player = document.createElement('div');
	$player.classList.add(playerNumber);
	const $progressbar = document.createElement('div');
	$progressbar.classList.add('progressbar');
	const $character = document.createElement('div');
	$character.classList.add('character');
	const $life = document.createElement('div');
	$life.classList.add('life');
	$life.setAttribute('style.width', '100%');
	$life.style.width = playerLife + '%';
	const $name = document.createElement('div');
	$name.classList.add('name');
	$name.innerText = playerName;
	const $img = document.createElement('img');
	$img.src = eval(playerName);
	$character.appendChild($img);
	$progressbar.appendChild($life);
	$progressbar.appendChild($name);
	$player.appendChild($progressbar);
	$player.appendChild($character);
	const $arena = document.querySelector('.arenas');
	$arena.appendChild($player);
};

createPlayer('player1','SCORPION',10);
createPlayer('player2','SONYA',70);

