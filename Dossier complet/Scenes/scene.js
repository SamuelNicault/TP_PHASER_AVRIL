var config = {
	type: Phaser.AUTO,
	width: 800,
	height: 600,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: {y: 0},
			debug: false

		}
	},

	scene: [Scene1, Scene2, Scene3, Scene4, Scene5, Scene6, Scene7]

};

var game = new Phaser.Game(config);
