export default class Resources extends Phaser.GameObjects.Text {	
	constructor(scene) {
        super(scene, 700, 820,
            "0 :Resources", {
                font: "bold 32px Arial",
                fill: '#fff',
                align: 'right',
                wordWrap: {
                    width: 400,
                    useAdvancedWrap: true
                }
			}).setOrigin(1, 0)
			
		this.resources = 0

        scene.add.existing(this)
	}
	
	increase(resources = 1){
        this.resources += resources
		this.setText(this.resources + " :Resources")
    }
    
    clear(){
        this.resources = 0
    }
}