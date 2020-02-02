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

        this.load.image('background', require('../assets/title.png'));

    }

    create() {

        this.add.image(750, 450, 'background');


        this.cursors = this.input.keyboard.addKeys('space');

        this.title_button_small = new TextButton(
            this,
            750,
            700,
            'Press SPACE to Start Game', {
                font: "bold 45px  Arial",
                fill: '#bb6c2e'
            },
            () => this.scene.start('game', {
                // level: 1 - we can pass data from button to game.
            })
        );
    }

    update() {
        if(this.cursors.space.isDown){
            this.scene.start('game', {
                // level: 1 - we can pass data from button to game.
            })
        }
    }
}