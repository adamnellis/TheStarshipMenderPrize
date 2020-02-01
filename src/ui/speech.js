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

		this.avatar = new Avatar(this.scene, 150, 190)
		this.scene.add.existing(this.avatar)

		this.scene.add.existing(this)
	}

	open(text) {
		this.isOpen = true
		this.avatar.open()

		this.scene.time.delayedCall(this.avatar.duration, () => {
			this.typewriter.write(text)

			this.scene.time.delayedCall(this.typewriter.duration * text.length, () => {
				this.addSelections()
			})
		})

		// EXAMPLE: how to clear speech.
		// this.scene.time.delayedCall(6000, () => {
		// 	this.clear()
		// });
		// EXAMPLE: how to open speech.
		// this.scene.time.delayedCall(10000, () => {
		// 	this.open("This is a second piece of text")
		// });
	}

	addSelections() {
		this.scene.time.delayedCall(1000, () => {
			if (this.isOpen) {
				super.add(new IconButton(
					this.scene,
					350,
					500,
					() => {
						this.choice()
					}
				))
			}
		});
		this.scene.time.delayedCall(1500, () => {
			if (this.isOpen) {
				super.add(new IconButton(
					this.scene,
					750,
					500,
					() => {
						this.choice()
					}
				))
			}
		});
		this.scene.time.delayedCall(2000, () => {
			if (this.isOpen) {
				super.add(new IconButton(
					this.scene,
					1150,
					500,
					() => {
						this.choice()
					}
				))
			}
		});
	}

	choice() {
		this.clear()
	}

	clear() {
		this.isOpen = false

		console.log(this)

		this.avatar.clear()
		this.typewriter.clear()
		this.removeAll(true)
		console.log(this.list)
	}
}