import CircularCollider from './circularCollider'
import Health from '../ui/health.js'
import Resources from '../ui/resources.js'
import Status from './player_status'
import Bullet from './bullet'

 export default class player extends CircularCollider {
 	constructor(scene) {
    super(scene, 500, 200, "spaceRedux", "playerShip1_green.png")
    this.health = new Health(scene)
    this.resources = new Resources(scene)
    this.scene.add.existing(this);
		this.cursors = scene.input.keyboard.createCursorKeys();
    
    this.angularVelocity = 100;
    this.velocity = 300;
    this.acceleration = 50;
    this.drag = 50; 

    this.setCollideWorldBounds(true);
    this.setDrag(this.drag, this.drag)

  }

  shoot() {
		// Create a bullet moving in the direction that the ship is pointing
		const bullet = new Bullet(this.scene, this.x, this.y, -Math.sin(this.rotation), Math.cos(this.rotation));
		this.bullets.add(bullet);
	}

    move(forward) {
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
      this.move(true);

    }
    else if (this.cursors.down.isDown)
    {

      this.move(false);
    }
    else
    {
      this.setAccelerationX(0);
      this.setAccelerationY(0);

    }

    if(this.cursors.space.isDown) {

      console.log('wh')
      this.shoot();
    }


	
	}

	update_delayed(t, dt) {

    }

    damage(damage) {
      this.health.reduce(damage);

      // TODO: work out negative affect from damage!
      // this.velocity -= 50

      this.scene.add.existing(new Status(this.scene, this.x, this.y, "Damage Type"))
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

  


