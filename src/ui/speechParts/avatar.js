import {
	GameObjects
} from 'phaser'

export default class Avatar extends GameObjects.Sprite {
	constructor(scene, x, y) {
		super(scene, x, y, "crew")

		this.setOrigin(0.5, 0.5)
	}
}