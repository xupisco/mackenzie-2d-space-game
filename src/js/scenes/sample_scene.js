var bg;
var player;
var can_shoot = true;
var enemy_timer;
var bullets;

export class SampleScene extends Phaser.Scene {
    constructor(config) {
        super({ key: 'sample_scene' });
    }

    preload() {
        this.load.image('bg', 'assets/sprites/bg_02.png');
        this.load.image('bullet', 'assets/sprites/bullet.png');

        this.load.spritesheet('player', 'assets/sprites/ship_160.png', {
            frameWidth: 32,
            frameHeight: 48
        }, 10);

        this.load.spritesheet('enemy', 'assets/sprites/enemy.png', {
            frameWidth: 64,
            frameHeight: 64
        });

        this.load.spritesheet('explosion', 'assets/sprites/explosion.png', {
            frameWidth: 32,
            frameHeight: 32
        });
    }

    create() {
        bg = this.add.tileSprite(0, 0, 820, 960, 'bg');

        player = this.physics.add.sprite(160, 415, 'player')
        player.setBounce(0.1);
        player.setGravityY(0);
        player.setCollideWorldBounds(true);

        this.anims.create({
            key: 'flying',
            frames: this.anims.generateFrameNumbers('player', {
                frames: [2, 7]
            }),
            frameRate: 12,
            repeat: -1
        })

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('player', {
                frames: [0, 5]
            }),
            frameRate: 12,
            repeat: -1
        })

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('player', {
                frames: [9, 4]
            }),
            frameRate: 12,
            repeat: -1
        })

        this.anims.create({
            key: 'enemy',
            frames: this.anims.generateFrameNumbers('enemy', {
                frames: [0, 1]
            }),
            frameRate: 12,
            repeat: -1
        })

        this.anims.create({
            key: 'explosion',
            frames: this.anims.generateFrameNumbers('explosion', {
                frames: [0, 1, 2, 3, 4, 5]
            }),
            frameRate: 12,
            repeat: 0
        })

        player.play('flying', true);
        bullets = this.physics.add.group();
        enemy_timer = this.time.delayedCall(1000, enemySpawn, [], this);
    }

    update() {
        var user_input = this.input.keyboard.createCursorKeys();
        bg.tilePositionY -= .25;

        if (user_input.left.isDown) {
            player.setVelocityX(-200);
            player.play('left', true);
        } else if (user_input.right.isDown) {
            player.setVelocityX(200);
            player.play('right', true);
        } else {
            var current_velX = player.body.velocity.x;
            if (Math.abs(current_velX) > 0) {
                player.setVelocityX(current_velX * 0.95);
            }
            player.play('flying', true);
        }
        if ((user_input.space.isDown && can_shoot)) {
            var bullet = this.physics.add.sprite(player.body.x + 16, player.body.y, 'bullet')
            bullets.add(bullet);
            bullet.setVelocityY(-200);
            can_shoot = false;

        }
        if ((user_input.space.isUp)) {
            can_shoot = true;
        }
    }
}

function enemySpawn() {
    var enemy = this.physics.add.sprite(randomRange(32, 288), -32, 'enemy')

    enemy.play('enemy', true);
    enemy.setVelocityY(randomRange(40, 100));
    enemy_timer = this.time.delayedCall(1000, enemySpawn, [], this);

    var world = this;

    this.physics.add.collider(bullets, [enemy], function (enemy, bullet) {
        var explosion = world.add.sprite(bullet.body.x + 8, bullet.body.y, 'explosion');
        explosion.play('explosion', true);
        explosion.on('animationcomplete', function(el) {
            this.destroy();
        })

        bullet.destroy();
        enemy.destroy();
    });
}

function randomRange(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}
