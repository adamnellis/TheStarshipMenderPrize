import {
	GameObjects
} from 'phaser'
import config from "../config";
import Collider from './collider'

//Could use in constructor for different ammunition
const BULLET_DAMAGE = 10;

export default class Bullet extends Collider {
	constructor(scene, x_pos, y_pos, x_vel, y_vel, image_name = "laserBlue01.png", damage = BULLET_DAMAGE) {
		super(scene, x_pos, y_pos, "spaceRedux", image_name);
		this.scene.add.existing(this);

		this.setOrigin(0.5, 0.1)
		this.body.setCircle(5);

		this.x_vel = x_vel;
		this.y_vel = y_vel;
		this.rotation = Math.atan2(this.y_vel, this.x_vel) + Math.PI / 2;
		this.damage = damage;
	}

	add(bullet) {
		super.add(bullet)
	}

	update(t, dt) {
		// Integrate motion
		this.x += this.x_vel * dt;
		this.y += this.y_vel * dt;
	}

	update_delayed(t, dt) {
		// Destroy bullets when they move off the screen
		if (this.x < -config.width || this.x > 2 * config.width || this.y < -config.height || this.y > 2 * config.height) {
			this.destroy();
		}

		// TODO: Check for collisions with player and enemies
	}

}
