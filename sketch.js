let score = 0;
let health = 100;
let bgColor = "cyan"

function preload() {
    playerImg = loadImage('/images/player/player.gif');
}

function incrementScore() {
    score += 1;
    return score;
}

function spawnPlayer() {
    image(playerImg, 10, 100, 100, 100)
}

function damageHealth() {
    health -= 1
    if (health <= 0) {
        bgColor = "black";
        fill("red");
        textSize(36)
        text("Finished", 10, 80)
        noLoop();
    }
}

function setup() {
    createCanvas(640, 480)
    setInterval(incrementScore, 10)
    /* setInterval(damageHealth, 40) */
}

function draw() {
    background(bgColor)
    textSize(12)
    text(`Score: ${score}`, 10, 20)
    text(`Health: ${health}`, 10, 40)
    spawnPlayer()
}