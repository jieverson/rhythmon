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
