var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload() {
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {

  createCanvas(600, 600);
  tower = createSprite(300, 300);
  tower.addImage("tower", towerImg);
  tower.velocityY = 1;

  ghost = createSprite(300, 300, 50, 50)
  ghost.addImage(ghostImg)
  ghost.scale = 0.5
  ghost.setCollider("rectangle", 0, 0, 150, 150)
  
  spookySound.loop()
  climberGroup = createGroup()

}

function draw() {
  background(200);

  if (gameState === "play") {
    if (tower.y > 400) {
      tower.y = 300
    }
     

    if (keyDown("space")) {
      ghost.velocityY = -10
    }


    if (keyDown("RIGHT_ARROW")) {
      ghost.x += 10
    }

    if (keyDown("LEFT_ARROW")) {
      ghost.x -= 10
    }

    //adding gravity
    ghost.velocityY = ghost.velocityY + 1


    if (ghost.isTouching(climberGroup) || ghost.y > 600) {
      gameState = "end"
      spookySound.stop()

    }

    doorSpawn()
    drawSprites()


  }
  if (gameState === "end") {
    background(0)
    textSize(25)
    fill("red")
    text("Game Over", 250, 300)
  }
}



function doorSpawn() {
  if (frameCount % 100 === 0) {
    door = createSprite(random(100, 500), 0, 20, 20)
    door.addImage(doorImg)
    door.velocityY = 2
    door.lifetime = 300

    //depth
    ghost.depth = door.depth
    ghost.depth += 1

    climber = createSprite(door.x, 50, 20, 20)
    climber.addImage(climberImg)
    climber.velocityY = 2
    climber.scale = 0.7
    climberGroup.add(climber)
    climber.lifetime = 300




  }
}
