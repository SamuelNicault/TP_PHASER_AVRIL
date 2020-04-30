class Scene3 extends Phaser.Scene {
  constructor() {
    super("Falaise");
  }

  init(data){
    this.player;
    this.cursors;
    this.groupeBullets;
    this.tir = 2;
    this.pointDeVie;
    this.pointVie;
    this.cooldown = 0;
    this.choix = 1;

    this.choixText;
    this.scoreText;
    this.gameOverText;
    this.aideText;
    this.pushText;
    this.attakText;
    this.aguyText;
    this.fouilleText;
    this.aguypasseText;

    this.fleches;
    this.fioles;
    this.bombs;
    this.coins;
    this.fishs;
    this.grenadePic;
    this.poissonPic;
    this.bottlePic;
    this.arrowPic;

    this.score = data.score;
    this.vie = data.vie;
    this.grenade = data.grenade;
    this.poisson = data.poisson;
    this.bottle = data.bottle;
    this.arrow = data.arrow;

    this.c;
    this.v;
    this.s;
  }//Fin Init

  preload(){
      this.load.image('porteouverte', 'assets/objets/porte_ouverte.png');
      this.load.image('platform', 'assets/monde/Royman_platform.png');
      this.load.image('porteferme', 'assets/objets/porte_ferme.png');
      this.load.image('cible', 'assets/objets/neigeadrop.png');
      this.load.image('chateau','assets/monde/chateau.png');
      this.load.image('level3','assets/monde/level3.png');
      this.load.image('info','assets/objets/panneau.png');
      this.load.image('background','assets/monde/neige.png');


      this.load.spritesheet('perso','assets/personnages/Inuit_saut.png', {frameWidth: 20, frameHeight: 28});
      this.load.spritesheet('dos','assets/personnages/Inuit_saut_dos.png', {frameWidth: 20, frameHeight: 28});
      this.load.spritesheet('attaque','assets/personnages/Inuit_attak.png', {frameWidth: 32.1, frameHeight: 28});
      this.load.spritesheet('droite','assets/personnages/Inuit_saut_droite.png', {frameWidth: 20, frameHeight: 28});
      this.load.spritesheet('gauche','assets/personnages/Inuit_saut_gauche.png', {frameWidth: 20, frameHeight: 28});
      this.load.spritesheet('bonhomme','assets/personnages/Bonomnej_saut.png', {frameWidth: 21.7, frameHeight: 28});
      this.load.spritesheet('bonhommeAttak','assets/personnages/Bonomnej_attak.png', {frameWidth: 21.7, frameHeight: 28});
      this.load.spritesheet('mortBonhomme','assets/personnages/Bonomnej_mort.png', {frameWidth: 21.7, frameHeight: 28});
      this.load.spritesheet('cube','assets/personnages/cube_saut.png', {frameWidth: 26.45, frameHeight: 28});
      this.load.spritesheet('cubeAttak','assets/personnages/cube_attak.png', {frameWidth: 26.45, frameHeight: 28});
      this.load.spritesheet('mortCube','assets/personnages/cube_mort.png', {frameWidth: 26.45, frameHeight: 28});
      this.load.spritesheet('aguy','assets/personnages/aguy.png', {frameWidth: 20, frameHeight: 28});
      this.load.spritesheet('explosion','assets/objets/explosion.png', {frameWidth: 60, frameHeight: 58});

      this.load.image('vie_3','assets/objets/vie_3.png');
      this.load.image('vie_2','assets/objets/vie_2.png');
      this.load.image('vie_1','assets/objets/vie_1.png');
      this.load.image('grenadePic', 'assets/objets/bomb.png');
      this.load.image('poissonPic', 'assets/objets/fish.png');
      this.load.image('bottlePic', 'assets/objets/fiole.png');
      this.load.image('arrowPic', 'assets/objets/fleche.png');
      this.load.image('bullet', 'assets/objets/fleches_loot.png');

      this.load.image('coin', 'assets/objets/flocoin.png');
      this.load.image('bomb', 'assets/objets/bomb_loot.png');
      this.load.image('fish', 'assets/objets/fish_loot.png');
      this.load.image('fiole', 'assets/objets/fiole_loot.png');
      this.load.image('fleche', 'assets/objets/fleches_loot.png');
  }//Fin Preload

  create(){

          //Data
      //this.score = 0;
      //this.vie = 3;
      //this.grenade = 0;
      //this.poisson = 0;
      //this.bottle = 0;
      //this.arrow = 0;

          //Récupération des curseurs
      this.keys = this.input.keyboard.addKeys('A, ENTER, R, O');
      this.s = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
      this.c = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);
      this.v = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.V);
      this.cursors = this.input.keyboard.createCursorKeys();


    		   //Monde
      this.physics.world.setBounds(0, 0, 1600, 600);
    	this.add.image(0,0,'background').setOrigin(0,0);
      this.add.image(1400,20,'info');

    	this.barrières = this.physics.add.staticGroup();
      this.barrières.create(1110,122, 'platform').setScale(20,4.8).refreshBody();
    	this.barrières.create(496,400, 'platform').setScale(20,4.8).refreshBody();
      this.barrières.create(1548,400, 'platform').setScale(1,15).refreshBody();
    	this.barrières.create(54,240, 'platform').setScale(1,15).refreshBody();
      this.barrières.setAlpha(0);

      this.porte = this.physics.add.sprite(1478,328,'porteferme');
      this.porte.setImmovable(true);
      this.porteouverte = this.physics.add.staticGroup();
      this.porteouverte.create(1493,319,'porteouverte').setScale(1.3).refreshBody().setAlpha(0);


          //Sac
      this.grenadePic = this.add.image(200,70,'grenadePic').setScrollFactor(0, 0).setAlpha(0);
      this.poissonPic = this.add.image(200,70,'poissonPic').setScrollFactor(0, 0).setAlpha(0);
      this.bottlePic = this.add.image(200,70,'bottlePic').setScrollFactor(0, 0).setAlpha(0);
      this.arrowPic = this.add.image(200,70,'arrowPic').setScrollFactor(0, 0).setAlpha(0);


  		     //Player 1
      this.player = this.physics.add.sprite(1600,0,'perso');
  		this.player.setCollideWorldBounds(true);
  		this.player.body.setGravityY(0);

          //Cameras
      this.cameras.main.startFollow(this.player);
      this.cameras.main.setBounds(0, 0, 1600, 600);


      this.add.image(72,506,'chateau');
      this.door = this.physics.add.staticGroup();
      this.door.create(72,506,'chateau');
      this.door.setAlpha(0)

          //Monstres et Boites
      this.vieux = this.physics.add.sprite(1450,300,'aguy');


      this.cibles = this.physics.add.group({
        key: 'cible',
        repeat: 15,
        setXY: { x: 130, y: 0, stepX: 110 }
      });

      this.cibles.children.iterate(function (cible) {
        cible.pointsVie=1;
        cible.y = (Phaser.Math.Between(210,260));
      });


      this.cubes = this.physics.add.group({
        key: 'cube',
        repeat: 5,
        setXY: { x: 200, y: 0, stepX: 200 }
      });
      this.cubes.children.iterate(function (cube) {
        cube.pointVie=1;
        cube.y = (Phaser.Math.Between(200,270));
      });


      this.bonhommes = this.physics.add.group({
        key: 'bonhomme',
        repeat: 5,
        setXY: { x: 300, y: 0, stepX: 180 }
      });
      this.bonhommes.children.iterate(function (bonhomme) {
        bonhomme.pointDeVie=1;
        bonhomme.y = (Phaser.Math.Between(210,260));
      });

      this.explosions = this.physics.add.group({
    		key: 'explosion',
    		repeat: 0,
    		setXY: {x: 12, y: 1, stepX: 70}
    	});

      this.explosions.children.iterate(function (explosion) {
          explosion.setGravityY(-300);
      });


          //Objets
      this.groupeBullets = this.physics.add.group();

      this.coins = this.physics.add.group({
    		key: 'coin',
    		repeat: 0,
    		setXY: {x: 12, y: 1, stepX: 70}
    	});
      this.coins.children.iterate(function (coin) {
          coin.setGravityY(-300);
          coin.setBounce(0);
      });


      this.bombs = this.physics.add.group({
    		key: 'bomb',
    		repeat: 0,
    		setXY: {x: 12, y: 1, stepX: 70}
    	});
      this.bombs.children.iterate(function (bomb) {
        bomb.setGravityY(-300);
        bomb.setBounce(0);
      });


      this.fishs = this.physics.add.group({
    		key: 'fish',
    		repeat: 0,
    		setXY: {x: 12, y: 1, stepX: 70}
    	});
      this.fishs.children.iterate(function (fish) {
        fish.setGravityY(-300);
        fish.setBounce(0);
      });


      this.fleches = this.physics.add.group({
    		key: 'fleche',
    		repeat: 0,
    		setXY: {x: 12, y: 1, stepX: 70}
    	});
      this.fleches.children.iterate(function (fleche) {
        fleche.setGravityY(-300);
        fleche.setBounce(0);
      });


      this.fioles = this.physics.add.group({
    		key: 'fiole',
    		repeat: 0,
    		setXY: {x: 12, y: 1, stepX: 70}
    	});
      this.fioles.children.iterate(function (fiole) {
        fiole.setGravityY(-300);
        fiole.setBounce(0);
      });


  		    //Textes
      this.choixText =this.add.text(25,200, 'Choix: '+ (this.choix), {'font': '14px', fill: '#000'});
      this.choixText.setScrollFactor(0, 0);

      this.pushText = this.add.text(1200, 2, "Maintient O pour intéragir", {'font': '14px', fill: '#000'});
      this.pushText.visible = true;

      this.scoreText = this.add.text(25,120,('Money:' + this.score) +  '   F' + this.poisson + '   B' + this.bottle + '   G' + this.grenade + '   A' + this.arrow, {fontsize: '32px', fill: '#000000'});
      this.scoreText.setScrollFactor(0, 0);

      this.gameOverText = this.add.text(400, 300, "GAME OVER MAN", {fontsize: '128px', fill: '#000'}).setScrollFactor(0, 0);
      this.gameOverText.visible = false;

      this.aguypasseText = this.add.text(1300, 260, "     Okay, okay.\nVa chercher le trésor", {'font': '14px', fill: '#000'});
      this.aguypasseText.visible = false;

      this.fouilleText = this.add.text(1000, 2, "Utilise ta pelle avec R\nFouille ces \ntas de neige bleue", {'font': '14px', fill: '#000'});
      this.fouilleText.visible = false;

      this.attackText = this.add.text(800, 2, "Utilise ta pelle avec R\nFracasse ces cubes et \nces bonhommes de neige", {'font': '14px', fill: '#000'});
      this.attackText.visible = false;

      this.aguyText = this.add.text(1000, 294, "Désolé mon pote, t'es trop pauvre\nEn plus il reste des gelés dans la zone", {'font': '14px', fill: '#000'});
      this.aguyText.visible = false;

      this.aideText = this.add.text(1200, 2, "La légende dis qu'un trésor\nest caché dans le vieux\nchâteau en bas des deux falaises", {'font': '14px', fill: '#000'});
      this.aideText.visible = false;

          //Animations
      this.anims.create({
        key: 'cubeIdle',
        frames: this.anims.generateFrameNumbers('cube', {start: 0, end: 7}),
        frameRate: 4,
        repeat: -1
      });

      this.anims.create({
        key: 'dos',
        frames: this.anims.generateFrameNumbers('dos', {start: 0, end: 12}),
        frameRate: 8,
        repeat: -1
      });

      this.anims.create({
        key: 'still',
        frames: this.anims.generateFrameNumbers('aguy', {start: 0, end: 4}),
        frameRate: 4,
        repeat: -1
      });

      this.anims.create({
        key: 'idle',
        frames: this.anims.generateFrameNumbers('perso', {start: 0, end: 2}),
        frameRate: 3,
        repeat: -1
      });

      this.anims.create({
        key: 'face',
        frames: this.anims.generateFrameNumbers('perso', {start: 0, end: 12}),
        frameRate: 8,
        repeat: -1
      });

      this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('gauche', {start: 0, end: 12}),
        frameRate: 8,
        repeat: -1
      });

      this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('droite', {start: 0, end: 12}),
        frameRate: 8,
        repeat: -1
      });

      this.anims.create({
        key: 'bonhomeIdle',
        frames: this.anims.generateFrameNumbers('bonhomme', {start: 0, end: 8}),
        frameRate: 4,
        repeat: -1
      });

      this.anims.create({
        key: 'attack',
        frames: this.anims.generateFrameNumbers('attaque', {start: 0, end: 8}),
        frameRate: 8,
        repeat: -1
      });

      //this.anims.create({
      //	key: 'mortCube',
      //	frames: this.anims.generateFrameNumbers('mortCube', {start: 0, end: 7}),
      //	frameRate: 8,
      //	repeat: -1
      //});

      //this.anims.create({
      //	key: 'mortBonhomme',
      //	frames: this.anims.generateFrameNumbers('mortBonhomme', {start: 0, end: 6}),
      //	frameRate: 8,
      //	repeat: -1
      //});

      this.anims.create({
        key: 'cubeAttak',
        frames: this.anims.generateFrameNumbers('cubeAttak', {start: 0, end: 7}),
        frameRate: 8,
        repeat: 0
      });

      this.anims.create({
        key: 'bonhommeAttak',
        frames: this.anims.generateFrameNumbers('bonhommeAttak', {start: 0, end: 6}),
        frameRate: 8,
        repeat: 0
      });

      this.anims.create({
    		key: 'explode',
    		frames: this.anims.generateFrameNumbers('explosion', {start: 1, end: 11}),
    		frameRate: 8,
    		repeat: 0
    	});

          //Colliders et Overlaps
      this.physics.add.collider(this.player,this.barrières);
      this.physics.add.collider(this.player,this.porte);
      this.physics.add.collider(this.player,this.porteouverte);
      this.physics.add.overlap(this.player, this.cibles, hit, null,this);
      this.physics.add.overlap(this.player,this.cubes, hitcube, null, this);
      this.physics.add.overlap(this.player,this.door, fadeLevel, null, this);
      this.physics.add.overlap(this.coins, this.player, collectCoins, null, this);
      this.physics.add.overlap(this.bombs, this.player, collectBombs, null, this);
      this.physics.add.overlap(this.fishs, this.player, collectFishs, null, this);
      this.physics.add.overlap(this.fioles, this.player, collectFioles, null, this);
      this.physics.add.overlap(this.player,this.bonhommes, hitbonhomme, null, this);
      this.physics.add.overlap(this.fleches, this.player, collectFleches, null, this);
      this.physics.add.collider(this.explosions, this.bonhomme, explodeBonhomme, null, this);
      this.physics.add.collider(this.explosions, this.cube, explodeCube, null, this);
      this.physics.add.collider(this.groupeBullets, this.bonhomme, destroyB, null,this);
      this.physics.add.collider(this.groupeBullets, this.cube, destroyC, null, this);


          //Fonctions
      function destroyC(bullet, cube){
        bullet.destroy(true);
      }

      function destroyB(bullet, bonhommes){
        bullet.destroy(true);
      }

    	function fadeLevel(player, door) {
        if(this.keys.O.isDown){
          this.cameras.main.once('camerafadeoutcomplete', function (camera) {
            this.add.image(400, 300, 'level3');
            camera.fadeIn(3000);
          }, this);
          this.cameras.main.fadeOut(3000);
      		this.timedEvent = this.time.delayedCall(9000, changeLevel, [], this);
        }
    	}

    	function changeLevel () {
    		console.log('change de level');
    		this.scene.start('Chateau', {vie : this.vie, score : this.score, grenade : this.grenade, poisson : this.poisson, bottle : this.bottle, arrow : this.arrow});
    	}

      function collectCoins(player, coin){
    		coin.disableBody(true,true);
    		this.score += 10;
    		this.scoreText.setText('Money: '+ this.score);
    	}

      function collectFleches(player, fleche){
    		fleche.disableBody(true,true);
        this.arrow ++;
        this.scoreText.setText('Money:' + this.score +  '   F' + this.poisson + '   B' + this.bottle + '   G' + this.grenade + '   A' + this.arrow);
    	}

      function collectFioles(player, fiole){
    		fiole.disableBody(true,true);
        this.bottle ++;
        this.scoreText.setText('Money:' + this.score +  '   F' + this.poisson + '   B' + this.bottle + '   G' + this.grenade + '   A' + this.arrow);
    	}

      function collectBombs(player, bomb){
    		bomb.disableBody(true,true);
        this.grenade ++;
        this.scoreText.setText('Money:' + this.score +  '   F' + this.poisson + '   B' + this.bottle + '   G' + this.grenade + '   A' + this.arrow);
    	}

      function collectFishs(player, fish){
    		fish.disableBody(true,true);
        if(this.vie < 3){
          this.vie ++;
        }
        else{
          this.poisson++;
          this.scoreText.setText('Money:' + this.score +  '   F' + this.poisson + '   B' + this.bottle + '   G' + this.grenade + '   A' + this.arrow);
        }
    	}


      function hit (player, cible) {
        if(this.keys.R.isDown){
          cible.pointsVie--;
      		 if (cible.pointsVie==0) {
      			 cible.destroy();
            this.value = Phaser.Math.Between(1, 4);

            if(this.value == 3){
              this.fish = this.fishs.create(this.player.x+40, this.player.y, 'fish');
            }

            if(this.value == 4){
              this.bomb = this.bombs.create(this.player.x+40, this.player.y, 'bomb');
            }

      		 }
        }
      }

      function explodeCube (cube, explosion) {
          cube.pointDeVie--;
      		 if (cube.pointDeVie==0) {
      		     cube.destroy();
               this.value = Phaser.Math.Between(1, 5);
               if(this.value == 1){
                 this.fiole = this.fioles.create(this.player.x+40, this.player.y, 'fiole');
               }

               if(this.value == 2){
                 this.fleche = this.fleches.create(this.player.x+40, this.player.y, 'fleche');
               }

               if(this.value == 3){
                 this.fish = this.fishs.create(this.player.x+40, this.player.y, 'fish');
               }

               if(this.value == 4){
                 this.bomb = this.bombs.create(this.player.x+40, this.player.y, 'bomb');
               }

               if(this.value == 5){
                 this.coin = this.coins.create(this.player.x+40, this.player.y, 'coin');
               }

      		 }
        }


      function explodeBonhomme (bonhomme, explosion) {
          bonhomme.pointVie--;
      		 if (bonhomme.pointVie==0) {
      			 bonhomme.destroy();
            this.value = Phaser.Math.Between(1, 5);
            if(this.value == 1){
              this.fiole = this.fioles.create(this.player.x+40, this.player.y, 'fiole');
            }

            if(this.value == 2){
              this.fleche = this.fleches.create(this.player.x+40, this.player.y, 'fleche');
            }

            if(this.value == 3){
              this.fish = this.fishs.create(this.player.x+40, this.player.y, 'fish');
            }

            if(this.value == 4){
              this.bomb = this.bombs.create(this.player.x+40, this.player.y, 'bomb');
            }

            if(this.value == 5){
              this.coin = this.coins.create(this.player.x+40, this.player.y, 'coin');
            }

      		 }
        }


      function hitbonhomme (player, bonhomme) {
        //this.bonhomme.anims.play('bonhommeAttak', true);
        if(this.keys.R.isDown){
          bonhomme.pointDeVie--;
      		 if (bonhomme.pointDeVie==0) {
            //this.bonhomme.anims.play('mortBonhomme', true);
            bonhomme.destroy(true,true);
      			this.score += 20;
      			this.scoreText.setText('Money: '+ this.score);
            this.value = Phaser.Math.Between(1, 10);
            if(this.value == 1){
              this.fiole = this.fioles.create(this.player.x+40, this.player.y, 'fiole');
            }

            if(this.value == 2){
              this.fleche = this.fleches.create(this.player.x+40, this.player.y, 'fleche');
            }

            if(this.value == 3){
              this.fish = this.fishs.create(this.player.x+40, this.player.y, 'fish');
            }

            if(this.value == 4){
              this.bomb = this.bombs.create(this.player.x+40, this.player.y, 'bomb');
            }

            if(this.value <= 7 && this.value >= 5){
              this.coin = this.coins.create(this.player.x+40, this.player.y, 'coin');
            }

      		 }
        }

        else if(this.cooldown == 0){
          this.cooldown = 1;

          if(this.vie==1){
            this.vie --;
          }

          if(this.vie==3){
            this.vie --;
          }

          else if(this.vie==2){
            this.vie --;
          }


        }

        if(this.vie==3){
          this.timedEvent = this.time.delayedCall(0, coolDown, [], this);
        }
        else if(this.vie==2){
          this.timedEvent = this.time.delayedCall(6000, coolDown, [], this);
        }
        else if(this.vie==1){
          this.timedEvent = this.time.delayedCall(6000, coolDown, [], this);
        }
      }

      function coolDown () {
        this.cooldown = 0;
      }



      function hitcube (player, cube) {
        //this.cube.anims.play('cubeAttak', true);
        if(this.keys.R.isDown){
          cube.pointVie--;
      		 if (cube.pointVie==0) {
            //this.cube.anims.play('mortCube', true);
            this.anims
            cube.destroy(true,true);
      			this.score += 10;
      			this.scoreText.setText('Money: '+ this.score);
            this.value = Phaser.Math.Between(1, 5);

            if(this.value == 1){
              this.fiole = this.fioles.create(this.player.x+40, this.player.y, 'fiole');
            }

            if(this.value == 2){
              this.fleche = this.fleches.create(this.player.x+40, this.player.y, 'fleche');
            }

            if(this.value == 3){
              this.fish = this.fishs.create(this.player.x+40, this.player.y, 'fish');
            }

            if(this.value == 4){
              this.bomb = this.bombs.create(this.player.x+40, this.player.y, 'bomb');
            }

            if(this.value == 5){
              this.coin = this.coins.create(this.player.x+40, this.player.y, 'coin');
            }

      		 }
        }

        else if(this.cooldown == 0){
          this.cooldown = 1;

          if(this.vie==1){
            this.vie --;
          }

          if(this.vie==3){
            this.vie --;
          }

          else if(this.vie==2){
            this.vie --;
          }


        }

        if(this.vie==3){
          this.timedEvent = this.time.delayedCall(0, coolDown, [], this);
        }
        else if(this.vie==2){
          this.timedEvent = this.time.delayedCall(6000, coolDown, [], this);
        }
        else if(this.vie==1){
          this.timedEvent = this.time.delayedCall(6000, coolDown, [], this);
        }
      }

      function derVie () {
        if(this.cooldown == 0){
          if(this.vie==1){
            this.vie --;
          }
        }
      }

  }//Fin Create

  update() {

        //Choix de l'Objet
    if (this.choix == 1 && this.poisson > 0){
      this.bottlePic.setAlpha(0);
      this.arrowPic.setAlpha(0);
      this.poissonPic.setAlpha(1);
      this.grenadePic.setAlpha(0);
    }

    else if (this.choix == 2 && this.bottle > 0){
      this.bottlePic.setAlpha(1);
      this.arrowPic.setAlpha(0);
      this.poissonPic.setAlpha(0);
      this.grenadePic.setAlpha(0);
    }

    else if (this.choix == 3 && this.grenade > 0){
      this.bottlePic.setAlpha(0);
      this.arrowPic.setAlpha(0);
      this.poissonPic.setAlpha(0);
      this.grenadePic.setAlpha(1);
    }

    else if (this.choix == 4 && this.arrow > 0){
      this.bottlePic.setAlpha(0);
      this.arrowPic.setAlpha(1);
      this.poissonPic.setAlpha(0);
      this.grenadePic.setAlpha(0);
    }

    else{
      this.bottlePic.setAlpha(0);
      this.arrowPic.setAlpha(0);
      this.poissonPic.setAlpha(0);
      this.grenadePic.setAlpha(0);
    }


        //Utilisation d'objets
    if(Phaser.Input.Keyboard.JustDown(this.s)){
      if(this.choix == 1){
        if(this.poisson > 0 & this.vie<3){
          this.poisson --;
          this.scoreText.setText('Money:' + this.score +  '   F' + this.poisson + '   B' + this.bottle + '   G' + this.grenade + '   A' + this.arrow);
          this.vie++;
        }
      }


          if(this.choix == 2){
            if(this.bottle > 0 & this.vie == 1){
              this.bottle --;
              this.scoreText.setText('Money:' + this.score +  '   F' + this.poisson + '   B' + this.bottle + '   G' + this.grenade + '   A' + this.arrow);
              this.vie+=2;
            }
            else if (this.bottle > 0 & this.vie == 1){
              this.bottle --;
              this.scoreText.setText('Money:' + this.score +  '   F' + this.poisson + '   B' + this.bottle + '   G' + this.grenade + '   A' + this.arrow);
              this.vie++;
            }
          }

          if(this.choix == 4){
            if(this.arrow > 0){
              if(this.choix == 4){
                this.arrow--;
                this.scoreText.setText('Money:' + this.score +  '   F' + this.poisson + '   B' + this.bottle + '   G' + this.grenade + '   A' + this.arrow);
                this.coefDir;
                if (this.player.direction == 'left') { this.coefDir = -1; } else { this.coefDir = 1 }
                    // on crée la balle a coté du joueur
                this.bullet = this.groupeBullets.create(this.player.x + (25 * this.coefDir), this.player.y - 4, 'bullet');
                    // parametres physiques de la balle.
                this.bullet.body.allowGravity =false;
                this.bullet.setVelocity(400 * this.coefDir, 0); // vitesse en x et en y}
              }
            }
          }

          if(this.choix == 3){
            if(this.grenade > 0){
              this.grenade --;
              this.explosion = this.explosions.create(this.player.x, this.player.y, 'explosion');
              this.explosion.anims.play('explode', true);
              this.scoreText.setText('Money:' + this.score +  '   F' + this.poisson + '   B' + this.bottle + '   G' + this.grenade + '   A' + this.arrow);
            }
          }

        }

          //Monde
      if (this.keys.ENTER.isDown){
  			this.registry.destroy(); // destroy registry
  			this.events.off(); // disable all active events
  			this.scene.restart(); // restart current scene
  		}

      if(this.keys.A.isDown){
  			this.scene.start('Chateau', {vie : this.vie, score : this.score, grenade : this.grenade, poisson : this.poisson, bottle : this.bottle, arrow : this.arrow});
  		}

  		    //Perte et gain de vie
      if (this.vie == 3){
        this.vie_3 = this.add.image(80,70,'vie_3');
        this.vie_3.setScrollFactor(0, 0);
      }
      else if (this.vie == 2){
    		this.vie_2 = this.add.image(80,70,'vie_2');
        this.vie_2.setScrollFactor(0, 0);
        this.vie_3.destroy(true);
  		}
  		else if (this.vie == 1){
        this.vie_1 = this.add.image(80,70,'vie_1');
        this.vie_1.setScrollFactor(0, 0);
  			this.vie_2.destroy(true);
  		}
  		else if (this.vie == 0){
  			this.vie_1.destroy(true);
  			this.physics.pause();
  			this.player.setTint(0xff0000);
  			this.player.anims.play('turn');
  			this.gameOverText.visible = true;
  			this.gameOver = true;
  			this.score = 0;
  			this.vie = 3;
  		}

          //Animations Joueur et Monstres
  		if (this.cursors.left.isDown){
        this.player.direction = 'left';
  			this.player.anims.play('left', true);
  			this.player.setVelocityX(-50);
  		}

      else if (this.keys.R.isDown){
  			this.player.anims.play('attack', true);
  		}

      else if (this.cursors.right.isDown){
        this.player.direction = 'right';
        this.player.anims.play('right', true);
  			this.player.setFlipX(false);
  			this.player.setVelocityX(50);
  		}

      else if (this.cursors.down.isDown){
  			this.player.anims.play('face', true);
  			this.player.setFlipX(false);
  			this.player.setVelocityY(50);
  		}

      else if (this.cursors.up.isDown){
  			this.player.anims.play('dos', true);
  			this.player.setFlipX(false);
  			this.player.setVelocityY(-50);
  		}

  		else{
        this.vieux.anims.play('still', true);
  	    this.player.anims.play('idle', true);
        if(this.pointDeVie > 0){
          this.bonhomme.anims.play('bonhomeIdle', true);
        }
        if(this.pointVie > 0){
          this.cube.anims.play('cubeIdle', true);
        }
  			this.player.setVelocityX(0);
        this.player.setVelocityY(0);
  		}


          //Conditions Inventaire
      if (Phaser.Input.Keyboard.JustDown(this.c) && this.choix > 1){
        this.choix --;
        this.choixText.setText('Choix: '+ (this.choix));
      }

      if (Phaser.Input.Keyboard.JustDown(this.v) && this.choix < 4){
        this.choix ++;
        this.choixText.setText('Choix: '+ (this.choix));
      }

          //Textes
      if(this.player.x > 1400 && this.player.x < 1500 && this.keys.O.isDown){
        if(this.player.y<200){
          this.aideText.visible = true;
        }
        this.pushText.visible = false;
  		}
      else{
        this.aideText.visible = false;
      }
      if(this.player.x > 1400 && this.player.x < 1500 && this.keys.O.isDown){
        if(this.player.y > 200 && this.score < 200){
          this.aguyText.visible = true;
        }
  		}
      else{
        this.aguyText.visible = false;
      }
      if(this.player.x > 1400 && this.player.x < 1500 && this.keys.O.isDown){
        if(this.player.y > 200 && this.score >= 220){
          this.porte.destroy(true, true);
          this.aguypasseText.visible = true;
        }
  		}
      else{
        this.aguypasseText.visible = false;
      }

  }//Fin Update
}
