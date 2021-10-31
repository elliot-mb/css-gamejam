//this class will contain a pair of objects for every pair in the scene
export default class Collide{

    //object of interest, object checked against
    constructor(_subject, _object){ 

        this.subject = _subject;
        this.vertexS = {x: 0, y: 0};

        this.object = _object
        this.vertexO = {x: 0, y: 0};
    }

    getVert(ob1, ob2){ //checks the first object as the subject

        const w2 = ob1.dims.w/2;
        const h2 = ob1.dims.h/2;
        //offsets ob1's x with its with in the right direction
        const a = ob2.pos.x - ob1.pos.x + 0.01;
        const A = (Math.abs(a)/a); 
        // -1 or 1
        const x = ob1.pos.x + A * w2;

        const b = ob1.pos.y - ob2.pos.y - 0.01;
        const B = (Math.abs(b)/b); 
        // -1 or 1
        const y = ob2.pos.y + B * h2;

        return {
            x: x, 
            y: y, 
            A: A, //A and B encode the vertex that's enabled
            B: B
        };
    }

    resolve(objVert, dx, dy){
        //console.log(objVert, this.subject.pos.x);

        //multiplies by the complementary velocity so when something
        // is zooming into an object it doesnt fly out the other side
        if(this.object.collides){
            if(Math.abs(dx * this.subject.vel.j) < Math.abs(dy * this.subject.vel.i)) { 
                this.subject.pos.x += dx; 
                this.subject.vel.i = 0;
            } else {
                this.subject.pos.y -= dy;
                this.subject.vel.j = 0;
            }
        }
 
    }

    // symmetricResolve(dx, dy, n){

    //     switch(n){
    //         case 0:
    //             if(dy * dy > dx * dx){
    //                 this.subject.pos.x -= dx/2;
    //                 this.object.pos.x += dx/2;
    //             }else{
    //                 this.subject.pos.y -= dy/2;
    //                 this.object.pos.y += dy/2;
    //             }
    //             break;
    //         case 1: 
    //             if(dy * dy > dx * dx){
    //                 this.subject.pos.x += dx/2;
    //                 this.object.pos.x -= dx/2;
    //             }else{
    //                 this.subject.pos.y -= dy/2;
    //                 this.object.pos.y += dy/2;
    //             }
    //             break;
    //         case 2:
    //             if(dy * dy > dx * dx){
    //                 this.subject.pos.x += dx/2;
    //                 this.object.pos.x -= dx/2;
    //             }else{
    //                 this.subject.pos.y += dy/2;
    //                 this.object.pos.y -= dy/2;
    //             }
    //             break;
    //         case 3:
    //             if(dy * dy > dx * dx){
    //                 this.subject.pos.x -= dx/2;
    //                 this.object.pos.x += dx/2;
    //             }else{
    //                 this.subject.pos.y += dx/2;
    //                 this.object.pos.y -= dx/2;
    //             }
    //             break;
    //         default:
    //             break;
    //     }

    //     // if(Math.abs(dx * this.subject.vel.j) < Math.abs(dy * this.subject.vel.i)){
    //     //     this.subject.pos.x += dx/2;
    //     //     this.object.pos.x -= dx/2;
    //     //     //this.subject.vel.i = this.object.vel.i = 0;
    //     // } else {
    //     //     this.subject.pos.x -= dy/2;
    //     //     this.object.pos.y += dy/2;
    //     //     //this.subject.vel.j = this.subject.vel.j = 0;
    //     // }

    // }

    update(dt){

        //console.log(this.subject, this.object);
        // console.log(this.subject.nametag, this.object.nametag);

        //console.log(this.subject);
        //console.log(this.subject.nametag, this.object.nametag);
        //console.log(this.subject, this.object);

        const subVert = this.getVert(this.subject, this.object);
        const objVert = this.getVert(this.object, this.subject);

        const dx = objVert.x - subVert.x; //i1 - i2
        const dy = objVert.y - subVert.y; //j1 - j2

        let flag = false;
        let canJump = false;

        if(subVert.A == 1 && subVert.B == 1 && dx < 0 && dy < 0) { // bottom right
            // if(this.symmetric) { this.symmetricResolve(dx, dy, 0); }
            flag = true;
            this.resolve(objVert, dx, dy); 
        }
        else if(subVert.A == 1 && subVert.B == -1 && dx < 0 && dy > 0) { // top right
            if(this.object.jumpable) { canJump = true; }    
            flag = true;
            // if(this.symmetric) { this.symmetricResolve(dx, dy, 1); }
            this.resolve(objVert, dx, dy); 
        }
        else if(subVert.A == -1 && subVert.B == 1 && dx > 0 && dy < 0) { // bottom left
            //if(this.symmetric) { this.symmetricResolve(dx, dy, 2); }
            flag = true;
            this.resolve(objVert, dx, dy);
        }
        else if(subVert.A == -1 && subVert.B == -1 && dx > 0 && dy > 0) { // top left
            if(this.object.jumpable) { canJump = true; }
            flag = true;
            //if(this.symmetric) { this.symmetricResolve(dx, dy, 3); }
            this.resolve(objVert, dx, dy);
        }


        if (flag && (this.subject.collides || this.object.collides)) {  //subject takes precensence and lets both objects know that its colliding
            //console.log(`added ${this.object.nametag} to ${this.subject.nametag}`);
            this.subject.colliding.push(this.object); 
            this.object.colliding.push(this.subject);
        }
        if (canJump) { this.subject.canJump = true; }   
    }

}