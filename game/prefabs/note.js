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
