export default class IconButton extends Phaser.GameObjects.Text {
    constructor(scene, x, y, text) {
        super(scene, x, y + 60,
            text, {
                font: "bold 32px Arial",
                fill: '#fff',
                align: 'center',
                wordWrap: {
                    width: 400,
                    useAdvancedWrap: true
                }
            }).setOrigin(0.5, 0)

        this.setDepth(3)

        scene.add.existing(this)
    }
}