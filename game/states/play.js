
  'use strict';
  var Monster = require('../prefabs/monster');
  var Note = require('../prefabs/note');
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

      this.monsters.add(new Monster(this.game, this.game.width/4, this.game.height - 200, 'monster1'));
      this.monsters.add(new Monster(this.game, this.game.width/2, this.game.height - 200, 'monster2'));
      this.monsters.add(new Monster(this.game, this.game.width/4 + this.game.width/2, this.game.height - 200, 'monster3'));

      this.texts = this.game.add.group();

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
          this.generateNoteAux = this.game.rnd.pick([5, 5, 10, 10, 15, 20]);
        else if(this.score < 50)
          this.generateNoteAux = this.game.rnd.pick([2, 5, 5, 5, 10, 10, 15]);
        else if(this.score < 100)
          this.generateNoteAux = this.game.rnd.pick([2, 2, 5, 5, 5, 10]);
        else
          this.generateNoteAux = this.game.rnd.pick([2, 5]);
      };
      this.generateNoteAux--;
      if(this.generateNoteAux == 0){
        this.generateNoteAux = null;
        var x = this.game.rnd.pick([this.game.width/4, this.game.width/2, this.game.width/4 + this.game.width/2]);
        this.notes.add(new Note(this.game, x, 0));
      }
    },
    hitNote: function(monster, note){
      if(!monster.body.touching.down){
        note.sound.play();

        if(monster.chain > monster.chainValue){
          this.score += 3;
          this.texts.add(new Hit(this.game, note.position.x - 25, note.position.y + 100, '3x'));
        }
        else{
          this.score += 1;
          this.texts.add(new Hit(this.game, note.position.x - 25, note.position.y + 100, 'hit'));
        }
        this.scoreText.setText(this.score.toString());

        note.destroy();

        monster.chain += 1;
        if(monster.chain == monster.chainValue){
          var filter = new PIXI.PixelateFilter();
          filter.size.x = filter.size.y = 10;
          monster.filters = [filter];
          this.texts.add(new Hit(this.game, note.position.x - 50, note.position.y + 200, 'chain'));
        }
      }

      return false;
    },
    missNote: function(ground, note){
      this.missSound.play();
      note.destroy();
      this.texts.add(new Miss(this.game, note.position.x - 50, note.position.y - 50));

      for(var i = 0; i < 3; i++){
        var monster = this.monsters.getAt(i);
        if(monster.position.x == note.position.x)
        {
          monster.chain = 0;
          monster.filters = null;
        }
      }

      return false;
    }
  };
  
  module.exports = Play;