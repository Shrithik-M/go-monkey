
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score
var ground, groundImage;
var survivalTime = 0;
var gameState = play;
var play = 0;
var end = 1;
// mam how to add new images and is it not coming;

function preload(){
  
  
  monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600,400);
  background("black")

  monkey = createSprite(300,200,20,20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.1;

  ground = createSprite(300,200,50,50);
  ground.velocityX = -4;
  ground.X = ground.width/2;

  invisibleGround = createSprite(300,380,400,10);
  invisibleGround.visible = true;

  foodGroup = new Group();
  obstacleGroup = new Group();

  
}


function draw() {
survivalTime = Math.ceil(frameCount/frameRate());
text("survivalTime = " + survivalTime,450,20);
  
if(keyDown("space") && monkey.y >= 150) {
  monkey.velocityY = -12;
}

monkey.collide(invisibleGround);

if(gameState == play){
  food();
}
if(monkey.isTouching(obstacleGroup)){
  gameState = end;
}
if(gameState == end){
banana.lifetime = -1;
obstacle.lifetime = -1;
banana.velocityX = 0;
obstacle.velocityX = 0;
monkey.velocityX = 0;
ground.velocityX = 0;
}

drawSprite();
}

function food(){
  if(frameCount% 80==0){
 banana = createSprite(600,Math.round(random(250,400)),10,10);
  banana.addImage(bananaImage);
  banana.velocityX = 4;
  monkey.depth = banana.depth+1;
  banana.lifetime = 200;
  foodGroup.add(banana);
  }
}

function obstacle(){
  if(frameCount% 300 == 0){
 obstacle = createSprite(600,500,20,20);
  obstacle.addImage(obstaceImage);
  obstacle.velocityX = -(6 + 3*score/100);
  obstacle.depth = obstacle.depth+1;
  obstacle.lifetime = 200;
  obstacleGroup.add(obstacle);
  }
}
