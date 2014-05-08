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
