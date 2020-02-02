export default class RepairLogic {
	constructor(player) {
		this.player = player
		this.choices = []
	}

	generate() {
		let performance = (this.player.resources.resources*10) + this.player.health.health
		this.choices = [this.generateMobility(performance), this.generateWeapon(performance), this.generateTradeoff(performance)]
		return this.choices.map(o => o.text)
	}

	generateMobility(){
		let options = []
		if (performance >= 95){
			//TODO: need different things
			options = [{
				text: `
				New FTL Drive

				Great Speed
				Great Turning
				`,
				options: {
					velocity: 650,
					angularVelocity: 500
				}
			}]
		} else if (performance >= 40){
			//TODO: need different things
			options = [{
				text: `
				New FTL Drive

				Great Speed
				Great Turning
				`,
				options: {
					velocity: 650,
					angularVelocity: 500
				}
			}]
		} else {
			//TODO: need different things
			options = [{
				text: `
				New FTL Drive

				Great Speed
				Great Turning
				`,
				options: {
					velocity: 650,
					angularVelocity: 500
				}
			}]
		}
		return options[Math.floor(Math.random() * options.length)]
	}

	generateWeapon(){
		let options = []
		if (performance >= 95){
			//TODO: need different things
			options = [{
				text: `
				New FTL Drive

				Great Speed
				Great Turning
				`,
				options: {
					velocity: 650,
					angularVelocity: 500
				}
			}]
		} else if (performance >= 40){
			//TODO: need different things
			options = [{
				text: `
				New FTL Drive

				Great Speed
				Great Turning
				`,
				options: {
					velocity: 650,
					angularVelocity: 500
				}
			}]
		} else {
			//TODO: need different things
			options = [{
				text: `
				New FTL Drive

				Great Speed
				Great Turning
				`,
				options: {
					velocity: 650,
					angularVelocity: 500
				}
			}]
		}
		return options[Math.floor(Math.random() * options.length)]
	}

	generateTradeoff(performance){
		let options = []

		if (performance >= 95){
			//TODO: need different things
			options = [{
				text: `
				Run Side Thrust Hot

				Slow Speed
				Crazy Turning
				`,
				options: {
					velocity: 200,
					angularVelocity: 100000
				}
			}]
		} else if (performance >= 40){
			//TODO: need different things
			options = [{
				text: `
				Run Side Thrust Hot

				Slow Speed
				Crazy Turning
				`,
				options: {
					velocity: 200,
					angularVelocity: 100000
				}
			}]
		} else {
			//TODO: need different things
			options = [{
				text: `
				Run Side Thrust Hot

				Slow Speed
				Crazy Turning
				`,
				options: {
					velocity: 200,
					angularVelocity: 100000
				}
			}]
		}

		return options[Math.floor(Math.random() * options.length)]
	}

	pick(number) {
		console.log("PICKED: " + number)
		console.log(this.choices[number])

		this.player.repair(this.choices[number].options)
	}
}