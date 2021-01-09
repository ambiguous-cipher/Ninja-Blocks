const Engine = Matter.Engine
const World = Matter.World
const Bodies = Matter.Bodies
const Body = Matter.Body

var backgroundPNG, playerPNG;
var player;
var engine,world;
var blockGroup

var gameState = "play";

var score = 0

function preload(){
    backgroundPNG = loadImage("sprites/background.png");
    playerPNG = loadImage("sprites/player.png");
    stonePNG = loadImage("sprites/stone.png");
    floorPNG = loadImage("sprites/floor.jpg")
}

function setup(){
    engine = Engine.create()
    world = engine.world;  

    createCanvas(displayWidth, displayHeight-112);
    
    player = createSprite(200, 200, 100, 100);
    player.addImage(playerPNG)
    player.scale = 0.25

    blockGroup = new Group();

    ground = createSprite(displayWidth/2, displayHeight-112, displayWidth, 100)
    ground.debug = true;
    ground.addImage(floorPNG)
    ground.scale = 3
}

function draw(){
    background(0);
  Engine.update(engine)

  
  image(backgroundPNG, 0, 0, displayWidth, displayHeight);
  if(gameState === "play"){
    player.x = mouseX;
    player.y = mouseY;

    console.log(canvas.width)
    createBlock();
   // block.bounceOff(player)

    if(player.isTouching(blockGroup)){
      blockGroup.setLifetimeEach(0);
      score = score + 1
    }
  
   // block.bounceOff(ground)

    if(blockGroup.isTouching(ground)){
      console.log("Block is touching ground");
      gameState = "end"
    }
  } 
  if(gameState === "end"){
    blockGroup.setVelocityYEach(0)
  }

  //console.log(gameState)

  
  

  drawSprites();
  textSize(50)
  stroke("white")
  fill("white")
  text("Score: " + score, 50, 50);
}

function createBlock(){
  if (frameCount % 60 === 0) {
    var block = createSprite(600,120,40,10);
    block.x = Math.round(random(10,1300));
    block.addImage(stonePNG);
    block.scale = 0.25;
    block.velocityY = 20
    // block.velocityY = block.velocityY + 0.8
    
     //assign lifetime to the variable
    //block.lifetime = 200;
    
    //add each cloud to the group
    blockGroup.add(block);
  }
}
