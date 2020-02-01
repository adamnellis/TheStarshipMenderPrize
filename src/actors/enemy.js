import config from './../config'
import CircularColider from './circularColider'

export default class Enemy extends CircularColider {
	constructor(scene, player, x, y, image_name, rotation_rate, rotation_damping, rotation_angle) {
		super(scene, x, y, "spaceRedux", image_name);
		this.angle = Math.PI / 2;

		// this.setOrigin(0, 0);
		this.player = player;

		this.rotation_rate = rotation_rate;
		this.rotation_damping = rotation_damping;

		this.rotation_force = 0;
		this.angular_rotation = 0;
		this.rotation_angle = rotation_angle;
	}

	update(t, dt) {
		// Integrate motion
		this.rotation_angle += this.angular_rotation * dt;
		this.angular_rotation += this.rotation_force * dt;
		// Set rotation on shape
		this.rotation = this.rotation_angle + Math.PI / 2;
	}

	update_delayed(t, dt) {
		// Destroy enemies when they move off the screen
		if (this.x < -config.width || this.x > 2 * config.width || this.y < -config.height || this.y > 2 * config.height) {
			this.destroy();
		}
	}
}
