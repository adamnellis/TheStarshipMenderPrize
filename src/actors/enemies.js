import {
	GameObjects
} from 'phaser'
import Enemy from './enemy'

export default class Enemies extends GameObjects.Container {
	constructor(scene) {
		super(scene)

		this.scene.add.existing(this)
	}

	spawn() {
		super.add(new Enemy(this.scene, 400, 400))
		super.add(new Enemy(this.scene, 600, 400))
	}
}