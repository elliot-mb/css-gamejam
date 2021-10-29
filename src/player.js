import Object from "./object.js";

export default class Player extends Object{

    constructor(_pos, _vel, _drag, _visible, _grav, _dims, _colour){
        super(_pos, _vel, _drag, _visible, _grav, _dims, _colour);

        //input state
        this.input = {
            w: 0,
            s: 0,
            a: 0,
            d: 0
        }
        //movement 
        // this.pos = {x: 0, y: 0};
        // this.vel = {i: 0, j: 0};
        this.agility = 0.5;
        // this.drag = {i: 0.2, j: 0.1};

        this.jumps = 2;
        this.jumpPower = 10; 
        this.jumpLock = false;
        //debug
        this.colour = `yellow`;
    }

    keystroke(code, state){ //keycode, on is 1 or 0

        switch(code){
            case 65: //A
                this.input.a = state;
                break;
            case 68: //D
                this.input.d = state;
                break;
            case 83: //S
                this.input.s = state;
                break;
            case 87: //W
                this.input.w = state;
                break;
            default:
                return;
        }

    }

    jump(){

        if((!this.jumpLock) && (this.input.w == 1) && (this.jumps > 0)){
            this.jumps--;
            this.vel.j = -this.jumpPower;
            this.jumpLock = true;
        }

        if(this.jumpLock && this.input.w == 0){ //stops player holding jump
            this.jumpLock = false;
        }
    }

    move(dt){
        //child-specific movement method
        this.vel.i += this.agility * (this.input.d - this.input.a);
        this.jump();
    }

    // draw(ctx){  
    //     const w2 = this.dims.w/2;
    //     const h2 = this.dims.h/2;

    //     ctx.fillStyle = this.colour;
    //     ctx.fillRect( - w2, - h2, w2 * 2, h2 * 2);
    //     // ctx.fillRect(this.pos.x - w2, this.pos.y - h2, 2 * w2, 2 * h2);        
    // }
}