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
