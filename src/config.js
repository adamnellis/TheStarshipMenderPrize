import Boot from './scenes/boot'
import Preload from './scenes/preload'
import Title from './scenes/title'
import Game from './scenes/game'
import {
    Scale
} from 'phaser'

export default {
    width: 1500,
    height: 900,
    backgroundColor: 'rgba(0, 0, 0)',
    scene: [Boot, Preload, Title, Game],
    scale: {
        mode: Scale.FIT,
        autoCenter: Scale.CENTER_BOTH
    },
}