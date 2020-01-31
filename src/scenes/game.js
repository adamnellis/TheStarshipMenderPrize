import {
    Scene
} from 'phaser'
import {
    TextButton
} from '../ui/button'

export default class Game extends Scene {
    constructor() {
        super('game')
    }

    preload() {}

    create(data) {
        // data is passed from 

        this.back_button = new TextButton(
            this,
            100,
            200,
            'Back', {
                font: "bold 32px Arial",
                fill: '#0f0'
            },
            () => this.scene.start('title')
        );

        // TODO: create game object here.
    }
}