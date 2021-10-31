import Camera from "./camera.js"; //stores all objects
import Sprites from "./sprites.js";

var canvas = document.getElementById("canvas"); //links the script to the canvas in html
var ctx = canvas.getContext("2d"); //sets renderer context

//global variables (i'm sorry)
let dt, pt; //delta time, previous time
let frame = 0; //frameID
let start = false;

let camera = new Camera(
    {w: 0, h: 0},
    {x: 0, y: 0},
    {x: 0, y: 100}
);

let sprites = new Sprites();
sprites.debug();

camera.initialisePlayerEnemies();
camera.initialiseColliders(); //adds collide-pair objects

document.body.addEventListener("keydown", function (e) { camera.scene[0].keystroke(e.keyCode, 1); });
document.body.addEventListener("keyup", function (e) { camera.scene[0].keystroke(e.keyCode, 0); });

function background(){ 
    ctx.fillStyle = `#000000`;
    ctx.fillRect(0, 0, 1920, 1080);
}

function enemies(timestamp){
    camera.enemyHandler.update(dt, timestamp);
}

function collide(){
    camera.scene.forEach(object => {
        object.colliding = [];
        object.canJump = false;  
    });

    camera.scene[0].hurtbox.colliding = [];

    camera.collides.forEach(collide =>{
        collide.update(dt);
    });
}

function update(timestamp){ //update simulated objects
    let player = camera.scene[0];
    //console.log(player.health);
    
    camera.update(dt); //move camera over player
    camera.scene.forEach(object =>{ //all objects in the scene update
        object.update(dt);
        object.hurt(timestamp);
    });
    collide();

    enemies(timestamp);
    //player
    player.move(dt, timestamp);
    player.bar.update(dt, player.health);
    player.hurtbox.draw(ctx);
}

function draw(){ //draw everything to the screen
    for(let i = camera.scene.length - 1; i >= 0; i--){
        camera.cameraDraw(ctx, camera.scene[i]);
    }
    camera.scene[0].bar.draw(ctx);
    camera.enemyHandler.draw(ctx);
}

function main(timestamp){ //main gameloop
    background(); //draw background 

    update(timestamp); 
    draw(); 

    frame++;
}

function mainLoop(timestamp){

    dt = timestamp - pt;
    pt = timestamp;

    if(dt){
        if(!start){ //tells the console the game is running 
            start = true;
            console.log("initialised"); //dt initialised and loop running with dt 
        } 

        main(timestamp);
    }
        
    requestAnimationFrame(mainLoop);
}

mainLoop();

/*
    
    5 6 3 6 
    + x - /
    
    

*/