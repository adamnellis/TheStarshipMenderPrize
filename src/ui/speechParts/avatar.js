import {
	GameObjects
} from 'phaser'

export default class Avatar extends GameObjects.Sprite {
	constructor(scene, x, y) {
		super(scene, x, y, "crew")

		this.setDepth(3)

		this.currentTween = null
		this.scene = scene
		this.duration = 1000

		this.setOrigin(0.5, 0.5)
		this.setAlpha(0)
	}

	open() {
		this.currentTween = this.scene.add.tween({
			targets: [this],
			ease: 'Sine.easeInOut',
			duration: this.duration,
			delay: 0,
			alpha: {
				getStart: () => this.alpha,
				getEnd: () => 1
			},
		});
	}

	clear() {
		if (this.currentTween) {
			this.currentTween.stop()
		}

		this.currentTween = this.scene.add.tween({
			targets: [this],
			ease: 'Sine.easeInOut',
			duration: 500,
			delay: 0,
			alpha: {
				getStart: () => this.alpha,
				getEnd: () => 0
			},
		});
	}
}