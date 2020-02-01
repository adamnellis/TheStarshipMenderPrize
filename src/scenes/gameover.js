import {
    Scene
} from 'phaser'
import {
    TextButton
} from '../ui/button';
import FinalScore from '../ui/finalScore'

export default class GameOver extends Scene {
    constructor() {
        super('gameover')
    }

    preload() {

        this.load.image('background', require('../assets/gameOver.png'));

    }

    create(data) {
        this.add.image(750, 450, 'background');

        this.score = new FinalScore(this, data.score)

        this.title_button_small = new TextButton(
            this,
            950,
            700,
            'Restart Game', {
                font: "bold 50px Arial",
                fill: '#bb6c2e'
            },
            () => this.scene.start('game', {
                // level: 1 - we can pass data from button to game.
            })
        );
    }
}