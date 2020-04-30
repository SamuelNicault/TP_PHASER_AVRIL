class Scene6 extends Phaser.Scene {
    constructor() {
        super("Fin");
    }

	init(data){
    this.fin;
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
	}//Fin Init

	preload(){
    this.load.spritesheet('fin','assets/monde/fini.png', {frameWidth: 21, frameHeight: 21});
	}//Fin Preload

	create(){
    this.fin = this.physics.add.sprite(1600,0,'fin');
		this.fin.setCollideWorldBounds(true);

        //Animations
    this.anims.create({
      key: 'gif',
      frames: this.anims.generateFrameNumbers('fin', {start: 0, end: 80}),
      frameRate: 4,
      repeat: 0
    });

        //Récupération des curseurs
    this.keys = this.input.keyboard.addKeys('A, S, ENTER, R, O, C, V');
    this.cursors = this.input.keyboard.createCursorKeys();

    this.scoreText = this.add.text(25,120,('Money:' + this.score), {fontsize: '32px', fill: '#000000'});
    this.scoreText.setScrollFactor(0, 0);



    this.timedEvent = this.time.delayedCall(32000, changeLevel, [], this);

		function changeLevel () {
			console.log('change de level');
      this.scene.start('Credits', {vie : this.vie, score : this.score, grenade : this.grenade, poisson : this.poisson, bottle : this.bottle, arrow : this.arrow});
		}

  }//Fin Create

	update(){
        //Monde
    if (this.keys.ENTER.isDown){
      this.registry.destroy(); // destroy registry
      this.events.off(); // disable all active events
      this.scene.restart(); // restart current scene
    }

    if(this.keys.A.isDown){
      this.scene.start('Credits', {vie : this.vie, score : this.score, grenade : this.grenade, poisson : this.poisson, bottle : this.bottle, arrow : this.arrow});
    }

    else{
      //this.fin.anims.play('gif', true)
    }

  }//Fin Update
}
