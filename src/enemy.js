import Object from "./object.js";

export default class Enemy extends Object{
    
    constructor(properties, _player, _agility, _health){
        super(properties);

        this.hurtbox;
        this.player = _player;
        this.health = _health;
        this.hit = false;
        this.hitTime = 0;
        this.cooldown = 300; //ms
        this.jumped = false;
        this.agility = _agility;
    }

    find(objects, _nametag){
        let flag = false;

        objects.forEach(object => {
            if(object.nametag == _nametag){
                if(_nametag == "hurtbox"){
                    console.log("hurtbox");
                }
                flag = true;
            }
        });
        
        return flag;
    }

    knockback(){

        const dx = this.pos.x - this.player.pos.x;
        const dy = this.pos.y - this.player.pos.y;

        this.pos.y -= 2;
        this.vel.j = (Math.random() + 0.5) * -3;
        this.vel.i = (Math.random() + 0.5) * 3 * (Math.abs(dx)/dx);

    }

    hurt(timestamp){
        if(this.find(this.colliding, "hurtbox")){
            if(!this.hit) { 
                this.health -= 10; 
                console.log(this.health);
                this.knockback();
                this.hitTime = timestamp + this.cooldown;
                this.hit = true;
            }
        }

        if(this.player.input.sp == 0 && this.hit && timestamp > this.hitTime){
            this.hit = false; //reset so the enemy can take damage again
        } 
        
        this.die();
        //console.log(`${this.health}hp`);
    }

    die(){
        if(this.health <= 0){
            this.pos = {x: -1000, y: -10};
        }
    }

    move(dt){
        const dx = this.pos.x - this.player.pos.x;
        const dy = this.pos.y - this.player.pos.y; 

        if(dx * dx > 10000) { 
            if(this.find(this.colliding, "floor")) { 
                this.vel.i = (Math.log(dx * dx) / (Math.abs(dx)/dx)) * this.agility * -1;
            }
        }
        else { this.vel.i += (0 - this.vel.i)/4; } 

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
    }

}