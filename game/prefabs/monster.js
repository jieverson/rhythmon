'use strict';

var Monster = function(game, x, y, sprite) {
  Phaser.Sprite.call(this, game, x, y, sprite);

  this.anchor.setTo(0.5, 0.5);

  this.animations.add('default', [0, 1, 2, 3]);
  this.animations.play('default', 12, true);

  this.game.physics.arcade.enableBody(this);

  this.inputEnabled = true;
  this.input.useHandCursor = true;

  this.chain = 0;
  this.chainValue = 10;

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

module.exports = Monster;
