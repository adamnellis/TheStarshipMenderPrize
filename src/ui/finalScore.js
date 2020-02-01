export default class FinalScore extends Phaser.GameObjects.Text {	
	constructor(scene, score) {
        super(scene, 750, 310,
            "Score: " + score, {
                font: "bold 64px Arial",
                fill: '#0f0',
                align: 'center',
                wordWrap: {
                    width: 400,
                    useAdvancedWrap: true
                }
			}).setOrigin(0.5, 0)
			
        scene.add.existing(this)
	}
}