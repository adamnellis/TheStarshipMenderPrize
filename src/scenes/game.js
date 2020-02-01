import { Scene } from 'phaser';

import Enemies from '../actors/enemies';
import Player from '../actors/player';
import { TextButton } from '../ui/button';

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

        this.cursors = this.input.keyboard.createCursorKeys();

        console.log('cursor');
        console.log(this.cursors);

        this.player = new Player(this, this.cursors)
        this.player.init()

        this.enemies = new Enemies(this, this.player)
        this.enemies.spawn()

       
    }

    update(time,delta) {
        this.player.update(time, delta);


    }

    update(t, dt) {
        this.enemies.update(t, dt)
    }
}