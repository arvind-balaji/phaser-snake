var snake;
var snake2;
var score2;
var maingameMusic
var istwoPlayer = false;
var boolStart2 = false;
var food;
var pausState;
var resumeState;
var cursors;
var www;
var aaa;
var sss;
var ddd;
var portal;
var port1x;
var port2x;
var port1y;
var port2y;
var score;
var button;
var boolStart;
var pauseButton;
var direction2;
var heading2;
var allowedToResume = false;
var allowedToPause = true;
var sceneGone = false;
var TWOUP = 0;
var TWODOWN = 1;
var TWOLEFT = 2;
var TWORIGHT = 3;
var UP = 0;
var DOWN = 1;
var LEFT = 2;
var RIGHT = 3;

function compareFunciton(a,b)
{
  return a.scooore-b.scooore;
}
class MainMenu extends Phaser.Scene{
  constructor()
  {
    super({key:"MainMenu",active:true});
  }
  create()
  {



    this.scene.stop('Settings');
    this.scene.stop('HighScoreMenu');
    this.scene.stop("MainGame");
    this.scene.stop("GameOver");

    var leaderboard;
    var graphics = this.add.graphics();
    graphics.fillStyle(0x000000,1);
    graphics.fillRect(0,0,1024,768);
    var butt = this.add.sprite(712,584,'play');
    butt.setInteractive();
     butt.on('pointerdown', () => this.changeScene());
     var quit = this.add.sprite(952,584,'quit');
     quit.setInteractive();
     var highscores = this.add.sprite(412,584,'highscores');
     highscores.setInteractive();
     highscores.on('pointerdown',() =>this.changeToScores());
     var settings = this.add.sprite(102,584,'settings');
     settings.setInteractive();
     settings.on('pointerdown',() => this.changeToSettings());

  }
  changeToScores()
  {

    this.scene.stop("GameOver");
    this.scene.stop('MainMenu');
    this.scene.stop("MainGame");
    this.scene.stop('Settings');
    this.scene.start('HighScoreMenu');
  }
  changeToSettings()
  {

    this.scene.stop("GameOver");
    this.scene.stop('MainMenu');
    this.scene.stop("MainGame");
    this.scene.start('Settings');
    this.scene.stop('HighScoreMenu');
  }
  changeScene()
  {
    boolStart = false;
    this.scene.stop("GameOver");
    this.scene.stop('MainMenu');
    this.scene.start("MainGame");
    this.scene.stop('Settings');
    this.scene.stop('HighScoreMenu');

  }
  preload()
  {

    this.load.image('play',"play.png");
    this.load.image('quit','quit.png');
    this.load.image('highscores','highscores.png');
    this.load.image('settings','settings.png');
  }
}
class PauseScene extends Phaser.Scene{
  constructor()
  {
    super({key:"PauseScene",active:true});
  }
  create()
  {
      pauseButton = this.input.keyboard.addKey(80)
  }
  update()
  {
    if(pauseButton.isDown && !pausState && allowedToPause)
    {
      maingameMusic.pause();
      pausState = true;
      resumeState = false;
      allowedToPause = false;
      this.scene.pause('MainGame');
    }
    if(!pauseButton.isDown && pausState)
    {
      allowedToResume = true;
    }
    if(pauseButton.isDown && allowedToResume)
    {
      pausState = false;
      resumeState = true;
    }
    if(resumeState && !pauseButton.isDown)
    {
      maingameMusic.resume();
      resumeState=false;
      allowedToPause = true;
      allowedToResume = false;
      this.scene.resume('MainGame');
    }

  }
  preload()
  {

  }
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
      if(istwoPlayer)
      {
          maingameMusic = this.sound.add('gamemusic2');
        var Snake2 = new Phaser.Class({

            initialize:

            function Snake (scene, x, y)
            {
              boolStart = false;
                this.headPosition = new Phaser.Geom.Point(x, y);
                this.body = scene.add.group();
                this.head = this.body.create(x * 16, y * 16, 'body2');
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
                  //this.direction = TWOUP;
                  //console.log(this.direction);
                  return this.move(time,1,1);

                }
            },

            faceLeft: function ()
            {
                if (direction2 === TWOUP || direction2 === TWODOWN || !boolStart2)
                {
                    boolStart2 = true;
                    heading2 = TWOLEFT;
                }
            },

            faceRight: function ()
            {
                if (direction2 === TWOUP || direction2 === TWODOWN || !boolStart2)
                {
                  boolStart2 = true;
                    heading2 = TWORIGHT;
                }
            },

            faceUp: function ()
            {
                if (direction2 === TWOLEFT || direction2 === TWORIGHT || !boolStart2)
                {
                  boolStart2 = true;
                    heading2 = TWOUP;
                }
            },

            faceDown: function ()
            {
                if (direction2 === TWOLEFT || direction2 === TWORIGHT || !boolStart2)
                {
                    boolStart2 = true;
                    heading2 = TWODOWN;
                }
            },

            move: function (time,x, y)
            {


                switch (heading2)

                {
                    case TWOLEFT:
                    {
                    if(boolStart2 && x==1)
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
                    case TWORIGHT:
                    {
                      if(boolStart2 && x==1)
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
                    case TWOUP:
                    {
                      if(boolStart2 && x==1)
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
                    case TWODOWN:
                    {
                      if(boolStart2 && x==1)
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


                direction2 = heading2;


                Phaser.Actions.ShiftPosition(this.body.getChildren(), this.headPosition.x * 16, this.headPosition.y * 16, 1, this.tail);

                var hitBody = Phaser.Actions.GetFirst(this.body.getChildren(), { x: this.head.x, y: this.head.y }, 1);
                if(this.head.x <= 0 || this.head.x >= 1024 || this.head.y <= 0 || this.head.y >= 768)
                {
                  score = this.body.getChildren().length;
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
        snake2 = new Snake2(this,2,2);
      }
      else {
          maingameMusic = this.sound.add('gamemusic');
        snake2 = null;
      }
      //snake2 = snake;
      portal = new Portal(this,parseInt((Math.random()*62))+2,parseInt((Math.random()*46))+2);
      cursors = this.input.keyboard.createCursorKeys();
      www = this.input.keyboard.addKey(87);
      aaa = this.input.keyboard.addKey(65);
      sss = this.input.keyboard.addKey(83);
      ddd = this.input.keyboard.addKey(68);
        maingameMusic.play();

  }
 update (time, delta)
  {
    if(istwoPlayer)
    {
      if (!snake.alive || !snake2.alive)
      {
        maingameMusic.pause();
        boolStart2 = false;
        boolStart = false;
        sceneGone = true;
        if (localStorage.getItem("scores") === null) {
          var a = [0];
          localStorage.setItem("scores",JSON.stringify(a))
        }
        var storedScores = JSON.parse(localStorage.getItem("scores"));

        storedScores.push(score);
        storedScores.sort();
        storedScores = storedScores.reverse();
        storedScores = storedScores.splice(0,10);
        var dodo;
        var leaderboard;
        var posInArr;
        for(var j = 0; j < storedScores.length; j++)
        {

          if(score == storedScores[j])
          {
            console.log(j);
            leaderboard = true;
            posInArr = j;
            break;
          }
        }
        if(leaderboard)
        {
          console.log(score);
          dodo = prompt("Enter Your name.", "name");
          storedScores.splice(posInArr,1,score+" "+dodo);

          console.log(storedScores);


        }
        localStorage.setItem('scores',JSON.stringify(storedScores));
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
      if(aaa.isDown)
      {
        snake2.faceLeft();
      }
      else if (ddd.isDown)
      {
          snake2.faceRight();
      }
      else if (www.isDown)
      {
        console.log('no');
          snake2.faceUp();
      }
      else if (sss.isDown)
      {
          snake2.faceDown();
      }
      if(snake2.update(time));
      {
        if (snake2.collideWithFood(food))
        {
            repositionFood();
        }
        if(snake2.collideWithPortal(portal))
        {}
      }
    }
    else {
      {
        if (!snake.alive)
        {
          maingameMusic.pause();
          boolStart = false;
          sceneGone = true;
          if (localStorage.getItem("scores") === null) {
            var a = [0];
            localStorage.setItem("scores",JSON.stringify(a))
          }
          var storedScores = JSON.parse(localStorage.getItem("scores"));

          storedScores.push(score);
          storedScores.sort();
          storedScores = storedScores.reverse();
          storedScores = storedScores.splice(0,10);
          var dodo;
          var leaderboard;
          var posInArr;
          for(var j = 0; j < storedScores.length; j++)
          {

            if(score == storedScores[j])
            {
              console.log(j);
              leaderboard = true;
              posInArr = j;
              break;
            }
          }
          if(leaderboard)
          {
            console.log(score);
            dodo = prompt("Enter Your name.", "name");
            storedScores.splice(posInArr,1,score+" "+dodo);

            console.log(storedScores);


          }
          localStorage.setItem('scores',JSON.stringify(storedScores));
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
    }
  }
 preload ()
  {
    this.load.audio('gamemusic2','gamemusic2.mp3');
    this.load.audio('gamemusic','gamemusic.mp3');
      this.load.image('food', 'food.png');
      this.load.image('body', 'char.png');
      this.load.image('portal','portal.png');
      this.load.image('mainmenu',"mainmenu.png");
      this.load.image('body2', 'char2.png');
  }
}
class GameOver extends Phaser.Scene{
  constructor()
  {
    super({key:"GameOver",active:true});
  }
  create()
  {
    var leaderboard;
    var graphics = this.add.graphics();
    graphics.fillStyle(0x000000,1);
    graphics.fillRect(0,0,1024,768);
    this.add.text(100,300,"Your Score: " + score,{fill:'#ffffff'});
    this.add.text(100,0,"Top 10",{fill:'#ffffff'});
    var scores = JSON.parse(localStorage.getItem('scores'));
    var actualScores = [];
    if(scores !=null)
    {
    for(var i = 0; i < scores.length; i++)
    {
      var scoreObject =
      {
        name:'',
        scooore:0
      };
      var index;
      var toArr;
      var x = scores[i];
      if(typeof x === 'string' || x instanceof String)
      {
        var boolio = x.match(/[A-Z|a-z|\s]/);
        toArr = boolio.index;
        index = toArr;
        toArr = scores[i].substring(0,toArr);
        toArr = +toArr;
        scoreObject.name = scores[i].substring(index);
      }
      else {
        toArr = +x;
      }
      scoreObject.scooore = toArr;
      actualScores.push(scoreObject);
    }
    actualScores.sort(compareFunciton)
    actualScores.reverse();


    for(var i = 0; i < scores.length; i++)
    {
      if(!actualScores[i].scooore == 0)
      {
        var rank = i+1
          this.add.text(100,(i+1)*20, rank +  ': ' +actualScores[i].name + " " + actualScores[i].scooore ,{fill:'#ffffff'});
      }

    }
    if(score == actualScores[0].scooore)
    {
     this.add.sprite(512,100,'cool');
    }
  }
    var butt = this.add.sprite(512,384,'die');
    butt.setInteractive();
     butt.on('pointerdown', () => this.changeScene());
     var mainMenuButt = this.add.sprite(512, 700, 'menu');
     mainMenuButt.setInteractive();
     mainMenuButt.on('pointerdown',() => this.goToMenu())


  }
  goToMenu()
  {
    istwoPlayer = false;
    boolStart = false;
    this.scene.stop("GameOver");
    this.scene.stop('GameOver');
    this.scene.start("MainMenu");
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
      this.load.image('cool',"highscore.png");
      this.load.image("die","dead.png");
    }
}

class HighScoreMenu extends Phaser.Scene{
  constructor()
  {
    super({key:"HighScoreMenu",active:true});
  }
  create()
  {

    var leaderboard;
    var graphics = this.add.graphics();
    graphics.fillStyle(0x000000,1);
    graphics.fillRect(0,0,1024,768);

    this.add.text(100,0,"Top 10",{fill:'#ffffff'});
    var scores = JSON.parse(localStorage.getItem('scores'));
    var actualScores = [];
    if(scores !=null)
    {
    for(var i = 0; i < scores.length; i++)
    {
      var scoreObject =
      {
        name:'',
        scooore:0
      };
      var index;
      var toArr;
      var x = scores[i];
      if(typeof x === 'string' || x instanceof String)
      {
        var boolio = x.match(/[A-Z|a-z|\s]/);
        toArr = boolio.index;
        index = toArr;
        toArr = scores[i].substring(0,toArr);
        toArr = +toArr;
        scoreObject.name = scores[i].substring(index);
      }
      else {
        toArr = +x;
      }
      scoreObject.scooore = toArr;
      actualScores.push(scoreObject);
    }
    actualScores.sort(compareFunciton)
    actualScores.reverse();


    for(var i = 0; i < scores.length; i++)
    {
      if(!actualScores[i].scooore == 0)
      {
        var rank = i+1
          this.add.text(100,(i+1)*20, rank +  ': ' +actualScores[i].name + " " + actualScores[i].scooore ,{fill:'#ffffff'});
      }

    }
  }
     var mainMenuButt = this.add.sprite(512, 700, 'menu');
     mainMenuButt.setInteractive();
     mainMenuButt.on('pointerdown',() => this.goToMenu())


  }
  goToMenu()
  {
    
    this.scene.stop("GameOver");
    this.scene.start('MainMenu');
    this.scene.stop("MainGame");
    this.scene.stop('Settings');
    this.scene.stop('HighScoreMenu');
  }
  preload()
  {

      this.load.image('menu',"mainmenu.png");
  }
}
class Settings extends Phaser.Scene{
  constructor()
  {
    super({key:"Settings",active:true});
  }
  create()
  {
    var graphics = this.add.graphics();
    graphics.fillStyle(0x983541,1);
    graphics.fillRect(0,0,1024,768);
  var mainMenuButt = this.add.sprite(512, 700, 'menu');
  mainMenuButt.setInteractive();
  mainMenuButt.on('pointerdown',() => this.goToMenu())
  var choose2player = this.add.sprite(512,300,'2play');
  choose2player.setInteractive();
  choose2player.on('pointerdown',() => this.enable2player(choose2player));

  }
goToMenu()
{
 this.scene.stop("GameOver");
 this.scene.start('MainMenu');
 this.scene.stop("MainGame");
 this.scene.stop('Settings');
 this.scene.stop('HighScoreMenu');
}
preload()
{
  this.load.image('2play' , '2playeroption.png');
  this.load.image('2playcon', '2player.png');
}
enable2player(icon)
{
  this.add.sprite(512,500,'2playcon');
  istwoPlayer = true;
}

}

var config = {
    type: Phaser.WEBGL,
    width: 1024,
    height: 768,
    backgroundColor: '#ec33d0',
    parent: 'phaser-example',
    scene: [MainMenu,MainGame,GameOver,HighScoreMenu,Settings,PauseScene]

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
