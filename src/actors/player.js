import {
	GameObjects
} from 'phaser'
import Body from './playerParts/body'

export default class player extends GameObjects.Container {
	constructor(scene) {
		super(scene)

		this.scene.add.existing(this)
	}

	init() {
		super.add(new Body(this.scene, 500, 200))
	}

	getXPosition() {
		// TODO: Make this calculate the position from all the objects that make up the player
		return this.list[0].x;
	}

	getYPosition() {
		// TODO: Make this calculate the position from all the objects that make up the player
		return this.list[0].y;
	}
}