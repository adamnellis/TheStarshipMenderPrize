import config from './../config'
import Bullet from "./bullet";
import CircularCollider from './circularCollider'

export default class Enemy extends CircularCollider {
	constructor(scene, player, bullets, x, y, image_name, rotation_angle, rotation_rate, rotation_damping) {
		super(scene, x, y, "spaceRedux", image_name);
		this.bullets = bullets;
		this.rotation_angle = rotation_angle;

		// this.setOrigin(0, 0);
		this.player = player;

		this.rotation_rate = rotation_rate;
		this.rotation_damping = rotation_damping;

		this.rotation_force = 0;
		this.angular_rotation = 0;
		this.physics_angle = rotation_angle;

		this.force_x = 0;
		this.force_y = 0;
		this.velocity_x = 0;
		this.velocity_y = 0;

		this.health = 100
		this.dying = false

		//Number of times to flash
		this.animation_cycles = 3
		this.animation_count = 0

	}

	update(t, dt) {
		// Integrate motion
		this.physics_angle += this.angular_rotation * dt;
		this.x += this.velocity_x * dt;
		this.y += this.velocity_y * dt;
		this.angular_rotation += this.rotation_force * dt;
		this.velocity_x += this.force_x * dt;
		this.velocity_y += this.force_y * dt;
		// Set rotation on shape
		this.rotation = this.physics_angle + this.rotation_angle;
	}

	update_delayed(t, dt) {

		// Destroy enemies when they move off the screen
		if (this.x < -config.width || this.x > 2 * config.width || this.y < -config.height || this.y > 2 * config.height) {
			this.destroy();
			return
		}

		if(this.dying == false){
			this.shoot();
		}
	}

	shoot() {
		// Create a bullet moving in the direction that the enemy is pointing
		const bullet = new Bullet(this.scene, this.x, this.y, -Math.sin(this.rotation), Math.cos(this.rotation));
		this.bullets.add(bullet);
	}

	damage(damage_dealt){

		this.health = this.health - damage_dealt

		if(this.health <= 0 && this.dying==false){
				//Turn physics off
			this.scene.physics.world.disable(this)
			this.dying = true
		
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
