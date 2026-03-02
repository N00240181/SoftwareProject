let canvasWidth = 640;
let canvasHeight = 480;
let itemInterval;
let weaponInterval;
let fishInterval;
let score = 0;
let highScore = 0;
let health = 1000;
let bgColor = "cyan";
let player;
let playerX = 10;
let playerY = 100;
let playerSpeed = 3;
let itemSpeed = 4;
let fishes = [];
let fishX;
let fishY;
let items = [];
let itemSpawnRate = 500;
let itemX = 0;
let itemY = 0;
let weapons = [];
let weaponSpawnRate = 700;
let weaponX = 0;
let weaponY = 0;
let gold = 1000000;
let jetpackOwned = 0
let fishWidth = 50;
let fishHeight = 50;
let itemWidth = 75;
let itemHeight = 75;
let weaponWidth = 50;
let weaponHeight = 50;
let weaponSpeed = 2;
let randItemImage;
let randFishImage;
let type;
let menu = 0;
let paused;

function preload() {
    playerImg = loadImage('images/player/player.png');
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

function incrementScore(num) {
    score += num;
    return score;
}

function spawnPlayer() {
    image(playerImg, playerX, playerY, 60, 50);
}

function damageHealth(num) {
    health -= num;
    if (health <= 0) {
        reset()
        text("Finished", 10, 80);
        gold += score / 100
        if(score > highScore) {
            highScore = score
        }
        reset()
        menu = 0
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

function reset() {
    playerX = 0
    playerY = 0
    items = [];
    weapons = [];
    fishes = [];
}

function setup() {
    createCanvas(canvasWidth, canvasHeight);
    frameRate(60);
}

function startSpawning() {
    itemInterval = setInterval(spawnItems, itemSpawnRate);
    fishInterval = setInterval(spawnFish, 7000);
    weaponInterval = setInterval(spawnWeapons, weaponSpawnRate);
}

function draw() {
    if(menu == 0) {
        frameRate(60)
        background("cyan")
        textSize(18)
        text(`Gold: ${gold}`, 20, 20)
        text(`High Score: ${highScore}`, 20, 40)
        textSize(42)
        text("Trash Game", 200, 100)
        if(keyIsDown(ENTER)) {
            reset()
            menu = 1
            startSpawning()
        }
    }
    if(menu == 1) {
    frameRate(60)
    score += 1
    background(bgImg);
    textSize(12);
    fill("white")
    stroke(1)
    text(`Score: ${score.toFixed(0)}`, 10, 20);
    if(health > 0) {
    text(`Health: ${health}`, 10, 40);
    }
    text(`Speed: ${playerSpeed}`, 10, 60)
    text(`Trash Spawn Rate: ${itemSpawnRate / 1000} seconds`, 10, 80)
    spawnPlayer();
    movePlayer();
    moveItems()
    moveFishes();
    moveWeapons();
    if(keyIsDown(ESCAPE)) {
        menu = 2
        }
    }
    if(menu == 2) {
        background(0, 1)
        fill("white")
        text("Game is paused", 540, 20)
    }
    if(menu == 3) {
        frameRate(5)
        textSize(24)
        background("grey")
        text("Shop", 20, 40)
        text(gold, 20, 80)
        text(`Jetpack: 200 gold - ${jetpackOwned} owned`, 20, 120)
        text(`Trash Spawn Rate: 200 gold - ${itemSpawnRate / 1000} seconds`, 20, 240)
        if(keyCode === ESCAPE) {
            menu = 0
            reset()
            startSpawning()
        }
        if (keyIsPressed && key === "j" && gold >= 200) {
            playerSpeed += 0.2;
            jetpackOwned += 1
            gold -= 200;
        }
        if (keyIsPressed && key === "a" && gold >= 200 && itemSpawnRate > 100) {
            itemSpawnRate -= 10
            gold -= 200;
        }
    }
}

function keyPressed(event) {
    if ((event.key === 'l' || event.key === 'L') && (menu !== 0 || menu !== 3)) 
        menu = 2;
    if ((event.key === 'p' || event.key === 'P') && menu == 0) 
        menu = 3;
    if ((event.key === 'q' || event.key === 'Q') && menu == 2) 
        menu = 0;
    if (keyCode === ENTER)
        menu = 1
}

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
        if(fishes[i].fishX < -50) {
            fishes.splice(i, 1)
        }
        image(fishes[i].img, fishes[i].fishX, fishes[i].fishY, fishWidth, fishHeight);
        fishes[i].fishX -= 1
        /* if(playerX == fishes[i].fishX && playerY == fishes[i].fishY) {
            damageHealth()
        } */
    }
}

function moveItems() {
    for (let i = items.length - 1; i >= 0; i--) {
        if(items[i].itemX < -50) {
            items.splice(i, 1)
        }
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
    for (let i = weapons.length - 1; i >= 0; i--) {
        if(weapons[i].weaponX < -50) {
            weapons.splice(i, 1)
        }
        image(weapons[i].img, weapons[i].weaponX, weapons[i].weaponY, weaponWidth, weaponHeight);
        weapons[i].weaponX -= weaponSpeed;
        if(playerX < weapons[i].weaponX + weaponWidth && playerX > weapons[i].weaponX - weaponWidth && playerY < weapons[i].weaponY + weaponHeight && playerY > weapons[i].weaponY - weaponHeight) {
            if(weapons[i].img == weaponImages[0]) { // Cutlass
                damageHealth(100)
                incrementScore(-1000)
                weapons.splice(i, 1)
            }
            if(weapons[i].img == weaponImages[1]) { // Dagger
                damageHealth(80)
                incrementScore(-800)
                weapons.splice(i, 1)
            }
            if(weapons[i].img == weaponImages[2]) { // Knife
                damageHealth(150)
                incrementScore(-1500)
                weapons.splice(i, 1)
            }
            if(weapons[i].img == weaponImages[3]) { // Mace
                damageHealth(500)
                incrementScore(-5000)
                weapons.splice(i, 1)
            }
            if(weapons[i].img == weaponImages[4]) { // Machete
                damageHealth(200)
                incrementScore(-2500)
                weapons.splice(i, 1)
            }
            if(weapons[i].img == weaponImages[5]) { // Pipe
                damageHealth(50)
                incrementScore(score / 3)
                Math.round(score)
                weapons.splice(i, 1)
            }
            if(weapons[i].img == weaponImages[6]) { // Spear
                damageHealth(120)
                incrementScore(score / 2)
                Math.round(score)
                weapons.splice(i, 1)
            }
    }
}
}
