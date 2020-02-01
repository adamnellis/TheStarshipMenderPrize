import {
    Scene
} from 'phaser'
import {
    TextButton
} from '../ui/button'
import Player from '../actors/player'
import Bullets from "../actors/bullets"
import Enemies from '../actors/enemies'
import Speech from '../ui/speech'

const PHYSICS_FPS = 15;
const physics_dt = 1000 / PHYSICS_FPS;

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

        this.dt_accumulator = 0;

        this.bullets = new Bullets(this)

        this.player = new Player(this)

        this.enemies = new Enemies(this, this.player, this.bullets)
        this.enemies.spawn()

        this.bullet = new Bullet(this, 1000, 500)


        this.physics.add.collider(this.player, this.enemies.enemies);

        // TODO: working on speech and upgrade pop-up
        // this.speech = new Speech(this, this.player)
        // this.time.delayedCall(2000, () => {
        //     this.speech.open(
        //         `Captain, our hull is seriously damaged and we have little materials.

        //         I managed to repair the flux capactior drive with our guns secondary heat sink pump. But what do we do with the hull?


        //         Pick ONE from the following options:`
        //     )
        // });

    }

    update(t, dt) {
		this.dt_accumulator += dt;
		if (this.dt_accumulator > physics_dt) {
			this.enemies.update_delayed(t, this.dt_accumulator);
            this.player.update_delayed(t, this.dt_accumulator);
            this.bullets.update_delayed(t, this.dt_accumulator);
			this.dt_accumulator = 0;
		}

		this.enemies.update(t, dt);
        this.player.update(t, dt);
        this.bullets.update(t, dt);
    }
}