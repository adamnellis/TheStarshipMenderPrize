export default class TopScore extends Phaser.GameObjects.Text {	
	constructor(scene, score) {
        super(scene, 750, 390,
            "Best: 0" + score, {
                font: "bold 48px Arial",
                fill: '#fff',
                align: 'center',
                wordWrap: {
                    width: 400,
                    useAdvancedWrap: true
                }
            }).setOrigin(0.5, 0)
            
        let best = JSON.parse(localStorage.getItem('SM_GAME_BEST'))
        
        if (!best || (score > best)){
            localStorage.setItem('SM_GAME_BEST', JSON.stringify(score))
            this.setText("Best: " + score)
        } else {
            this.setText("Best: " + best)
        }
			
        scene.add.existing(this)
	}
}