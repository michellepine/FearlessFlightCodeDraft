// // -------------------------------------------------***FEARLESS FLIGHT*** -------------------------------------------------
// // --------------------------------------=-----a game created by Michelle Pine---------------------------------------------

// //Boldly soar across the sky, dodging obstacles and shooting down adversaries to reach your goals. 
// //Fearless Flight is the fun and exciting game for the fighter pilot in all of us!

// //Combining both shooting and survival skills, Fearless Flight is an extremely customizable and action-packed 
// //arcade game in which players must avoid colliding with numerous (and increasingly more abundant) obstacles 
// //while attempting to earn a high score. Inspired by games like Feeding Frenzy and other classics like Asteroids. 

// //CREDITS: 
// //---------TUTORIAL ON EASING FROM HERE: https://processing.org/examples/easing.html
// //---------PLANE SOUND BY: Mike Koenig, http://soundbible.com/1305-Cargo-Plane-Cabin-Ambiance.html, 
// //---------EXPLOSION SOUND BY: Mike Koenig, http://soundbible.com/538-Blast.html 
// //---------TUTORIAL ON SAVING HIGH SCORES FROM HERE: https://forum.processing.org/two/discussion/19719/saving-a-highscore
// //---------FONTS: 
// //-------------"Startled" font by Gaunt Fonts at http://www.fontspace.com/gaut-fonts/startling-font
// //-------------"Langdon" Font by xlntelecom at https://www.fontsquirrel.com/fonts/langdon
// //---------Other music generated with Apple GarageBand and Apple Loops
// //---------Images created using Adobe Illustrator and Adobe Photoshop


// // -------------------------------------------------***GLOBAL VARIABLES***-------------------------------------------------
var bg; //the background video
var state = -1; // starting state
var height = 800;
var width = 600;

//game pieces
var player = new Player(); //player
var enemies = new Enemies(); //array of enemies
var bullets = new Bullets(); //array of bullets
var is = new Island(); //island for the ending screen


var score = 0; //player's score
var lines; // past scores
var scoreList;
var timer = 0;

//width + heights of game pieces
var planeWidth = 97;
var planeHeight = 67;
var birdWidth = 47;
var birdHeight = 32;

var endGame = false;  //indicates whether the game should end
var countMax = 20;  //timer tick on which random number range for spawning enemies should reduce, should always start at 20
var count = 0; //timer


var stopSpawn = false; //determines when to stop the enemy spawning
var easing = 0.05; //easing level of the plane

//plane color indicators
var red1 = true;
var green1 = false;
var blue1 = false;

//determines whether the user is playing against just birds or just planes
//if both are false, then both are played
var noBirds = false;
var noPlanes = false;


//difficulty level indicators
var easy = true;
var med = false;
var hard = false;

//speed of the video
var speed = 0.5;

//images
var redPlane;
var bluePlane;
var greenPlane;
var myPlane;

//bird sprites
var birdImg0;
var birdImg1;
var birdImg2;
var birdImg3;
var birdImg4;
var birdImg5;
var birdImg6;
var birdImg7;

//explosion sprites
var exp1;
var exp2;
var exp3;
var exp4;
var exp5;
var exp6;

var badPlane; 
var titleScreen; //opening screen of the game
var t1;
var t2;
var tutorial;

//menu screens
var redEasyBoth;
var redEasyPlanes;
var redEasyBirds;
var redMediumBoth;
var redMediumPlanes;
var redMediumBirds;
var redHardBoth;
var redHardPlanes;
var redHardBirds;
var greenEasyBoth;
var greenEasyPlanes;
var greenEasyBirds;
var greenMediumBoth;
var greenMediumPlanes;
var greenMediumBirds;
var greenHardBoth;
var greenHardPlanes;
var greenHardBirds;
var blueEasyBoth;
var blueEasyPlanes;
var blueEasyBirds;
var blueMediumBoth;
var blueMediumPlanes;
var blueMediumBirds;
var blueHardBoth;
var blueHardPlanes;
var blueHardBirds;

//menu arrays
var redMenu;
var greenMenu;
var blueMenu;
var choseMenu;

//menu box bounds
var redP = new Bounds(31, 187, 130, 290);
var greenP = new Bounds(219, 379, 130, 290);
var blueP = new Bounds(411, 570, 130, 290);
var easyB = new Bounds(406, 573, 416, 467); 
var medB = new Bounds(406, 573, 484, 529); 
var hardB = new Bounds(406, 573, 545, 593); 
var birdB = new Bounds(64, 169, 658, 686);
var planeB = new Bounds(199, 319, 658, 686);


//tutorial Images
var tutorialBubble1;
var tutorialBubble2;
var tutorialBubble3;

//ending screens
var gameover;
var gamewon;
var island; 

//island Images
var IslandImg;

//sprite lists
var sprites; 
var expSprites; 

//sounds 
var main;
var loop1;
var shoot; 
var boom;
var click;


function preload() {
  bg = createVideo('data/vid.mp4'); // the moving clouds and ocean in the background
  bg.hide();
  main = loadSound('data/mainTitle1.mp3');
  loop1 = loadSound('data/sLoop1.mp3');
  shoot = loadSound('data/gun.mp3');
  boom = loadSound('data/explosion.mp3');
  click = loadSound('data/click.mp3');
  island = loadImage("data/island.png");
  gameover = loadImage("data/gameover.png");
  gamewon = loadImage("data/youwon.png");
  gameover = loadImage("data/gameover.png");
  redPlane = loadImage("data/Asset 2.png");
  bluePlane = loadImage("data/Asset 3.png");
  greenPlane = loadImage("data/Asset 4.png");
  myPlane = redPlane;
  birdImg0 = loadImage("data/Asset 11.png");
  birdImg1 = loadImage("data/Asset 12.png");
  birdImg2 = loadImage("data/Asset 13.png");
  birdImg3 = loadImage("data/Asset 14.png");
  birdImg4 = loadImage("data/Asset 15.png");
  birdImg5 = loadImage("data/Asset 16.png");
  birdImg6 = loadImage("data/Asset 17.png");
  birdImg7 = loadImage("data/Asset 18.png");
  badPlane = loadImage("data/Asset 8.png");
  sprites =  [birdImg0, birdImg1, 
    birdImg2, birdImg3, birdImg4, birdImg5, birdImg6, 
    birdImg7, birdImg6, birdImg5, birdImg4, birdImg3, 
    birdImg2, birdImg1];
  exp1 = loadImage("data/exp4.png");
  exp2 = loadImage("data/exp3.png");
  exp3 = loadImage("data/exp1.png");
  exp4 = loadImage("data/exp5.png");
  exp5 = loadImage("data/exp6.png");
  exp6 = loadImage("data/exp8.png");
  expSprites =  [exp1, exp2, exp3, exp4, exp5, exp6];
  titleScreen = loadImage("data/TITLEpng.png");
  t1 = loadImage("data/t1.png");
  t2 = loadImage("data/t2.png");
  tutorial = t1;
  lines = loadStrings("HighScores.txt");
  redEasyBoth = loadImage("data/redEasyBoth.png");
  redEasyPlanes = loadImage("data/redEasyPlanes.png");
  redEasyBirds = loadImage("data/redEasyBirds.png");
  redMediumBoth = loadImage("data/redMediumBoth.png");
  redMediumPlanes = loadImage("data/redMediumPlanes.png");
  redMediumBirds = loadImage("data/redMediumBirds.png");
  redHardBoth  = loadImage("data/redHardBoth.png");
  redHardPlanes  = loadImage("data/redHardPlanes.png");
  redHardBirds  = loadImage("data/redHardBirds.png");

  //Each color plane choice has its own menu array for easier logical navigation
  //Order is always:
  //easy level && planes and birds
  //easy level && planes
  //easy level && birds
  //medium level && planes and birds
  //medium level && planes
  //medium level && birds
  //hard level && planes and birds
  //hard level && planes
  //hard level && birds

  //menu specifically for a red plane
  redMenu = [redEasyBoth, redEasyPlanes, redEasyBirds, 
    redMediumBoth, redMediumPlanes, redMediumBirds, 
    redHardBoth, redHardPlanes, redHardBirds];

  greenEasyBoth = loadImage("data/greenEasyBoth.png");
  greenEasyPlanes = loadImage("data/greenEasyPlanes.png");
  greenEasyBirds = loadImage("data/greenEasyBirds.png");
  greenMediumBoth  = loadImage("data/greenMediumBoth.png");
  greenMediumPlanes = loadImage("data/greenMediumPlanes.png");
  greenMediumBirds = loadImage("data/greenMediumBirds.png");
  greenHardBoth = loadImage("data/greenHardBoth.png");
  greenHardPlanes = loadImage("data/greenHardPlanes.png");
  greenHardBirds = loadImage("data/greenHardBirds.png");

  //menu specifically for a green plane
  greenMenu = [greenEasyBoth, greenEasyPlanes, greenEasyBirds, 
    greenMediumBoth, greenMediumPlanes, greenMediumBirds, 
    greenHardBoth, greenHardPlanes, greenHardBirds];

  blueEasyBoth = loadImage("data/blueEasyBoth.png");
  blueEasyPlanes = loadImage("data/blueEasyPlanes.png");
  blueEasyBirds = loadImage("data/blueEasyBirds.png");
  blueMediumBoth = loadImage("data/blueMediumBoth.png");
  blueMediumPlanes = loadImage("data/blueMediumPlanes.png");
  blueMediumBirds = loadImage("data/blueMediumBirds.png");
  blueHardBoth = loadImage("data/blueHardBoth.png");
  blueHardPlanes = loadImage("data/blueHardPlanes.png");
  blueHardBirds = loadImage("data/blueHardBirds.png");

  //menu specifically for a blue plane
  blueMenu = [blueEasyBoth, blueEasyPlanes, blueEasyBirds, 
    blueMediumBoth, blueMediumPlanes, blueMediumBirds, 
    blueHardBoth, blueHardPlanes, blueHardBirds];
  
  //chosen menu default is always the red menu
  choseMenu = redMenu;
}


//------------------------------------------------***FILTERING***----------------------------------------------
//filters based on whether the flying is gone
function isGone2(flying) {
  return !(flying.isGone());
}

// -------------------------------------------------***SETUP***-------------------------------------------------
//sets up the canvas, loads all content from the data folder
function setup() {
  createCanvas(600, 800);
  bg.play();
  bg.loop();
  if (state == -1 && main) {
    main.play();
  }
}


// -------------------------------------------------***PLAYER CLASS***-------------------------------------------------

//to represent the Player of the game
function Player() {
  this.pic = redPlane;
  this.x = 500;
  this.y = height/2;
  this.isDead = false;
  this.w = planeWidth;
  this.h = planeHeight;
  this.thisHit = null;
  this.thisExplode = new Explosion(this.x, this.y, false);
  

  //displays this Flying
  this.display = function() {
    //implements plane easing, to simulate the plane "drifting"
    var targetY = mouseY;
    var dy = targetY - this.y;
    this.y += dy * easing;
    image(myPlane, 500, this.y, planeWidth, planeHeight);
  }

  ///detects if there is a collision between this Flying another Flying
  this.collision = function(other) {
    var otherLocUpperX = other.x + other.w / 2 + 5;
    var otherLocLowerX = other.x - other.w / 2 - 5;
    var otherLocUpperY = other.y + other.w / 2 + 5;
    var otherLocLowerY = other.y - other.w / 2 - 5;
    var col1 = ((this.x <= otherLocUpperX) 
      && (this.x >= otherLocLowerX)
      && (this.y >= otherLocLowerY)
      && (this.y <= otherLocUpperY));
    var thisLocUpperX = this.x + this.w / 2 + 5;
    var thisLocLowerX = this.x - this.w / 2 - 5;
    var thisLocUpperY = this.y + this.w / 2 + 5;
    var thisLocLowerY = this.y - this.w / 2 - 5;
    var col2 = ((other.x <= thisLocUpperX) 
      && (other.x >= thisLocLowerX)
      && (other.y >= thisLocLowerY)
      && (other.y <= thisLocUpperY));
    return col1 || col2;
  }
}



// -------------------------------------------------***BULLET CLASS***-------------------------------------------------

//represents a bullet fired from the Player's plane
function Bullet() {
  //represents whether the bullet has hit a target
  this.hit = false; 
  //determines whether this bullet has already met a target, saves that target if yes
  this.alreadyTaken = null;
  //tells whether the shooting sound is playing
  this.shooting = false;
  //loads a new shooting sound
  this.bang = loadSound("data/gun.mp3");
  this.x = player.x - planeWidth/2;
  this.y= player.y;
  this.isDead = false;
  this.w = 10;
  this.h = 5;
  
  
  //displays the bullet
  this.displayBullet = function() {
    fill(255, 255, 0);
    stroke(255, 255, 0);
    rect(this.x, this.y, 10, 5);
    stroke(0);
    //controls how long the "bang" of the bullet lasts
    if (this.x > 400 && !this.shooting) {
      this.bang.play();
      this.shooting = true;
    }
    //stops the "bang" if it's playing long enough
    if (this.x < 400 && this.shooting) {
      this.bang.stop();
      this.shooting = false;
    }
  }
  
  //moves the xcoordiante of this Bullet leftwards
  this.update = function() {
    this.x = this.x - 5;
  }
  
  //checks if this bullet is gone from the screen
  this.isGone = function() {
    return this.x <= - 10 || (this.hit && !this.thisExplode.show);
  }
  
  //detects if there is a collision between this Flying another Flying
  this.collision = function(other) {
    var otherLocUpperX = other.x + other.w / 2 + 5;
    var otherLocLowerX = other.x - other.w / 2 - 5;
    var otherLocUpperY = other.y + other.w / 2 + 5;
    var otherLocLowerY = other.y - other.w / 2 - 5;
    var col1 = ((this.x <= otherLocUpperX) 
      && (this.x >= otherLocLowerX)
      && (this.y >= otherLocLowerY)
      && (this.y <= otherLocUpperY));
    var thisLocUpperX = this.x + this.w / 2 + 5;
    var thisLocLowerX = this.x - this.w / 2 - 5;
    var thisLocUpperY = this.y + this.w / 2 + 5;
    var thisLocLowerY = this.y - this.w / 2 - 5;
    var col2 = ((other.x <= thisLocUpperX) 
      && (other.x >= thisLocLowerX)
      && (other.y >= thisLocLowerY)
      && (other.y <= thisLocUpperY));
    return col1 || col2;
  }
  
  
}

// -------------------------------------------------***BULLETS CLASS***-------------------------------------------------

//represents all the bullets of the game
function Bullets() {
  this.b = [];

  //gives the size of the bullet array
  this.sizeB = function(){
    return this.b.length;
  }
  
  //fires bullets, aka adds a new Bullet to the ArrayList
  this.fire = function() {
    this.b.push(new Bullet());
  }
  
  //removes all bullets that are now offscreen
  this.removeGone = function() {
    this.b = this.b.filter(isGone2);  
  }
  
  //displays all bullets
  this.displayAll = function() {
    if (this.b!== null) {
      let iterator = this.b.entries();
      for (let e of iterator) {
        fill(255, 255, 0);
        stroke(255, 255, 0);
        rect(e.x, e.y, 10, 5);
        stroke(0);
        //controls how long the "bang" of the bullet lasts
        if (e.x > 400 && !e.shooting) {
          e.bang.play();
          e.shooting = true;
        }
        //stops the "bang" if it's playing long enough
        if (e.x < 400 && e.shooting) {
          e.bang.stop();
          e.shooting = false;
        }
         e.x = e.x - 5;
      }
    }
  }
  
  
  
}
// --------------------------------------------***RANDOM NUMBER GENERATION**-------------------------------------------------
//to return a random number in the specified range
function randNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// -------------------------------------------------***BIRD CLASS**-------------------------------------------------
//to represent a bird
function Bird() {
  this.birdSprites = sprites; //animation frames for the bird
  this.aCount = 0; //the count used to move through the frames
  this.pic = birdImg0;
  this.x = -birdWidth;
  this.y = randNum(birdWidth/2, height - birdWidth/2);
  this.isDead = false;
  this.w = birdWidth;
  this.h = birdHeight;

  
  //displays the bird
  this.display = function(){
    image(this.birdSprites[this.aCount], this.x, this.y, this.w, this.h);
    if (this.aCount == 13) {
      this.aCount = 0; //restarts the frames once they reach the end of the array
    }
    this.aCount++;
  }
  
  //this Bird dies, altering the score negatively
  this.die = function() {
    this.isDead = true;
    score = score - 5;
  }
  
  //moves the xcoordiante of this Flying rightwards
  this.update= function() {
    if (easy) {
      this.x = this.x + 2;
    } else if (med) {
      this.x = this.x + 4;
    } else if (hard) {
      this.x = this.x + 6;
    }
  }

  //detects if there is a collision between this Flying another Flying
  this.collision = function(other) {
    var otherLocUpperX = other.x + other.w / 2 + 5;
    var otherLocLowerX = other.x - other.w / 2 - 5;
    var otherLocUpperY = other.y + other.w / 2 + 5;
    var otherLocLowerY = other.y - other.w / 2 - 5;
    var col1 = ((this.x <= otherLocUpperX) 
      && (this.x >= otherLocLowerX)
      && (this.y >= otherLocLowerY)
      && (this.y <= otherLocUpperY));
    var thisLocUpperX = this.x + this.w / 2 + 5;
    var thisLocLowerX = this.x - this.w / 2 - 5;
    var thisLocUpperY = this.y + this.w / 2 + 5;
    var thisLocLowerY = this.y - this.w / 2 - 5;
    var col2 = ((other.x <= thisLocUpperX) 
      && (other.x >= thisLocLowerX)
      && (other.y >= thisLocLowerY)
      && (other.y <= thisLocUpperY));
    return col1 || col2;
  }
  
  //determines if this Flying is offscreen
  this.isGone = function() {
    return (this.x >= 600 + planeWidth) || this.isDead;
  }
  
}


// -------------------------------------------------***ENEMY PLANE CLASS***-------------------------------------------------

//to represent an enemy plane
function Plane() {
  this.explodeThis = false;
  this.pic = badPlane;
  this.x = -planeWidth;
  this.y = randNum(planeWidth/2, height - planeHeight/2);
  this.isDead = false;
  this.w = planeWidth;
  this.h = planeHeight;
  this.thisHit = null;
  this.thisExplode = new Explosion(this.x, this.y, false);


  //this Plane dies, altering the score positively
  this.die = function() {
    this.isDead = true;
    score = score + 5;
  }
  
  //displays this Flying
  this.display = function() {
    image(this.pic, this.x, this.y, planeWidth, planeHeight);
  }
  
  //moves the xcoordiante of this Flying rightwards
  this.update= function() {
    if (easy) {
      this.x = this.x + 2;
    } else if (med) {
      this.x = this.x + 4;
    } else if (hard) {
      this.x = this.x + 6;
    }
  }

  //detects if there is a collision between this Flying another Flying
  this.collision = function(other) {
    var otherLocUpperX = other.x + other.w / 2 + 5;
    var otherLocLowerX = other.x - other.w / 2 - 5;
    var otherLocUpperY = other.y + other.w / 2 + 5;
    var otherLocLowerY = other.y - other.w / 2 - 5;
    var col1 = ((this.x <= otherLocUpperX) 
      && (this.x >= otherLocLowerX)
      && (this.y >= otherLocLowerY)
      && (this.y <= otherLocUpperY));
    var thisLocUpperX = this.x + this.w / 2 + 5;
    var thisLocLowerX = this.x - this.w / 2 - 5;
    var thisLocUpperY = this.y + this.w / 2 + 5;
    var thisLocLowerY = this.y - this.w / 2 - 5;
    var col2 = ((other.x <= thisLocUpperX) 
      && (other.x >= thisLocLowerX)
      && (other.y >= thisLocLowerY)
      && (other.y <= thisLocUpperY));
    return col1 || col2;
  }
  
  //determines if this Flying is offscreen
  this.isGone = function() {
    return (this.x >= 600 + planeWidth) || this.isDead;
  }

}

// -------------------------------------------------***BOUNDS CLASS***-------------------------------------------------

//represents x and y boundaries of an object, used to detect collisions
function Bounds(lowX, upX, lowY, upY) {

  this.lowX = lowX;
  this.upX = upX;
  this.lowY = lowY;
  this.upY = upY;

  
  //checks if something is within these bounds (aka a collision)
  //mouse x and mouse y should be the parameters
  this.within = function(x, y) {
    return (x >= lowX) && (x <= upX) && (y >= lowY) && (y <= upY);
  }
  
  
}


// -------------------------------------------------***ENEMIES CLASS***-------------------------------------------------

//represents all the enemies in the game
function Enemies() {
  this.f = [];
  

  //adds a new bird to the ArrayList
  this.spawn = function() {
    this.f.push(new Bird());
  }

  //adds a new PLane to the arrayList
  this.spawn2 = function() {
    this.f.push(new Plane());
  }

  //removes all enemies that are now off-screen
  this.removeGone = function() {
    this.f = this.f.filter(isGone2);
  }

  //displays and updates all
  //checks for collisions with bullets, the player, for all enemies
  this.runEnemies = function() {
    if (this.f!== null) {
      //checks each enemy for collisions with the player
      this.f.forEach(function(obj) {
        obj.display();
        obj.update();
        if (player.collision(obj)) {
          //explodes the player if there's a collision
          player.thisExplode.x = 500;
          player.thisExplode.y = player.y;
          player.thisExplode.show = true;
          player.thisExplode.bird = false;
          player.thisExplode.display();
          if (player.thisExplode.count == 4) {
              player.thisExplode.show = false;
              player.die();
              
          }
        }
        //checks each enemy for a collision with any of the bullets
        bullets.b.forEach(function(bull) {
          if (bull.collision(obj) 
            //to afunction multiple collisions with the same object, the first object with which 
            //the object collides is saved
            && (bull.alreadyTaken == null || bull.alreadyTaken.equals(obj))
            && (obj.thisHit == null || obj.thisHit.equals(bull))) {
            bull.alreadyTaken = obj;
            obj.thisHit = bull;
            //show the object exploding
            obj.thisExplode.x = obj.x;
            obj.thisExplode.y = obj.y;
            obj.thisExplode.show = true;
            obj.thisExplode.bird = (obj instanceof Bird);
            obj.thisExplode.display();
            //once the explosion is done, kill the object
            //and the bullet
            if (obj.thisExplode.count == 4) {
              obj.die();
              obj.thisExplode.show = false;
              bull.hit = true;
      
            }
          }
        })
        
      })
    }
  }

}


// -------------------------------------------------***EXPLOSION CLASS***-------------------------------------------------

//represents an explosion
function Explosion() {
  this.x; //x-coord
  this.y; //y-coord
  this.sprites = expSprites; //animation frames for the explosion
  this.counts = 0; //frame count
  this.show = false; //determines whether to show the explosion
  this.bird = false; //determines the dimensions of the explosion
  
  
  //displays the explosion
  this.display = function() {
    if (this.show) {
      if (this.bird) {
        //go through each frame at bird size
        image(this.sprites[this.counts], this.x, this.y, birdWidth * 2, birdHeight * 2);
        boom.play();
      }
      else {
        //go through each frame at plane size
        image(this.sprites[this.counts], this.x, this.y, planeWidth * 2, planeHeight * 2);
        boom.play();
      }
      this.counts++;
      //stops showing the explosion once it cylces through its frames
      if (this.counts == 5) {
        show = false;
        this.counts = 0;
        boom.stop();
        
      } 
    }
  }  
}


// -------------------------------------------------***DRAW***-------------------------------------------------

//draws the sketch
function draw() {
  clear(); //clear the screen each frame, to increase speed
  //random numbers to determine spawning
  bg.playbackRate = speed;
  var r = randNum(0, 4); 
  var r2 = randNum(0, countMax);
  image(bg, -550, 0, 1700, 800);
  imageMode(CENTER);
  if (state == -1) { //opening title
    title();
  }
  else if (state == 0) { //menu
    menu();
    loop1.stop();
    whatColor();
  }
  else if (state == 1) { //tutorial
    image(tutorial, width/2 - 75, height/2, 410, 610);
    player.display();
    bullets.displayAll();
    bullets.removeGone();
  }
  else if (state == 2) { // runs the game
    gameplay(r, r2);
    count++;
    timer++;
    if (timer%100 == 0) {
      countMax--; //increases the number of enemies after a certain amount of time
    }
    if (countMax <= 0 && state == 2) { //once the maximum amount of enemies has been reached, stop spawning
      stopSpawn = true;
      
    }
    if (enemies.f.length == 0 && state == 2 && countMax <= 0) { //once all enemies are gone, show the island
      is.show = true;
    }
    if (endGame) { //end the game
      bg.stop();
      addNewScore(); //add score to high scores (if it is high enough)
      state = 4;
    }
  }
  else if (state == 3) { //ends the game if the player loses
    gameOver();
  }
  else if (state == 4) { //ends the game if the player won
    gameWon();
  }
  imageMode(CORNER);
}


// -------------------------------------------------***PLANE CUSTOMIZATION***-------------------------------------------------

//chooses the plane color
function whatColor() {
  if (red) {
    myPlane = redPlane;
  }
  else if (blue) {
    myPlane = bluePlane;
  }
  else if (green) {
    myPlane = greenPlane;
  }
}


// -------------------------------------------------***KEY EVENTS***-------------------------------------------------

//handles key events 
function keyPressed() {
  if (key == 'b') { 
    //brings the user back to menu
    reset();
    main.play();
    state = 0;
  }
  else if (state == -1) { 
    //brings the user to the menu if they are on the opening screen
    state = 0;
  }
  else if (state == 0 && keyCode == ENTER) {
    //brings the user to the tutorial
    main.stop();
    loop1.play();
    state = 1;
  }
  else if (state == 1 && keyCode == RIGHT_ARROW) {
    //brings the user to the next page of the tutorial
    tutorial = t2;
  }
  else if (state == 1 && keyCode == LEFT_ARROW) {
    //brings the user to previous page of the tutorial
    tutorial = t1;
  }
  else if (state == 1 && keyCode == ENTER) {
    //starts the game
    click.stop();
    state = 2;

  }
  else if (state == 2 || state == 1) {
    //allows the user to fire bullets
    if (key == ' ' && bullets.b.length < 8) {
      bullets.fire();
    }
  }
  else if (state == 3) {
    //starts the game again
    reset();
    loop1.stop();
    state = 0;
  }
  else if (state == 4) {
    //starts the game again
    reset();
    loop1.stop();
    state = 0;
  }
  
}


// -------------------------------------------------***NON-GAMEPLAY SCREENS***-------------------------------------------------

//creates the title page
function title() {
  image(titleScreen, width/2, height/2);
}


//creates the tutorial
function tutorial() {

}

//creates the game over screen
function gameOver() {
  //displays scores and game won images
  textSize(30);
  textAlign(CENTER);
  imageMode(CENTER);
  text("YOUR SCORE: " + score, width/2, height/2 + 20);
  textSize(20);
  text("HIGH SCORES", width/2, height/2 + 40);
  for (var i = 0; i < lines.length; i++)
  {
    var num = i + 1;
    text(num + ". " + lines[i], width/2, height/2 + 70 + 20*i);
  }
  image(gameover, width/2, height/2);
}

//creates the game won screen
function gameWon() {
  //shows the final game pieces
  is.display(); 
  is.update();
  player.display();
  //displays scores and game won images
  textSize(30);
  textAlign(CENTER);
  imageMode(CENTER);
  text("YOUR SCORE: " + score, width/2, height/2 + 20);
  textSize(20);
  text("HIGH SCORES", width/2, height/2 + 40);
  for (var i = 0; i < lines.length; i++)
  {
    var num = i + 1;
    text(num + ". " + lines[i], width/2, height/2 + 70 + 20*i);
  }
  image(gamewon, width/2, height/2);
}


// -------------------------------------------------***GAMEPLAY***-------------------------------------------------


//creates the gameplay 
function gameplay(r, r2) {
  if (player.isDead) {
    //ends the game if the player has collided with something
    addNewScore();
    state = 3;
  }
  //spawns the enemies based on the generated random numbers
  else {
    if (r2 == 0 && !stopSpawn) {
      if (r == 1 && !noBirds) {
        enemies.spawn();
      }
      if (r == 0 && !noPlanes) {
        enemies.spawn2();
      }
      count = 0;
    }
    
    //displays, updates, and removes all game pieces accordingly
    is.display();
    is.update();
    player.display();
    bullets.displayAll();
    enemies.runEnemies();
    bullets.removeGone();
    enemies.removeGone();
    fill(0);
    textSize(24);
    text("SCORE: " + score, width - 150, height - 25);
  }
}

// -------------------------------------------------***RESET FUNCTIONALITY***-------------------------------------------------

//resets all game values
function reset() {
  player = new Player();
  enemies = new Enemies();
  bullets = new Bullets();
  is = new Island();
  score = 0;
  timer = 0; 
  planeWidth = 97;
  planeHeight = 67;
  birdWidth = 47;
  birdHeight = 32;
  countMax = 20; 
  count = 0;
  easing = 0.05;
  red1 = true;
  green1 = false;
  blue1 = false;
  noBirds = false;
  noPlanes = false;
  easy = true;
  med = false;
  hard = false;
  tutorial = t1;
  choseMenu = redMenu;
  endGame = false;
  stopSpawn = false;
 
}


// -------------------------------------------------***SAVING HIGH SCORES***-------------------------------------------------

var scores = [5];

//adds to the score list, or leaves it the same, depending on the score's amount
function addNewScore() {
  if(lines.length<5)
    {
      lines=append(lines,str(score)); //adds a score if there are less than 5
    }
    else
    {
      if(parseInt(lines[lines.length-1])<score)
      {
        lines[lines.length-1]=str(score);
        for(var i=lines.length-1; i>0; i--)
        {
          if(parseInt(lines[i])>parseInt(lines[i-1]))
          {
            var setScoreLower =lines[i-1];
            lines[i-1]=lines[i];
            lines[i]=setScoreLower;
          }
        }
      }
      scoreList="";
      for (var i = 0; i < lines.length; i++)
      {
        scoreList+=lines[i]+" ";
      }
      p.saveStrings("HighScores.txt",lines); //saves the scores
    }
 
    sort(lines); // sorts the scores in descending order
}


// -------------------------------------------------***MENU INTERFACE***-------------------------------------------------

//creates the menu screen based on user's customization
function menu() {
  if (easy) {
    if (!noBirds && !noPlanes) {
      image(choseMenu[0], width/2, height/2, 600, 800);
    }
    if (noBirds) {
      image(choseMenu[1], width/2, height/2, 600, 800);
    }
    if (noPlanes) {
      image(choseMenu[2], width/2, height/2, 600, 800);
    }
  }
  if (med) {
    if (!noBirds && !noPlanes) {
      image(choseMenu[3], width/2, height/2, 600, 800);
    }
    if (noBirds) {
      image(choseMenu[4], width/2, height/2, 600, 800);
    }
    if (noPlanes) {
      image(choseMenu[5], width/2, height/2, 600, 800);
    }
  }
  if (hard) {
    if (!noBirds && !noPlanes) {
      image(choseMenu[6], width/2, height/2, 600, 800);
    }
    if (noBirds) {
      image(choseMenu[7], width/2, height/2, 600, 800);
    }
    if (noPlanes) {
      image(choseMenu[8], width/2, height/2, 600, 800);
    }
  }
}


// -------------------------------------------------***MENU MOUSE EVENTS***-------------------------------------------------

//determines which options have been chosen by the user at the menu
function mousePressed() {
  if (state == 0) {
    if (redP.within(mouseX, mouseY)) {
      choseMenu = redMenu;
      red1 = true;
      green1 = false;
      blue1 = false;
      click.play();
    } else if (greenP.within(mouseX, mouseY)) {
      choseMenu = greenMenu;
      green1 = true;
      red1 = false;
      blue1 = false;
      click.play();
    } else if (blueP.within(mouseX, mouseY)) {
      choseMenu = blueMenu;
      blue1 = true; 
      red1 = false;
      green1 = false;
      click.play();
    } else if (easyB.within(mouseX, mouseY)) {
      easy = true;
      speed = 0.5;
      med = false;
      hard = false;
      click.play();
    } else if (medB.within(mouseX, mouseY)) {
      easy = false;
      speed = 0.8;
      med = true;
      hard = false;
      click.play();
    } else if (hardB.within(mouseX, mouseY)) {
      speed = 1.1;
      easy = false;
      med = false;
      hard = true;
      click.play();
    } else if (birdB.within(mouseX, mouseY) && !noBirds) {
      noBirds = true;
      noPlanes = false;
      click.play();
    } else if (birdB.within(mouseX, mouseY) && noBirds) {
      noBirds = false;
      click.play();
    } else if (planeB.within(mouseX, mouseY) && !noPlanes) {
      noBirds = false;
      noPlanes = true;
      click.play();
    } else if (planeB.within(mouseX, mouseY) && noPlanes) {
      noPlanes = false;
      click.play();
    }
  }
}




// -------------------------------------------------***ISLAND CLASS***-------------------------------------------------

//to represent the Island on the game won screen
function Island() {
  this.x = -300; //x coord
  this.y = 0; //y coord
  //determines whether the island should be shown
  this.show = false; 

  //shows the island
  this.display = function() {
    if (this.show) {
      imageMode(CORNER);
      image(island, this.x, 0);
      imageMode(CENTER);
    }
  }

  //updates the x coordinate of the island, ends the game if the island reaches its maximum x coord
  this.update = function() {
    if (this.show && this.x <= 0) {
      if (easy) {
        this.x = this.x + 2;
      } else if (med) {
        this.x = this.x + 4;
      } else if (hard) {
        this.x = this.x + 6;
      }
    } else if (this.show && this.x >= 0) {
      endGame = true;
    }
  }

}

