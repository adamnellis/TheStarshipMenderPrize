import {
	GameObjects
} from 'phaser'
import Typewriter from './speechParts/typewriter'
import Avatar from './speechParts/avatar'

export default class Speech extends GameObjects.Container {
	constructor(scene) {
		super(scene)

		this.typewriter = new Typewriter(
			this.scene,
			300,
			50, {
				font: "bold 32px Arial",
				fill: '#fff',
				wordWrap: {
					width: 1100,
					useAdvancedWrap: true
				}
			},
		)

		super.add(new Avatar(this.scene, 150, 190))

		this.scene.add.existing(this)
	}

	open(text) {
		this.typewriter.write(text)

		// EXAMPLE: how to clear speech.
		// this.scene.time.delayedCall(3000, () => {
		// 	this.clear()
		// });
	}

	clear() {
		this.typewriter.clear()
	}
}