import { Scene } from 'phaser'

export default class Boot extends Scene {
    constructor() {
        super('boot')
    }

    preload() {}

    create() {
        this.scene.start('preload')
    }
}

