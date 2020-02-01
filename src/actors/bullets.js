import {
	GameObjects
} from 'phaser'

export default class Bullets extends GameObjects.Container {
	constructor(scene) {
		super(scene);
		this.scene.add.existing(this);
	}

	update(t, dt) {
		for (const bullet of this.list) {
			bullet.update(t, dt);
		}
	}

	update_delayed(t, dt) {
		for (const bullet of this.list) {
			bullet.update_delayed(t, dt);
		}
	}
}