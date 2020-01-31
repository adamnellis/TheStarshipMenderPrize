import {
    Scene
} from 'phaser'
import {
    TextButton
} from '../ui/button';

export default class Title extends Scene {
    constructor() {
        super('title')
    }

    preload() {}

    create() {
        this.title = this.add.text(100, 100, 'Starship Menderprize', {
            font: "bold 32px Arial",
            fill: "#fff"
        })

        this.title_button_small = new TextButton(
            this,
            100,
            200,
            'Start Game', {
                font: "bold 32px Arial",
                fill: '#0f0'
            },
            () => this.scene.start('game', {
                // level: 1 - we can pass data from button to game.
            })
        );
    }
}