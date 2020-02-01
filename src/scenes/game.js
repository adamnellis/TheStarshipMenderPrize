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
import Score from '../ui/score'

const PHYSICS_FPS = 15;
const physics_dt = 1000 / PHYSICS_FPS;
const SHIP_HIT_DAMAGE = 50;

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

    endGame(){
        this.scene.start('gameover', {
            score: this.score.getFinalScore()
        })
    }

    create(data) {
        // data is passed from button

        this.physics.world.setBoundsCollision(true, true, true, true);

        this.back_button = new TextButton(
            this,
            50,
            50,
            'Exit', {
                font: "bold 32px Arial",
                fill: '#fff'
            },
            () => this.scene.start('title')
        ).setAlpha(0.3);

        this.score = new Score(this)

        this.dt_accumulator = 0;

        this.bullets = new Bullets(this)

        this.player = new Player(this)

        this.enemies = new Enemies(this, this.player, this.bullets)
        this.enemies.spawn()

        const collideShips = (ship, enemy) => {
            ship.damage(SHIP_HIT_DAMAGE);
            enemy.explode();
        }

        this.physics.add.collider(this.player, this.enemies.enemies, collideShips);
       

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
            
            // FIXME: remove this when score captured elsewhere
            this.score.increase(1)
		}

		this.enemies.update(t, dt);
        this.player.update(t, dt);
        this.bullets.update(t, dt);
    }
}