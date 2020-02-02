import Enemy from "./enemy";

export default class EnemyMoveFunction extends Enemy {
	/**
	 * An enemy type that moves following a function.
	 * Intended to be subclassed, so that subclasses can implement the position functions.
	 */
	constructor(scene, player, bullets, collectibles, image_name, rotation_angle, shoot_speed) {
		super(scene, player, bullets, collectibles, -10, -10, image_name, 0, 0, rotation_angle, shoot_speed);
		this.time = 0;
	}

	update(t, dt) {
		super.update(t, dt);
		if (this.dying) {
			return;
		}
		
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