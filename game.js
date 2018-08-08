const gameWidth = 640, gameHeight = 480, grid = 16, browserWindow = require('electron').remote,
mainWindow = browserWindow.getCurrentWindow(), game = new PIXI.Application(gameWidth, gameHeight, {
	backgroundColor: 0x140c1c,
	roundPixels: true
}),
spaceHeight = grid * 2.5, stringHeight = 4, totalStringHeight = (spaceHeight + stringHeight) * 5 + stringHeight,
stringOffset = gameHeight / 2 - totalStringHeight / 2,

colors = {
	dark: '#140c1c',
	purple: '#442434',
	blueLight: '#6dc2ca',
	blue: '#597dce',
	blueDark: '#30346d',
	green: '#6daa2c',
	greenDark: '#346524',
	red: '#d04648',
	peach: '#d2aa99',
	light: '#deeed6',
	purple: '#442434',
	orange: '#d27d2c',
	yellow: '#dad45e'
},

sortZIndex = () => {
	game.stage.children.sort((a, b) => {
    a.zIndex = a.zIndex || 0;
    b.zIndex = b.zIndex || 0;
    return a.zIndex - b.zIndex
	});
},

processScore = input => {
	let scoreString = String(input);
	for(j = scoreString.length; j < 8; j++){
		scoreString = '0' + scoreString;
	}
	return scoreString;
};
let isFullscreen = false;

const toggleFullscreen = () => {
	if(isFullscreen){
		mainWindow.setFullScreen(false);
		isFullscreen = false;
	} else {
		mainWindow.setFullScreen(true);
		isFullscreen = true;
	}
},

mapControls = () => {
	const keysDown = e => {
		switch(e.which){
			case 38: console.log('z'); break;
		}
	}, keysUp = e => {
		switch(e.which){
			case 38: console.log('zz'); break;
			case 70: toggleFullscreen(); break;
			case 82: location.reload(); break;
		}
	};
	document.addEventListener('keydown', keysDown);
	document.addEventListener('keyup', keysUp);
};
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
const strings = {

	draw(){

		const stringLines = () => {
			const stringGraphics = new PIXI.Graphics();
			stringGraphics.zIndex = 5;
			stringGraphics.lineStyle(0);
			for(i = 0; i < 6; i++){
				const y = stringOffset + (spaceHeight + stringHeight) * i, height = i > 2 ? 2 + i - 2 : 2;
				stringGraphics.beginFill(0x442434);
				stringGraphics.drawRect(0, y, gameWidth, height);
				stringGraphics.beginFill(0x30346d);
				const hilightHeight = i == 5 ? 2 : 1;
				stringGraphics.drawRect(0, y, gameWidth, hilightHeight);
				if(i >= 3){
					const dashGraphics = new PIXI.Graphics();
					dashGraphics.zIndex = 6;
					dashGraphics.beginFill(0x140c1c);
					dashGraphics.lineStyle(0);
					for(j = 0; j < gameWidth; j++){
						if(j % 2 == 0) dashGraphics.drawRect(j + 1, y + Math.ceil(height / 2), 1, Math.floor(height / 2));
					}
					game.stage.addChild(dashGraphics);
				}
			}
			game.stage.addChild(stringGraphics);
		},

		triggerLine = () => {
			const triggerGraphic = new PIXI.Graphics(), x = grid * 5;
			triggerGraphic.zIndex = 20;
			triggerGraphic.beginFill(0x442434);
			triggerGraphic.lineStyle(0);
			triggerGraphic.drawRect(x, 0, 3, gameHeight);
			triggerGraphic.beginFill(0xd04648);
			triggerGraphic.drawRect(x + 1, 0, 2, gameHeight);
			triggerGraphic.beginFill(0x140c1c);
			triggerGraphic.drawRect(x - 1, 0, 1, gameHeight);
			triggerGraphic.drawRect(x + 3, 0, 1, gameHeight);
			game.stage.addChild(triggerGraphic);
			tabLimit = x - grid;
		};

		stringLines();
		triggerLine();

	},

	init(){
		strings.draw();
	}

};
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
		tabBg.x = tabItem.x + tabItem.speed * 2 + 1;
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
const mainLoop = () => {
	sortZIndex();
	game.stage.children.forEach((child, i) => {
		if(child.isTab) tab.update(child, i);
		if(child.isChrome) game.stage.removeChildAt(i);
	});
	chrome.draw();
},

init = () => {
	PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
	document.body.appendChild(game.view);
	mapControls();
	strings.init();
	tab.init();
	game.ticker.add(mainLoop);
};

setTimeout(init, 100);