import EnemyMoveFunction from "./enemy_move_function";
import config from './../config'

const ROTATION_ANGLE = Math.PI / 2; // rotation, assuming 0 is up the y axis (because that's how the image is on the sprite sheet)

export default class EnemyMoveDownScreen extends EnemyMoveFunction {
	/**
	 * An enemy type that moves in a spiral across the screen.
	 */
	constructor(scene, player, bullets, collectibles, image_name, x_start = 100, travel_time = 3, y_start_buffer = 100, y_turn_buffer = 200, x_turn_radius = 500) {
		// travel_time: seconds for enemy to move from top of screen to bottom
		// y_start_buffer: game units that ship starts above the screen, so you don't see it appear
		// y_turn_buffer: game units before the bottom of the screen that the ship begins its turn
		super(scene, player, bullets, collectibles, image_name, ROTATION_ANGLE);
		this.x_start = x_start;
		this.travel_time = travel_time;
		this.y_start_buffer = y_start_buffer;
		this.y_turn_buffer = y_turn_buffer;
		this.x_turn_radius = x_turn_radius;
		this.turn_direction = this.x_start < config.width / 2 ? -1: 1;
		this.turn_around_t = this.travel_time * 1000;
	}

	position_function_x(t) {
		t = t % (2 * this.turn_around_t);
		if (t < this.turn_around_t) {
			return this.x_start;
		}
		else {
			return this.x_start + this.turn_direction * this.x_turn_radius * Math.sin(Math.PI * (t-this.turn_around_t) / this.turn_around_t);
		}
	}

	position_function_y(t) {
		t = t % (2 * this.turn_around_t);
		if (t < this.turn_around_t) {
			return -this.y_start_buffer + (config.height + this.y_start_buffer - this.y_turn_buffer) * t / this.turn_around_t;
		}
		else {
			return config.height - this.y_turn_buffer - (config.height + this.y_start_buffer - this.y_turn_buffer) * (-Math.cos(Math.PI * (t-this.turn_around_t) / this.turn_around_t) + 1) / 2;
			// TODO: Refactor this out into a cosine interpolation function that can be reused
		}
	}
}