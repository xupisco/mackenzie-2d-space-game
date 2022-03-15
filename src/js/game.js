import '../scss/game.scss';
import { SampleScene } from './scenes/sample_scene';

var config = {
    title: 'Hello World Phaser JS',
    type: Phaser.AUTO,

    scale: {
        width: window.innerWidth,
        height: window.innerHeight,
    },

    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 },
            debug: true,
        }
    },

    transparent: true,
    parent: 'game_container',
    scene: SampleScene
};

var game = new Phaser.Game(config);
