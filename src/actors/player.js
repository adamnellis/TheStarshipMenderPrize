// import { GameObjects } from 'phaser';
// import Body from './playerParts/body'

import CircularCollider from './circularCollider'

 export default class player extends CircularCollider {
 	constructor(scene) {
    super(scene, 500, 200, "spaceRedux", "playerShip1_green.png")
    this.scene.add.existing(this);
		this.cursors = scene.input.keyboard.createCursorKeys();
    
    this.angularVelocity = 100;
    this.velocity = 300;
    this.acceleration = 50;
    this.drag = 50; 

    this.setCollideWorldBounds(true);
    this.setDrag(this.drag, this.drag)

  }

    _move(forward) {
    const direction = forward ? 1 : -0.5;

    // * UP 0, DOWN -180, RIGHT 90, LEFT -90
    // * SIN 0 and 180 is 0 - use for X. 90 is 1; -90 is -1
    // COS 90 and -90 is 0, use for Y. 0 is 1,  -180 is -1
    const speedX = Math.sin(this.rotation) * direction;
    const speedY = Math.cos(this.rotation) * direction;

    this.setVelocity(speedX * this.velocity, speedY * - this.velocity);
    this.setAccelerationX(+speedX * this.acceleration);
    this.setAccelerationY(speedY * - this.acceleration);

  }

  	update(time,delta) {

    if (this.cursors.left.isDown)
    {
      this.setAngularVelocity(-this.angularVelocity);

    }
    else if (this.cursors.right.isDown)
    {
      this.setAngularVelocity(this.angularVelocity);
    
    }
    else
    {
      this.setAngularVelocity(0);
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
      this.setAccelerationX(0);
      this.setAccelerationY(0);

    }

	
	}


  
  repair(options){
    for (let key in options){
      console.log(key +": " + this[key] + " -> " + options[key])
      this[key] = options[key]
    }
  }


  getXPosition() {
		// TODO: Make this calculate the position from all the objects that make up the player
		return this.x;
	}

	getYPosition() {
		// TODO: Make this calculate the position from all the objects that make up the player
		return this.y;
  }
}

  


