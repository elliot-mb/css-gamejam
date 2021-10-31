export default class Healthbar{

    constructor(_max, _dims, _pos, _colour, _camera){
        this.max = _max;
        this.current;
        this.dims = _dims;
        this.pos = _pos;
        this.colour = _colour;
        this.camera = _camera;
    }

    update(dt, _current){
        this.current = _current;
    }

    draw(ctx){

        // console.log("healthbar drawn");

        // this.camera.cameraDraw(ctx, {
        //     pos: this.pos,
        //     dims: this.dims,
        //     colour: this.colour.secondary,
        //     visible: true
        // });

        // this.camera.cameraDraw(ctx, {
        //     pos: {
        //         x: ((this.max/this.current) * this.dims.x)/2, 
        //         y: this.pos.y
        //     },
        //     dims: {
        //         x: (this.max/this.current) * this.dims.x,
        //         y: this.dims.y
        //     },
        //     colour: this.colour.primary,
        //     visible: true
        // });

        //scaling for health so the bottom of the health bar is thicker
        const CONSTS = [0.07253815, 1.07821146531];
        const dispHealth = CONSTS[1] * ((Math.pow(1.3, this.current)/Math.pow(1.3, this.max)) - CONSTS[0]); //- 1/Math.pow(1.3, this.max); 

        const w2 = this.dims.w/2;
        const h2 = this.dims.h/2;

        ctx.fillStyle = this.colour.secondary;
        ctx.fillRect(this.pos.x - w2, this.pos.y - h2, w2 * 2, h2 * 2);

        ctx.fillStyle = this.colour.primary;
        ctx.fillRect(this.pos.x - w2, this.pos.y - h2, 
            w2 * 2 * dispHealth, h2 * 2);

    }
}