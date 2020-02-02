import {GameObjects} from "phaser";

export default class Background extends GameObjects.Container {
	constructor(scene) {

		super(scene);
		this.scene.add.existing(this);
		this.images = []

	}


	clear(){

		for(const image of this.images){
			image.destroy()
		}

	}

	randomInt(min, max){
		return Math.floor(Math.random() * max) + min
	}

	generateLevelBackground(){

		this.clear()

		const numStars = this.randomInt(10, 100)

		for(let i=0; i<numStars; i++){

			const x = this.randomInt(0, 1500)
			const y = this.randomInt(0, 900)

			const star = this.scene.add.image(x, y, "star");
			this.images.push(star)

		}

		const numGalaxies = this.randomInt(2, 5)
		const galaxyImages = ["galaxy", "galaxy2", "galaxy3", "galaxy4", "galaxy5"]

		for(let i=0; i<numGalaxies; i++){

			const x = this.randomInt(0, 1500)
			const y = this.randomInt(0, 900)
			const galaxyImage = galaxyImages[this.randomInt(0, 5)]

			let galaxy = this.scene.add.image(x, y, galaxyImage);
			galaxy.angle = this.randomInt(0, 180)
			this.images.push(galaxy)
		}

	}

}
