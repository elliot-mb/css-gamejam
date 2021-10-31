import Enemy from "./enemy.js";

export default class EnemyHandler{

    constructor(_wave, _player){
        this.enemies = [];
        this.wave = _wave
        this.player = _player;
    }

    initialise(_camera){
        for(let i = 0; i < this.wave; i++){
            this.enemies.push(
            new Enemy({
                nametag: "enemy",
                pos: {x: Math.random() * 5000, y: 400},
                vel: {i: -2, j: 0},
                drag: {i: 0.2, j: 0.02},
                visible: true,
                grav: true,
                simulated: true,
                dims: {w: 60, h: 100},
                colour: `red`,
                collides: false,
                jumpable: false,
                camera: _camera
            }, this.player, 0.04, 100)
            );
        }
    }

    update(dt, timestamp){
        this.enemies.forEach(enemy => {
            enemy.move(dt, timestamp);
        });
    }

    draw(ctx){
        this.enemies.forEach(enemy =>{
            enemy.hurtbox.draw(ctx);
        })
    }


}