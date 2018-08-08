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