import config from './../config'
import Bullet from "./bullet";
import CircularCollider from './circularCollider'
import Collectable from "./collectable";

export default class Enemy extends CircularCollider {
	constructor(scene, player, bullets, collectibles, x, y, image_name, rotation_angle, rotation_rate, rotation_damping, shoot_speed = 2, health = 100) {
		/**
		 * shoot_speed: units are shots per second
		 */
		super(scene, x, y, "spaceRedux", image_name);
		this.bullets = bullets;
		this.collectibles = collectibles;
		this.rotation_angle = rotation_angle;
		this.shoot_speed = shoot_speed;

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

		this.shooting_delay = 0; // time units before we can shoot again

		this.health = health;
		this.dying = false

		//Number of times to flash
		this.animation_cycles = 3
		this.animation_count = 0

	}

	update(t, dt) {
		if (this.dying) {
			return;
		}

		// Integrate motion
		this.physics_angle += this.angular_rotation * dt;
		this.x += this.velocity_x * dt;
		this.y += this.velocity_y * dt;
		this.angular_rotation += this.rotation_force * dt;
		this.velocity_x += this.force_x * dt;
		this.velocity_y += this.force_y * dt;
		// Set rotation on shape
		this.rotation = this.physics_angle + this.rotation_angle;

		this.shooting_delay -= dt;
	}

	update_delayed(t, dt) {
		if (this.dying) {
			return;
		}

		// Destroy enemies when they move off the screen
		if (this.x < -config.width || this.x > 2 * config.width || this.y < -config.height || this.y > 2 * config.height) {
			this.destroy();
			return
		}

		this.shoot();
	}

	shoot() {
		if (this.shooting_delay <= 0) {
			this.shooting_delay = 1000 / this.shoot_speed;

			// Create a bullet moving in the direction that the enemy is pointing
			const bullet = new Bullet(this.scene, this.x, this.y, -Math.sin(this.rotation), Math.cos(this.rotation), "laserRed01.png");
			this.bullets.add(bullet);
		}
	}

	damage(damage_dealt){

		this.health = this.health - damage_dealt

		if(this.health <= 0 && this.dying==false){
				//Turn physics off
			this.scene.physics.world.disable(this)
			this.dying = true
		
			this.death_animation()

		}
		else if(this.dying==false){
			this.injured_animation()
		}


	}

	death_animation(){

		this.tint = 0xff0000

		if(this.animation_count == this.animation_cycles){
			this.die()
		}
		else{
			this.animation_count +=1
			if(this.scene.time) {
				this.scene.time.delayedCall(300, () => {if(this.life_animation){this.life_animation()}})
			}
		}
	}

	life_animation(){
		this.clearTint()
		if(this.scene.time) {
			this.scene.time.delayedCall(300,()=>{if(this.death_animation){this.death_animation()}})
		}
	}


	injured_animation(){
		this.tint = 0xffcc00

		if(this.animation_count == this.animation_cycles){
			this.tint = 0x666666
		}
		else{
			this.animation_count +=1
			if(this.scene.time) {
				this.scene.time.delayedCall(200, () => {if(this.injured_flash_animation){this.injured_flash_animation()}})
			}
		
		}

	}

	injured_flash_animation(){
		this.clearTint()
		if(this.scene.time) {
			this.scene.time.delayedCall(200,()=>{if(this.injured_animation){this.injured_animation()}})
		}
	}

	die(){

		//Deposit resource
		const repair = new Collectable(this.scene, this.x, this.y, "repair")
		this.collectibles.add(repair)

		//Kill this ship
		this.destroy();

	}

}
