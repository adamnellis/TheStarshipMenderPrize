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
import PlayerBullets from '../actors/playerBullets'

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

    randomInt(min, max){
         return Math.floor(Math.random() * max) + min
    }

    generateLevelBackground(){

        const numStars = this.randomInt(10, 100)

        for(let i=0; i<numStars; i++){

            const x = this.randomInt(0, 1500)
            const y = this.randomInt(0, 900)

            this.add.image(x, y, "star");
        }

        const numGalaxies = this.randomInt(2, 5)
        const galaxyImages = ["galaxy", "galaxy2", "galaxy3", "galaxy4", "galaxy5"]

        for(let i=0; i<numGalaxies; i++){

            const x = this.randomInt(0, 1500)
            const y = this.randomInt(0, 900)
            const galaxyImage = galaxyImages[this.randomInt(0, 5)]

            let galaxy = this.add.image(x, y, galaxyImage);
            galaxy.angle = this.randomInt(0, 180)
        }



    }

    create(data) {
        // data is passed from button

        this.generateLevelBackground()

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
        this.playerBullets = new PlayerBullets(this);
        this.player = new Player(this, this.playerBullets)

        this.enemies = new Enemies(this, this.player, this.bullets)
        this.enemies.spawn()

        const collideShips = (ship, enemy) => {
            ship.damage(SHIP_HIT_DAMAGE);
            enemy.damage(100);
        }
        
		const shipShot = (ship, bullet) => {
            ship.damage(bullet.damage);
			bullet.destroy();
        }

        this.physics.add.collider(this.player, this.enemies.list, collideShips);
        this.physics.add.collider(this.player, this.bullets.list, shipShot);
        this.physics.add.collider(this.enemies.list, this.playerBullets.list, shipShot);

        this.speech = new Speech(this, this.player, this.enemies)

        this.keys = this.input.keyboard.addKeys('k');
    }

    update(t, dt) {
        this.dt_accumulator += dt;
		if (this.dt_accumulator > physics_dt) {
			this.enemies.update_delayed(t, this.dt_accumulator);
            this.player.update_delayed(t, this.dt_accumulator);
            this.bullets.update_delayed(t, this.dt_accumulator);
            this.playerBullets.update_delayed(t, this.dt_accumulator);
            this.dt_accumulator = 0;

            if (this.enemies.isAttacking && (this.enemies.list.length === 0)){
                this.enemies.wait()
                this.speech.open(
                    `Captain, our hull is seriously damaged and we have little materials.
    
                    I managed to repair the flux capactior drive with our guns secondary heat sink pump. But what do we do with the hull?
    
    
                    Pick ONE from the following options:`
                )

                //FIXME: when selected choice unwait enemies.
            }

            // FIXME: remove this when score captured elsewhere
            this.score.increase(1)

            // Cheats for testing
            if (this.keys.k.isDown) {
                // K key kills all enemies
                for(const enemy of this.enemies.list) {
                    enemy.damage(10000);
                }
            }
		}

		this.enemies.update(t, dt);
        this.player.update(t, dt);
        this.bullets.update(t, dt);
        this.playerBullets.update(t, dt);
    }
}