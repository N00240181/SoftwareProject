let score = 0;

function incrementScore() {
    score += 1;
    return score;
}

function setup() {
    createCanvas(640, 480)

    setInterval(incrementScore, 10)
}

function draw() {
    background("cyan")
    text(`Score: ${score}`, 10, 20)
}