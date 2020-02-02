import {
	GameObjects
} from 'phaser'
import Typewriter from './speechParts/typewriter'
import Avatar from './speechParts/avatar'
import IconButton from './speechParts/iconButton'
import IconText from './speechParts/iconText'
import RepairLogic from './speechParts/repairLogic'

export default class Speech extends GameObjects.Container {
	constructor(scene, player, enemies) {
		super(scene)
		this.isOpen = false
		this.player = player
		this.enemies = enemies
		this.repairLogic = new RepairLogic(player)

		this.typewriter = new Typewriter(
			this.scene,
			300,
			50, {
				font: "bold 32px Arial",
				fill: '#fff',
				wordWrap: {
					width: 900,
					useAdvancedWrap: true
				}
			},
		)

		this.avatar = new Avatar(this.scene, 150, 190)
		this.scene.add.existing(this.avatar)
		this.scene.add.existing(this)
	}

	open() {
		this.isOpen = true
		this.avatar.open()

		let text = this.generateSpeech()

		this.scene.time.delayedCall(this.avatar.duration, () => {
			this.typewriter.write(text)

			this.scene.time.delayedCall(this.typewriter.duration * text.length, () => {
				this.addSelections()
			})
		})
	}

	addSelections() {
		let texts = this.repairLogic.generate()

		this.addSelection(0, 350, 500, texts[0])
		this.addSelection(1, 750, 500, texts[1])
		this.addSelection(2, 1150, 500, texts[2])
	}

	addSelection(number, x, y, text) {
		this.scene.time.delayedCall(((number + 1) * 500) + 500, () => {
			if (this.isOpen) {
				super.add(new IconButton(this.scene, x, y,
					() => {
						this.repairLogic.pick(number)
						this.clear()
						this.enemies.spawn()
					}
				))
				super.add(new IconText(this.scene, x, y, text))
			}
		})
	}

	clear() {
		this.isOpen = false
		this.avatar.clear()
		this.typewriter.clear()
		this.removeAll(true)
	}

	generateSpeech(){
		let recentDefecits = this.player.readAndClearRecentDefecits()
		let most = null
		let serious = []
		let minor = []
		let amount = Object.keys(recentDefecits).length
		if (amount){
			most = Object.keys(recentDefecits).reduce((a, b) => recentDefecits[a] > recentDefecits[b] ? a : b)
		}
		for (let deficit in recentDefecits){
			let occurances = recentDefecits[deficit]
			if (occurances >= 2){
				serious.push(deficit)
			} else {
				minor.push(deficit)
			}
		}

		let damageReport = this.generateDamageReport(most, serious, minor, amount)
		let optionsReport = this.generateOptionsReport()

		return damageReport + "\n\n\n" + 
		`I managed to repair the flux capactior drive with our guns secondary heat sink pump. But what do we do with the hull?`+ "\n\n" +
		optionsReport
	}

	generateDamageReport(most = null, serious = [], minor = [], amount = 0){
		let options = []
		if (most && (serious.length > 0) && (minor.length > 0)){
			options = [
				`Captain. We took a lot of damage. This badly impacted our ${most} and a lot of other systems.`,
			]
		} else if (most && (serious.length > 0) && (amount > 1)) {
			options = [
				`Captain. We took serious damage. This badly impacted our ${most} and a lot of other systems.`,
			]
		} else if (most && (serious.length > 0)) {
			options = [
				`Captain. We took serious damage and this has badly impacted our ${most}.`,
			]
		} else if (most && (minor.length > 0) && (amount > 1)) {
			options = [
				`Captain. We took minor damage. There was some impact to our ${most} and other systems.`,
			]
		} else if (most && (minor.length > 0)) {
			options = [
				`Captain. We took minor damage and this has slightly impacted our ${most}.`,
			]
		} else {
			options = [
				"Captain. Brilliant flying. We didn't take any damage there",
				"Captain. No new damage to report."
			]
		}
		return options[Math.floor(Math.random() * options.length)]
	}
	
	generateOptionsReport(){
		let options = [
			"Pick ONE from the following options:"
		]

		return options[Math.floor(Math.random() * options.length)]
	}
}