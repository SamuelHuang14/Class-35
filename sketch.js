var ball;
var database, position, ballPos;
function setup(){
//adding database to variable
    database = firebase.database();
    createCanvas(500,500);
    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";
//referring to database and storing value in variable
    ballPos = database.ref("ball/position");
//setting up listener
    ballPos.on("value", readPosition, showError);
}

function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        writePosition(0,+1);
    }
    drawSprites();
}
//updating values in database
function writePosition(x,y){
    database.ref("ball/position").set({
        "x":position.x+x,
        "y":position.y+y
    })
}

//reading values from database
function readPosition(data){
    position = data.val();
    console.log(position.x);
    console.log(position.y);
    ball.x = position.x;
    ball.y = position.y;
}

function showError(){
    console.log("error in writing position in database")
}