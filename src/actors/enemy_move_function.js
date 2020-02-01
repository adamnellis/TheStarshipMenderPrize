import Enemy from "./enemy";

export default class EnemyMoveFunction extends Enemy {
	/**
	 * An enemy type that moves following a function.
	 * Intended to be subclassed, so that subclasses can implement the position functions.
	 */
	constructor(scene, player, image_name, rotation_angle) {
		super(scene, player, -10, -10, image_name, 0, 0, rotation_angle);
		this.time = 0;
	}

	update(t, dt) {
		this.time += dt;
		this.x = this.position_function_x(this.time);
		this.y = this.position_function_y(this.time);
	}

	position_function_x(t) {
		// Subclasses can override this, to make different movement patterns
		return 0;
	}

	position_function_y(t) {
		// Subclasses can override this, to make different movement patterns
		return 0;
	}
}