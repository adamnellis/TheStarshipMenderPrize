import {
	GameObjects
} from 'phaser'
import {
	Typewriter
} from './speechParts/typewriter'

export default class Speech extends GameObjects.Container {
	constructor(scene) {
		super(scene)

		this.typewriter = new Typewriter(
			this.scene,
			200,
			50, {
				font: "bold 32px Arial",
				fill: '#fff',
				wordWrap: {
					width: 900,
					useAdvancedWrap: true
				}
			},
		)

		this.scene.add.existing(this)
	}

	open(text) {
		this.typewriter.write(text)

		this.scene.time.delayedCall(3000, () => {
			this.typewriter.clear()
		});
	}
}