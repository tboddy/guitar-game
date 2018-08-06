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
			const triggerGraphic = new PIXI.Graphics();
			triggerGraphic.zIndex = 7;
			triggerGraphic.beginFill(0x442434);
			triggerGraphic.lineStyle(0);
			triggerGraphic.drawRect(grid * 4, 0, 3, gameHeight);
			triggerGraphic.beginFill(0xd04648);
			triggerGraphic.drawRect(grid * 4 + 1, 0, 2, gameHeight);
			triggerGraphic.beginFill(0x140c1c);
			triggerGraphic.drawRect(grid * 4 - 1, 0, 1, gameHeight);
			triggerGraphic.drawRect(grid * 4 + 3, 0, 1, gameHeight);
			game.stage.addChild(triggerGraphic);
		};

		stringLines();
		triggerLine();

	},

	init(){
		strings.draw();
	}

};
const tab = {

	draw(){
		
	},

	init(){
		tab.draw();
	}

};
const mainLoop = () => {
	sortZIndex();
},

init = () => {
	PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
	document.body.appendChild(game.view);
	strings.init();
	mapControls();
	game.ticker.add(mainLoop);
};

init();