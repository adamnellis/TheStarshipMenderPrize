
export default class Collider extends Phaser.Physics.Arcade.Sprite {
	constructor(scene, x, y, texture, image_name) {
		super(scene, x, y, texture, image_name);
    scene.physics.world.enable(this)
	}

}