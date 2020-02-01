import {
	GameObjects
} from 'phaser'
import Typewriter from './speechParts/typewriter'
import Avatar from './speechParts/avatar'
import IconButton from './speechParts/iconButton'

export default class Speech extends GameObjects.Container {
	constructor(scene) {
		super(scene)

		this.isOpen = false

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
		this.isOpen = true
		this.typewriter.write(text)

		this.scene.time.delayedCall(this.typewriter.duration * text.length, () => {
			this.addSelections()
		})

		// EXAMPLE: how to clear speech.
		// this.scene.time.delayedCall(6000, () => {
		// 	this.clear()
		// });
	}

	addSelections() {
		this.scene.time.delayedCall(1000, () => {
			if (this.isOpen) {
				super.add(new IconButton(this.scene, 350, 500))
			}
		});
		this.scene.time.delayedCall(1500, () => {
			if (this.isOpen) {
				super.add(new IconButton(this.scene, 750, 500))
			}
		});
		this.scene.time.delayedCall(2000, () => {
			if (this.isOpen) {
				super.add(new IconButton(this.scene, 1150, 500))
			}
		});
	}

	clear() {
		this.isOpen = false

		this.typewriter.clear()
		this.removeAll(true)
	}
}