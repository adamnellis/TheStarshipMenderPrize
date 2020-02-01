import {
	GameObjects
} from 'phaser'
import config from './../config'

export default class Enemy extends GameObjects.Sprite {
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

		console.log(this.rotation_angle)
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
}
