

export default class Tutorial extends Phaser.GameObjects.Text {	
	constructor(scene) {
        super(scene, 150, 50,
            "Use ARROW keys to move, SPACE to shoot. Try to avoid damage, kill enemies and collect boxes", {
                font: "bold 32px Arial",
                fill: '#fff',
                align: 'left',
                wordWrap: {
                    width: 1150,
                    useAdvancedWrap: true
                }
			}).setOrigin(0, 0)
			

        scene.add.existing(this)
	}
	
	
}