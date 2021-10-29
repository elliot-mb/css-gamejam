export default class Object{ //physics object

    constructor(_pos, _vel, _drag, _visible, _grav, _dims, _colour){
        this.pos = _pos;
        this.vel = _vel;
        this.drag = _drag;
        this.visible = _visible;
        this.grav = _grav; //is effected by gravity
        this.dims = _dims;
        this.colour = _colour;
    }

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

    draw(ctx, cx, cy){ //needs to take camera x and y
        const i = this.pos.x - cx + 960;
        const j = this.pos.y - cy + 540; //works the difference out between
        // camera position and object position (relative pos)

        const w2 = this.dims.w/2;
        const h2 = this.dims.h/2;

        ctx.fillStyle = this.colour;
        ctx.fillRect(i - w2, j - h2, w2 * 2, h2 * 2);
    }
}