const mainLoop = () => {
	sortZIndex();
},

init = () => {
	PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
	document.body.appendChild(game.view);
	mapControls();
	strings.init();
	tab.init();
	game.ticker.add(mainLoop);
};

init();