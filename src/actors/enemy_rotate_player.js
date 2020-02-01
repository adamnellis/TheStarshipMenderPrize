import Enemy from "./enemy";

const ROTATION_RATE =  0.00001;
const ROTATION_DAMPING = 0.002;
const ROTATION_ANGLE = Math.PI / 2; // rotation, assuming 0 is up the y axis (because that's how the image is on the sprite sheet)

export default class EnemyRotatePlayer extends Enemy {
	/**
	 * An enemy type that stays in the same place and rotates towards the player.
	 */
	constructor(scene, player, bullets, x, y) {
		super(scene, player, bullets, x, y, "playerShip1_blue.png", ROTATION_RATE, ROTATION_DAMPING, ROTATION_ANGLE);
	}

	update_delayed(t, dt) {
		super.update_delayed(t, dt);

		// Calculate force to rotate enemy towards player
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
