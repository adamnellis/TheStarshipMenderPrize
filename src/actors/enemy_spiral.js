import EnemyMoveFunction from "./enemy_move_function";
import config from './../config'

const ROTATION_ANGLE = Math.PI / 2; // rotation, assuming 0 is up the y axis (because that's how the image is on the sprite sheet)

export default class EnemySpiral extends EnemyMoveFunction {
	/**
	 * An enemy type that moves in a spiral across the screen.
	 */
	constructor(scene, player, bullets, collectibles, y_line, image_name, movement_speed= 1/1000, spiral_height = 100, spiral_width = 100, delay = 0, shoot_speed = 2, health = 100) {
		/**
		 * delay: in seconds
		 */
		super(scene, player, bullets, collectibles, image_name, ROTATION_ANGLE, shoot_speed, health);
		this.y_line = y_line;
		this.movement_speed = movement_speed;
		this.spiral_width = spiral_width;
		this.spiral_height = spiral_height;
		this.delay = delay;
		this.start_t = -1;
		this.subtract_t = 0;
	}

	position_function_x(t) {
		t -= this.delay * 1000;
		t -= this.subtract_t;
		console.log(t, this.subtract_t)
		return config.width - this.spiral_width * (t * this.movement_speed + Math.sin(Math.PI * t * this.movement_speed));
	}

	position_function_y(t) {
		t -= this.delay * 1000;
		t -= this.subtract_t;
		return this.y_line + Math.cos(Math.PI * t * this.movement_speed) * this.spiral_height;
	}

	update_delayed(t, dt) {
		super.update_delayed(t, dt);

		if (this.start_t < 0) {
			this.start_t = t; // time we started moving
		}
		if (this.x < -100) {
			// Gone off the left edge of the screen
			this.subtract_t = t - this.start_t; // TODO: Doesn't keep them completely in sync, but approximately
		}
	}
}