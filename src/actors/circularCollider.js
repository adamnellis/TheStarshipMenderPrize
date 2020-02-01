import Collider from './collider'

export default class CircularCollider extends Collider {
	constructor(scene, x, y, texture, image_name) {
		super(scene, x, y, texture, image_name);

    const w = this.body.width / 2 - 40;
    const h = this.body.height / 2 - 40;
    this.body.setCircle(45, w, h);

	}

}