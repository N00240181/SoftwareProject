let score = 0;
let health = 100;
let bgColor = "cyan";
let playerX = 10;
let playerY = 100;
let playerSpeed = 5;
let items = [];
let itemX;
let itemY;
let randImage;

function preload() {
    playerImg = loadImage('/images/player/player.gif');
    bgImg = loadImage('/images/background/background.png')
    itemImages = [
        loadImage('/images/bags/blackbag.png'),
        loadImage('/images/bags/brown.png'),
        loadImage('/images/bags/foodBag.png'),
        loadImage('/images/bags/paperBag.png'),
        loadImage('/images/bags/smallBag.png'),

        loadImage('/images/balloons/blueBalloon.png'),
        loadImage('/images/balloons/greenBalloon.png'),

        loadImage('/images/bottles/bottle.png'),
        loadImage('/images/bottles/crushedbottle.png'),
        loadImage('/images/bottles/pissBottle.png'),

        loadImage('/images/fishing/hook.png'),
        loadImage('/images/fishing/net.png'),
        loadImage('/images/fishing/rod.png'),

        loadImage('/images/glass/brownGlass.png'),
        loadImage('/images/glass/glass1.png'),

        loadImage('/images/packaging/closedBox.png'),
        loadImage('/images/packaging/kelpo.png')
    ]
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
    setInterval(spawnItems, 2000)
    /* setInterval(damageHealth, 120) */
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
    for (let i = 0; i < items.length; i++) {
        image(items[i].img, items[i].itemX, items[i].itemY, 100, 100);
        while(items[i].itemX > 0) {
            items[i].itemX -= 20
        }
    }
}

function spawnItems() {
    let item = {
        itemX: 540,
        itemY: Math.floor(Math.random() * 380),
        img: itemImages[Math.floor(random(itemImages.length))]
    }
    items.push(item);
    /* let itemX = 540
    let itemY = Math.floor(Math.random() * 440)
    let randImage = Math.floor(random(itemImages.length))
    let itemImage = loadImage(itemImages[randImage])
    image(itemImage, itemX, itemY, 100, 100); */
}