import {
	GameObjects
} from 'phaser'

export default class Enemy extends GameObjects.IsoTriangle {
	constructor(scene, x, y) {
		super(scene, x, y, 50, 50, true, 0xdddd00, 0xdddd00, 0xdddd00);
		// scene.add.existing(this);

		this.setOrigin(0.5, 0.5)
	}
}