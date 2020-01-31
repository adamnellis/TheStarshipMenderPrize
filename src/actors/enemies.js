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
		super.add(new Enemy(this.scene, 400, 200))
		super.add(new Enemy(this.scene, 600, 200))
		super.add(new Enemy(this.scene, 800, 200))
		super.add(new Enemy(this.scene, 1000, 200))
		super.add(new Enemy(this.scene, 1200, 200))
	}
}