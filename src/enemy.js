import Object from "./object.js";

export default class Enemy extends Object{
    
    constructor(properties, _player, _agility, _health){
        super(properties);

        this.hurtbox = new Object({ //hurtbox
            nametag: "hurtbox-enemy",
            pos: this.pos,
            vel: {i: 0, j: 0},
            drag: {i: 1, j: 1},
            visible: false,
            grav: false,
            simulated: false,
            dims: {w: 150, h: 125},
            colour: `#2244ffaa`,
            collides: false, 
            jumpable: false,
            camera: properties.camera 
        });
        this.player = _player;
        this.health = _health;
        this.hit = false;
        this.hitTime = 0;
        this.cooldown = 300; //ms
        this.jumped = false;
        this.seed = Math.round(Math.random() * 100);
        this.agility = _agility;

    }

    find(objects, _nametag){
        let flag = undefined

        objects.forEach(object => {
            if(object.nametag == _nametag){
                flag = object;
            }
        });
        
        return flag;
    }

    knockback(subject, object){

        const dx = object.pos.x - subject.pos.x;
        const dy = object.pos.y - subject.pos.y;

        object.pos.y -= 2;
        object.vel.j = (Math.random() + 0.5) * -3;
        object.vel.i = (Math.random() + 0.5) * 3 * (Math.abs(dx)/dx);

    }

    hurt(timestamp){
        console.log(this.find(this.colliding, "hurtbox"));
        if(this.find(this.colliding, "hurtbox")){
            if(!this.hit) { 
                this.health -= 10; 
                console.log(this.health);
                this.knockback(this.player, this);
                this.hitTime = timestamp + this.cooldown;
                this.hit = true;
                this.colour = `#ff6666`;
            }
        }

        if(this.player.input.sp == 0 && this.hit && timestamp > this.hitTime){
            this.hit = false; //reset so the enemy can take damage again
            this.colour = `red`;
        } 
        
        this.die();
        //console.log(`${this.health}hp`);
    }

    die(){
        if(this.health <= 0){
            this.vel.pos = {i: 0, j: 0};
            this.colour = `#550000`;
            this.pos = {x: -1000, y: 0};
        }
    }

    attack(timestamp, flag){
        if((Math.round(timestamp/100) + this.seed) % 10 == 0 && flag){
            const w2 = this.hurtbox.dims.w/2;
            const dx = this.player.pos.x - this.pos.x;
            
            this.hurtbox.pos.x = this.pos.x + (w2 * Math.abs(dx) / dx);
            this.hurtbox.pos.y = this.pos.y;

            this.hurtbox.collides = this.hurtbox.visible = true;

            // if(this.find(this.hurtbox.colliding, "player")){
            //     this.hurtbox.collides = false;
            //     this.hurtbox.visible = false;
            // }
            //console.log(`${Math.round(timestamp/10)}`);
        }else{
            this.hurtbox.collides = false;
            this.hurtbox.visible = false;
            this.hurtbox.pos = {x: -1000, y: -1000};
        }
    }

    move(dt, timestamp){
        const dx = this.pos.x - this.player.pos.x;
        const dy = this.pos.y - this.player.pos.y; 

        let flag;

        if(dx * dx > 10000) { 
            if(this.find(this.colliding, "floor")) { 
                this.vel.i = (Math.log(dx * dx) / (Math.abs(dx)/dx)) * (0.75 + this.seed/(100/0.75)) * this.agility * -1;
            }
            flag = false;
        }
        else { 
            this.vel.i += (0 - this.vel.i)/4; 
            flag = true;
        } 

        if(dy > 250 && !this.jumped) { 
            this.vel.j = (Math.random() + 0.5) * -2.5; 
            this.jumped = true;
        }

        this.colliding.forEach(object => {
            //console.log(object.nametag);
        });

        if(this.jumped && this.find(this.colliding, "floor")){
            this.jumped = false;
        }

        this.attack(timestamp, flag);
    }

}