class Player {
  constructor(props) {
    this.player = props.player;
    this.name = props.name;
    this.hp = props.hp;
    this.img = props.img;
    this.weapon = props.weapon;
    this.changeHP
  }
  attack = () => {
    console.log(`${this.name} let is Fight...`);
  };
  changeHP = (changeHP) => {
    this.hp -= changeHP;
    if (this.hp <= 0) {
      this.hp = 0;
    }
    return this.hp;
  };
  elHP = () => {
    const $playerLife = document.querySelector(
      ".player" + this.player + " .life"
    );
    return $playerLife;
  };
  renderHP = () => {
    this.elHP().style.width = this.hp + "%";
  };
}
export default Player;