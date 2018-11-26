var config = {
  type: Phaser.AUTO,
  width: 1024,
  height: 768,
  backgroundColor: '#cccc00',
  physics: {
      default: 'arcade',
      arcade: {
          debug: false
      }
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

var game = new Phaser.Game(config);
var coolSnek;
function preload() {
  this.load.image('sky', 'assets/sky.png');
  this.load.image('ground', 'assets/platform.png');
  this.load.image('star', 'assets/star.png');
  this.load.image('bomb', 'assets/bomb.png');
  this.load.spritesheet('dude',
    'char.png', {
      frameWidth: 32,
      frameHeight: 32
    })
  }

  function create() {
    //this.add.image(400, 300, 'sky');
      cursors = this.input.keyboard.createCursorKeys();
      coolSnek = this.physics.add.sprite(100, 450, 'dude');
          coolSnek.setCollideWorldBounds(true);

  }
  var leftMove;
  var upMove;
  var rightMove;
  var downMove;
  function update()
  {


    if (cursors.left.isDown && !rightMove)
    {
      leftMove = true;
      rightMove = false;
      upMove = false;
      downMove = false;
      coolSnek.setVelocityY(0);
      coolSnek.setVelocityX(-160);

    }
    else if (cursors.right.isDown && !leftMove)
    {
      upMove = false;
      downMove = false;
      rightMove = true;
      leftMove = false;

      coolSnek.setVelocityY(0);
        coolSnek.setVelocityX(160);
    }
    else if(cursors.down.isDown && !upMove)
    {
      leftMove = false;
      rightMove = false;
      upMove = false;
      downMove = true;
        coolSnek.setVelocityX(0);
        coolSnek.setVelocityY(+160);
    }
    else if(cursors.up.isDown && !downMove)
    {
      leftMove = false;
      rightMove = false;
      upMove = true;
      downMove = false;
          coolSnek.setVelocityX(0);
          coolSnek.setVelocityY(-160);
    }

}
