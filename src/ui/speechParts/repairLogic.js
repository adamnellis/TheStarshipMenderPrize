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
			options = [
				{
					text: `
					Rebuild Engine Block

					Good Speed
					`,
					options: {
						velocity: 500,
					}
				},
				... (this.player.angularVelocity < 50) ? [{
					text: `
					Re-attach Thrusters

					Triple Turning Speed
					`,
					options: {
						angularVelocity: this.angularVelocity*3
					}
				}] : [],
				... (this.player.velocity < 100) ? [{
					text: `
					Increase Fuel Injectors

					Triple Speed
					`,
					options: {
						angularVelocity: this.velocity*3
					}
				}] : [],
			]
		} else {
			options = [
			{
				text: `
				Ignite Reserve Core

				Poor Speed
				Poor Turning
				`,
				options: {
					velocity: 250,
					angularVelocity: 80
				}
			},
			{
				text: `
				Inhale Exhaust Fumes

				Poor Speed
				Poor Turning
				`,
				options: {
					velocity: 250,
					angularVelocity: 80
				}
			},
			{
				text: `
				Remove Warning Labels

				Poor Speed
				Double Turning
				`,
				options: {
					velocity: 250,
					angularVelocity: this.angularVelocity*2
				}
			},
			{
				text: `
				Break Emergency Lights

				Poor Speed
				Poor Turning
				`,
				options: {
					velocity: 250,
					angularVelocity: 80
				}
			},
			... (this.player.angularVelocity < 80) ? [{
				text: `
				Paper Mache Thruster

				Double Turning Speed
				`,
				options: {
					angularVelocity: this.angularVelocity*2
				}
			}] : [],
			... (this.player.velocity < 200) ? [{
				text: `
				Paper Mache Exhaust

				Double Speed
				`,
				options: {
					angularVelocity: this.velocity*3
				}
			}] : [],
		]
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