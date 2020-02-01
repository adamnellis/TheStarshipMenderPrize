import {
	GameObjects
} from 'phaser'

export default class Bullet extends GameObjects.Sprite {
	constructor(scene, x, y) {

		super(scene, x, y, "spaceRedux", "laserBlue01.png");
		// super(scene, x, y, "spaceRedux", "laserBlue11.png")
		// this.angle = Math.PI / 2;
		this.scene.add.existing(this);

		this.angular_rotation = 0;
	}

	update(t, dt) {
		// Integrate motion
		//this.rotation_angle += this.angular_rotation * dt;
	}

}

function normalise_angle_plus_minus_pi(angle) {
	while (angle <= -Math.PI) {
		angle += 2 * Math.PI;
	}
	while (angle > Math.PI) {
		angle -= 2 * Math.PI;
	}
	return angle;
}