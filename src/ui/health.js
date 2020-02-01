const STARTING_HEALTH = 100

export default class Health extends Phaser.GameObjects.Text {	
	constructor(scene) {
        super(scene, 750, 820,
            "Health: " + STARTING_HEALTH, {
                font: "bold 32px Arial",
                fill: '#fff',
                align: 'center',
                wordWrap: {
                    width: 400,
                    useAdvancedWrap: true
                }
			}).setOrigin(0.5, 0)
			
		this.health = STARTING_HEALTH

        scene.add.existing(this)
	}
	
	reduce(damage){
		this.health -= damage
		this.setText("Health: " + damage)
	}
}