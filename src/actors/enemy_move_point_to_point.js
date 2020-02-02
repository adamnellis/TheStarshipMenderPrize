import EnemyRotatePlayer from "./enemy_rotate_player";

const MODE_FLY_IN = "fly_in";
const MODE_ROTATE_PLAYER = "rotate_player";

const ENGINE_POWER = 0.00002;
const DAMPING = 0.02;

export default class EnemyMovePointToPoint extends EnemyRotatePlayer {
	/**
	 * An enemy type that moves from one point to another, then turns to face the player.
	 */
	constructor(scene, player, bullets, collectibles, start_x, start_y, end_x, end_y, image_name, rotation_angle = Math.PI / 2, shoot_speed = 2) {
		// rotation, assuming 0 is up the y axis (because that's how the image is on the sprite sheet)
		super(scene, player, bullets, collectibles, start_x, start_y, image_name, rotation_angle, shoot_speed);
		this.end_x = end_x;
		this.end_y = end_y;

		this.mode = MODE_FLY_IN;

		// Set rotation based on start/end points
		this.physics_angle = Math.atan2(this.end_y - start_y, this.end_x - start_x);
	}

	update_delayed(t, dt) {
		if (this.mode === MODE_FLY_IN) {
			// Check if we've reached the end point
			if (((this.x - this.end_x) ** 2 + (this.y - this.end_y) ** 2) < 1000) {
				// Switch to rotate mode
				this.mode = MODE_ROTATE_PLAYER;
				this.force_x = 0;
				this.force_y = 0;
				this.velocity_x = 0;
				this.velocity_y = 0;
				return;
			}

			// Set force to spring towards point
			const difference_x = this.end_x - this.x;
			const difference_y = this.end_y - this.y;
			const driving_force_x = difference_x * ENGINE_POWER;
			const driving_force_y = difference_y * ENGINE_POWER;
			const damping_force_x = this.velocity_x * DAMPING;
			const damping_force_y = this.velocity_y * DAMPING;
			this.force_x = driving_force_x - damping_force_x;
			this.force_y = driving_force_y - damping_force_y;
		}
		else if (this.mode === MODE_ROTATE_PLAYER) {
			// Parent class rotates towards player, and shoots
			super.update_delayed(t, dt);
		}
	}
}
