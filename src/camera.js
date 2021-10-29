import Player from "./player.js";
import Object from "./object.js";

export default class Camera{

    constructor(_dims, _pos){
        this.smoothing = 80;
        this.dims = _dims;
        this.pos = _pos;
        this.scene = [ //array of objects
            new Player(
                {x: 0, y: 0}, 
                {i: 0, j: 0},
                {i: 0.2, j: 0.01},
                true,
                true,
                {w: 60, h: 100},
                `yellow` 
            ),
            new Object(
                {x: 0, y: 500},
                {i: 0, j: 0},
                {i: 1, j: 1}, //drag at 1 clamps the object in place
                true,
                false,
                {w: 1000, h: 50},
                `gray`
            ) 
        ];
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

    draw(ctx){
        //draws all objects relative to the camera
        this.scene.forEach(object =>{
            object.draw(ctx, this.pos.x, this.pos.y);
        });
    }

}