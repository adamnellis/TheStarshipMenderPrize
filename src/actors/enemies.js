import {
	GameObjects
} from 'phaser'
import EnemyRotatePlayer from './enemy_rotate_player'
import EnemySpiral from "./enemy_spiral"

export default class Enemies extends GameObjects.Container {
	constructor(scene, player, bullets) {
		super(scene);
		this.player = player;
		this.bullets = bullets;
		this.enemies = [];

		this.scene.add.existing(this);
	}

	spawn() {
		this.enemies.push(new EnemyNormalRotatePlayer(this.scene, this.player, this.bullets, 750, 500, 'enemyBlack1.png'))
		this.enemies.push(new EnemySlowSpiral(this.scene, this.player, this.bullets, 600));

		for(const enemy of this.enemies) {
			super.add(enemy);
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
}

class EnemySlowSpiral extends EnemySpiral {

	constructor(scene, player, bullets, y_line) {

		super(scene, player, bullets, y_line, 'enemyRed3.png', 1 / 3000, 150, 150)

	}

}

class EnemyNormalRotatePlayer extends EnemyRotatePlayer{

	constructor(scene, player, bullets, x, y) {

		super(scene, player, bullets, x, y, 'enemyBlack2.png', -Math.PI / 2)

	}


}