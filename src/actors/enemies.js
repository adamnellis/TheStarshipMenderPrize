import {
	GameObjects
} from 'phaser'
import EnemyRotatePlayer from './enemy_rotate_player'
import EnemySpiral from "./enemy_spiral"

const PHYSICS_FPS = 15;
const physics_dt = 1000 / PHYSICS_FPS;

export default class Enemies extends GameObjects.Container {
	constructor(scene, player) {
		super(scene);
		this.player = player;

		this.scene.add.existing(this);

		this.dt_accumulator = 0;
	}

	spawn() {
		super.add(new EnemyNormalRotatePlayer(this.scene, this.player, 750, 500, 'enemyBlack1.png'));

		super.add(new EnemySlowSpiral(this.scene, this.player, 600));
	}

	update(t, dt) {
		this.dt_accumulator += dt;
		if (this.dt_accumulator > physics_dt) {
			this.update_delayed(t, this.dt_accumulator);
			this.dt_accumulator = 0;
		}

		for (const enemy of this.list) {
			enemy.update(t, dt);
		}
	}

	update_delayed(t, dt) {
		for (const enemy of this.list) {
			enemy.update_delayed(t, dt);
		}
	}
}

class EnemySlowSpiral extends EnemySpiral {

	constructor(scene, player, y_line) {

		super(scene, player, y_line, 'enemyRed3.png', 1 / 3000, 150, 150)

	}

}

class EnemyNormalRotatePlayer extends EnemyRotatePlayer{

	constructor(scene, player, x, y) {

		super(scene, player, x, y, 'enemyBlack2.png', -Math.PI / 2)

	}


}