import Camera from "./camera.js";

export default class Object{ //physics object

    constructor(properties){
        this.nametag = properties.nametag;
        this.pos = properties.pos;
        this.vel = properties.vel;
        this.drag = properties.drag;
        this.visible = properties.visible;
        this.grav = properties.grav; //is effected by gravity
        this.simulated = properties.simulated;
        this.dims = properties.dims;
        this.colour = properties.colour;
        this.colliding = []; //comprehensive list of collisions with current object
        this.collides = properties.collides; 
        this.jumpable = properties.jumpable;
        this.camera = properties.camera; 
    }

    hurt(){ /* empty hurt method so it can be called on all objects */ }

    update(dt){
        const G = 0.1981;

        if(this.grav){
            this.vel.j += G;
        }

        this.vel = { //drag
            i: this.vel.i * (1 - this.drag.i),
            j: this.vel.j * (1 - this.drag.j)
        };

        this.pos = { //pos change
            x: this.pos.x + this.vel.i * dt * 0.5,
            y: this.pos.y + this.vel.j * dt * 0.5
        };

        //console.log(this.pos, this.acc, dt);
    }

    draw(ctx){ this.camera.cameraDraw(ctx, this); }

    // draw(ctx, pos, offset){ //needs to take camera x and y
    //     const i = this.pos.x - pos.x + offset.x + 960;
    //     const j = this.pos.y - pos.y + offset.y + 540; //works the difference out between
    //     // camera position and object position (relative pos)

    //     const w2 = this.dims.w/2;
    //     const h2 = this.dims.h/2;

    //     ctx.fillStyle = this.colour;
    //     if(this.visible){ ctx.fillRect(i - w2, j - h2, w2 * 2, h2 * 2); }
    // }
}