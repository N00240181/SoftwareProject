let score = 0;
let health = 100;
let bgColor = "cyan";
let playerX = 10;
let playerY = 100;
let playerSpeed = 5;

function preload() {
    playerImg = loadImage('/images/player/player.gif');
    bgImg = loadImage('/images/background/background.png')
}

function incrementScore() {
    score += 1;
    return score;
}

function spawnPlayer() {
    image(playerImg, playerX, playerY, 100, 100);
}

function damageHealth() {
    health -= 1;
    if (health <= 0) {
        bgColor = "black";
        fill("red");
        textSize(36);
        text("Finished", 10, 80);
        noLoop();
    }
}

function movePlayer() {
    if(keyIsDown(UP_ARROW)) {
        playerY -= playerSpeed;
    }
    if(keyIsDown(DOWN_ARROW)) {
        playerY += playerSpeed;
    }
    if(keyIsDown(LEFT_ARROW)) {
        playerX -= playerSpeed;
    }
    if(keyIsDown(RIGHT_ARROW)) {
        playerX += playerSpeed;
    }
}

function setup() {
    createCanvas(640, 480);
    setInterval(incrementScore, 10);
    /* setInterval(damageHealth, 40) */
}

function draw() {
    background(bgImg);
    textSize(12);
    fill("white")
    stroke(1)
    text(`Score: ${score}`, 10, 20);
    text(`Health: ${health}`, 10, 40);
    spawnPlayer();
    movePlayer();
}