
export default class Collectable extends Phaser.Physics.Arcade.Sprite {
	constructor(scene, x, y, image_name) {
		super(scene, x, y, image_name);

	}

	pickup(){
		this.destroy
	}

}