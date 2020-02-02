import Collider from './collider'

export default class CircularCollider extends Collider {
	constructor(scene, x, y, texture, image_name) {
		super(scene, x, y, texture, image_name);

    const size = (this.body.halfWidth + this.body.halfHeight) / 2
    const diff = (this.body.halfWidth - this.body.halfHeight) / 2

    this.setOrigin(0.5, 0.5)

    if(diff > 0){
      this.body.setCircle(size, diff, 0);
    }
    else {
      this.body.setCircle(size, 0, -diff);
    }
    

	}

}