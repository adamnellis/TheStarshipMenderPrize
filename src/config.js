import Boot from './scenes/boot'
import Preload from './scenes/preload'
import Title from './scenes/title'
import GameOver from './scenes/gameover'
import Game from './scenes/game'
import {
    Scale
} from 'phaser'

export default {
    width: 1500,
    height: 900,
    backgroundColor: 'rgba(0, 21, 64)',
    scene: [Boot, Preload, Title, Game, GameOver],
    scale: {
        mode: Scale.FIT,
        autoCenter: Scale.CENTER_BOTH
    },
}