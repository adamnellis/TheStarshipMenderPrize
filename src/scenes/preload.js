import {
    Scene
} from 'phaser'

export default class Preload extends Scene {
    constructor() {
        super('preload')
    }

    preload() {
        // Tiles
        // this.load.image('sprite', require('../assets/tiles/sprite.png'));

        // Example Spritesheet
        // this.load.spritesheet('spritesheet_name', require('../assets/characters/spritesheet.png'), {
        //     frameWidth: 32,
        //     frameHeight: 34,
        //     endFrame: 8
        // });
    }

    create() {
        this.scene.start('title')
    }
}