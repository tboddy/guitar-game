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