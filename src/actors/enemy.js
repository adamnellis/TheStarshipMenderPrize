import {
	GameObjects
} from 'phaser'

export default class Enemy extends GameObjects.Sprite {
	constructor(scene, x, y) {
		super(scene, x, y, "enemy")

		this.setOrigin(0.5, 0.5)
	}
}