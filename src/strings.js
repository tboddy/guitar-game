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
			triggerGraphic.drawRect(grid * 5, 0, 3, gameHeight);
			triggerGraphic.beginFill(0xd04648);
			triggerGraphic.drawRect(grid * 5 + 1, 0, 2, gameHeight);
			triggerGraphic.beginFill(0x140c1c);
			triggerGraphic.drawRect(grid * 5 - 1, 0, 1, gameHeight);
			triggerGraphic.drawRect(grid * 5 + 3, 0, 1, gameHeight);
			game.stage.addChild(triggerGraphic);
		};

		stringLines();
		triggerLine();

	},

	init(){
		strings.draw();
	}

};