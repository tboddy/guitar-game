let currentScore = 0, currentShit = 0;

const chrome = {

	draw(){

		const fontStyle = new PIXI.TextStyle({
			fill: colors.light,
			fontFamily: 'zapper',
			fontSize: 16,
			dropShadow: true,
			dropShadowColor: colors.dark,
			dropShadowBlur: 0,
			dropShadowAngle: Math.PI / 2,
			dropShadowDistance: 1
		}), scoreLabel = new PIXI.Text('score: ' + processScore(currentScore), fontStyle),
			shitLabel = new PIXI.Text('shit: 00' + currentShit, fontStyle);

		scoreLabel.x = gameWidth - scoreLabel.width - grid;
		scoreLabel.y = grid;
		scoreLabel.zIndex = 500;
		scoreLabel.isChrome = true;
		game.stage.addChild(scoreLabel);

		shitLabel.x = gameWidth - shitLabel.width - grid;
		shitLabel.y = grid * 2;
		shitLabel.zIndex = 500;
		shitLabel.isChrome = true;
		game.stage.addChild(shitLabel);

	}

};