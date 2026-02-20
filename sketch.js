let score = 0;
let health = 100;
let bgColor = "cyan";
let player;
let playerX = 10;
let playerY = 100;
let playerSpeed = 5;
let fishes = [];
let fishX;
let fishY;
let items = [];
let itemX;
let itemY;
let randItemImage;
let randFishImage;

function preload() {
    playerImg = loadImage('images/player/player.gif');
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
        loadImage('/images/packaging/kelpo.png'),

        loadImage('/images/skeleton.gif')
    ];
    fishImages = [
        loadImage('images/fish/fish1.png'),
        loadImage('images/fish/fish2.png'),
        loadImage('images/fish/fish3.png'),
        loadImage('images/fish/fish4.png'),
        loadImage('images/fish/fish5.png'),
        loadImage('images/fish/fish6.png'),
        loadImage('images/fish/fish7.png')
    ]
}

function incrementScore() {
    score += 1;
    return score;
}

function spawnPlayer() {
    image(playerImg, playerX, playerY, 20, 20);
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
    if(dist([playerX, playerY, items.itemX, items.itemY]) <= 50) {
        console.log("jogn")
    }
}

function setup() {
    createCanvas(640, 480);
    frameRate(60);
    setInterval(incrementScore, 10);
    setInterval(spawnItems, 1000);
    setInterval(spawnFish, 1000);
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
    moveItems()
    moveFishes();
};

function spawnItems() {
    let item = {
        itemX: 690,
        itemY: Math.floor(Math.random() * 420),
        img: itemImages[Math.floor(random(itemImages.length))]
    }
    items.push(item);
}

function spawnFish() {
    let fish = {
        fishX: 690,
        fishY: Math.floor(Math.random() * 420),
        img: fishImages[Math.floor(random(fishImages.length))]
    }
    fishes.push(fish);
}

function moveItems() {
    for (let i = 0; i < items.length; i++) {
        image(items[i].img, items[i].itemX, items[i].itemY, 100, 100);
        items[i].itemX -= 1
    }
}

function moveFishes() {
    for (let i = 0; i < fishes.length; i++) {
        image(fishes[i].img, fishes[i].fishX, fishes[i].fishY, 100, 100);
        fishes[i].fishX -= 1
    }
}