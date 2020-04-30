class Scene4 extends Phaser.Scene {
    constructor() {
        super("Chateau");
    }

	init(data){
    this.player;
    this.cursors;
    this.groupeBullets;
    this.tir = 2;
    this.pointDeVie;
    this.pointVie;
    this.cooldown = 0;
    this.choix = 0;

    this.choixText;
    this.scoreText;


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
    this.load.image('fin','assets/monde/credits.png');
    this.load.image('poulette','assets/objets/poulette.png');
    this.load.image('background2','assets/monde/dungeon.png');


    this.load.spritesheet('perso','assets/personnages/Inuit_saut.png', {frameWidth: 20, frameHeight: 28});
    this.load.spritesheet('dos','assets/personnages/Inuit_saut_dos.png', {frameWidth: 20, frameHeight: 28});
    this.load.spritesheet('attaque','assets/personnages/Inuit_attak.png', {frameWidth: 32.1, frameHeight: 28});
    this.load.spritesheet('droite','assets/personnages/Inuit_saut_droite.png', {frameWidth: 20, frameHeight: 28});
    this.load.spritesheet('gauche','assets/personnages/Inuit_saut_gauche.png', {frameWidth: 20, frameHeight: 28});

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
        //Récupération des curseurs
    this.keys = this.input.keyboard.addKeys('A, ENTER, R, O');
    this.s = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.c = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);
    this.v = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.V);
    this.cursors = this.input.keyboard.createCursorKeys();

        //Monde
    this.physics.world.setBounds(0, 0, 1600, 600);
    this.add.image(0,0,'background2').setOrigin(0,0);

		this.barrières = this.physics.add.staticGroup();
		this.barrières.create(900,132, 'platform').setScale(20,4.8).refreshBody();
		this.barrières.create(700,482, 'platform').setScale(20,4.8).refreshBody();
    this.barrières.setAlpha(0);

    this.door = this.physics.add.staticGroup();
    this.door.create(1560,306,'poulette');
    this.door.setAlpha(0);

        //Sac
    this.grenadePic = this.add.image(200,70,'grenadePic').setScrollFactor(0, 0).setAlpha(0);
    this.poissonPic = this.add.image(200,70,'poissonPic').setScrollFactor(0, 0).setAlpha(0);
    this.bottlePic = this.add.image(200,70,'bottlePic').setScrollFactor(0, 0).setAlpha(0);
    this.arrowPic = this.add.image(200,70,'arrowPic').setScrollFactor(0, 0).setAlpha(0);


      //Player 1
    this.player = this.physics.add.sprite(0,300,'perso');
    this.player.setCollideWorldBounds(true);
    this.player.body.setGravityY(0);

        //Cameras
    this.cameras.main.startFollow(this.player);
    this.cameras.main.setBounds(0, 0, 1600, 600);


		//Animations Joueur

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
			key: 'face',
			frames: this.anims.generateFrameNumbers('perso', {start: 0, end: 12}),
			frameRate: 8,
			repeat: -1
		});

    this.anims.create({
			key: 'idle',
			frames: this.anims.generateFrameNumbers('perso', {start: 0, end: 2}),
			frameRate: 3,
			repeat: -1
		});

    this.anims.create({
			key: 'dos',
			frames: this.anims.generateFrameNumbers('dos', {start: 0, end: 12}),
			frameRate: 8,
			repeat: -1
		});


    this.physics.add.overlap(this.player,this.door, fadeLevel, null, this);

		//Texte
    this.choixText =this.add.text(25,200, 'Choix: '+ (this.choix), {'font': '14px', fill: '#000'});
    this.choixText.setScrollFactor(0, 0);
    this.scoreText = this.add.text(25,120,('Money:' + this.score) +  '   F' + this.poisson + '   B' + this.bottle + '   G' + this.grenade + '   A' + this.arrow, {fontsize: '32px', fill: '#000000'});
    this.scoreText.setScrollFactor(0, 0);

		function fadeLevel(player, door) {
      if(this.keys.O.isDown){
        this.cameras.main.fadeOut(3000);
  			this.timedEvent = this.time.delayedCall(3500, changeLevel, [], this);
      }
		}

		function changeLevel () {
			console.log('change de level');
      this.scene.start('Galerie', {vie : this.vie, score : this.score, grenade : this.grenade, poisson : this.poisson, bottle : this.bottle, arrow : this.arrow});
		}

  }//Fin Create

	update(){

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
          this.arrow --;
          this.scoreText.setText('Money:' + this.score +  '   F' + this.poisson + '   B' + this.bottle + '   G' + this.grenade + '   A' + this.arrow);
        }
      }

      if(this.choix == 3){
        if(this.grenade > 0){
          this.grenade --;
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
      this.scene.start('Galerie', {vie : this.vie, score : this.score, grenade : this.grenade, poisson : this.poisson, bottle : this.bottle, arrow : this.arrow});
    }

        //Animations Joueur et Monstres
    if (this.cursors.left.isDown){
      this.player.anims.play('left', true);
      this.player.setVelocityX(-50);
    }

    else if (this.keys.R.isDown){
      this.player.anims.play('attack', true);
    }

    else if (this.cursors.right.isDown){
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
      this.player.anims.play('idle', true);
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


  }//Fin Update
}
