import EnemyMoveFunction from "./enemy_move_function";
import config from './../config'

const ROTATION_ANGLE = Math.PI / 2; // rotation, assuming 0 is up the y axis (because that's how the image is on the sprite sheet)

export default class EnemySpiral extends EnemyMoveFunction {
	/**
	 * An enemy type that moves in a spiral across the screen.
	 */
	constructor(scene, player, y_line, movement_speed= 1/1000, spiral_height = 100, spiral_width = 100) {
		super(scene, player, "enemyBlue1.png", ROTATION_ANGLE);
		this.y_line = y_line;
		this.movement_speed = movement_speed;
		this.spiral_width = spiral_width;
		this.spiral_height = spiral_height;
	}

	position_function_x(t) {
		return config.width - this.spiral_width * (t * this.movement_speed + Math.sin(Math.PI * t * this.movement_speed));
	}

	position_function_y(t) {
		return this.y_line + Math.cos(Math.PI * t * this.movement_speed) * this.spiral_height;
	}
}