import { GameObjects } from 'phaser';

import Body from './playerParts/body';

export default class player extends GameObjects.Container {
	constructor(scene, cursors) {
		super(scene)

		this.cursors = cursors;
		this.scene.add.existing(this)
	}

	init() {
		super.add(new Body(this.scene, 500, 200, 	this.cursors))
	
	}



}