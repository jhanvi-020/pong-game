# Pong Game 🎮

A classic Pong game built with vanilla HTML, CSS, and JavaScript. Play against an intelligent AI opponent in this fast-paced arcade game!

## Features ✨

- **Interactive Gameplay**: Play against an AI-controlled opponent
- **Multiple Control Methods**: Use mouse position or arrow keys to control your paddle
- **Smooth Physics**: Ball physics with spin mechanics based on paddle hit location
- **Score Tracking**: First player to 11 points wins
- **Beautiful UI**: Modern glassmorphism design with neon colors and gradient background
- **Responsive Canvas**: 800x400 game canvas with smooth animations

## How to Play 🕹️

### Controls
- **Mouse**: Move your paddle by moving the mouse vertically
- **Keyboard**: Use Arrow Up (↑) and Arrow Down (↓) keys

### Objective
- Beat the computer! First to 11 points wins the match
- The ball bounces off paddles and walls
- If the ball passes your paddle, the opponent scores
- Strategic paddle positioning adds spin to the ball

## Game Mechanics

- **Paddles**: 10x80 pixels, can move freely within canvas bounds
- **Ball**: 8x8 pixels with adjustable speed and spin
- **AI Opponent**: Intelligent tracking system with realistic difficulty
- **Ball Physics**: Bounces off walls and paddles with dynamic speed adjustments
- **Spin Mechanics**: Ball trajectory changes based on where it hits the paddle

## Installation & Setup

### Quick Start
1. Clone the repository:
   ```bash
   git clone https://github.com/jhanvi-020/pong-game.git
   cd pong-game
   ```

2. Open the game:
   - Simply open `index.html` in any modern web browser
   - No installation or build process required!

### File Structure
```
pong-game/
├── index.html    # Main HTML file with game structure
├── style.css     # Game styling and visual design
├── script.js     # Game logic and mechanics
└── README.md     # This file
```

## Browser Support

- Chrome/Chromium (Latest)
- Firefox (Latest)
- Safari (Latest)
- Edge (Latest)
- Any modern browser with HTML5 Canvas support

## Game Constants

You can customize the game by modifying these values in `script.js`:

```javascript
const PADDLE_HEIGHT = 80;      // Height of paddle
const PADDLE_WIDTH = 10;       // Width of paddle
const BALL_SIZE = 8;           // Diameter of ball
const PADDLE_SPEED = 6;        // Player paddle speed
const COMPUTER_SPEED = 4;      // Computer paddle speed
const BALL_SPEED = 5;          // Initial ball speed
const WIN_SCORE = 11;          // Points to win
```

## Future Enhancements 🚀

- [ ] Difficulty levels (Easy, Medium, Hard)
- [ ] Sound effects and background music
- [ ] Multiplayer mode (2-player local)
- [ ] Speed progression during gameplay
- [ ] Power-ups and special effects
- [ ] Mobile touch controls
- [ ] Score leaderboard
- [ ] Game statistics and replay system

## Technologies Used

- **HTML5**: Canvas API for game rendering
- **CSS3**: Modern styling with gradients and backdrop filters
- **Vanilla JavaScript**: No frameworks, pure game logic

## License

This project is open source and available under the MIT License.

## Contributing

Contributions are welcome! Feel free to:
- Report bugs and issues
- Suggest new features
- Submit pull requests with improvements
- Improve documentation

## Author

Created by [jhanvi-020](https://github.com/jhanvi-020)

## Play Now! 🎯

Open `index.html` in your browser and enjoy the game! No setup required.

---

**Enjoy the game and challenge the AI! 🏓**