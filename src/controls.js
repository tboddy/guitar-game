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