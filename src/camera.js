import Player from "./player.js";
import Object from "./object.js";
import Collide from "./collide.js";
import Enemy from "./enemy.js";
import EnemyHandler from "./enemyhandle.js";

export default class Camera{

    constructor(_dims, _pos, _offset){
        this.smoothing = 80;
        this.dims = _dims;
        this.pos = _pos;
        this.offset = _offset;
        this.enemyHandler;

        this.player = 
        new Player({
            nametag: "player",
            pos: {x: 1, y: 0}, 
            vel: {i: 0, j: 0},
            drag: {i: 0.2, j: 0.01},
            visible: true,
            grav: true,
            simulated: true,
            dims: {w: 60, h: 100},
            colour: `yellow`,
            collides: true,
            jumpable: false,
            camera: this
        });

        this.scene = [ //array of objects (all simulated objects must go at the start)
            this.player,
            new Object({ //floor 
                nametag: "floor",
                pos: {x: 0, y: 1000},
                vel: {i: 0, j: 0},
                drag: {i: 1, j: 1}, //drag at 1 clamps the object in place
                visible: true,
                grav: false,
                simulated: false,
                dims: {w: 10000, h: 500},
                colour: `gray`,
                collides: true,
                jumpable: true,
                camera: this
            }),
            new Object({ //wall
                nametag: "floor",
                pos: {x: 0, y: 699},
                vel: {i: 0, j: 0},
                drag: {i: 1, j: 1}, //drag at 1 clamps the object in place
                visible: true,
                grav: false,
                simulated: false,
                dims: {w: 300, h: 100},
                colour: `gray`,
                collides: true,
                jumpable: true,
                camera: this
            }),
            new Object({ //wall
                nametag: "floor",
                pos: {x: -300, y: 700},
                vel: {i: 0, j: 0},
                drag: {i: 1, j: 1}, //drag at 1 clamps the object in place
                visible: true,
                grav: false,
                simulated: false,
                dims: {w: 300, h: 60},
                colour: `gray`,
                collides: true,
                jumpable: true,
                camera: this
            }),
            new Object({
                nametag: "wall",
                pos: {x: -960, y: 0},
                vel: {i: 0, j: 0},
                drag: {i: 1, j: 1},
                visible: true,
                grav: false,
                simulated: false,
                dims: {w: 10, h: 10000},
                colour: `white`,
                collides: true,
                jumpable: false,
                camera: this
            })
        ];

        this.collides = [];
        this.staticObjects = 4;
    }

    initialiseColliders(){

        //symmetric collider pairs for dynamic entities
        for(let i = 0; i < this.scene.length - this.staticObjects; i++){
            for(let j = i + 1; j < this.scene.length - this.staticObjects; j++){
                this.collides.push(new Collide(this.scene[i], this.scene[j], true));
            }
        }

        for(let i = 0; i < this.scene.length - this.staticObjects; i++){
            for(let j = this.scene.length - this.staticObjects; j < this.scene.length; j++){
                this.collides.push(new Collide(this.scene[i], this.scene[j], false));
            }
        }

        // // creates a collide object for all pairs 
        // for(let i = 0; i < this.scene.length; i++){
        //     for(let j = i + 1; j < this.scene.length; j++){
        //         if(this.scene[i].simulated) {
        //              this.collides.push(new Collide(this.scene[i], this.scene[j])); 
        //         }
        //         //if the entity is simulated 
        //     }
        // }
    }

    initialisePlayerEnemies(){
        this.enemyHandler = new EnemyHandler(100, this.player);
        this.enemyHandler.initialise();

        this.enemyHandler.enemies.forEach(enemy =>{
            this.scene.splice(1, 0, enemy);
        });

        for(let i = 1; i < this.scene.length - 2; i++){
            this.collides.push(new Collide(this.player.hurtbox, this.scene[i]));
        }

        console.log(this.collides);
    }

    update(dt){

        //smoothly moves the camera to the player
        this.pos = {
            x: this.pos.x + 
            ((this.scene[0].pos.x - this.pos.x)/this.smoothing) * dt,
            y: this.pos.y + 
            ((this.scene[0].pos.y - this.pos.y)/this.smoothing) * dt
        };

    }

    /* Following method requires objects with:
        - pos
        - dims
        - colour 
        - visible 
    */

    cameraDraw(ctx, object){ //needs to take camera x and y
        //console.log(object);
        const i = object.pos.x - this.pos.x + this.offset.x + 960;
        const j = object.pos.y - this.pos.y + this.offset.y + 540; //works the difference out between
        // camera position and object position (relative pos)

        const w2 = object.dims.w/2;
        const h2 = object.dims.h/2;

        ctx.fillStyle = object.colour;
        if(object.visible){ ctx.fillRect(i - w2, j - h2, w2 * 2, h2 * 2); }
    }

}