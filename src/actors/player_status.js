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
				getEnd: () => this.x - 100
			},
			y:{
				getStart: () => this.y,
				getEnd: () => this.y - 100
			},
			alpha: {
				getStart: () => this.alpha,
				getEnd: () => 0
			},
		});
	}
}