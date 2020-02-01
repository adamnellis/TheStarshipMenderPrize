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

		this.scene.add.existing(this);
	}

	spawn() {
		super.add(new EnemyRotatePlayer(this.scene, this.player, this.bullets, 200, 200));
		super.add(new EnemyRotatePlayer(this.scene, this.player, this.bullets, 1200, 200));

		super.add(new EnemySpiral(this.scene, this.player, this.bullets, 200));
		super.add(new EnemySpiral(this.scene, this.player, this.bullets, 600, 1/1000, 50, 200));
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