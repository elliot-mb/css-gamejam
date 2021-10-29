import Camera from "./camera.js"; //stores all objects

var canvas = document.getElementById("canvas"); //links the script to the canvas in html
var ctx = canvas.getContext("2d"); //sets renderer context

//global variables (i'm sorry)
let dt, pt; //delta time, previous time
let frame = 0; //frameID
let start = false;

let camera = new Camera(
    {w: undefined, h: undefined},
    {x: 0, y: 0}
);

document.body.addEventListener("keydown", function (e) { camera.scene[0].keystroke(e.keyCode, 1); });
document.body.addEventListener("keyup", function (e) { camera.scene[0].keystroke(e.keyCode, 0); });

function background(){ 
    ctx.fillStyle = `#000000`;
    ctx.fillRect(0, 0, 1920, 1080);
}

function update(){ //update simulated objects
    camera.update(dt); //move camera over player
    camera.scene.forEach(object =>{ //all objects in the scene update
        object.update(dt);
    });
    //player is index 0 always
    camera.scene[0].move(dt);
}

function draw(){ //draw everything to the screen
    camera.draw(ctx);
}

function main(){ //main gameloop
    background(); //draw background 

    update(); 
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

        main();
    }
        
    requestAnimationFrame(mainLoop);
}

mainLoop();

/*
    
    5 6 3 6 
    + x - /
    
    

*/