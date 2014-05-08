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
