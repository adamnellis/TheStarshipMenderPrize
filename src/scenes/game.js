import {
    Scene
} from 'phaser'
import {
    TextButton
} from '../ui/button'
import Player from '../actors/player'
import Bullet from '../actors/bullet'
import Enemies from '../actors/enemies'
import Speech from '../ui/speech'

export default class Game extends Scene {
    constructor() {
        const config = {
            physics: {
                default: 'arcade',
                arcade: {
                    debug: true,
                    gravity: {
                        y: 0
                    }
                }
            },
            width: 800,
            height: 600,
            key: 'game',
            type: Phaser.WEBGL,
        }

        super(config);


    }

    preload() {}

    create(data) {
        // data is passed from button

        this.physics.world.setBoundsCollision(true, true, true, true);

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



        this.player = new Player(this)
        this.player.init()

        this.enemies = new Enemies(this, this.player)
        this.enemies.spawn()

        this.bullet = new Bullet(this, 1000, 500)

        // TODO: working on speech and upgrade pop-up
        // this.speech = new Speech(this)
        // this.time.delayedCall(2000, () => {
        //     this.speech.open(
        //         `Captain, our hull is seriously damaged and we have little materials.

        //         I managed to repair the flux capactior drive with our guns secondary heat sink pump. But what do we do with the hull?


        //         Pick ONE from the following options:`
        //     )
        // });

    }

    update(t, dt) {
        this.enemies.update(t, dt)
        this.player.update(t, dt);
    }
}