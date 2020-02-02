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

	generateMobility(performance){
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

	generateWeapon(performance){
		let options = []
		if (performance >= 95){
			//TODO: need different things
			options = [{
				text: `
				Clean Projectiles

				Great Accuracy 
				Great Fire Rate
				`,
				options: {
					bulletDamage: 100,
					bulletPicture: 'laserBlue01.png',
					shootRate: 150,
					bulletDirectionModifier: 1,
					bulletSpeed: 1,
					shootRandomDirectionMin: 0,
					shootRandomDirectionMax: 0,
				}
			}]
		} else if (performance >= 40){
			options = [{
				text: `
				Re-install Weapon

				Great Accuracy
				Moderate Fire Rate
				`,
				options: {
					bulletDamage: 100,
					bulletPicture: 'laserBlue01.png',
					shootRate: 200,
					bulletDirectionModifier: 1,
					bulletSpeed: 1,
					shootRandomDirectionMin: 0,
					shootRandomDirectionMax: 0,
				}
			}]
		} else {
			//TODO: need different things
			options = [{
				text: `
				Weld Gun Barrels

				Great Accuracy
				Poor Fire Rate
				`,
				options: {
					bulletDamage: 100,
					bulletPicture: 'laserBlue01.png',
					shootRate: 400,
					bulletDirectionModifier: 1,
					bulletSpeed: 1,
					shootRandomDirectionMin: 0,
					shootRandomDirectionMax: 0,
				}
			}]
		}
		return options[Math.floor(Math.random() * options.length)]
	}

	generateTradeoff(performance){
		let options = []

		if (performance >= 111){
			//TODO: need different things
			options = [{
				text: `
				Sunflower Protocol

				Crazy Accuracy
				Great Fire Rate
				`,
				options: {
					bulletSpeed: 2,
					shootRate: 100,
					shootRandomDirectionMin: -3.1,
					shootRandomDirectionMax: 3.1,
				}
			}]
		} else if (performance >= 40){
			//TODO: need different things
			options = [{
				text: `
				Repurpose Guidance

				Moderate Speed
				Crazy Accuracy
				Crazy Turning
				`,
				options: {
					velocity: 300,
					bulletSpeed: -0.5,
					shootRandomDirectionMin: -3.1,
					shootRandomDirectionMax: 3.1,
					angularVelocity: 100000
				}
			}]
		} else {
			//TODO: need different things
			options = [{
				text: `
				Release Anti-matter

				Crazy Speed
				Crazy Accuracy
				Crazy Turning
				`,
				options: {
					velocity: 1500,
					bulletSpeed: -0.5,
					shootRandomDirectionMin: -3.1,
					shootRandomDirectionMax: 3.1,
					angularVelocity: 100000
				}
			}]
		}

		return options[Math.floor(Math.random() * options.length)]
	}

	pick(number) {
		this.player.repair(this.choices[number].options)
	}
}