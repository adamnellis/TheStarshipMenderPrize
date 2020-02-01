export default class RepairLogic {
	constructor(player) {
		this.player = player

		this.choices_text = []
		this.choices_changes = []
	}

	generate() {
		this.choices = [
			{text: `
			Bent Gun
			
			Change 1
			Change 2
			`,
			options: {
				accelartion: this.player.accelartion + 5
			}
		},
			{text: `
			Ting Ting
			
			Change a
			Change b
			`, options: {
				accelartion: this.player.accelartion + 1
			}},
			{text: `
			A happy thing
			
			lol cakes
			test string
			`, options: {
			}}
		]

		return this.choices.map(o => o.text)
	}

	pick(number) {
		console.log("PICKED: " + number)
		console.log(this.choices[number])

		this.player.repair(this.choices[number].options)
	}
}