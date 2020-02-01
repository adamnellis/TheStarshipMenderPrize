import { GameObjects } from 'phaser';

export default class Body extends GameObjects.Sprite {
	constructor(scene, x, y, cursors) {
		super(scene, x, y, "body")

		this.cursors = cursors;

		this.setOrigin(0.5, 0.5)
	}

	update(time,delta) {

		if (this.cursors.left.isDown)
    {
        this.setAccelerationX(-800);
        this.flipX = true;
    }
    else if (this.cursors.right.isDown)
    {
        this.setAccelerationX(800);
        this.flipX = false;
    }
    else
    {
        this.setAccelerationX(0);
    }

    if (this.cursors.up.isDown)
    {
        this.setAccelerationY(-800);
    }
    else if (this.cursors.down.isDown)
    {
        this.setAccelerationY(800);
    }
    else
    {
        this.setAccelerationY(0);
    }
	}
}