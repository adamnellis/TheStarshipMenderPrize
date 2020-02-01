import {
	GameObjects
} from 'phaser'
import Enemy from './enemy'

const PHYSICS_FPS = 15;
const physics_dt = 1000 / PHYSICS_FPS;

export default class Enemies extends GameObjects.Container {
	constructor(scene, player) {
		super(scene)
		this.player = player;

		this.scene.add.existing(this)

		this.dt_accumulator = 0;
	}

	spawn() {
		super.add(new Enemy(this.scene, this.player, 400, 200))
		super.add(new Enemy(this.scene, this.player, 600, 200))
		super.add(new Enemy(this.scene, this.player, 800, 200))
		super.add(new Enemy(this.scene, this.player, 1000, 200))
		super.add(new Enemy(this.scene, this.player, 1200, 200))
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