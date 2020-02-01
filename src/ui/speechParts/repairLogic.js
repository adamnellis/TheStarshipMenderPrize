export default class RepairLogic {
	constructor(player) {
		this.player = player

		this.choices_text = []
		this.choices_changes = []
	}

	generate() {
		this.choices = [{
			text: `
			Install Lightning
			
			Fast speed
			Fast turn
			`,
			options: {
				velocity: this.player.velocity + 500,
				angularVelocity: this.player.angularVelocity + 500
			}
		}, {
			text: `
			Serious Side Thrusters
			
			Crazy Fast turn
			`,
			options: {
				angularVelocity: this.player.angularVelocity + 50000
			}
		}, {
			text: `
			Give Up.
			
			Nothing.
			`,
			options: {}
		}]

		return this.choices.map(o => o.text)
	}

	pick(number) {
		console.log("PICKED: " + number)
		console.log(this.choices[number])

		this.player.repair(this.choices[number].options)
	}
}