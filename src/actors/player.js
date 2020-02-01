import { GameObjects } from 'phaser';

export default class player extends GameObjects.Container {
	constructor(scene) {
		super(scene)
		this.scene.add.existing(this)

		this.cursors = scene.input.keyboard.createCursorKeys();
	}

	init() {
		// super.add(new Body(this.scene, 500, 200))

		this.sprite = this.scene.physics.add.sprite(500, 200,  "spaceRedux", "playerShip1_green.png");
	
	}

	update(time,delta) {

	

		if (this.cursors.left.isDown)
    {
        this.sprite.setAccelerationX(-800);
        this.sprite.flipX = true;
    }
    // else if (this.cursors.right.isDown)
    // {
    //     this.setAccelerationX(800);
    //     this.flipX = false;
    // }
    // else
    // {
    //     this.setAccelerationX(0);
    // }

    // if (this.cursors.up.isDown)
    // {
    //     this.setAccelerationY(-800);
    // }
    // else if (this.cursors.down.isDown)
    // {
    //     this.setAccelerationY(800);
    // }
    // else
    // {
    //     this.setAccelerationY(0);
    // }
	}



}