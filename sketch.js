var PLAY = 1;
var END = 0;
var gameState = PLAY;

var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var gameOver,gameOverImage;
var restart,restartImage;
var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score;

function preload(){
    trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
    trex_collided = loadImage("trex_collided.png");
    
    groundImage = loadImage("ground2.png");
    
    cloudImage = loadImage("cloud.png");
    
    obstacle1 = loadImage("obstacle1.png");
    obstacle2 = loadImage("obstacle2.png");
    obstacle3 = loadImage("obstacle3.png");
    obstacle4 = loadImage("obstacle4.png");
    obstacle5 = loadImage("obstacle5.png");
    obstacle6 = loadImage("obstacle6.png");
    gameOverImage = loadImage("gameOver.png");
    restartImage = loadImage("restart.png");
}

function setup() {

    createCanvas(600, 200);

    trex = createSprite(300, 180, 20, 50);
    trex.addAnimation("running", trex_running);
    trex.scale = 0.5;

    restart = createSprite(trex.x, trex.y - 80, 10, 10);
    restart.addImage(restartImage);

    gameOver = createSprite(trex.x, trex.y - 130, 10, 10);
    gameOver.addImage(gameOverImage);

    ground = createSprite(300, 180, 600, 20);
    ground.addImage("ground", groundImage);

    invisibleGround = createSprite(200, 190, 600, 10);
    invisibleGround.visible = false;

    cloudsGroup = new Group();
    obstaclesGroup = new Group();

    score = 0;

}

function draw() {

    background("grey");

    camera.on();
    camera.x = trex.x;

    trex.collide(invisibleGround);

    if(gameState === PLAY) {

        gameOver.visible = false;
        restart.visible = false;

        score = score + Math.round(getFrameRate()/60);
        text("Score: " + score, trex.x + 200, 50);

        if(keyDown("space") && trex.y>=159) {
            trex.velocityY = -10;
        }

        if(keyDown("RIGHT_ARROW")) {
            trex.x = trex.x + 10;
        }

        if(obstaclesGroup.isTouching(trex)) {
            gameState = END;
        }

        trex.velocityY = trex.velocityY + 0.8;

        if(trex.x > ground.x + 300) {
            ground.x = ground.x + 600;
        }

        if(trex.x > invisibleGround.x + 300) {
            invisibleGround.x = invisibleGround.x + 600;
        }

        spawnClouds();
        spawnObstacles();

    } else if(gameState === END) {
        
        trex.velocityY = 0;
        gameOver.visible = true;
        restart.visible = true;

        if(mousePressedOver(restart)) {
            reset();
        }

        drawSprites();

    }
}

function spawnClouds() {

    for(var i = 60; i < 99999; i = i + 60) {

        var cloud = createSprite(i, Math.round(random(80, 120)), 40, 10);
        cloud.addImage(cloudImage);    
        cloud.scale = 0.5;
        
        cloud.depth = trex.depth - 1;

        cloudsGroup.add(cloud);
    }
}

function spawnObstacles() {

    for(var k = 60; k < 99999; k = k + 60) {

        var obstacle = createSprite(k, 165, 10, 40);

        var rand = Math.round(random(1, 6));

        switch(rand) {
            case 1: obstacle.addImage(obstacle1);
                    break;
            case 2: obstacle.addImage(obstacle2);
                    break;
            case 3: obstacle.addImage(obstacle3);
                    break;
            case 4: obstacle.addImage(obstacle4);
                    break;
            case 5: obstacle.addImage(obstacle5);
                    break;
            case 6: obstacle.addImage(obstacle6);
                    break;
            default: break;
        }

        obstacle.scale = 0.5;
        obstaclesGroup.add(obstacle);

    }
}

function reset() {
    gameState = PLAY;
    obstaclesGroup.destroyEach();
    cloudsGroup.destroyEach();
    score = 0;
    trex.x = 300;
    ground.x = 300;
    invisibleGround.x = 300;
}