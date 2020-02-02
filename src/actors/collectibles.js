import {GameObjects} from "phaser";

export default class Collectibles extends GameObjects.Container {
	constructor(scene) {
		super(scene);

		this.scene.add.existing(this);

	}

}