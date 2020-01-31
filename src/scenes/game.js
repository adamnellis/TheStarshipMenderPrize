import {
    Scene
} from 'phaser'
import {
    TextButton
} from '../ui/button'
import Enemies from '../actors/enemies'

export default class Game extends Scene {
    constructor() {
        super('game')
    }

    preload() {}

    create(data) {
        // data is passed from button

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

        this.enemies = new Enemies(this)
        this.enemies.spawn()
    }
}