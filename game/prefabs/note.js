'use strict';

var Note = function(game, x, y, frame) {
  Phaser.Sprite.call(this, game, x, y, 'note', frame);
  this.randomSetUp();

  this.anchor.setTo(0.5, 0.5);
  
  this.game.physics.arcade.enableBody(this);
};

Note.prototype = Object.create(Phaser.Sprite.prototype);
Note.prototype.constructor = Note;

Note.prototype.update = function() {
  
  // write your prefab's specific update code here
  
};

Note.prototype.randomSetUp = function(){
	this.sound = this.game.rnd.pick(this.game.notesSounds);
};

module.exports = Note;
