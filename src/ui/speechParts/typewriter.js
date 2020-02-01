export class Typewriter extends Phaser.GameObjects.Text {
	constructor(scene, x, y, style) {
		super(scene, x, y, "", style);

		this.scene = scene
		this.timer = null

		scene.add.existing(this)
	}

	write(text) {
		this.completeText = text
		this.index = 0
		this.timer = this.scene.time.delayedCall(10, this.next, [], this);
	}

	clear() {
		this.timer.remove()
		super.setText("")
		this.index = 0
	}

	next() {
		super.setText(this.text + this.completeText[this.index])
		this.index += 1

		if (this.index < this.completeText.length) {
			this.timer = this.scene.time.delayedCall(20, this.next, [], this);
		}
	}
}