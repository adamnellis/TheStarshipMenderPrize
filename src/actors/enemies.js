import {
	GameObjects
} from 'phaser'
import config from './../config'
import EnemyRotatePlayer from './enemy_rotate_player'
import EnemySpiral from "./enemy_spiral"
import EnemyMovePointToPoint from "./enemy_move_point_to_point";
import EnemyMoveDownScreen from "./enemy_move_down_screen";
import Tutorial from '../ui/tutorial';

export default class Enemies extends GameObjects.Container {
	constructor(scene, player, bullets, collectibles) {
		super(scene);
		this.player = player;
		this.bullets = bullets;
		this.collectibles = collectibles;
		this.isAttacking = false
		this.level = 0

		this.scene.add.existing(this);
	}

	spawn() {
		this.level += 1

		this.isAttacking = true

		switch (this.level) {
			case 1:
				this.tutorial = new Tutorial(this.scene)
				super.add(new EnemyRotatePlayer(this.scene, this.player, this.bullets, this.collectibles, 1000, 400, 'enemyRed1.png',))
				break;
			case 2:
				const num_enemies = 4;
				const step_size = config.width / (num_enemies + 1);
				for (let i = 0; i < num_enemies; i++) {
					const x_pos = (i + 1) * step_size;
					super.add(new EnemyMoveDownScreenSimple(this.scene, this.player, this.bullets, this.collectibles, "enemyRed1.png", x_pos, 100));
				}
				break;
			case 3:
				const num_enemies2 = 6;
				const step_size2 = config.width / (num_enemies2 + 1);
				for (let i = 0; i < num_enemies2; i++) {
					const x_pos2 = (i + 1) * step_size2;
					super.add(new EnemyMoveDownScreenSimple(this.scene, this.player, this.bullets, this.collectibles, "enemyRed2.png", x_pos2, 200));
				}
				break;
			case 4:
				super.add(new EnemySlowSpiral(this.scene, this.player, this.bullets, this.collectibles, 0));
				super.add(new EnemySlowSpiral(this.scene, this.player, this.bullets, this.collectibles, 1));
				super.add(new EnemySlowSpiral(this.scene, this.player, this.bullets, this.collectibles, 2));
				super.add(new EnemySlowSpiral(this.scene, this.player, this.bullets, this.collectibles, 3));
				super.add(new EnemySlowSpiral(this.scene, this.player, this.bullets, this.collectibles, 4));
				super.add(new EnemySlowSpiral(this.scene, this.player, this.bullets, this.collectibles, 5));
				break;
			default:
				super.add(new EnemyFlyInToCentre(this.scene, this.player, this.bullets, this.collectibles));
		}
	}

	update(t, dt) {
		for (const enemy of this.list) {
			enemy.update(t, dt);
		}
	}

	update_delayed(t, dt) {
		for (const enemy of this.list) {
			enemy.update_delayed(t, dt);
		}
	}

	wait(){
		this.isAttacking = false
		
	}
}

class EnemySlowSpiral extends EnemySpiral {

	constructor(scene, player, bullets, collectibles, delay) {

		super(scene, player, bullets, collectibles, 300, 'enemyRed3.png', 1 / 1000, 150, 150, delay)

	}

}

class EnemyMoveDownScreenSimple extends EnemyMoveDownScreen {

	constructor(scene, player, bullets, collectibles, image_name, x_start, health) {

		super(scene, player, bullets, collectibles, image_name, x_start, 3, 100, 200, 500, 2, health);

	}

}

class EnemyFlyInToCentre extends EnemyMovePointToPoint {

	constructor(scene, player, bullets, collectibles) {

		// Randomly choose start x & y
		const angle = Math.random() * 2 * Math.PI;
		const radius = 1.5 * Math.max(config.width, config.height) / 2;
		const start_x = radius * Math.cos(angle) + config.width / 2;
		const start_y = radius * Math.sin(angle) + config.height / 2;

		super(scene, player, bullets, collectibles, start_x, start_y, config.width / 2, config.height / 2, 'enemyBlack1.png', -Math.PI / 2, 4)

	}
}