
import Collider from './collider'

export default class Collectable extends Collider {
	constructor(scene, x, y, image_name) {
		super(scene, x, y, image_name);

	}

	pickup(){
		this.destroy()
	}

}