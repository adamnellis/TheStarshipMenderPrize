export default class Score extends Phaser.GameObjects.Text {	
	constructor(scene) {
        super(scene, 1450, 50,
            "Score: 0", {
                font: "bold 32px Arial",
                fill: '#fff',
                align: 'right',
                wordWrap: {
                    width: 400,
                    useAdvancedWrap: true
                }
			}).setOrigin(1, 0)
			
        this.score = 0
        
        this.setDepth(3)

        scene.add.existing(this)
	}
	
	increase(points){
		this.score += points
		this.setText("Score: " + this.score)
    }
    
    getFinalScore(){
        return this.score
    }
}