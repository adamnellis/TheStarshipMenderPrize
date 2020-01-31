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
}