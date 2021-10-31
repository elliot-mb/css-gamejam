import Enemy from "./enemy.js";

export default class EnemyHandler{

    constructor(_wave, _player){
        this.enemies = [];
        this.wave = _wave
        this.player = _player;
    }

    initialise(){
        for(let i = 0; i < this.wave; i++){
            this.enemies.push(
            new Enemy({
                nametag: "enemy",
                pos: {x: 500, y: 400},
                vel: {i: -2, j: 0},
                drag: {i: 0, j: 0.02},
                visible: true,
                grav: true,
                simulated: true,
                dims: {w: 60, h: 100},
                colour: `red`,
                collides: false,
                jumpable: false,
                camera: this
            }, this.player, 0.04, 100)
            );
        }
    }

    update(dt){
        this.enemies.forEach(enemy => {
            enemy.move(dt);
        });
    }


}