import {
	GameObjects
} from 'phaser'
import Typewriter from './speechParts/typewriter'
import Avatar from './speechParts/avatar'
import IconButton from './speechParts/iconButton'
import IconText from './speechParts/iconText'
import RepairLogic from './speechParts/repairLogic'

export default class Speech extends GameObjects.Container {
	constructor(scene, player, enemies, background) {
		super(scene)
		this.isOpen = false
		this.player = player
		this.enemies = enemies
		this.background = background
		this.selectionsVisible = 0;

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

	selectSelection(number) {
		this.selectionsVisible  = 0;
		this.repairLogic.pick(number)
		this.clear()
		this.background.generateLevelBackground()
		this.enemies.spawn()
	}

	addSelection(number, x, y, text) {
		this.scene.time.delayedCall(((number + 1) * 500) + 500, () => {

			let icon;
			switch (number) {
				case 0:
					icon = 'arrowLeft';
					break;
				case 1:
					icon = 'arrowUp';
					break;
				default:
					icon = 'arrowRight';
					break;
			}


			if (this.isOpen) {
				super.add(new IconButton(this.scene, x, y, icon,
					() => {
						this.selectSelection(number)
					}
				))
				super.add(new IconText(this.scene, x, y, text))
				this.selectionsVisible  += 1;
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
		let generateActivityReport = this.generateActivityReport(this.player.health.health, this.player.resources.resources)
		let optionsReport = this.generateOptionsReport()

		return damageReport + "\n\n\n" + 
		generateActivityReport + "\n\n\n" +
		optionsReport
	}

	generateDamageReport(most = null, serious = [], minor = [], amount = 0){
		let options = []
		if (most && (serious.length > 0) && (minor.length > 0)){
			options = [
				`Captain. We took a lot of damage. This badly impacted our ${most} and a lot of other systems.`,
				`Captain. That wave was brutal. The damage has seriously impacted our ${most} and many other systems.`,
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
				"Captain. Brilliant flying. We didn't take any damage!",
				"Captain. No new damage to report.",
				"Captain. That was a masterclass you put on. No new damage to report.",
				"Captain. That flying was incredible we sustained no new damage.",
				"Captain. No Damage to report.",
			]
		}
		return options[Math.floor(Math.random() * options.length)]
	}
	
	generateActivityReport(health = 100, resources = 50){
		let options = []
		
		if ((resources >= 1) && (((resources*10) + health) > 100)){ // GOOD
			if (health >= 70){ // VERY GOOD
				options = [
					"I have got plenty of spare materials. What should I work on next?"
				]
			} else if (health >= 40) { // MODERATE, BUT GOOD RESOURCE
				options = [
					"You managed to get a good amount of resource this time. What do you want me to do with them?"
				]
			} else { // POOR, BUT GOOD RESOURCE
				options = [
					"Critical life support systems have been repaired. What should I do with the rest of the resources?",
					"Unfortunately, I can't perform miracles even with all these resources. So, after the life support is back, which tiny fix do you want?"
				]
			}
		} else { // BAD
			if (health >= 70){ // VERY GOOD
				options = [
					"I have time but not many resources. What should I use them for?",
					"I have a single roll of tape left. Let me make the following suggestions.",
				]
			} else if (health >= 40) { // MODERATE, BUT GOOD RESOURCE
				options = [
					"I don't have as many resources as I would like. These are the best repairs I can offer."
				]
			} else { // POOR, BUT GOOD RESOURCE
				options = [
					"Even if I has the resources, which I do not, we just do not have the time to fix everything. Which of these bad options do you want?"
				]
			}
		}

		return options[Math.floor(Math.random() * options.length)]
	}

	generateOptionsReport(){
		let options = [
			"Use ARROW keys to pick ONE from the following options:"
		]

		return options[Math.floor(Math.random() * options.length)]
	}

	update() {
		if(this.selectionsVisible != 3  ) return;

		if(this.scene.cursors.left.isDown) {
			this.selectSelection(0);
		} else if(this.scene.cursors.up.isDown ){
			this.selectSelection(1);
		} else if(this.scene.cursors.right.isDown ){
			this.selectSelection(2);
		} 
	}
}