import { Scene } from 'phaser';

import Enemies from '../actors/enemies';
import Player from '../actors/player';
import { TextButton } from '../ui/button';

export default class Game extends Scene {
    constructor() {
        const config = {
            physics: {
                default: 'arcade',
                arcade: {
                    debug: true,
                    gravity: { y: 0 }
                }
            },
            key: 'game',
        }
       
        super(config);
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

  

        this.player = new Player(this)
        this.player.init()

        this.enemies = new Enemies(this, this.player)
        this.enemies.spawn()

       
    }

    update(t, dt) {
        this.enemies.update(t, dt)
        this.player.update(t, dt);
    }
}