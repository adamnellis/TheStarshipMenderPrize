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
			return
		}

		this.shoot();
	}

	shoot() {


		const shipShot = (ship, bullet) => {
			ship.damage(bullet.damage);
			bullet.destroy();
		}


		// Create a bullet moving in the direction that the enemy is pointing
		// TODO: Take into account this.rotation_angle
		const bullet = new Bullet(this.scene, this.x, this.y, -Math.sin(this.rotation), Math.cos(this.rotation));
		this.bullets.add(bullet);

		this.scene.physics.add.collider(this.player, bullet, shipShot);
	}

	//TODO use the damage / die thing
	explode() {
		this.destroy();
		return
	}
}
