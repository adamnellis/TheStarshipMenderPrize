var config = {
  type: Phaser.WEBGL,
  width: 800,
  height: 600,
  parent: 'phaser-example',
  physics: {
      default: 'impact',
      impact: {
          setBounds: {
              x: 0,
              y: 0,
              width: 3200,
              height: 600,
              thickness: 32
          }
      }
  },
  scene: {
      preload: preload,
      create: create,
      update: update,
      extend: {
          minimap: null,
          player: null,
          cursors: null,
          thrust: null,
          flares: null,
          bullets: null,
          lastFired: 0,
          text: null,
          createBulletEmitter: createBulletEmitter,
          createStarfield: createStarfield,
          createLandscape: createLandscape,
          createAliens: createAliens,
          createThrustEmitter: createThrustEmitter
      }
  }
};

var game = new Phaser.Game(config);

function preload ()
{
  this.load.image('ship', 'assets/sprites/shmup-ship2.png');
}

function create ()
{

  //  Add a player ship

  this.player = this.impact.add.sprite(1600, 200, 'ship').setDepth(1);
  this.player.setMaxVelocity(1000).setFriction(800, 600).setPassiveCollision();

  this.cursors = this.input.keyboard.createCursorKeys();

  this.text = this.add.text(10, 10, '', { font: '16px Courier', fill: '#00ff00' }).setDepth(1).setScrollFactor(0);
}

function update (time, delta)
{
 

  if (this.cursors.left.isDown)
  {
      this.player.setAccelerationX(-800);
      this.player.flipX = true;
  }
  else if (this.cursors.right.isDown)
  {
      this.player.setAccelerationX(800);
      this.player.flipX = false;
  }
  else
  {
      this.player.setAccelerationX(0);
  }

  if (this.cursors.up.isDown)
  {
      this.player.setAccelerationY(-800);
  }
  else if (this.cursors.down.isDown)
  {
      this.player.setAccelerationY(800);
  }
  else
  {
      this.player.setAccelerationY(0);
  }



  //  Position the center of the camera on the player
  //  We -400 because the camera width is 800px and
  //  we want the center of the camera on the player, not the left-hand side of it
  this.cameras.main.scrollX = this.player.x - 400;

  //  And this camera is 400px wide, so -200
  // this.minimap.scrollX = Phaser.Math.Clamp(this.player.x - 200, 800, 2000);
}

export default class Player {
    constructor(scene) {
       
    }

  


}