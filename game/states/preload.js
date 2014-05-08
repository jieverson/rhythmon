
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
