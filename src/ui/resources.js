export default class Resources extends Phaser.GameObjects.Text {	
	constructor(scene) {
        super(scene, 700, 820,
            "Resources: 0", {
                font: "bold 32px Arial",
                fill: '#fff',
                align: 'right',
                wordWrap: {
                    width: 400,
                    useAdvancedWrap: true
                }
			}).setOrigin(1, 0)
			
        this.resources = 0
        
        this.setDepth(3)

        scene.add.existing(this)
    }
    
    setMe(){
        this.setText("Resources: " + this.resources)
    }
	
	increase(resources = 1){
        this.resources += resources
		this.setMe();
    }
    
    clear(){
        this.resources = 0
        this.setMe();
    }

   
    
}