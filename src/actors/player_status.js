export default class Status extends Phaser.GameObjects.Text {	
	constructor(scene, x, y, type) {
        super(scene, x, y,
            type, {
                font: "bold 26px Arial",
                fill: '#F44336',
                align: 'left',
                wordWrap: {
                    width: 400,
                    useAdvancedWrap: true
                }
			}).setOrigin(0, 0)
		this.setDepth(1000)

		scene.time.delayedCall(4000, () => {
			if(this){
				this.destroy()
			}
		})
			
		scene.add.existing(this)

		scene.add.tween({
			targets: [this],
			ease: 'Sine.out',
			duration: 3000,
			delay: 0,
			x:{
				getStart: () => this.x,
				getEnd: () => this.randomDirection(this.x)
			},
			y:{
				getStart: () => this.y,
				getEnd: () => this.randomDirection(this.y)
			},
			alpha: {
				getStart: () => this.alpha,
				getEnd: () => 0
			},
		});
	}

	randomDirection(value){
		let delta = 200 * (Math.random() < 0.5 ? -1 : 1)
		return value + delta
	}
}