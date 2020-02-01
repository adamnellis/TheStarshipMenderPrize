import {
	GameObjects
} from 'phaser'
import config from './../config'
import Bullet from "./bullet";

export default class Enemy extends GameObjects.Sprite {
	constructor(scene, player, bullets, x, y, image_name, rotation_rate, rotation_damping, rotation_angle) {
		super(scene, x, y, "spaceRedux", image_name);
		this.scene = scene;
		this.bullets = bullets;
		this.angle = Math.PI / 2;

		// this.setOrigin(0, 0);
		this.player = player;

		this.rotation_rate = rotation_rate;
		this.rotation_damping = rotation_damping;

		this.rotation_force = 0;
		this.angular_rotation = 0;
		this.rotation_angle = rotation_angle;
	}

	update(t, dt) {
		// Integrate motion
		this.rotation_angle += this.angular_rotation * dt;
		this.angular_rotation += this.rotation_force * dt;
		// Set rotation on shape
		this.rotation = this.rotation_angle + Math.PI / 2;
	}

	update_delayed(t, dt) {
		// Destroy enemies when they move off the screen
		if (this.x < -config.width || this.x > 2 * config.width || this.y < -config.height || this.y > 2 * config.height) {
			this.destroy();
		}

		this.shoot();
	}

	shoot() {
		// Create a bullet moving in the direction that the enemy is pointing
		// TODO: Take into account this.rotation_angle
		this.bullets.add(new Bullet(this.scene, this.x, this.y, Math.sin(this.rotation), Math.cos(this.rotation)))
	}
}
