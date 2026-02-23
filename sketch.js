let score = 0;
let health = 1000;
let bgColor = "cyan";
let player;
let playerX = 10;
let playerY = 100;
let playerSpeed = 5;
let itemSpeed = 2;
let fishes = [];
let fishX;
let fishY;
let items = [];
let itemX = 0
let itemY = 0
let weapons = [];
let weaponX = 0
let weaponY = 0;
let fishWidth = 50
let fishHeight = 50;
let itemWidth = 75;
let itemHeight = 75;
let weaponWidth = 25;
let weaponHeight = 25;
let weaponSpeed = 2
let randItemImage;
let randFishImage;
let type;

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
    weaponImages = [
        loadImage('images/weapons/cutlass.png'),
        loadImage('images/weapons/dagger.png'),
        loadImage('images/weapons/knife.png'),
        loadImage('images/weapons/mace.png'),
        loadImage('images/weapons/machete.png'),
        loadImage('images/weapons/pipe.png'),
        loadImage('images/weapons/spear.png')
    ]
}

function incrementScore(type) {
    score += type;
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
    /* setInterval(incrementScore, 10); */
    setInterval(spawnItems, 100);
    setInterval(spawnFish, 7000);
    setInterval(spawnWeapons, 500);
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
    moveWeapons();
};

function spawnItems() {
    let item = {
        itemX: 690,
        itemY: Math.floor(Math.random() * 420),
        img: itemImages[Math.floor(random(itemImages.length))]
    }
    items.push(item);
}

function spawnWeapons() {
    let weapon = {
        weaponX: 690,
        weaponY: Math.floor(Math.random() * 420),
        img: weaponImages[Math.floor(random(weaponImages.length))]
    }
    weapons.push(weapon);
}

function spawnFish() {
    let fish = {
        fishX: 690,
        fishY: Math.floor(Math.random() * 420),
        img: fishImages[Math.floor(random(fishImages.length))]
    }
    fishes.push(fish);
}

function moveFishes() {
    for (let i = 0; i < fishes.length; i++) {
        image(fishes[i].img, fishes[i].fishX, fishes[i].fishY, fishWidth, fishHeight);
        fishes[i].fishX -= 1
        /* if(playerX == fishes[i].fishX && playerY == fishes[i].fishY) {
            damageHealth()
        } */
    }
}

function moveItems() {
    for (let i = 0; i < items.length; i++) {
        image(items[i].img, items[i].itemX, items[i].itemY, itemWidth, itemHeight);
        items[i].itemX -= itemSpeed;
        if(playerX < items[i].itemX + itemWidth && playerX > items[i].itemX - itemWidth && playerY < items[i].itemY + itemHeight && playerY > items[i].itemY - itemHeight) {
            if(items[i].img == itemImages[0]) { // Black Bag
                incrementScore(50)
                items.splice(i, 1)
            }
            if(items[i].img == itemImages[1]) { // Brown Bag
                incrementScore(30)
                items.splice(i, 1)
            }
            if(items[i].img == itemImages[2]) { // Food Bag
                incrementScore(100)
                items.splice(i, 1)
            }
            if(items[i].img == itemImages[3]) { // Paper Bag
                incrementScore(50)
                items.splice(i, 1)
            }
            if(items[i].img == itemImages[4]) { // Small Bag
                incrementScore(20)
                items.splice(i, 1)
            }

            if(items[i].img == itemImages[5]) { // Blue Balloon
                incrementScore(200)
                items.splice(i, 1)
            }
            if(items[i].img == itemImages[6]) { // Green Balloon
                incrementScore(150)
                items.splice(i, 1)
            }

            if(items[i].img == itemImages[7]) { // Bottle
                incrementScore(200)
                items.splice(i, 1)
            }
            if(items[i].img == itemImages[8]) { // Crushed Bottle
                incrementScore(125)
                items.splice(i, 1)
            }
            if(items[i].img == itemImages[9]) { // Piss Bottle
                incrementScore(75)
                items.splice(i, 1)
            }

            if(items[i].img == itemImages[10]) { // Hook
                incrementScore(300)
                items.splice(i, 1)
            }
            if(items[i].img == itemImages[11]) { // Net
                incrementScore(500)
                items.splice(i, 1)
            }
            if(items[i].img == itemImages[12]) { // Rod
                incrementScore(200)
                items.splice(i, 1)
            }

            if(items[i].img == itemImages[13]) { // Brown Glass
                incrementScore(125)
                items.splice(i, 1)
            }
            if(items[i].img == itemImages[14]) { // White Glass
                incrementScore(50)
                items.splice(i, 1)
            }

            if(items[i].img == itemImages[15]) { // Closed Box
                incrementScore(45)
                items.splice(i, 1)
            }
            if(items[i].img == itemImages[16]) { // Kelpo
                incrementScore(65)
                items.splice(i, 1)
            }
        }
    }
}

function moveWeapons() {
    for (let i = 0; i < weapons.length; i++) {
        image(weapons[i].img, weapons[i].weaponX, weapons[i].weaponY, weaponWidth, weaponHeight);
        weapons[i].weaponX -= weaponSpeed;
        if(playerX < weapons[i].weaponX + weaponWidth && playerX > weapons[i].weaponX - weaponWidth && playerY < weapons[i].weaponY + weaponHeight && playerY > weapons[i].weaponY - weaponHeight) {
            if(items[i].img == itemImages[0]) { // Cutlass
                damageHealth(10)
                items.splice(i, 1)
            }
            if(items[i].img == itemImages[0]) { // Dagger
                damageHealth(8)
                items.splice(i, 1)
            }
            if(items[i].img == itemImages[0]) { // Knife
                damageHealth(15)
                items.splice(i, 1)
            }
            if(items[i].img == itemImages[0]) { // Mace
                damageHealth(50)
                items.splice(i, 1)
            }
            if(items[i].img == itemImages[0]) { // Machete
                damageHealth(20)
                items.splice(i, 1)
            }
            if(items[i].img == itemImages[0]) { // Pipe
                damageHealth(5)
                items.splice(i, 1)
            }
            if(items[i].img == itemImages[0]) { // Spear
                damageHealth(12)
                items.splice(i, 1)
            }
    }
}
}