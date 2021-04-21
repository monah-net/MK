import {changeHP,elHP,renderHP} from './utils.js';
export const player1 = {
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

export const player2 = {
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

export const HIT = {
    head: 30,
    body: 25,
    foot: 20,
}
export const ATTACK = ['head', 'body', 'foot'];
