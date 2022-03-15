export class SampleScene extends Phaser.Scene {
    constructor(config) {
        super({ key: 'sample_scene' });
    }

    preload() {
        //this.load.setBaseURL('https://labs.phaser.io');

        this.load.image('fireball', 'assets/sprites/fireball.png');
        this.load.image('red', 'https://labs.phaser.io/assets/particles/muzzleflash2.png');
    }

    create() {
        var particles = this.add.particles('red');

        var emitter = particles.createEmitter({
            speed: 100,
            scale: { start: 1, end: 0 },
            blendMode: 'ADD'
        });

        var fireball = this.physics.add.image(400, 100, 'fireball');

        fireball.setVelocity(150, 200);
        fireball.setBounce(1, 1);
        fireball.setCollideWorldBounds(true);

        emitter.startFollow(fireball);
    }
}
