let tabLimit;

const tab = {

	draw(){

		const speed = 3, fontStyle = new PIXI.TextStyle({
			fill: colors.light,
			fontFamily: 'zapper',
			fontSize: 32,
			dropShadow: true,
			dropShadowColor: colors.dark,
			dropShadowBlur: 0,
			dropShadowAngle: Math.PI / 2,
			dropShadowDistance: 1
		}), x = gameWidth, y = stringOffset,
		tabBg = PIXI.Sprite.fromImage('img/tab-ball-blue.png'), tabLabel = new PIXI.Text('3', fontStyle),
		size = 42;

		tabBg.isTab = true;
		tabBg.isTabBg = true;
		tabBg.zIndex = 12;
		tabBg.anchor.set(0.5);
		tabBg.x = x;
		tabBg.y = y;
		tabBg.speed = speed;
		game.stage.addChild(tabBg);

		tabLabel.isTab = true;
		tabLabel.anchor.set(0.5);
		tabLabel.x = x + 2;
		tabLabel.y = y - 4;
		tabLabel.zIndex = 13;
		tabLabel.speed = speed;
		game.stage.addChild(tabLabel);

	},

	failTab(tabItem, i){
		tabItem.failed = true;

		const tabBg = PIXI.Sprite.fromImage('img/tab-ball-red.png');
		tabBg.isTab = true;
		tabBg.zIndex = 12;
		tabBg.anchor.set(0.5);
		tabBg.x = tabItem.x;
		tabBg.y = tabItem.y;
		tabBg.speed = tabItem.speed;
		game.stage.addChild(tabBg);
		game.stage.removeChildAt(i);
		currentShit += 5;
	},

	update(tabItem, i){
		tabItem.x -= tabItem.speed;
		if(tabItem.isTabBg && !tabItem.failed && tabLimit && (tabItem.x < tabLimit)) tab.failTab(tabItem, i);
	},

	init(){
		tab.draw();
	}

};