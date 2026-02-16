let score = 0;
let health = 100;
let bgColor = "cyan"

function incrementScore() {
    score += 1;
    return score;
}

function damageHealth() {
    health -= 25
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
    setInterval(damageHealth, 1000)
}

function draw() {
    background(bgColor)
    textSize(12)
    text(`Score: ${score}`, 10, 20)
    text(`Health: ${health}`, 10, 40)
}