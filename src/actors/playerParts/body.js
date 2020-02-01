import CircularCollider from '../circularCollider'

export default class Body extends CircularCollider {
	constructor(scene, x, y) {
		super(scene, x, y, "spaceRedux", "playerShip1_green.png")
		this.setOrigin(0.5, 0.5)

	}


}