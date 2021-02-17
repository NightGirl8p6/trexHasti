var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var randomNum;
var cloud,cloudImage,cloudGroup;
var obs1,obs2,obs3,obs4,obs5,obs6,obstacle,obstacleGroup;
var jumpSound;
var dieSound;
var cpSound;

var score;

var PLAY=1;
var END=0;
var gameState=PLAY;

var restart,restartImage;
var gameOver,gameOverImage;

var message="in set up";

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  
  groundImage      = loadImage("ground2.png");
  cloudImage       =loadImage("cloud.png");

  obs1             =loadImage("obstacle1.png");
  obs2             =loadImage("obstacle2.png");
  obs3             =loadImage("obstacle3.png");
  obs4             =loadImage("obstacle4.png");
  obs5             =loadImage("obstacle5.png");
  obs6             =loadImage("obstacle6.png");
  
  restartImage     =loadImage("restart.png");
  gameOverImage    =loadImage("gameOver.png");
  
  dieSound         =loadSound("die.mp3");
  jumpSound     =loadSound("jump.mp3");
  cpSound       =loadSound("checkPoint.mp3");
  
  
}

function setup() {

  createCanvas(600,200);
  
  
  
  //create a trex sprite
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided",trex_collided);
  trex.scale = 0.5;
  
  //create a ground sprite
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  
  //creating invisible ground
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  //generate random numbers
  //randomNum = Math.round(random(1,100));
score = 0;
  
   //trex.debug=true;
    trex.setCollider("circle",0,0,40);
  
cloudGroup= new Group();  
obstacleGroup= new Group();
  
  restart=createSprite(300,140);
  restart.addImage(restartImage);
  restart.scale=0.5;
  restart.visible=false;
  
  gameOver=createSprite(300,100);
  gameOver.addImage(gameOverImage);
  gameOver.scale=0.5;
  gameOver.visible=false;
  
}

function draw() {
  //set background color
  background(180);
  text("Score: "+score,500,50);
 // console.log(message);
  
  //console.log("hello"+5);
  //console.log(frameCount); 
  
  //SETING PARAMETERS ON GAME STATE
  
  if(gameState === PLAY){
    trex.changeAnimation("running",trex_running);
    //calculateing score
    score=score+Math.round(getFrameRate() / 60);
    //setting ground velocity
    ground.velocityX = -(4 + 3*score /100);
    
     if (ground.x < 0){
      ground.x = ground.width/2;
    
     }

    // jump when the space key is pressed
      if(keyDown("space") && trex.y >=156) {
      trex.velocityY = -10;
        jumpSound.play();
      }
   trex.velocityY = trex.velocityY + 0.8;
  
    
  //Spawn Clouds
    spawnClouds();
    
 //Spawn Obstacle 
  spawnObstacle();
    
   if(score > 0 && score % 100===0){
      cpSound.play();

   }
    
    
     
  if(obstacleGroup.isTouching(trex)){
 dieSound.play();  
  gameState = END;
  //trex.velocityY=-10;
  }
    
    
  }
  else if(gameState === END){
 
gameOver.visible=true;   
    
restart.visible=true;   
    
  if(mousePressedOver(restart)){
    reset();
  }  
ground.velocityX=0;
 
cloudGroup.setVelocityXEach(0); 
    
obstacleGroup.setVelocityXEach(0); 
  
trex.changeAnimation("collided",trex_collided) ;  
    
obstacleGroup.setLifetimeEach(-1);    
    
cloudGroup.setLifetimeEach(-1);
    
trex.velocityY=0;    
    

    
  }
  
  
  
  
  
  
  //stop trex from falling down
  trex.collide(invisibleGround);
  
  //Spawn Clouds
  
  
  
  
  drawSprites();
}

//function to spawn the clouds
function spawnClouds(){
 // write your code here 
if(frameCount % 60 === 0){
  cloud = createSprite(600,100,40,10);
  cloud.velocityX = -3;
  cloud.y = Math.round(random(10,60));
  cloud.addImage(cloudImage);
  cloud.scale=0.5;        
  cloud.depth=trex.depth;
  trex.depth +=1;
  cloud.lifetime=200;
  cloudGroup.add(cloud);
  
  //console.log(cloud.depth);
  //console.log(trex.depth);
}  
  

}
function spawnObstacle(){
  if(frameCount % 60 ===0){
    obstacle=createSprite(600,165,10,40);
    obstacle.velocityX= -(6 +3* score / 100);
    var rand= Math.round(random(1,6));
    switch(rand){
      case 1: obstacle.addImage(obs1);
        break;
     case 2: obstacle.addImage(obs2); 
        break;
     case 2: obstacle.addImage(obs2); 
        break;
     case 3: obstacle.addImage(obs3); 
        break;
     case 4: obstacle.addImage(obs4); 
        break;
     case 5: obstacle.addImage(obs5); 
        break;
     case 6: obstacle.addImage(obs6); 
        break;
     default:break;
      
    }
    obstacle.scale=0.4;
    obstacle.lifetime=100;  
    obstacleGroup.add(obstacle);
    
  
  }
  
}

function reset(){
  gameOver.visible=false;
  restart.visible=false;
  gameState=PLAY;
  obstacleGroup.destroyEach();
  cloudGroup.destroyEach();
  score=0;
  
}

