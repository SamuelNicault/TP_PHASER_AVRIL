class Scene7 extends Phaser.Scene {
    constructor() {
        super("Credits");
    }

  init(){
    this.fin;
  }

  preload(){
    this.load.image('fin','assets/monde/credits.png');
  }

  create(){
    this.fin = this.physics.add.sprite(512,1500,'fin');
  	this.fin.body.setGravityY(-300);
  	this.timedEvent = this.time.delayedCall(33000, changeLevel, [], this);
    this.keys = this.input.keyboard.addKeys('A');

  	function changeLevel () {
  		console.log('change de level');
  		this.scene.start('Titre');
  	}
  }


  update() {

    if(this.keys.A.isDown){
			this.scene.start('Titre');
		}


    if (this.fin.y >= -1800){
        this.tweens.add({
          targets: this.fin,

          y : -6000,
          // alpha: { start: 0, to: 1 },
          // alpha: 1,
          // alpha: '+=1',
          ease: 'Linear',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
          duration: 100000,
          repeat: 0,            // -1: infinity
          yoyo: false
      });
    }
  }
}
