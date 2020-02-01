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

    preload() {

        this.load.image('test', require('../assets/title.png'));

    }

    create() {

        this.add.image(700, 432, 'test');

        this.title_button_small = new TextButton(
            this,
            950,
            700,
            'Start Game', {
                font: "bold 50px Arial",
                fill: '#bb6c2e'
            },
            () => this.scene.start('game', {
                // level: 1 - we can pass data from button to game.
            })
        );
    }
}