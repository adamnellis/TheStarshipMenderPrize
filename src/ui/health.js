const STARTING_HEALTH = 100

export default class Health extends Phaser.GameObjects.Text {	
	constructor(scene) {
        super(scene, 800, 820,
            "Damage: " + (100 - STARTING_HEALTH) + "%", {
                font: "bold 32px Arial",
                fill: '#fff',
                align: 'left',
                wordWrap: {
                    width: 400,
                    useAdvancedWrap: true
                }
            }).setOrigin(0, 0)
        this.setDepth(3)
			
		this.health = STARTING_HEALTH

        scene.add.existing(this)
	}
	
	reduce(damage){
        this.health -= damage

        this.setMe();

        if(this.health <= 0){
            this.scene.endGame()
        }
    }
    
    clear() {
        this.health = STARTING_HEALTH;
        this.setMe();
    }

    setMe() {
        this.setText("Damage: " + (100 - this.health) + "%")

    }
}