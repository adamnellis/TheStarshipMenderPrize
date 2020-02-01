import {
    Scene
} from 'phaser'

export default class Preload extends Scene {
    constructor() {
        super('preload')
    }

    preload() {
        this.load.image('body', require('../assets/body.png'));
        this.load.image('enemy', require('../assets/enemy.png'));

        this.load.atlasXML("spaceRedux", require("../assets/spaceRedux.png"), require("../assets/spaceRedux.xml"))
    }

    create() {
        this.scene.start('title')
    }
}