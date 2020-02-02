export default class IconButton extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y,  picture, callback,) {
       
        super(scene, x, y, picture)

        this.setDepth(3)

        this.setInteractive({
                useHandCursor: true
            })
            .on('pointerover', () => this.enterButtonHoverState())
            .on('pointerout', () => this.enterButtonRestState())
            .on('pointerdown', () => this.enterButtonActiveState())
            .on('pointerup', () => {
                this.enterButtonHoverState();
                callback();
            });

        scene.add.existing(this)
    }

    enterButtonHoverState() {
        this.setTint(0xaaaaaa);
    }

    enterButtonRestState() {
        this.setTint(0xffffff);
    }

    enterButtonActiveState() {
        this.setTint(0x00ff00);
    }
}