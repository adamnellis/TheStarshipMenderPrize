import { GameObjects } from 'phaser';
import Body from './playerParts/body'


export default class player extends GameObjects.Container {
	constructor(scene) {
		super(scene)
		this.scene.add.existing(this)
    this.cursors = scene.input.keyboard.createCursorKeys();
    
    this.angularVelocity = 100;
    this.velocity = 300;
    this.accelartion = 50;
    this.drag = 50; 



	}

	init() {
		// super.add(new Body(this.scene, 500, 200))

		this.ship = this.scene.physics.add.sprite(500, 200,  "spaceRedux", "playerShip1_green.png");
    this.ship.setCollideWorldBounds(true);
    const w = this.ship.body.width / 2 - 35;
    const h = this.ship.body.height / 2 - 35;

    this.ship.body.setCircle(35, w, h);
    this.ship.setDrag(this.drag)
	
  }
  
  _move(forward) {

    const direction = forward ? 1 : -0.5;

    // * UP 0, DOWN -180, RIGHT 90, LEFT -90
    // * SIN 0 and 180 is 0 - use for X. 90 is 1; -90 is -1
    // COS 90 and -90 is 0, use for Y. 0 is 1,  -180 is -1
    const speedX = Math.sin(this.ship.rotation) * direction;
    const speedY = Math.cos(this.ship.rotation) * direction;

    this.ship.setVelocity(speedX * this.velocity, speedY * - this.velocity);
    this.ship.setAccelerationX(+speedX * this.accelartion);
    this.ship.setAccelerationY(speedY * - this.accelartion);

  }

	update(time,delta) {

    if (this.cursors.left.isDown)
    {
      this.ship.setAngularVelocity(-this.angularVelocity);

    }
    else if (this.cursors.right.isDown)
    {
      this.ship.setAngularVelocity(this.angularVelocity);
    
    }
    else
    {
      this.ship.setAngularVelocity(0);
    }



    if (this.cursors.up.isDown)
    {
      this._move(true);

    }
    else if (this.cursors.down.isDown)
    {

      this._move(false);
    }
    else
    {
      // this.ship.setVelocity(0);
      this.ship.setAccelerationX(0);
      this.ship.setAccelerationY(0);

    }

	
	}

	getXPosition() {
		// TODO: Make this calculate the position from all the objects that make up the player
		return this.ship.x;
	}

	getYPosition() {
		// TODO: Make this calculate the position from all the objects that make up the player
		return this.ship.y;
	}
}