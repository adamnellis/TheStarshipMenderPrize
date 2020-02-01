import {
	GameObjects
} from 'phaser'

export default class Enemy extends GameObjects.Sprite {
	constructor(scene, player, x, y) {
		super(scene, x, y, "spaceRedux", "playerShip1_blue.png")

		// this.setOrigin(0, 0);
		this.player = player;

		this.rotation_rate = 0.00001;
		this.rotation_damping = 0.002;

		this.rotation_force = 0;
		this.angular_rotation = 0;
	}

	update(t, dt) {
		// Integrate motion
		this.rotation += this.angular_rotation * dt;
		this.angular_rotation += this.rotation_force * dt;
	}

	update_delayed(t, dt) {
		// Calculate force
		const angle_difference = normalise_angle_plus_minus_pi(Math.atan2(this.player.y - this.y, this.player.x - this.x) - this.rotation);
		const steering_force = this.rotation_rate * angle_difference;
		const damping_force = this.angular_rotation * this.rotation_damping;
		this.rotation_force = steering_force - damping_force;
	}
}

function normalise_angle_plus_minus_pi(angle) {
	while (angle <= -Math.PI) {
		angle += 2 * Math.PI;
	}
	while (angle > Math.PI) {
		angle -= 2 * Math.PI;
	}
	return angle;
}