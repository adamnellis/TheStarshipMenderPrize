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

        this.load.image('crew', require('../assets/crew.png'));
        this.load.image('bluepower', require('../assets/bluepower.png'));
        this.load.image('redpower', require('../assets/redpower.png'));
        this.load.image('yellowpower', require('../assets/yellowpower.png'));
        this.load.image('greenpower', require('../assets/greenpower.png'));

        this.load.image('repair', require('../assets/repair.png'));

        this.load.image('galaxy', require('../assets/galaxy.png'));
        this.load.image('galaxy2', require('../assets/galaxy2.png'));
        this.load.image('galaxy3', require('../assets/galaxy3.png'));
        this.load.image('galaxy4', require('../assets/galaxy4.png'));
        this.load.image('galaxy5', require('../assets/galaxy5.png'));
        this.load.image('moon', require('../assets/moon.png'));
        this.load.image('star', require('../assets/star.png'));

        this.load.image('a', require('../assets/a.png'));
        this.load.image('d', require('../assets/d.png'));
        this.load.image('w', require('../assets/w.png'));

        this.load.atlasXML("spaceRedux", require("../assets/spaceRedux.png"), require("../assets/spaceRedux.xml"))
        this.load.atlasXML("spaceExtra", require("../assets/spaceExtra.png"), require("../assets/spaceExtra.xml"))
    }

    create() {
        this.scene.start('title')
    }
}