// Canvas setup
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Game constants
const PADDLE_HEIGHT = 80;
const PADDLE_WIDTH = 10;
const BALL_SIZE = 8;
const PADDLE_SPEED = 6;
const COMPUTER_SPEED = 4;
const BALL_SPEED = 5;
const WIN_SCORE = 11;

// Ball object
const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    width: BALL_SIZE,
    height: BALL_SIZE,
    speedX: BALL_SPEED,
    speedY: BALL_SPEED
};

// Player paddle (left)
const player = {
    x: 10,
    y: canvas.height / 2 - PADDLE_HEIGHT / 2,
    width: PADDLE_WIDTH,
    height: PADDLE_HEIGHT,
    dy: 0,
    score: 0
};

// Computer paddle (right)
const computer = {
    x: canvas.width - PADDLE_WIDTH - 10,
    y: canvas.height / 2 - PADDLE_HEIGHT / 2,
    width: PADDLE_WIDTH,
    height: PADDLE_HEIGHT,
    dy: 0,
    score: 0
};

// Input handling
const keys = {};
window.addEventListener('keydown', (e) => {
    keys[e.key] = true;
});

window.addEventListener('keyup', (e) => {
    keys[e.key] = false;
});

let mouseY = canvas.height / 2;
canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouseY = e.clientY - rect.top;
});

// Update player paddle position
function updatePlayer() {
    // Arrow keys control
    if (keys['ArrowUp']) {
        player.dy = -PADDLE_SPEED;
    } else if (keys['ArrowDown']) {
        player.dy = PADDLE_SPEED;
    } else {
        // Mouse control
        const targetY = mouseY - PADDLE_HEIGHT / 2;
        const diff = targetY - player.y;
        player.dy = Math.max(-PADDLE_SPEED, Math.min(PADDLE_SPEED, diff * 0.1));
    }

    player.y += player.dy;

    // Boundary checking
    if (player.y < 0) {
        player.y = 0;
    }
    if (player.y + PADDLE_HEIGHT > canvas.height) {
        player.y = canvas.height - PADDLE_HEIGHT;
    }
}

// Update computer paddle position (AI)
function updateComputer() {
    const computerCenter = computer.y + PADDLE_HEIGHT / 2;
    const ballCenter = ball.y;

    // Simple AI: track the ball
    if (computerCenter < ballCenter - 35) {
        computer.dy = COMPUTER_SPEED;
    } else if (computerCenter > ballCenter + 35) {
        computer.dy = -COMPUTER_SPEED;
    } else {
        computer.dy = 0;
    }

    computer.y += computer.dy;

    // Boundary checking
    if (computer.y < 0) {
        computer.y = 0;
    }
    if (computer.y + PADDLE_HEIGHT > canvas.height) {
        computer.y = canvas.height - PADDLE_HEIGHT;
    }
}

// Update ball position
function updateBall() {
    ball.x += ball.speedX;
    ball.y += ball.speedY;

    // Top and bottom collision
    if (ball.y - BALL_SIZE / 2 < 0 || ball.y + BALL_SIZE / 2 > canvas.height) {
        ball.speedY = -ball.speedY;
        // Clamp ball position to prevent it from getting stuck
        if (ball.y - BALL_SIZE / 2 < 0) {
            ball.y = BALL_SIZE / 2;
        } else {
            ball.y = canvas.height - BALL_SIZE / 2;
        }
    }

    // Paddle collision - Player
    if (
        ball.x - BALL_SIZE / 2 < player.x + PADDLE_WIDTH &&
        ball.y > player.y &&
        ball.y < player.y + PADDLE_HEIGHT &&
        ball.speedX < 0
    ) {
        ball.speedX = -ball.speedX;
        ball.x = player.x + PADDLE_WIDTH + BALL_SIZE / 2;
        // Add spin based on where ball hit the paddle
        const deltaY = (ball.y - (player.y + PADDLE_HEIGHT / 2)) / (PADDLE_HEIGHT / 2);
        ball.speedY += deltaY * 3;
    }

    // Paddle collision - Computer
    if (
        ball.x + BALL_SIZE / 2 > computer.x &&
        ball.y > computer.y &&
        ball.y < computer.y + PADDLE_HEIGHT &&
        ball.speedX > 0
    ) {
        ball.speedX = -ball.speedX;
        ball.x = computer.x - BALL_SIZE / 2;
        // Add spin based on where ball hit the paddle
        const deltaY = (ball.y - (computer.y + PADDLE_HEIGHT / 2)) / (PADDLE_HEIGHT / 2);
        ball.speedY += deltaY * 3;
    }

    // Score points
    if (ball.x < 0) {
        computer.score++;
        resetBall();
    }
    if (ball.x > canvas.width) {
        player.score++;
        resetBall();
    }
}

// Reset ball to center
function resetBall() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.speedX = BALL_SPEED * (Math.random() > 0.5 ? 1 : -1);
    ball.speedY = BALL_SPEED * (Math.random() * 2 - 1);
}

// Draw function
function draw() {
    // Clear canvas
    ctx.fillStyle = '#1a1a2e';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw center line
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.setLineDash([10, 10]);
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, canvas.height);
    ctx.stroke();
    ctx.setLineDash([]);

    // Draw paddles
    ctx.fillStyle = '#00ff88';
    ctx.fillRect(player.x, player.y, player.width, player.height);
    ctx.fillRect(computer.x, computer.y, computer.width, computer.height);

    // Draw ball
    ctx.fillStyle = '#ff006e';
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, BALL_SIZE / 2, 0, Math.PI * 2);
    ctx.fill();
}

// Update scores display
function updateScoreDisplay() {
    document.getElementById('playerScore').textContent = player.score;
    document.getElementById('computerScore').textContent = computer.score;
}

// Check win condition
function checkWinCondition() {
    if (player.score >= WIN_SCORE) {
        alert(`You won! Final score: ${player.score} - ${computer.score}`);
        resetGame();
    } else if (computer.score >= WIN_SCORE) {
        alert(`Computer won! Final score: ${player.score} - ${computer.score}`);
        resetGame();
    }
}

// Reset game
function resetGame() {
    player.score = 0;
    computer.score = 0;
    resetBall();
    updateScoreDisplay();
}

// Game loop
function gameLoop() {
    updatePlayer();
    updateComputer();
    updateBall();
    checkWinCondition();
    updateScoreDisplay();
    draw();
    requestAnimationFrame(gameLoop);
}

// Start the game
gameLoop();