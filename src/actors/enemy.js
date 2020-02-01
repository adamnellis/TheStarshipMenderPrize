import config from './../config'
import CircularColider from './circularColider'

export default class Enemy extends CircularColider {
	constructor(scene, player, x, y, image_name, rotation_angle, rotation_rate, rotation_damping) {
		super(scene, x, y, "spaceRedux", image_name);
		this.rotation_angle = rotation_angle;

		// this.setOrigin(0, 0);
		this.player = player;

		this.rotation_rate = rotation_rate;
		this.rotation_damping = rotation_damping;

		this.rotation_force = 0;
		this.angular_rotation = 0;
		this.physics_angle = rotation_angle;

		this.health = 100
		this.dying = false

		//Number of times to flash
		this.animation_cycles = 3
		this.animation_count = 0

	}

	update(t, dt) {
		// Integrate motion
		this.physics_angle += this.angular_rotation * dt;
		this.angular_rotation += this.rotation_force * dt;
		// Set rotation on shape
		this.rotation = this.physics_angle + this.rotation_angle;
	}

	update_delayed(t, dt) {

		// Destroy enemies when they move off the screen
		if (this.x < -config.width || this.x > 2 * config.width || this.y < -config.height || this.y > 2 * config.height) {
			this.destroy();
		}

	}

	damage(damage_dealt){

		this.health = this.health - damage_dealt

		if(this.health <= 0 && this.dying==false){
			this.dying = true

			//Turn physics off
			this.body.enable = false

			this.death_animation()

		}

	}

	death_animation(){
		this.tint = 0xff0000

		if(this.animation_count == this.animation_cycles){
			this.die()
		}
		else{
			this.animation_count +=1
			this.scene.time.delayedCall(300, () => {this.life_animation()})
		}
	}

	life_animation(){
		this.clearTint()
		this.scene.time.delayedCall(300,()=>{this.death_animation()})
	}


	die(){

		//Todo: Deposit resource

		//Kill this ship
		this.destroy();

	}
}
