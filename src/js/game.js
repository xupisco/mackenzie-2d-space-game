import '../scss/game.scss';
import { SampleScene } from './scenes/sample_scene';

var config = {
    title: 'Hello World Phaser JS',
    type: Phaser.AUTO,
    backgroundColor: '#1e242e',

    scale: {
        width: 320,
        height: 480,
    },

    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
        }
    },

    parent: 'game_container',
    scene: SampleScene
};

var game = new Phaser.Game(config);
