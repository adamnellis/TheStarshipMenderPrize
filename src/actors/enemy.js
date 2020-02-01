import {
	GameObjects
} from 'phaser'

export default class Enemy extends GameObjects.Sprite {
	constructor(scene, player, x, y) {
		super(scene, x, y, "spaceRedux", "playerShip1_blue.png")
		this.angle = Math.PI / 2;

		// this.setOrigin(0, 0);
		this.player = player;

		this.rotation_rate = 0.00001;
		this.rotation_damping = 0.002;

		this.rotation_force = 0;
		this.angular_rotation = 0;
		this.rotation_angle = Math.PI / 2; // rotation, assuming 0 is up the y axis (because that's how the image is on the sprite sheet)
	}

	update(t, dt) {
		// Integrate motion
		this.rotation_angle += this.angular_rotation * dt;
		this.angular_rotation += this.rotation_force * dt;
		// Set rotation on shape
		this.rotation = this.rotation_angle + Math.PI / 2;
	}

	update_delayed(t, dt) {
		// Calculate force
		const angle_difference = normalise_angle_plus_minus_pi(Math.atan2(this.player.getYPosition() - this.y, this.player.getXPosition() - this.x) - this.rotation_angle);
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