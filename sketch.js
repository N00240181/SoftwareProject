/* let canvasWidth = 640;
let canvasHeight = 480; */
let canvasWidth = 1280;
let canvasHeight = 720;

// Score, Items, etc.

let skeletonScore = 0;
let score = 0;
let highScore = 0;
let health = 1000;
let timer = 0;
let gateOne = true;
let gateTwo = true;
let gateThree = true;
let gateFour = true;
let gateFive = true;
let gateSix = true;
let jetpackOwned = 0;
let jetpackSpeed = 0;
let magnetOwned = 0;
let itemSpawnRate = 800;

// Spawning, Movement, etc.

let itemInterval;
let fishInterval;
let player;
let skin = 0;
let skinOwned = false;
let playerX = 10;
let playerY = 100;
let playerWidth = 60;
let playerHeight = 50;
let playerSpeed = 4.5;
let itemSpeed = 3;
let items = [];
let itemX = 0;
let itemY = 0;
let fishes = [];
let fishSpawnRate = 1200;
let tempFishRate = fishSpawnRate
let fishX = 0;
let fishY = 0;
let gold = 20000;
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
let resumeBtn;
let saveData;
let bgMusic;
let musicEnabled = 0

// Shop

let shopBtn;
let jetpackBtn;
let trashIncreaseBtn;
let magnetBtn;
let buySkinBtn;

// Settings

let tutorial = true;
let tutorialBtn;
let settingsBtn;
let difficultyBtn;
let difficulty = 0;
let clearBtn;
let hitboxesEnabled = false;

// Info

let infoBtn;
let nextInfoBtn;
let currentInfo = 1;

function preload() {
    playerImg = [
        loadImage('images/player/player.png'),
        loadImage('images/player/wojak.gif'),
        loadImage('images/skeleton.gif')
    ]
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
    bgMusic = loadSound('sounds/Donkey_Kong_Country_-_Aquatic_Ambience_Restored.mp3')
}

function incrementScore(num) {
    score += num;
    return score;
}

function spawnPlayer() {
    image(playerImg[skin], playerX, playerY, playerWidth, playerHeight);
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
        goldAdded = Math.round(score / 40)
        }
        else {
            goldAdded = Math.round(score / 10)
        }
        gold += goldAdded
        if(score > highScore) {
            highScore = score
        }
        menu = 0
        settingsBtn.show()
        shopBtn.show()
        infoBtn.show()
        saveData.fishSpawnRate = tempFishRate
        reset()
        score = 0;
    }
}

function movePlayer() {
    if(keyIsDown(UP_ARROW) || keyIsDown(87)) {
        playerY -= playerSpeed;
    }
    if(keyIsDown(DOWN_ARROW) || keyIsDown(83)) {
        playerY += playerSpeed;
    }
    if(keyIsDown(LEFT_ARROW) || keyIsDown(65)) {
        playerX -= playerSpeed;
    }
    if(keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {
        playerX += playerSpeed;
    }
}

function reset() {
    playerX = 20
    playerY = 200
    playerWidth = 50
    playerHeight = 60
    health = saveData.health
    changeDifficulty()
    timer = 0;
    score = 0;
    items = [];
    fishes = [];
    clearInterval(itemInterval)
    clearInterval(fishInterval)
}

function setup() {
    createCanvas(canvasWidth, canvasHeight);
    frameRate(60);
    bgMusic.play()

    let saved = localStorage.getItem("trashGameSave");
    if(saved) {
        saveData = JSON.parse(saved);
    }
    else {
        saveData = {
            skeletonScore: 0,
            highScore: 0,
            gold: 20000,
            jetpackOwned: 0,
            magnetOwned: 0,
            itemSpawnRate: 800,
            playerWidth: playerWidth,
            playerHeight: playerHeight,
            fishSpawnRate: 1200,
            hitboxesEnabled: false,
            health: 1000,
            playerSpeed: 4.5,
            itemSpeed: 3,
            fishSpeed: 2,
            difficulty: 0,
            skin: 0,
            skinOwned: false,
            tutorial: true
        }
    }
    skeletonScore = saveData.skeletonScore
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
    skin = saveData.skin
    skinOwned = saveData.skinOwned
    tutorial = saveData.tutorial

    if(menu == 0) {
    shopBtn = createButton('Shop')
    shopBtn.mousePressed(shopMenu)
    shopBtn.position((width / 2) - 150, (height / 2) + 50)
    jetpackBtn = createButton('Purchase Jetpack')
    jetpackBtn.position(30, 140)
    jetpackBtn.mousePressed(buyJetpack)
    jetpackBtn.hide()
    magnetBtn = createButton('Purchase Magnet')
    magnetBtn.position(30, 280)
    magnetBtn.mousePressed(buyMagnet)
    magnetBtn.hide()
    trashIncreaseBtn = createButton('Increase Spawn Rate')
    trashIncreaseBtn.position(30, 210)
    trashIncreaseBtn.mousePressed(buyTrashIncrease)
    trashIncreaseBtn.hide()
    buySkinBtn = createButton('Purchase New Skin')
    buySkinBtn.position(30, 350)
    buySkinBtn.mousePressed(buySkin)
    buySkinBtn.hide()
    changeSkinBtn = createButton('Swap Skin')
    changeSkinBtn.position(30, 420)
    changeSkinBtn.mousePressed(changeSkin)
    changeSkinBtn.hide()
    settingsBtn = createButton('Settings')
    settingsBtn.position((width / 2) - 25, (height / 2) + 50)
    settingsBtn.mousePressed(settingsMenu)
    infoBtn = createButton('Information!')
    infoBtn.position((width / 2) + 100, (height / 2) + 50)
    infoBtn.mousePressed(infoMenu)
    nextInfoBtn = createButton('>')
    nextInfoBtn.position(width / 2, (height / 2) + 200)
    nextInfoBtn.mousePressed(nextInfo)
    nextInfoBtn.hide()
    difficultyBtn = createButton('Change Difficulty')
    difficultyBtn.position(30, 165)
    difficultyBtn.mousePressed(increaseDifficulty)
    difficultyBtn.hide()
    clearBtn = createButton('Clear Storage (Double Click)')
    clearBtn.position(width * 0.85, 40)
    clearBtn.doubleClicked(clearStorageData)
    clearBtn.hide()
    exitBtn = createButton('<')
    exitBtn.position(20, height - 20)
    exitBtn.mousePressed(exitMenu)
    exitBtn.hide()
    resumeBtn = createButton('Resume Game')
    resumeBtn.position(50, height - 20)
    resumeBtn.mousePressed(resumeGame)
    resumeBtn.hide()
    musicBtn = createButton('Toggle Music')
    musicBtn.position(30, 190)
    musicBtn.mousePressed(toggleMusic)
    musicBtn.hide()
    tutorialBtn = createButton('View Tutorial')
    tutorialBtn.position(30, 210)
    tutorialBtn.mousePressed(viewTutorial)
    tutorialBtn.hide()
    }
}

function startSpawning() {
    clearInterval(itemInterval)
    clearInterval(fishInterval)
    itemInterval = setInterval(spawnItems, saveData.itemSpawnRate);
    fishInterval = setInterval(spawnFishes, saveData.fishSpawnRate);
}

function draw() {
    // Main Menu
    if(menu == 0) {
        textAlign(CENTER)
        frameRate(60)
        drawingContext.filter = 'blur(12px)';
        background(bgImg)
        drawingContext.filter = 'none';
        stroke(0)
        strokeWeight(3)
        fill("white")
        textSize(21)
        push()
        translate(width / 2, height / 2)
        if(goldAdded == 0) {
            text(`Gold: ${gold}`, 0, 120)
        }
        else {
            text(`Gold: ${gold} + ${goldAdded}!`, 0, 120)
        }
        text(`High Score: ${highScore}`, 0, 150)
        text(`Difficulty level: ${difficulty}`, 0, 180)
        textSize(72)
        text("Trash Game", 0, 0)
        textSize(28)
        text("Press S to Save!", 0, 250)
        text("Press ENTER to Play!", 0, 300)
        if (keyIsPressed && (key === "s" || key === "S")) {
            textSize(10)
            text("Saved!", 0, 275)
        }
        pop()
    }
    // Game
    if(menu == 1) {
    timer += 1 / 60
    textAlign(LEFT)
    frameRate(60)
    score += 1
    goldAdded = 0
    background(bgImg);
    textSize(12);
    fill("white")
    stroke(0)
    strokeWeight(1)

    if(timer > 20 && gateOne == true) {
        fishSpawnRate -= 50
        itemSpeed += 0.5
        fishSpeed += 0.75
        gateOne = false
        clearInterval(itemInterval)
        clearInterval(fishInterval)
        itemInterval = setInterval(spawnItems, itemSpawnRate);
        fishInterval = setInterval(spawnFishes, fishSpawnRate);
        startSpawning()
    }
    if(timer > 40 && gateTwo == true) {
        fishSpawnRate -= 100
        itemSpeed += 0.5
        fishSpeed += 0.75
        gateTwo = false
        clearInterval(itemInterval)
        clearInterval(fishInterval)
        itemInterval = setInterval(spawnItems, itemSpawnRate);
        fishInterval = setInterval(spawnFishes, fishSpawnRate);
        startSpawning()
    }
    if(timer > 60 && gateThree == true) {
        fishSpawnRate -= 150
        itemSpawnRate -= 200
        itemSpeed += 0.5
        fishSpeed += 1
        gateThree= false
        clearInterval(itemInterval)
        clearInterval(fishInterval)
        itemInterval = setInterval(spawnItems, itemSpawnRate);
        fishInterval = setInterval(spawnFishes, fishSpawnRate);
        startSpawning()
    }
    if(timer > 90 && gateFour == true) {
        fishSpawnRate -= 150
        itemSpawnRate -= 25
        fishSpeed += 2
        gateFour = false
        clearInterval(itemInterval)
        clearInterval(fishInterval)
        itemInterval = setInterval(spawnItems, itemSpawnRate);
        fishInterval = setInterval(spawnFishes, fishSpawnRate);
        startSpawning()
    }
    if(timer > 150 && gateFive == true) {
        fishSpawnRate -= 150
        itemSpawnRate -= 25
        fishSpeed += 3
        gateFive = false
        clearInterval(itemInterval)
        clearInterval(fishInterval)
        itemInterval = setInterval(spawnItems, itemSpawnRate);
        fishInterval = setInterval(spawnFishes, fishSpawnRate);
        startSpawning()
    }
    if(timer > 300 && gateSix == true) {
        fishSpawnRate -= 150
        fishSpeed += 5
        gateSix = false
        clearInterval(itemInterval)
        clearInterval(fishInterval)
        itemInterval = setInterval(spawnItems, itemSpawnRate);
        fishInterval = setInterval(spawnFishes, fishSpawnRate);
        startSpawning()
    }
    saveData.itemSpawnRate = itemSpawnRate
    saveData.fishSpawnRate = fishSpawnRate

    if(score < 0) {
        score = 0
    }
    
    text(`Score: ${score.toFixed(0)}`, 10, 20);
    text(`Health: ${health}`, 10, 40);
    text(`Speed: ${playerSpeed}`, 10, 60)
    text(`Trash Spawn Rate: ${itemSpawnRate / 1000} seconds`, 10, 80)
    text(`Magnets: ${magnetOwned}`, 10, 100)
    text(`Fish Spawn Rate: ${fishSpawnRate / 1000} seconds`, 10, 120)
    text(`Timer: ${timer.toFixed(0)} seconds`, 10, 140)
    
    spawnPlayer();
    movePlayer();
    moveItems()
    moveFishes();
    }
    // Pause Menu
    if(menu == 2) {
        textAlign(LEFT)
        background(0, 1)
        fill("white")
        text("Game is paused", width - 100, 20)
        clearInterval(itemInterval)
        clearInterval(fishInterval)
        exitBtn.show()
        resumeBtn.show()
    }
    // Shop
    if(menu == 3) {
        textAlign(LEFT)
        frameRate(5)
        textSize(24)
        background("grey")
        text("Shop", 20, 40)
        text(gold, 20, 80)
        text(`Jetpack: 200 gold - ${jetpackOwned} owned - Increases Speed`, 20, 120)
        jetpackBtn.show()
        text(`Trash Spawn Rate: 200 gold - ${itemSpawnRate / 1000} seconds`, 20, 190)
        trashIncreaseBtn.show()
        text(`Magnet: 500 gold - ${magnetOwned} owned - Increases trash hitbox`, 20, 260)
        magnetBtn.show()
        if(!skinOwned) {
            text(`New Skin! 2500 gold`, 20, 330)
            buySkinBtn.show()
        }
        if(skinOwned || skeletonScore >= 10) {
            text(`Current Skin - ${skin}`, 20, 400)
            changeSkinBtn.show()
        }
        if(keyCode === ESCAPE) {
            goldAdded = 0
            menu = 0
            reset()
            startSpawning()
            jetpackBtn.hide()
            trashIncreaseBtn.hide()
            magnetBtn.hide()
            buySkinBtn.hide()
            changeSkinBtn.hide()
            exitBtn.hide()
            shopBtn.show()
            infoBtn.show()
            settingsBtn.show()
        }
        exitBtn.show()
    }
    // Settings
    if(menu == 4) {
        textAlign(LEFT)
        frameRate(60)
        difficultyBtn.show()
        textSize(18)
        background('grey')
        text("Settings", 20, 40)
        text("Press H to enable hitboxes", 20, 80)
        text(`Currently ${hitboxesEnabled}`, 20, 100)
        text(`Current difficulty level: ${difficulty}`, 20, 140)
        musicBtn.show()
        clearBtn.show()
        tutorialBtn.show()
        exitBtn.show()
    }
    // Info
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

    if (menu == 6) {
        exitBtn.show()
        drawingContext.filter = 'blur(12px)';
        background(bgImg)
        drawingContext.filter = 'none';
        textSize(24)
        textAlign(LEFT)
        fill('white')
        stroke('black')
        strokeWeight(2)
        text("Collect trash and avoid fish to build\nup your score! Score is converted to gold\nat the end of the game, which can be spent\nin the shop to unlock different skins and upgrades!\n\nUse WASD or the arrow keys to move the character,\nand press 'P' to pause the game if you need a break!\n\nGo to the info tab in the main menu to view stats about\nthe fish and trash. There's a settings menu as well,\nin case you'd like to turn off music, enable hitboxes (recommended),\nor view the tutorial again!\n\nPress ENTER to proceed with the game. Good luck!", 100, 100)
    }
}

function keyPressed(event) {
    if ((event.key === 'p' || event.key === 'P') && menu == 1) {
        menu = 2;
    }
    if (((event.key === 'q' || event.key === 'Q') || keyCode === ESCAPE) && (menu == 2 || menu == 4 || menu == 5 || menu == 6)) {
        menu = 0;
        reset()
        stroke('black')
        settingsBtn.show()
        shopBtn.show()
        infoBtn.show()
        difficultyBtn.hide()
        musicBtn.hide()
        nextInfoBtn.hide()
        exitBtn.hide()
        jetpackBtn.hide()
        clearBtn.hide()
        trashIncreaseBtn.hide()
        magnetBtn.hide()
        buySkinBtn.hide()
        changeSkinBtn.hide()
        resumeBtn.hide()
        strokeWeight(0)
        textAlign(CENTER)
    }
    if (keyCode === ENTER && menu == 0 && tutorial === true) {
        menu = 6
        shopBtn.hide()
        settingsBtn.hide()
        infoBtn.hide()
    }
    if (keyCode === ENTER && menu == 6 && tutorial === true) {
        menu = 1
        reset()
        changeDifficulty()
        gateOne = true
        gateTwo = true
        gateThree = true
        gateFour = true
        gateFive = true
        gateSix = true
        tutorial = false
        startSpawning()
        exitBtn.hide()
    }
    if (keyCode === ENTER && menu == 0 && tutorial === false) {
        menu = 1
        reset()
        changeDifficulty()
        gateOne = true
        gateTwo = true
        gateThree = true
        gateFour = true
        gateFive = true
        gateSix = true
        tutorial = false
        shopBtn.hide()
        settingsBtn.hide()
        infoBtn.hide()
        exitBtn.hide()
        startSpawning()
    }
    if(keyCode === ESCAPE && menu == 2) {
        shopBtn.show()
        settingsBtn.show()
        infoBtn.show()
        exitBtn.hide()
        resumeBtn.hide()
        strokeWeight(0)
        menu = 0
    }

    if (keyCode === ENTER && menu == 2) {
        resumeGame()
    }

    if(!once) {
        startSpawning()
        once = true
    }
    if ((event.key === 's' || event.key === 'S') && menu == 0) {
        saveData.skeletonScore = skeletonScore
        saveData.highScore = highScore;
        saveData.gold = gold;
        saveData.jetpackOwned = jetpackOwned;
        saveData.magnetOwned = magnetOwned;
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
        saveData.skin = skin;
        saveData.skinOwned = skinOwned;
        saveData.tutorial = tutorial;
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
    textAlign(CENTER)
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
    magnetBtn.hide()
    buySkinBtn.hide()
    changeSkinBtn.hide()
    musicBtn.hide()
    resumeBtn.hide()
    tutorialBtn.hide()
}

function resumeGame() {
    menu = 1;
    exitBtn.hide()
    resumeBtn.hide()
    startSpawning()
}

function shopMenu() {
    menu = 3;
    shopBtn.hide()
    settingsBtn.hide()
    infoBtn.hide()
}

function buyJetpack() {
    if (gold >= 200 && jetpackOwned < 10) {
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

function buyMagnet() {
    if (gold >= 500 && itemWidth < 125 && itemHeight < 125) {
        magnetOwned++
        itemWidth += 5
        itemHeight += 5
        gold -= 500
    }
}

function buySkin() {
    if (gold >= 2500) {
        skin = 1
        gold -= 2500
        skinOwned = true;
        playerWidth = 80
        playerHeight = 70
        saveData.playerWidth = playerWidth;
        saveData.playerHeight = playerHeight;
        buySkinBtn.hide()
        changeSkinBtn.show()
    }
}

function changeSkin() {
    if (skin == 0) {
        skin++
        playerWidth = 80
        playerHeight = 70
        saveData.playerWidth = playerWidth;
        saveData.playerHeight = playerHeight;
    }
    else if(skin == 1 && skeletonScore < 10) {
        skin = 0
        playerWidth = 60
        playerHeight = 50
        saveData.playerWidth = playerWidth;
        saveData.playerHeight = playerHeight;
    }
    else if(skin == 1 && skeletonScore >= 10) {
        skin++
        playerWidth = 100
        playerHeight = 100
        saveData.playerWidth = playerWidth;
        saveData.playerHeight = playerHeight;
    }
    else {
        skin = 0
        playerWidth = 60
        playerHeight = 50
        saveData.playerWidth = playerWidth;
        saveData.playerHeight = playerHeight;
    }
}

function settingsMenu() {
    menu = 4;
    shopBtn.hide()
    settingsBtn.hide()
    infoBtn.hide()
}

function viewTutorial() {
    menu = 6
    difficultyBtn.hide()
    musicBtn.hide()
    clearBtn.hide()
    tutorialBtn.hide()
    exitBtn.show()
}

function toggleMusic() {
    musicEnabled++
    if(musicEnabled < 1) {
        bgMusic.stop()
    }
    else {
        bgMusic.play()
        musicEnabled = -1
    }
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

function clearStorageData() {
    localStorage.removeItem("trashGameSave")
    console.log("cleared")
    window.location.reload()
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
        playerSpeed = 4.5 + jetpackSpeed
        fishSpeed = 2
        fishSpawnRate = 1200
        itemSpeed = 2
        itemSpawnRate = 800
        saveData.health = health;
        saveData.playerSpeed = playerSpeed;
        saveData.fishSpeed = fishSpeed;
        saveData.itemSpeed = itemSpeed;
        saveData.itemSpawnRate = itemSpawnRate;
        saveData.fishSpawnRate = fishSpawnRate
        saveData.hitboxesEnabled = hitboxesEnabled;
        saveData.difficulty = difficulty;
    }
    if (difficulty == 1) {
        health = 500;
        playerSpeed = 4 + jetpackSpeed
        fishSpeed = 2.5
        fishSpawnRate = 1100
        itemSpeed = 3
        itemSpawnRate = 750
        saveData.health = health;
        saveData.playerSpeed = playerSpeed;
        saveData.fishSpeed = fishSpeed;
        saveData.itemSpeed = itemSpeed;
        saveData.itemSpawnRate = itemSpawnRate;
        saveData.fishSpawnRate = fishSpawnRate
        saveData.hitboxesEnabled = hitboxesEnabled;
        saveData.difficulty = difficulty;
    }
    if (difficulty == 2) {
        health = 250
        playerSpeed = 3.5 + jetpackSpeed
        fishSpeed = 3
        fishSpawnRate = 1000
        itemSpeed = 4
        itemSpawnRate = 700
        saveData.health = health;
        saveData.playerSpeed = playerSpeed;
        saveData.fishSpeed = fishSpeed;
        saveData.itemSpeed = itemSpeed;
        saveData.itemSpawnRate = itemSpawnRate;
        saveData.fishSpawnRate = fishSpawnRate
        saveData.hitboxesEnabled = hitboxesEnabled;
        saveData.difficulty = difficulty;
    }
    if (difficulty == 3) {
        health = 1
        playerSpeed = 3.5 + jetpackSpeed
        fishSpeed = 3.25
        fishSpawnRate = 950
        itemSpeed = 4
        itemSpawnRate = 600
        saveData.health = health;
        saveData.playerSpeed = playerSpeed;
        saveData.fishSpeed = fishSpeed;
        saveData.itemSpeed = itemSpeed;
        saveData.itemSpawnRate = itemSpawnRate;
        saveData.fishSpawnRate = fishSpawnRate
        saveData.hitboxesEnabled = hitboxesEnabled;
        saveData.difficulty = difficulty;
    }
}

function spawnItems() {
    let item = {
        itemX: width + 50,
        itemY: Math.floor(Math.random() * height - 40),
        img: itemImages[Math.floor(random(itemImages.length))]
    }
    items.push(item);
}

function spawnFishes() {
    let fish = {
        fishX: width + 50,
        fishY: Math.floor(Math.random() * height - 40),
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
        items[i].itemY += sin(random(0.005, 60) * (frameCount / 10))
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
            if(items[i].img == itemImages[17]) {
                skeletonScore += 1
                incrementScore(1000)
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
            fishWidth = fishWidth * 2
            fishHeight = fishHeight * 2
        }
        else if(fishes[i].img == fishImages[6]) {
            fishWidth = fishWidth * 2
            fishHeight = fishHeight * 2
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
        fishes[i].fishY += sin(0.05 * frameCount)
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