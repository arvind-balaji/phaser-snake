var snake;
var food;
var cursors;
var cursors2;
var portal;
var port1x;
var port2x;
var port1y;
var port2y;
var score;
var button;
  var boolStart;
var sceneGone = false;
//  Direction consts
var UP = 0;
var DOWN = 1;
var LEFT = 2;
var RIGHT = 3;
function onClick()
{
console.log("noSir");
}
class MainGame extends Phaser.Scene{
  constructor()
  {
    super({key:"MainGame"});
  }
 create ()
  {
    this.scene.stop("GameOver");
      var Food = new Phaser.Class({

          Extends: Phaser.GameObjects.Image,

          initialize:

          function Food (scene, x, y)
          {
              Phaser.GameObjects.Image.call(this, scene)

              this.setTexture('food');
              this.setPosition(x * 16, y * 16);
              this.setOrigin(0);

              this.total = 0;

              scene.children.add(this);
          },

          eat: function ()
          {
              this.total++;
          }

      });

      var Snake = new Phaser.Class({

          initialize:

          function Snake (scene, x, y)
          {
            boolStart = false;
              this.headPosition = new Phaser.Geom.Point(x, y);
              this.body = scene.add.group();
              this.head = this.body.create(x * 16, y * 16, 'body');
              this.head.setOrigin(0);
              this.alive = true;
              this.speed = 100;
              this.moveTime = 0;
              this.tail = new Phaser.Geom.Point(x, y);

          },

          update: function (time)
          {
              if (time >= this.moveTime)
              {
                  return this.move(time,1,1);
              }
          },

          faceLeft: function ()
          {
              if (this.direction === UP || this.direction === DOWN || !boolStart)
              {
                  boolStart = true;
                  this.heading = LEFT;
              }
          },

          faceRight: function ()
          {
              if (this.direction === UP || this.direction === DOWN || !boolStart)
              {
                boolStart = true;
                  this.heading = RIGHT;
              }
          },

          faceUp: function ()
          {
              if (this.direction === LEFT || this.direction === RIGHT || !boolStart)
              {
                boolStart = true;
                  this.heading = UP;
              }
          },

          faceDown: function ()
          {
              if (this.direction === LEFT || this.direction === RIGHT || !boolStart)
              {
                  boolStart = true;
                  this.heading = DOWN;
              }
          },

          move: function (time,x, y)
          {

              switch (this.heading)
              {
                  case LEFT:
                  {
                  if(boolStart && x==1)
                    {
                      this.headPosition.x = Phaser.Math.Wrap(this.headPosition.x - x, 0, 64);
                    }
                    else if(x!=1)
                    {

                      this.headPosition.y = (y/16)-1;
                      this.headPosition.x = x/16-2;
                      Phaser.Actions.ShiftPosition(this.body.getChildren(), x-32, y-16, 1, this.tail);
                      return true;
                    }
                    break;
                  }
                  case RIGHT:
                  {
                    if(boolStart && x==1)
                    {
                      this.headPosition.x = Phaser.Math.Wrap(this.headPosition.x + x, 0, 64);
                    }
                    else if(x!=1)
                    {
                      this.headPosition.y = (y)/16-1;
                      this.headPosition.x = (x)/16;
                      Phaser.Actions.ShiftPosition(this.body.getChildren(), x, y-16, 1, this.tail);
                      return true;
                    }
                      break;
                    }
                  case UP:
                  {
                    if(boolStart && x==1)
                    {
                      this.headPosition.y = Phaser.Math.Wrap(this.headPosition.y - y, 0, 48);
                    }
                    else if(x!=1)
                    {
                      this.headPosition.y = parseInt(y/16-2);
                      this.headPosition.x = x/16-1;
                      Phaser.Actions.ShiftPosition(this.body.getChildren(), x-16, y-32, 1, this.tail);
                      return true;
                    }
                      break;
                    }
                  case DOWN:
                  {
                    if(boolStart && x==1)
                    {
                      this.headPosition.y = Phaser.Math.Wrap(this.headPosition.y + y, 0, 48);
                    }
                    else if(x!=1)
                    {
                      this.headPosition.y = (y/16);
                      this.headPosition.x = (x/16)-1;
                      Phaser.Actions.ShiftPosition(this.body.getChildren(), x-16, y, 1, this.tail);
                      return true;
                    }
                      break;
                    }
              }


              this.direction = this.heading;


              Phaser.Actions.ShiftPosition(this.body.getChildren(), this.headPosition.x * 16, this.headPosition.y * 16, 1, this.tail);

              var hitBody = Phaser.Actions.GetFirst(this.body.getChildren(), { x: this.head.x, y: this.head.y }, 1);
              if(this.head.x <= 0 || this.head.x >= 1024 || this.head.y <= 0 || this.head.y >= 768)
              {
                console.log(this.head.x);
                score = this.body.getChildren().length;
                console.log(score);
                this.alive = false;
                return false;
              }
              if (hitBody)
              {
                  console.log('dead');
                  score = this.body.getChildren().length;
                  console.log(score);
                  this.alive = false;

                  return false;
              }
              else
              {
                  this.moveTime = time + this.speed;
                  return true;
              }
          },

          grow: function ()
          {
              var newPart = this.body.create(this.tail.x, this.tail.y, 'body');
              newPart.setOrigin(0);
          },


          collideWithFood: function (food)
          {
              if ((this.head.x >= food.x-8 && this.head.x <=food.x+8) && (this.head.y >= food.y-8 && this.head.y <=food.y+8))
              {
                  this.grow();
                  food.eat();
                  if (this.speed > 20 && food.total % 5 === 0)
                  {
                      this.speed -= 5;
                  }
                  return true;
              }
              else
              {
                  return false;
              }
          },


          updateGrid: function (grid)
          {
              this.body.children.each(function (segment) {
                  var bx = segment.x / 16;
                  var by = segment.y / 16;
                  grid[by][bx] = false;
              });
              return grid;
          },

          collideWithPortal: function(portal)
          {


             if ((this.head.x== portal.head.x-8) && (this.head.y == portal.head.y-8))
             {
               console.log("cat");
                 this.move(1,portal.newPart.x+8,portal.newPart.y+8);

              return true;

             }
             else if ((this.head.x == portal.newPart.x-8) && (this.head.y == portal.newPart.y-8))
              {
                 this.move(1,portal.head.x+8,portal.head.y+8);
              }
             else
             {
                 return false;
             }
          }

      });
      var Portal = new Phaser.Class({
        Extends: Phaser.GameObjects.Image,

        initialize:
        function portal (scene, x, y)
        {
            this.headPosition = new Phaser.Geom.Point(x,y);
            this.body = scene.add.group();
            port1x = x*16;
            port1y = y*16;
            var nox = port1x;
            var noy = port1y;
            var newx = parseInt((Math.random()*62))+2
            var newy = parseInt((Math.random()*46))+2
            while(newx == nox)
            {
              newx = parseInt((Math.random()*62))+2
            }
            while(newy == noy)
            {
              newy = parseInt((Math.random()*46))+2
            }
            port2x = newx*16;
            port2y = newy*16;

            this.head = this.body.create(port1x-8, port1y-8, 'portal');
            this.newPart = this.body.create(port2x-8, port2y-8, 'portal');

        }


      })
      food = new Food(this, 3, 4);
      snake = new Snake(this, 8, 8);
      portal = new Portal(this,parseInt((Math.random()*62))+2,parseInt((Math.random()*46))+2);
      cursors = this.input.keyboard.createCursorKeys();

  }
 update (time, delta)
  {
      if (!snake.alive)
      {

        sceneGone = true;
        if (localStorage.getItem("scores") === null) {
          localStorage.setItem("scores",[])
        }
        var storedScroes = localStorage.getItem("scores")
        scores.push(score);
        scores.sort();

          this.scene.stop("MainGame");
          this.scene.start("GameOver");
          snake.alive = true;
      }
      if (cursors.left.isDown)
      {
          snake.faceLeft();
      }
      else if (cursors.right.isDown)
      {
          snake.faceRight();
      }
      else if (cursors.up.isDown)
      {
          snake.faceUp();
      }
      else if (cursors.down.isDown)
      {
          snake.faceDown();
      }
      if (snake.update(time))
      {
          if (snake.collideWithFood(food))
          {
              repositionFood();
          }
          if(snake.collideWithPortal(portal))
          {}

      }
  }
 preload ()
  {
      this.load.image('food', 'food.png');
      this.load.image('body', 'char.png');
      this.load.image('portal','portal.png');
  }
}
class GameOver extends Phaser.Scene{
  constructor()
  {
    super({key:"GameOver",active:true});
  }
  create()
  {

    var graphics = this.add.graphics();
    graphics.fillStyle(0x000000,1);
    graphics.fillRect(0,0,1024,768);
    this.add.text(250,16,score,{fill:'#ffffff'});
    this.add.text(100,0,"Top 10",{fill:'#ffffff'});
    this.add.text(100,16,localStorage.getItem('score'),{fill:'#ffffff'});
    var butt = this.add.sprite(512,384,'die');
    butt.setInteractive();
     butt.on('pointerdown', () => this.changeScene());
  }

  update()
  {


  }
  changeScene()
  {
    boolStart = false;
    this.scene.stop("GameOver");
    this.scene.start("MainGame");
  }
    preload()
    {
      this.load.image("die","dead.png")
    }
}




var config = {
    type: Phaser.WEBGL,
    width: 1024,
    height: 768,
    backgroundColor: '#bfcc00',
    parent: 'phaser-example',
    scene: [MainGame,GameOver]

};



var game = new Phaser.Game(config);

function repositionFood ()
{
    var testGrid = [];
    for (var y = 1; y < 47; y++)
    {
        testGrid[y] = [];
        for (var x = 1; x < 63; x++)
        {
            testGrid[y][x] = true;
        }
    }
    snake.updateGrid(testGrid);
    var validLocations = [];
    for (var y = 1; y < 47; y++)
    {
        for (var x = 1; x < 63; x++)
        {
            if (testGrid[y][x] === true)
            {
                validLocations.push({ x: x, y: y });
            }
        }
    }
    if (validLocations.length > 0)
    {
        var pos = Phaser.Math.RND.pick(validLocations);
        food.setPosition(pos.x * 16, pos.y * 16);

        return true;
    }
    else
    {
        return false;
    }
}
