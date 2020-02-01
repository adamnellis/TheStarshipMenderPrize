import {
	GameObjects
} from 'phaser'
import Typewriter from './speechParts/typewriter'
import Avatar from './speechParts/avatar'
import IconButton from './speechParts/iconButton'
import IconText from './speechParts/iconText'

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
	}

	addSelections() {
		this.addSelection(1000, 350, 500,
			`
			Bent Gun Barrel

			Faster Reload
			Skewed Accuracy
			`
		)
		this.addSelection(1500, 750, 500,
			`
			Tank Repair

			Slower Engines
			Bigger Missiles
			`
		)
		this.addSelection(2000, 1150, 500,
			`
			Mosquito Gun

			Tiny, Fast Projectiles
			Very Poor Accuracy
			`
		)
	}

	addSelection(delay, x, y, text) {
		this.scene.time.delayedCall(delay, () => {
			if (this.isOpen) {
				super.add(new IconButton(this.scene, x, y,
					() => {
						this.choice()
					}
				))
				super.add(new IconText(this.scene, x, y, text))
			}
		})
	}

	choice() {
		this.clear()
	}

	clear() {
		this.isOpen = false
		this.avatar.clear()
		this.typewriter.clear()
		this.removeAll(true)
	}
}