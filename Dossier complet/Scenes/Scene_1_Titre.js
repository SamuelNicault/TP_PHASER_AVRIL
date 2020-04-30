class Scene1 extends Phaser.Scene {
    constructor() {
        super("Titre");
    }


  init(){
    this.quete;
    this.press;
  }

  preload(){
    this.load.image('quete','assets/monde/quete.png');
    this.load.spritesheet('press','assets/monde/press.png', {frameWidth: 70, frameHeight: 30});
  }

  create(){
    this.quete = this.physics.add.sprite(400,300,'quete');
    this.keys = this.input.keyboard.addKeys('A');
    this.timedEvent = this.time.delayedCall(3000, changeLevel, [], this);

    this.press = this.physics.add.sprite(512,600,'press');
    this.press.setGravityY(-300).setScale(3).setAlpha(0);

    this.anims.create({
			key: 'pressing',
			frames: this.anims.generateFrameNumbers('press', {start: 0, end: 1}),
			frameRate: 1,
			repeat: -1
		});

  	function changeLevel () {
      this.press.setAlpha(1);
      this.press.anims.play('pressing', true);
  	}
  }

  update() {

    if(this.keys.A.isDown){
      this.scene.start('Tuto');
    }

  }

}
