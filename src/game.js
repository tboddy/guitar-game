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