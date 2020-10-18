var PLAY=1;
var END=0;
var gamestate;
var monkey , monkey_running,monkeystop;
var ground;
var banana ,bananaimage, obstacle, obstacleimage;
var Foodgroup, obstaclegroup;
var score=0,survivaltime=0;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaimage = loadImage("banana.png");
  obstacleimage = loadImage("obstacle.png");
 
}



function setup() {
  monkey=createSprite(80,315,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale=0.1;

  ground=createSprite(400,350,900,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  
  foodgroup=createGroup();
  obstaclegroup=createGroup();
  
  gamestate=PLAY;
}


function draw() {
background("lightblue");
  if(gamestate===PLAY){
  survivaltime=Math.ceil(frameCount/frameRate());
  if(keyDown("space")&&monkey.y>240){
    monkey.velocityY=-10;
  }
  monkey.velocityY=monkey.velocityY+0.6;
  if (ground.x<0){
    ground.x=450;
  }
  bananas();
  obstacles();
  if(foodgroup.isTouching(monkey)){
    foodgroup.destroyEach();
    score=score+2;
  }
    if(obstaclegroup.isTouching(monkey)){
      gamestate=END;
    }
 }
    
  if(gamestate===END){
    ground.velocityX=0;
    foodgroup.setVelocityXEach(0);
    obstaclegroup.setVelocityXEach(0);
    foodgroup.setLifetimeEach(-1);
    obstaclegroup.setLifetimeEach(-1);
    stroke("black");
    textSize(40);
    fill("black");
    text("GAME OVER",75,200);
  }
  
  stroke("white");
  textSize(20);
  fill("white");
  text("score:"+score,300,50);
  
  stroke("black");
  textSize(20);
  fill("black");
 text("survival time:"+survivaltime+" seconds",25,50);
  
  
  monkey.collide(ground);
  
  console.log(frameCount);
  drawSprites();
}

function bananas(){
  if(frameCount%80===0){
    banana=createSprite(410,200,10,10);
    banana.addImage(bananaimage);
    banana.scale=0.1;
    banana.y=Math.round(random(120,200));
    banana.velocityX=-4;
    banana.lifetime=120;
    
    foodgroup.add(banana);
  }
  
}

function obstacles(){
  if(frameCount%300===0){
    obstacle=createSprite(410,320,10,10);
    obstacle.addImage(obstacleimage);
    obstacle.scale=0.15;
    obstacle.velocityX=-4;
    banana.lifetime=120;
    
    obstaclegroup.add(obstacle);
  }
  
}


