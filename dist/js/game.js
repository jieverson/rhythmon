(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

//global variables
window.onload = function () {
  var game = new Phaser.Game(768, 1280, Phaser.AUTO, 'rhythmon');

  // Game States
  game.state.add('boot', require('./states/boot'));
  game.state.add('gameover', require('./states/gameover'));
  game.state.add('menu', require('./states/menu'));
  game.state.add('play', require('./states/play'));
  game.state.add('preload', require('./states/preload'));
  

  game.state.start('boot');
};
},{"./states/boot":8,"./states/gameover":9,"./states/menu":10,"./states/play":11,"./states/preload":12}],2:[function(require,module,exports){
'use strict';

var LifeMeter = function(game) {
  Phaser.Group.call(this, game);
  
  this.lifes = 5;

  for(var i = 0; i < this.lifes; i++){
  	var life = this.create(this.game.width - 60, (70 * (i + 1)), 'lifes');
  	life.anchor.setTo(0.5, 0.5);
  }
};

LifeMeter.prototype = Object.create(Phaser.Group.prototype);
LifeMeter.prototype.constructor = LifeMeter;

LifeMeter.prototype.update = function() {
  
  // write your prefab's specific update code here
  
};

LifeMeter.prototype.damage = function(){
  if(this.lifes > 0){
	this.lifes--;
	this.getAt(this.lifes).frame = 1;
  }
  else{
	this.game.state.start('gameover');
  }
};

module.exports = LifeMeter;

},{}],3:[function(require,module,exports){
'use strict';

var Ground = function(game, x, y, width, height) {  
  Phaser.TileSprite.call(this, game, x, y, width, height, 'ground');

  this.game.physics.arcade.enableBody(this);
  this.body.allowGravity = false;
  this.body.immovable = true;
};

Ground.prototype = Object.create(Phaser.TileSprite.prototype);
Ground.prototype.constructor = Ground;

Ground.prototype.update = function() {
  
  // write your prefab's specific update code here
  
};

module.exports = Ground;

},{}],4:[function(require,module,exports){
'use strict';

var Hit = function(game, x, y, message) {
  Phaser.BitmapText.call(this, game, x, y, 'customfont', message, 48);
	
  this.life = 20;
};

Hit.prototype = Object.create(Phaser.BitmapText.prototype);
Hit.prototype.constructor = Hit;

Hit.prototype.update = function() {
  this.position.y -= 5;

  if(this.life-- == 0){
	this.destroy();
  }
};

module.exports = Hit;

},{}],5:[function(require,module,exports){
'use strict';

var Miss = function(game, x, y) {
  Phaser.BitmapText.call(this, game, x, y, 'customfont', 'miss', 32);
	
  this.life = 20;
};

Miss.prototype = Object.create(Phaser.BitmapText.prototype);
Miss.prototype.constructor = Miss;

Miss.prototype.update = function() {
  this.position.y += 3;

  if(this.life-- == 0){
	this.destroy();
  }
};

module.exports = Miss;

},{}],6:[function(require,module,exports){
'use strict';

var Monster = function(game, x, y, sprite, frames_count1, frames_count2, frames_count3) {
  Phaser.Sprite.call(this, game, x, y, sprite);

  this.anchor.setTo(0.5, 0.5);

  var frames1 = Array.apply(null, {length: frames_count1}).map(function (empty, index) { return index; });
  this.animations.add('evolution1', frames1);

  var frames2 = Array.apply(null, {length: frames_count2}).map(function (empty, index) { return 15 + index; });
  this.animations.add('evolution2', frames2);

  var frames3 = Array.apply(null, {length: frames_count3}).map(function (empty, index) { return 30 + index; });
  this.animations.add('evolution3', frames3);

  this.animations.play('evolution1', 7, true);

  this.game.physics.arcade.enableBody(this);

  this.inputEnabled = true;
  this.input.useHandCursor = true;

  this.level = 0;
  this.evolution = 1;

  this.events.onInputDown.add(this.jump, this);
};

Monster.prototype = Object.create(Phaser.Sprite.prototype);
Monster.prototype.constructor = Monster;

Monster.prototype.update = function() {
  
};

Monster.prototype.jump = function() { 
  if(this.body.touching.down){
  	this.body.velocity.y = -200;
  }
};

Monster.prototype.checkIfShouldEvolve = function() { 
  return (this.level == 10 && this.evolution == 1) || (this.level == 20 && this.evolution == 2);
};

Monster.prototype.evolve = function() {
  this.evolution++;
  this.animations.play('evolution' + this.evolution, 7, true);
};

module.exports = Monster;

},{}],7:[function(require,module,exports){
'use strict';

var Note = function(game, x, y, noteType) {
  Phaser.Sprite.call(this, game, x, y, 'notes', noteType);
  this.sound = this.game.notesSounds[noteType];

  this.anchor.setTo(0.5, 0.5);
  
  this.game.physics.arcade.enableBody(this);
};

Note.prototype = Object.create(Phaser.Sprite.prototype);
Note.prototype.constructor = Note;

Note.prototype.update = function() {
  
  // write your prefab's specific update code here
  this.rotation -= 0.005;
};

module.exports = Note;

},{}],8:[function(require,module,exports){

'use strict';

function Boot() {
}

Boot.prototype = {
  preload: function() {
    this.load.image('preloader', 'assets/preloader.gif');
  },
  create: function() {
    this.game.input.maxPointers = 1;
    this.game.state.start('preload');
  }
};

module.exports = Boot;

},{}],9:[function(require,module,exports){

'use strict';
function GameOver() {}

GameOver.prototype = {
  preload: function () {

  },
  create: function () {
    var style = { font: '65px Arial', fill: '#ffffff', align: 'center'};
    this.titleText = this.game.add.text(this.game.world.centerX,100, 'Game Over!', style);
    this.titleText.anchor.setTo(0.5, 0.5);

    this.congratsText = this.game.add.text(this.game.world.centerX, 200, 'You Win!', { font: '32px Arial', fill: '#ffffff', align: 'center'});
    this.congratsText.anchor.setTo(0.5, 0.5);

    this.instructionText = this.game.add.text(this.game.world.centerX, 300, 'Click To Play Again', { font: '16px Arial', fill: '#ffffff', align: 'center'});
    this.instructionText.anchor.setTo(0.5, 0.5);
  },
  update: function () {
    if(this.game.input.activePointer.justPressed()) {
      this.game.state.start('play');
    }
  }
};
module.exports = GameOver;

},{}],10:[function(require,module,exports){

'use strict';
function Menu() {}

Menu.prototype = {
  preload: function() {

  },
  create: function() {
    var style = { font: '65px Arial', fill: '#ffffff', align: 'center'};
    this.sprite = this.game.add.sprite(this.game.world.centerX, 138, 'yeoman');
    this.sprite.anchor.setTo(0.5, 0.5);

    this.titleText = this.game.add.text(this.game.world.centerX, 300, '\'Allo, \'Allo!', style);
    this.titleText.anchor.setTo(0.5, 0.5);

    this.instructionsText = this.game.add.text(this.game.world.centerX, 400, 'Click anywhere to play "Click The Yeoman Logo"', { font: '16px Arial', fill: '#ffffff', align: 'center'});
    this.instructionsText.anchor.setTo(0.5, 0.5);

    this.sprite.angle = -20;
    this.game.add.tween(this.sprite).to({angle: 20}, 1000, Phaser.Easing.Linear.NONE, true, 0, 1000, true);
  },
  update: function() {
    if(this.game.input.activePointer.justPressed()) {
      this.game.state.start('play');
    }
  }
};

module.exports = Menu;

},{}],11:[function(require,module,exports){

  'use strict';
  var Monster = require('../prefabs/monster');
  var Note = require('../prefabs/note');
  var LifeMeter = require('../prefabs/LifeMeter');
  var Ground = require('../prefabs/ground');
  var Hit = require('../prefabs/hit');
  var Miss = require('../prefabs/miss');

  function Play() {}
  Play.prototype = {
    create: function() {
      this.game.physics.startSystem(Phaser.Physics.ARCADE);
      this.game.physics.arcade.gravity.y = 1200;
      
      this.game.stage.backgroundColor = '#009999';
      this.background = this.game.add.sprite(0,0,'background');
      this.background.scale.setTo(2.3, 2.3);
      this.background.anchor.setTo(0.5, 0.5);
      this.background.x = this.game.width/2;
      this.background.y = this.game.height/2;
      var bgFilter = new PIXI.PixelateFilter();
      bgFilter.size.x = bgFilter.size.y = 10;
      this.background.filters = [bgFilter];
      
      this.notes = this.game.add.group();
      this.monsters = this.game.add.group();
      this.ground = new Ground(this.game, 0, this.game.height - 100, this.game.width, 100);
      this.game.add.existing(this.ground);

      this.monsters.add(new Monster(this.game, this.game.width / 5, this.game.height - 200, 'monster1', 12, 15, 11));
      this.monsters.add(new Monster(this.game, this.game.width / 2, this.game.height - 200, 'monster2', 13, 13, 9));
      this.monsters.add(new Monster(this.game, this.game.width - this.game.width / 5, this.game.height - 200, 'monster3', 13, 10, 14));

      this.texts = this.game.add.group();

      this.lifes = new LifeMeter(this.game);

      this.score = 0;
      this.scoreText = this.game.add.bitmapText(this.game.width/2, 10, 'customfont',this.score.toString(), 64);

      this.game.notesSounds = [
        this.game.add.audio('note1'),
        this.game.add.audio('note2'),
        this.game.add.audio('note3'),
        this.game.add.audio('note4'),
        this.game.add.audio('note5'),
        this.game.add.audio('note6'),
        this.game.add.audio('note7')
      ];
      this.missSound = this.game.add.audio('miss');
      this.theme = this.game.add.audio('theme');
      this.theme.loop = true;
      this.theme.play();

      this.musicGenerator = this.game.time.events.loop(Phaser.Timer.SECOND * 0.1, this.generateNote, this);
      this.musicGenerator.timer.start();
    },

    update: function() {
      this.background.rotation -= 0.005;
      this.game.physics.arcade.collide(this.monsters, this.ground);
      this.game.physics.arcade.collide(this.monsters, this.notes, null, this.hitNote, this);
      this.game.physics.arcade.collide(this.notes, this.ground, null, this.missNote, this);
    },

    generateNote: function() {
      if(!this.generateNoteAux){
        if(this.score < 20)
          this.generateNoteAux = this.game.rnd.pick([5, 10, 15, 20]);
        else if(this.score < 50)
          this.generateNoteAux = this.game.rnd.pick([2, 5, 5, 5, 10, 10, 10, 10, 15, 15, 20]);
        else if(this.score < 100)
          this.generateNoteAux = this.game.rnd.pick([2, 2, 5, 5, 5, 5, 5, 10, 10, 10, 15]);
        else if(this.score < 200)
          this.generateNoteAux = this.game.rnd.pick([2, 5, 5, 5, 10]);
        else
          this.generateNoteAux = this.game.rnd.pick([2, 5]);
      };
      this.generateNoteAux--;
      if(this.generateNoteAux == 0){
        this.generateNoteAux = null;
        var x = this.game.rnd.pick([this.game.width / 5, this.game.width / 2, this.game.width - this.game.width / 5]);
        this.notes.add(new Note(this.game, x, 0, this.game.rnd.integerInRange(0,6)));
      }
    },

    hitNote: function(monster, note){
      if(!monster.body.touching.down){
        note.sound.play();

        this.score += monster.evolution;
        this.texts.add(new Hit(this.game, note.position.x - 25, note.position.y + 100, 'x' + monster.evolution));
        this.scoreText.setText(this.score.toString());
       
        note.destroy();

        monster.level++;
        if(monster.checkIfShouldEvolve()){
          monster.evolve();
          this.texts.add(new Hit(this.game, note.position.x - 50, note.position.y + 200, 'evolve'));
        }
      }

      return false;
    },

    missNote: function(ground, note){
      this.missSound.play();
      note.destroy();
      this.texts.add(new Miss(this.game, note.position.x - 50, note.position.y - 50));
      this.lifes.damage();

      for(var i = 0; i < 3; i++){
        var monster = this.monsters.getAt(i);
        if(monster.position.x == note.position.x)
        {
          monster.level = 0;
        }
      }

      return false;
    },

    shutdown: function() {      
      this.theme.stop();
    }
  };
  
  module.exports = Play;
},{"../prefabs/LifeMeter":2,"../prefabs/ground":3,"../prefabs/hit":4,"../prefabs/miss":5,"../prefabs/monster":6,"../prefabs/note":7}],12:[function(require,module,exports){

'use strict';
function Preload() {
  this.asset = null;
  this.ready = false;
}

Preload.prototype = {
  preload: function() {
    this.asset = this.add.sprite(this.width/2,this.height/2, 'preloader');
    this.asset.anchor.setTo(0.5, 0.5);
    this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
    this.load.setPreloadSprite(this.asset);

    this.game.load.script('abstracFilter', 'js/filters/AbstractFilter.js');
    this.game.load.script('pixalate', 'js/filters/PixelateFilter.js');

    this.load.spritesheet('monster1', 'assets/sprites/monster1.png', 200, 200, 45);
    this.load.spritesheet('monster2', 'assets/sprites/monster2.png', 200, 200, 45);
    this.load.spritesheet('monster3', 'assets/sprites/monster3.png', 200, 200, 45);
    this.load.spritesheet('notes', 'assets/sprites/notes.png', 64, 64, 25);
    this.load.spritesheet('lifes', 'assets/sprites/lifes.png', 64, 64, 2);

    this.load.image('background', 'assets/images/background.jpg');
    this.load.image('ground', 'assets/images/ground.jpg');

    this.load.audio('note1', 'assets/sounds/BeatVoidTone_1.mp3');
    this.load.audio('note2', 'assets/sounds/BeatVoidTone_2.mp3');
    this.load.audio('note3', 'assets/sounds/BeatVoidTone_3.mp3');
    this.load.audio('note4', 'assets/sounds/BeatVoidTone_4.mp3');
    this.load.audio('note5', 'assets/sounds/BeatVoidTone_5.mp3');
    this.load.audio('note6', 'assets/sounds/BeatVoidTone_6.mp3');
    this.load.audio('note7', 'assets/sounds/BeatVoidTone_7.mp3');
    this.load.audio('miss', 'assets/sounds/BeatMiss.mp3');

    this.load.audio('theme', 'assets/musics/Main_Theme_01.mp3');

    this.load.bitmapFont('customfont', 'assets/fonts/flappyfont.png', 'assets/fonts/flappyfont.fnt');

    this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.game.scale.setScreenSize();
    this.game.scale.refresh();
  },
  create: function() {
    this.asset.cropEnabled = false;
  },
  update: function() {
    if(!!this.ready) {
      this.game.state.start('play');
    }
  },
  onLoadComplete: function() {
    this.ready = true;
  }
};

module.exports = Preload;

},{}]},{},[1])