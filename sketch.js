var bg, bgImg,bgImg2;
var bottomGround;
var topGround;
var balloon, balloonImg;
var obstcaleTop,obstacleTopImg;
var obstacleBottom,obstacleBottom1,obstacleBottom2;
var gameOver,gameOverImg;
var backgroundImg;
var score = 0;
var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload(){
bgImg = loadImage("assets/bg.png");
bgImg2 = loadImage("assets/bgImg2.jpeg");
balloonImg = loadAnimation("assets/balloon1.png","assets/balloon2.png","assets/balloon3.png");
obsTop1 = loadImage("assets/obsTop1.png");
obsTop2 = loadImage("assets/obsTop2.png");

obsBottom1 = loadImage("assets/obsBottom1.png");
obsBottom2 = loadImage("assets/obsBottom2.png");
obsBottom3 = loadImage("assets/obsBottom3.png");

gameOverImg = loadImage("assets/gameOver.png");
restartImg = loadImage("assets/restart.png");

jumpSound = loadSound("assets/jump.mp3");
dieSound = loadSound("assets/die.mp3");

}

function setup(){

createCanvas(400,400);

//background image
bg = createSprite(165,485,1,1);
bg.addImage(bgImg);
bg.scale = 1.3;
//getBackgroundImg();


//creating top and bottom grounds
bottomGround = createSprite(200,390,800,20);
bottomGround.visible = false;

topGround = createSprite(200,10,800,20);
topGround.visible = false;
      
//creating balloon     
balloon = createSprite(100,200,20,50);
balloon.addAnimation("balloon",balloonImg);
balloon.scale = 0.2;



}

function draw() {
  
  background("black");
        
          //making the hot air balloon jump
          if(keyDown("space")) {
            balloon.velocityY = -6 ;
            
          }
    
          //adding gravity
           balloon.velocityY = balloon.velocityY + 2;
    Bar();
        drawSprites();
    spawnObstaclesTop();
        
}
function spawnObstaclesTop(){
  if(World.frameCount%60 === 0){
    obstacleTop = createSprite(400,50,40,50);
    obstacleTop.scale = 0.1;
    obstacleTop.velocityX = -4;
    obstacleTop.y = Math.round(random(10,100));

  var rand = Math.round(random(1,2));
  switch(rand){
    case 1: obstacleTop.addImage(obsTop1);
            break;
    case 2: obstacleTop.addImage(obsTop2);
            break;
    default:break;
  }
  obstacleTop.lifeTime = 100;
  balloon.depth = balloon.depth + 1;
  }
}

function Bar(){
  if(World.frameCount % 60 === 0){
    var bar = createSprite(400,200,10,800);
    bar.velocityX = -6;
    bar.depth = balloon.depth;
    bar.lifetime = 70;
    bar.visible = false;
  }
}

async function getBackgroundImg(){
  var response = await fetch("https://worldtimeapi.org/api/timezone/Europe/London");
  var responseJSON = response.json();

  var dateTime = responseJSON.datetime;
  var hours = dateTime.slice(11,13);
  
   if(hours>=06 && hours<=19){
     bg.addImage(bgImg);
     bg.scale = 1.3
   }else {
    bg.addImage(bgImg2);
    bg.scale = 1.5;
    bg.x = 200;
    bg.y = 200;

   }
  
}