let canvasWidth = 640;
let canvasHeight = 480;

// Score, Items, etc.

let score = 0;
let highScore = 0;
let health = 1000;
let jetpackOwned = 0;
let jetpackSpeed = 0;
let itemSpawnRate = 800;

// Spawning, Movement, etc.
let itemInterval;
let fishInterval;
let player;
let playerX = 10;
let playerY = 100;
let playerWidth = 60;
let playerHeight = 50;
let playerSpeed = 3;
let itemSpeed = 3;
let items = [];
let itemX = 0;
let itemY = 0;
let fishes = [];
let fishSpawnRate = 1200;
let fishX = 0;
let fishY = 0;
let gold = 200;
let itemWidth = 75;
let itemHeight = 75;
let fishWidth = 50;
let fishHeight = 50;
let fishSpeed = 2;
let randItemImage;
let type;
// Menus, etc.
let bgColor = "cyan";
let menu = 0;
let goldAdded = 0;
let once = false;
let paused;
let exitBtn;
let exitX = 20;
let exitY = 460;
let saveData;
let shopBtn;
let shopX = 30
let shopY = 100
let jetpackBtn;
let trashIncreaseBtn;
let settingsBtn;
let settingsX = 30
let settingsY = 120
let difficultyBtn;
let difficultyX = 60
let difficultyY = 120
let difficulty = 0;
let clearBtn;
let infoBtn;
let infoX = 30;
let infoY = 140;
let nextInfoBtn;
let currentInfo = 1;
let hitboxesEnabled = false;

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
}

function incrementScore(num) {
    score += num;
    return score;
}

function spawnPlayer() {
    image(playerImg, playerX, playerY, playerWidth, playerHeight);
    if(hitboxesEnabled) {
            noFill()
            stroke('yellow')
            strokeWeight(2)
            rect(playerX, playerY, playerWidth, playerHeight)
            noStroke()
        }
}

function damageHealth(num) {
    health -= num;
    if (health <= 0) {
        fishes = [];
        if(difficulty !== 3 && score > 0) {
        goldAdded = Math.round(score / 1)
        }
        else {
            goldAdded = Math.round(score / 1)
        }
        gold += goldAdded
        if(score > highScore) {
            highScore = score
        }
        menu = 0
        settingsBtn.show()
        shopBtn.show()
        infoBtn.show()
        reset()
        score = 0;
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
    playerX = 20
    playerY = 200
    playerWidth = 50
    playerHeight = 60
    health = saveData.health
    score = 0;
    items = [];
    fishes = [];
    clearInterval(itemInterval)
    clearInterval(fishInterval)
}

function setup() {
    createCanvas(canvasWidth, canvasHeight);
    frameRate(60);

    let saved = localStorage.getItem("trashGameSave");
    if(saved) {
        saveData = JSON.parse(saved);
    }
    else {
        saveData = {
            highScore: 0,
            gold: 200,
            jetpackOwned: 0,
            itemSpawnRate: 800,
            playerWidth: 60,
            playerHeight: 50,
            fishSpawnRate: 1200,
            hitboxesEnabled: false,
            health: 1000,
            playerSpeed: 3,
            itemSpeed: 3,
            fishSpeed: 2,
            difficulty: 0
        }
    }
    highScore = saveData.highScore;
    gold = saveData.gold;
    jetpackOwned = saveData.jetpackOwned;
    itemSpawnRate = saveData.itemSpawnRate;
    fishSpawnRate = saveData.fishSpawnRate;
    hitboxesEnabled = saveData.hitboxesEnabled;
    health = saveData.health;
    playerSpeed = saveData.playerSpeed;
    fishSpeed = saveData.fishSpeed;
    itemSpeed = saveData.itemSpeed;
    playerWidth = saveData.playerWidth;
    playerHeight = saveData.playerHeight
    difficulty = saveData.difficulty

    if(menu == 0) {
    shopBtn = createButton('Shop')
    shopBtn.position(shopX, shopY)
    shopBtn.mousePressed(shopMenu)
    jetpackBtn = createButton('Purchase Jetpack')
    jetpackBtn.position(30, 140)
    jetpackBtn.mousePressed(buyJetpack)
    jetpackBtn.hide()
    trashIncreaseBtn = createButton('Increase Spawn Rate')
    trashIncreaseBtn.position(30, 210)
    trashIncreaseBtn.mousePressed(buyTrashIncrease)
    trashIncreaseBtn.hide()
    settingsBtn = createButton('Settings')
    settingsBtn.position(settingsX, settingsY)
    settingsBtn.mousePressed(settingsMenu)
    infoBtn = createButton('Information!')
    infoBtn.position(infoX, infoY)
    infoBtn.mousePressed(infoMenu)
    nextInfoBtn = createButton('>')
    nextInfoBtn.position(width / 2, (height / 2) + 200)
    nextInfoBtn.mousePressed(nextInfo)
    nextInfoBtn.hide()
    difficultyBtn = createButton('Change Difficulty')
    difficultyBtn.position(difficultyX, difficultyY)
    difficultyBtn.mousePressed(increaseDifficulty)
    difficultyBtn.hide()
    clearBtn = createButton('Clear Storage (Double Click)')
    clearBtn.position(420, 20)
    clearBtn.mousePressed(clearData)
    clearBtn.hide()
    exitBtn = createButton('<')
    exitBtn.position(exitX, exitY)
    exitBtn.mousePressed(exitMenu)
    exitBtn.hide()
    }
}

function startSpawning() {
    clearInterval(itemInterval)
    clearInterval(fishInterval)
    itemInterval = setInterval(spawnItems, saveData.itemSpawnRate);
    fishInterval = setInterval(spawnFishes, saveData.fishSpawnRate);
}

function draw() {
    if(menu == 0) {
        frameRate(60)
        background("cyan")
        fill("black")
        textSize(18)
        if(goldAdded == 0) {
            text(`Gold: ${gold}`, 20, 40)
        }
        else {
            text(`Gold: ${gold} + ${goldAdded}!`, 20, 40)
        }
        text(`High Score: ${highScore}`, 20, 60)
        text(`Difficulty level: ${difficulty}`, 20, 80)
        textSize(42)
        text("Trash Game", 20, 400)
        textSize(14)
        text("Press S to Save!", 20, 440)
        text("Press ENTER to Play!", 20, 460)
        if (keyIsPressed && (key === "s" || key === "S")) {
            textSize(14)
            text("Saved!", 130, 440)
        }
    }
    if(menu == 1) {
    frameRate(60)
    score += 1
    goldAdded = 0
    background(bgImg);
    textSize(12);
    fill("white")
    stroke(1)
    
    text(`Score: ${score.toFixed(0)}`, 10, 20);
    text(`Health: ${health}`, 10, 40);
    text(`Speed: ${playerSpeed}`, 10, 60)
    text(`Trash Spawn Rate: ${itemSpawnRate / 1000} seconds`, 10, 80)
    spawnPlayer();
    movePlayer();
    moveItems()
    moveFishes();
    }
    if(menu == 2) {
        background(0, 1)
        fill("white")
        text("Game is paused", 540, 20)
        clearInterval(itemInterval)
        clearInterval(fishInterval)
        exitBtn.show()
    }
    if(menu == 3) {
        frameRate(5)
        textSize(24)
        background("grey")
        text("Shop", 20, 40)
        text(gold, 20, 80)
        text(`Jetpack: 200 gold - ${jetpackOwned} owned`, 20, 120)
        jetpackBtn.show()
        text(`Trash Spawn Rate: 200 gold - ${itemSpawnRate / 1000} seconds`, 20, 190)
        trashIncreaseBtn.show()
        if(keyCode === ESCAPE) {
            goldAdded = 0
            menu = 0
            reset()
            startSpawning()
        }
        exitBtn.show()
    }

    if(menu == 4) {
        frameRate(60)
        difficultyBtn.show()
        textSize(18)
        background('grey')
        text("Settings", 20, 40)
        text("Press H to enable hitboxes", 20, 80)
        text(`Currently ${hitboxesEnabled}`, 20, 100)
        text(`Current difficulty level: ${difficulty}`, 20, 300)
        clearBtn.show()
        exitBtn.show()
    }

    if(menu == 5) {
        frameRate(60)
        nextInfoBtn.show()
        exitBtn.show()
        textSize(18)
        textAlign(CENTER)
        fill('white')
        stroke('black')
        strokeWeight(2)
        background(bgImg)

        // Fish 1 Tilapia
        if (currentInfo == 1) {
            image(fishImages[0], (width / 2) - 50, (height / 2) - 150, 100, 100)
            text("This is the Tilapia, they can be\n found in Africa and the Middle East,\n and they have been referred to as\n 'Water Chickens' because they reproduce fast and\n are easy to farm.", width / 2, height / 2)
            text("Damage: 80\n Penality: -800 Score", width / 2, (height / 2) + 150)
        }

        // Fish 2 Queen Angelfish
        if (currentInfo == 2) {
            image(fishImages[1], (width / 2) - 50, (height / 2) - 150, 100, 100)
            text("This is the Queen Angelfish, and they can be\n found in the Caribbean and the Atlantic Ocean.\n They got their name because the ring on\n their head looks like a crown. They have been\n known to eat sponges which most fish avoid due to bad taste.", width / 2, height / 2)
            text("Damage: 100\n Penality: -1000 Score", width / 2, (height / 2) + 150)
        }

        // Fish 3 Squirrelfish
        if (currentInfo == 3) {
            image(fishImages[2], (width / 2) - 50, (height / 2) - 150, 100, 100)
            text("This is the Squirrelfish, and they can be\n found in Atlantic, Pacific and Indian Oceans.\n They have huge eyes that help them see in\n the dark. Their spines are sharp which helps\n protect them from potential predators.", width / 2, height / 2)
            text("Damage: 150\n Penality: -1500 Score", width / 2, (height / 2) + 150)
        }

        // Fish 4 Rudd
        if (currentInfo == 4) {
            image(fishImages[3], (width / 2) - 50, (height / 2) - 150, 100, 100)
            text("This is the rudd. They're found in\n Europe and West Asia. They're famous for having bright\n orange fins, and they also eat insects and plants.", width / 2, height / 2)
            text("Damage: 250\n Penality: -2500 Score", width / 2, (height / 2) + 150)
        }

        // Fish 5 Goldfish
        if (currentInfo == 5) {
            image(fishImages[4], (width / 2) - 50, (height / 2) - 150, 100, 100)
            text("This is a goldfish. They're known to be\n kept as pets in fish bowls and fish tanks.\n They were first domesticated in China 1,000 years ago.", width / 2, height / 2)
            text("Damage: 200\n Penality: -5000 Score", width / 2, (height / 2) + 150)
        }

        // Fish 6 Shark
        if (currentInfo == 6) {
            image(fishImages[5], (width / 2) - 50, (height / 2) - 250, 200, 200)
            text("This is a shark, one of the\n most dangerous predators in the ocean. They've been\n featured in movies such as 'The Meg' and 'Jaws'.", width / 2, height / 2)
            text("Damage: 300\n Penality: Score / 6", width / 2, (height / 2) + 150)
        }

        // Fish 7 Orca
        if (currentInfo == 7) {
            image(fishImages[6], (width / 2) - 50, (height / 2) - 250, 300, 200)
            text("This is an orca, also known as a\n 'killer whale'. They've been featured in marine theme parks such as\n Sea World. They got their name as sailors saw them\n hunt larger whales. ", width / 2, height / 2)
            text("Damage: 500\n Penality: Score / 4", width / 2, (height / 2) + 150)
        }
    }
}

function keyPressed(event) {
    if ((event.key === 'p' || event.key === 'P') && menu == 1) {
        menu = 2;
    }
    if (((event.key === 'q' || event.key === 'Q') || keyCode === ESCAPE) && (menu == 2 || menu == 4 || menu == 5)) {
        menu = 0;
        stroke('black')
        settingsBtn.show()
        shopBtn.show()
        infoBtn.show()
        difficultyBtn.hide()
        nextInfoBtn.hide()
        exitBtn.hide()
        jetpackBtn.hide()
        clearBtn.hide()
        trashIncreaseBtn.hide()
        strokeWeight(0)
        textAlign(LEFT)
    }
    if (keyCode === ENTER && menu == 0) {
        menu = 1
        shopBtn.hide()
        settingsBtn.hide()
        infoBtn.hide()
        startSpawning()
    }
    if(keyCode === ESCAPE && menu == 2) {
        shopBtn.show()
        settingsBtn.show()
        infoBtn.show()
        menu = 0
    }

    if(!once) {
        startSpawning()
        once = true
    }
    if ((event.key === 's' || event.key === 'S') && menu == 0) {
        saveData.highScore = highScore;
        saveData.gold = gold;
        saveData.jetpackOwned = jetpackOwned;
        saveData.itemSpawnRate = itemSpawnRate
        saveData.fishSpawnRate = fishSpawnRate
        saveData.hitboxesEnabled = hitboxesEnabled;
        saveData.health = health;
        saveData.playerSpeed = playerSpeed;
        saveData.fishSpeed = fishSpeed;
        saveData.itemSpeed = itemSpeed;
        saveData.playerWidth = playerWidth;
        saveData.playerHeight = playerHeight;
        saveData.difficulty = difficulty;
        settingsBtn.show()
        shopBtn.show()
        infoBtn.show()
        
        localStorage.setItem("trashGameSave", JSON.stringify(saveData))
    }
    if ((event.key === 'h' || event.key === 'H') && menu == 4) {
        hitboxesEnabled = true;
    }
}

function exitMenu() {
    menu = 0;
    strokeWeight(0)
    textAlign(LEFT)
    exitBtn.hide()
    difficultyBtn.hide()
    infoBtn.hide()
    nextInfoBtn.hide()
    settingsBtn.show()
    shopBtn.show()
    infoBtn.show()
    jetpackBtn.hide()
    clearBtn.hide()
    trashIncreaseBtn.hide()
}

function shopMenu() {
    menu = 3;
    shopBtn.hide()
    settingsBtn.hide()
    infoBtn.hide()
}

function buyJetpack() {
    if (gold >= 200 && jetpackOwned >= 10) {
        jetpackSpeed += 0.2
        playerSpeed += jetpackSpeed;
        jetpackOwned += 1
        gold -= 200;
    }
}

function buyTrashIncrease() {
    if (gold >= 200 && itemSpawnRate > 100) {
        itemSpawnRate -= 10
        gold -= 200;
        clearInterval(itemInterval)
        itemInterval = setInterval(spawnItems, itemSpawnRate)
    }    
}

function settingsMenu() {
    menu = 4;
    shopBtn.hide()
    settingsBtn.hide()
    infoBtn.hide()
}

function infoMenu() {
    menu = 5;
    shopBtn.hide()
    settingsBtn.hide()
    infoBtn.hide()
    exitBtn.show()
}

function nextInfo() {
    currentInfo++
    if(currentInfo > 7) {
        currentInfo = 1
    }
}

function clearData() {
    clearStorage();
}
 
function increaseDifficulty() {
    difficulty++
    if(difficulty > 3) {
        difficulty = 0
    }
    changeDifficulty()
    saveData.difficulty = difficulty
    localStorage.setItem("trashGameSave", JSON.stringify(saveData))
}

function changeDifficulty() {
    if (difficulty == 0) {
        health = 1000
        playerSpeed = 3 + jetpackSpeed
        fishSpeed = 2
        fishSpawnRate = 1200
        itemSpeed = 2
        itemSpawnRate = 800
        playerWidth = 60
        playerHeight = 50
        saveData.health = health;
        saveData.playerSpeed = playerSpeed;
        saveData.fishSpeed = fishSpeed;
        saveData.itemSpeed = itemSpeed;
        saveData.itemSpawnRate = itemSpawnRate;
        saveData.fishSpawnRate = fishSpawnRate
        saveData.playerWidth = playerWidth;
        saveData.playerHeight = playerHeight;
        saveData.hitboxesEnabled = hitboxesEnabled;
        saveData.difficulty = difficulty;
    }
    if (difficulty == 1) {
        health = 500;
        playerSpeed = 2.5 + jetpackSpeed
        fishSpeed = 2.5
        fishSpawnRate = 1100
        itemSpeed = 3
        itemSpawnRate = 750
        playerWidth = 60
        playerHeight = 50
        saveData.health = health;
        saveData.playerSpeed = playerSpeed;
        saveData.fishSpeed = fishSpeed;
        saveData.itemSpeed = itemSpeed;
        saveData.itemSpawnRate = itemSpawnRate;
        saveData.fishSpawnRate = fishSpawnRate
        saveData.playerWidth = playerWidth;
        saveData.playerHeight = playerHeight;
        saveData.hitboxesEnabled = hitboxesEnabled;
        saveData.difficulty = difficulty;
    }
    if (difficulty == 2) {
        health = 250
        playerSpeed = 2.5 + jetpackSpeed
        fishSpeed = 3
        fishSpawnRate = 1000
        itemSpeed = 4
        itemSpawnRate = 700
        playerWidth = 50
        playerHeight = 45
        saveData.health = health;
        saveData.playerSpeed = playerSpeed;
        saveData.fishSpeed = fishSpeed;
        saveData.itemSpeed = itemSpeed;
        saveData.itemSpawnRate = itemSpawnRate;
        saveData.fishSpawnRate = fishSpawnRate
        saveData.playerWidth = playerWidth;
        saveData.playerHeight = playerHeight;
        saveData.hitboxesEnabled = hitboxesEnabled;
        saveData.difficulty = difficulty;
    }
    if (difficulty == 3) {
        health = 1
        playerSpeed = 2 + jetpackSpeed
        fishSpeed = 3.25
        fishSpawnRate = 950
        itemSpeed = 4
        itemSpawnRate = 600
        playerWidth = 40
        playerHeight = 40
        saveData.health = health;
        saveData.playerSpeed = playerSpeed;
        saveData.fishSpeed = fishSpeed;
        saveData.itemSpeed = itemSpeed;
        saveData.itemSpawnRate = itemSpawnRate;
        saveData.fishSpawnRate = fishSpawnRate
        saveData.playerWidth = playerWidth;
        saveData.playerHeight = playerHeight;
        saveData.hitboxesEnabled = hitboxesEnabled;
        saveData.difficulty = difficulty;
    }
}

function spawnItems() {
    let item = {
        itemX: 690,
        itemY: Math.floor(Math.random() * 420),
        img: itemImages[Math.floor(random(itemImages.length))]
    }
    items.push(item);
}

function spawnFishes() {
    let fish = {
        fishX: 690,
        fishY: Math.floor(Math.random() * 420),
        img: fishImages[Math.floor(random(fishImages.length))]
    }
    fishes.push(fish);
}

function moveItems() {
    for (let i = items.length - 1; i >= 0; i--) {
        if (!items[i]) continue;
        if(items[i].itemX < -500) {
            items.splice(i, 1)
            continue;
        }
        if(hitboxesEnabled) {
            noFill()
            stroke('lime')
            strokeWeight(2)
            rect(items[i].itemX, items[i].itemY, itemWidth, itemHeight)
            noStroke()
        }
        image(items[i].img, items[i].itemX, items[i].itemY, itemWidth, itemHeight);
        items[i].itemX -= itemSpeed;
        if(playerX < items[i].itemX + itemWidth && playerX + playerWidth > items[i].itemX && playerY < items[i].itemY + itemHeight && playerY + playerHeight > items[i].itemY) {
            if(items[i].img == itemImages[0]) { // Black Bag
                incrementScore(50)
                items.splice(i, 1)
                continue;
            }
            if(items[i].img == itemImages[1]) { // Brown Bag
                incrementScore(30)
                items.splice(i, 1)
                continue;
            }
            if(items[i].img == itemImages[2]) { // Food Bag
                incrementScore(100)
                items.splice(i, 1)
                continue;
            }
            if(items[i].img == itemImages[3]) { // Paper Bag
                incrementScore(50)
                items.splice(i, 1)
                continue;
            }
            if(items[i].img == itemImages[4]) { // Small Bag
                incrementScore(20)
                items.splice(i, 1)
                continue;
            }

            if(items[i].img == itemImages[5]) { // Blue Balloon
                incrementScore(200)
                items.splice(i, 1)
                continue;
            }
            if(items[i].img == itemImages[6]) { // Green Balloon
                incrementScore(150)
                items.splice(i, 1)
                continue;
            }

            if(items[i].img == itemImages[7]) { // Bottle
                incrementScore(200)
                items.splice(i, 1)
                continue;
            }
            if(items[i].img == itemImages[8]) { // Crushed Bottle
                incrementScore(125)
                items.splice(i, 1)
                continue;
            }
            if(items[i].img == itemImages[9]) { // Piss Bottle
                incrementScore(75)
                items.splice(i, 1)
                continue;
            }

            if(items[i].img == itemImages[10]) { // Hook
                incrementScore(300)
                items.splice(i, 1)
                continue;
            }
            if(items[i].img == itemImages[11]) { // Net
                incrementScore(500)
                items.splice(i, 1)
                continue;
            }
            if(items[i].img == itemImages[12]) { // Rod
                incrementScore(200)
                items.splice(i, 1)
                continue;
            }

            if(items[i].img == itemImages[13]) { // Brown Glass
                incrementScore(125)
                items.splice(i, 1)
                continue;
            }
            if(items[i].img == itemImages[14]) { // White Glass
                incrementScore(50)
                items.splice(i, 1)
                continue;
            }

            if(items[i].img == itemImages[15]) { // Closed Box
                incrementScore(45)
                items.splice(i, 1)
                continue;
            }
            if(items[i].img == itemImages[16]) { // Kelpo
                incrementScore(65)
                items.splice(i, 1)
                continue;
            }
        }
    }
}

function moveFishes() {
    for (let i = fishes.length - 1; i >= 0; i--) {
        if (!fishes[i]) continue;
        if(fishes[i].fishX < -500) {
            
            fishes.splice(i, 1)
            continue;
        }
        fishWidth = 50
        fishHeight = 50
        if(fishes[i].img == fishImages[5]) {
            fishWidth = fishWidth * 3
            fishHeight = fishHeight * 3
        }
        else if(fishes[i].img == fishImages[6]) {
            fishWidth = fishWidth * 5
            fishHeight = fishHeight * 5
        }
        else {
            fishWidth = 50
            fishHeight = 50
        }
        if(hitboxesEnabled) {
            noFill()
            stroke('red')
            strokeWeight(2)
            rect(fishes[i].fishX, fishes[i].fishY, fishWidth, fishHeight)
            noStroke()
        }
        image(fishes[i].img, fishes[i].fishX, fishes[i].fishY, fishWidth, fishHeight);
        fishes[i].fishX -= fishSpeed;
        if(playerX < fishes[i].fishX + fishWidth && playerX + playerWidth > fishes[i].fishX && playerY < fishes[i].fishY + fishHeight && playerY + playerHeight > fishes[i].fishY) {
            if(fishes[i].img == fishImages[0]) { // Tilapia
                damageHealth(80)
                incrementScore(-800)
                fishes.splice(i, 1)
                continue;
            }
            if(fishes[i].img == fishImages[1]) { // Queen Angelfish
                damageHealth(100)
                incrementScore(-1000)
                fishes.splice(i, 1)
                continue;
            }
            if(fishes[i].img == fishImages[2]) { // Squirrelfish
                damageHealth(150)
                incrementScore(-1500)
                fishes.splice(i, 1)
                continue;
            }
            if(fishes[i].img == fishImages[3]) { // Rudd
                damageHealth(200)
                incrementScore(-2500)
                fishes.splice(i, 1)
                continue;
            }
            if(fishes[i].img == fishImages[4]) { // Goldfish
                damageHealth(250)
                incrementScore(-5000)
                fishes.splice(i, 1)
                continue;
            }
            if(fishes[i].img == fishImages[5]) { // Shark
                damageHealth(300)
                incrementScore(-(score / 6))
                score = Math.round(score)
                fishes.splice(i, 1)
                continue;
            }
            if(fishes[i].img == fishImages[6]) { // Orca
                damageHealth(500)
                incrementScore(-(score / 4))
                score = Math.round(score)
                fishes.splice(i, 1)
                continue;
            }
    }
}
}