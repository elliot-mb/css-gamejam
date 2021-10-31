import Healthbar from "./healthbar.js";
import Object from "./object.js";
import Collide from "./collide.js";

export default class Player extends Object{

    constructor(properties){
        super(properties);

        this.health = 10;
        this.bar = new Healthbar(
            this.health, 
            {w: 740, h: 50}, 
            {x: 400, y: 60}, 
            {primary: `#dd8822`, secondary: `white`},
            properties.camera
        );
        this.hurtbox = new Object({ //hurtbox
            nametag: "hurtbox",
            pos: this.pos,
            vel: {i: 0, j: 0},
            drag: {i: 1, j: 1},
            visible: true,
            grav: false,
            simulated: true,
            dims: {w: 200, h: 200},
            colour: `green`,
            collides: false, 
            jumpable: false,
            camera: properties.camera 
        });
        this.bladeDuration = 100; //ms
        this.bladeDisable = Math.pow(10, 100);
        this.hitLock = false;

        //input state
        this.input = {
            w: 0,
            s: 0,
            a: 0,
            d: 0, 
            sp: 0
        }
        //movement 
        // this.pos = {x: 0, y: 0};
        // this.vel = {i: 0, j: 0};
        this.agility = 0.5;
        // this.drag = {i: 0.2, j: 0.1};

        this.jumps = 2;
        this.jumpPower = 5; 
        this.jumpLock = false;
        this.canJump = false;
        //debug
        this.colour = properties.colour;
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
            case 32: //space
                this.input.sp = state;
                break;
            default:
                return;
        }

    }

    jump(){

        if((!this.jumpLock) && (this.input.w == 1) && (this.jumps > 0)){
            //console.log("jump");
            this.jumps--;
            this.vel.j = -this.jumpPower;
            this.jumpLock = true;
        }

        if(this.jumpLock && this.input.w == 0){ //stops player holding jump
            this.jumpLock = false;
        }
    }

    attack(timestamp){

        const BIG = Math.pow(10, 100);

        //console.log(timestamp);

        if(this.input.sp == 1 && timestamp < this.bladeDisable){ 
            this.hurtbox.pos = {
                x: this.pos.x + (100 * (Math.abs(this.vel.i)/this.vel.i)),
                y: this.pos.y - 50
            }; 
            this.hurtbox.collides = true;
            this.hurtbox.visible = true;
            if(!this.hitLock){
                this.bladeDisable = timestamp + this.bladeDuration;
                console.log(this.bladeDisable);
                this.hitLock = true;
            }
        }else{
            this.hurtbox.collides = false;
            this.hurtbox.visible = false;
            this.hitLock = false;
        }

        if(this.input.sp == 0){ this.bladeDisable = BIG; }
    }

    move(dt, timestamp){
        //child-specific movement method
        this.vel.i += this.agility * (this.input.d - this.input.a);
        if(this.canJump) { this.jumps = 2; } 
        this.jump();
        this.attack(timestamp);
    }

    // draw(ctx){  
    //     const w2 = this.dims.w/2;
    //     const h2 = this.dims.h/2;

    //     ctx.fillStyle = this.colour;
    //     ctx.fillRect( - w2, - h2, w2 * 2, h2 * 2);
    //     // ctx.fillRect(this.pos.x - w2, this.pos.y - h2, 2 * w2, 2 * h2);        
    // }
}