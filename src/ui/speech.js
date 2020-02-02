import {
	GameObjects
} from 'phaser'
import Typewriter from './speechParts/typewriter'
import Avatar from './speechParts/avatar'
import IconButton from './speechParts/iconButton'
import IconText from './speechParts/iconText'
import RepairLogic from './speechParts/repairLogic'

export default class Speech extends GameObjects.Container {
	constructor(scene, player, enemies) {
		super(scene)
		this.isOpen = false
		this.player = player
		this.enemies = enemies
		this.repairLogic = new RepairLogic(player)

		this.typewriter = new Typewriter(
			this.scene,
			300,
			50, {
				font: "bold 32px Arial",
				fill: '#fff',
				wordWrap: {
					width: 1000,
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
		let texts = this.repairLogic.generate()

		this.addSelection(0, 350, 500, texts[0])
		this.addSelection(1, 750, 500, texts[1])
		this.addSelection(2, 1150, 500, texts[2])
	}

	addSelection(number, x, y, text) {
		this.scene.time.delayedCall(((number + 1) * 500) + 500, () => {
			if (this.isOpen) {
				super.add(new IconButton(this.scene, x, y,
					() => {
						this.repairLogic.pick(number)
						this.clear()
						this.enemies.spawn()
					}
				))
				super.add(new IconText(this.scene, x, y, text))
			}
		})
	}

	clear() {
		this.isOpen = false
		this.avatar.clear()
		this.typewriter.clear()
		this.removeAll(true)
	}
}