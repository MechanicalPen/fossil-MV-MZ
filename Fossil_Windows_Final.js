

 /*:
 * @plugindesc Fossil Windows Final Fix: This goes at the END of your plugin list. 
 * @author FOSSIL TEAM
 * @target MZ 
 * @help Fossil_Windows_Final goes at the end, after ALL plugins (Both MV and MZ)
 
This is a final cap layer trying for added window compatibility between RMMZ
and RMMV plugins, as when RMMZ initialization injections run they may lose some 
of the arguments that RMMV initializations use, resulting weird window sizes when
MZ and MV plugins are mixed.
 
Hopefully this will make things work more smoothly.

This will likely get reworked considerably in the future but is a rough test.  
Window aliases are from Fossil_Pre version 0.3.01

Terms of use:

All code not covered by the RPG Maker MV or RPG Maker MZ license is released 
under a Creative Commons CC-BY-SA license.  Please credit 'FOSSIL', Restart, 
or 'The FOSSIL TEAM', and link back to the forum thread or github.

*/

var Imported = Imported || {};
Imported.Fossil_WindowsFix=true;
var Fossil =Fossil || {}

if(!Imported.Fossil_Pre || !Imported.Fossil_Post)	
{
	console.log('You should have both Fossil_Pre and Fossil_Post active and above this')
}

//MZ uses rectangles instead of multiple numbers being passed in.
//There's even a special check in the MZ code that checks if you forgot a rectangle.
//But I figure, hey, why not make it flexible?  That way legacy code will still work. :)

var rectFixFinalWindowBase= Window_Base.prototype.initialize;
Window_Base.prototype.initialize = function(rect) {
	
	if(this.constructor.name == 'Window_Hidden')
	{
		//special case for DTextPicture.  Code is wrapped, window is hidden.
		console.log('hide')
		//if you don't have a backsprite it crashes.
		Window.prototype._createAllParts.call(this);
	}
	
	if(arguments.length>0)
	{
		//if we have arguments that are missing in a weird order
		//(like having width and height but no x and y
		//then we should initialize them to 0.
		if (arguments[0]==undefined)
		{
			arguments[0]=0;
		}
		if (arguments[1]==undefined)
		{
			arguments[1]=0;
		}
		if (arguments[2]==undefined)
		{
			arguments[2]=0;
		}
		if (arguments[3]==undefined)
		{
			arguments[3]=0;
		}
		
	}else{
		//if arguments are zero length, throw a warning and set them to all be 0.
		if (Utils.isOptionValid('test'))
		{
			console.log('You created a window without defining the size!')
		}
		arguments=[0,0,0,0]
	}
		
	if (arguments[0].constructor.name=='Rectangle') // if our first argument is a rectangle this is MZ code
	{
		rectFixFinalWindowBase.apply(this,arguments) 
	}else{ //if not, I am assuming it is MV.
		if(this._backupRect) //if we don't have a rectangle now, and backed up one earlier, use that one.
		{
			rect=this._backupRect;
			this._backupRect=undefined;
			rectFixFinalWindowBase.call(this,rect)
			return;
		}
		
		if(arguments.length==1)
		{
			console.log("Only one argument and not a rectangle.  I am guessing this is inheriting from a window that isn't updating")
		}
		var rect = new Rectangle(arguments[0], arguments[1], arguments[2]||400,  arguments[3]||Graphics.boxHeight);
		rectFixFinalWindowBase.call(this,rect)
	}

};

var rectFixFinalWindowSelectable= Window_Selectable.prototype.initialize;
Window_Selectable.prototype.initialize = function(rect) {
	if (arguments[0].constructor.name=='Rectangle') // if our first argument is a rectangle this is MZ code 
	{
		rectFixFinalWindowSelectable.apply(this,arguments) 
	}else{ //if not, I am assuming it is MV. :)
		if(arguments.length==1)
		{
			console.log("Only one argument and not a rectangle.  I am guessing this is inheriting from a window that isn't updating")
		}
		var rect = new Rectangle(arguments[0], arguments[1], arguments[2]||400,  arguments[3]||Graphics.boxHeight);
		rectFixFinalWindowSelectable.call(this,rect)
	}
	
};
//we have to do this each time for each window class :(
var rectFixFinalWindowCommand= Window_Command.prototype.initialize;
Window_Command.prototype.initialize = function(rect) {
	
	if (arguments[0].constructor.name=='Rectangle') // if our first argument is a rectangle this is MZ code
	{
		rectFixFinalWindowCommand.apply(this,arguments) 
	}else{ //if not, I am assuming it is MV.
		if(arguments.length==1)
		{
			console.log("Only one argument and not a rectangle.  I am guessing this is inheriting from a window that isn't updating")
		}
		
		
		var rectA=new Rectangle(0,0,0,0);
		//Window_Command is inherited from a lot of individual plugin windows.
		//handle case-by-case window sizes here.
		//I may have to refactor this later but this seems okay for now.
		
		switch(this.constructor.name)
		{
			case "Window_SkillLearnConfirm":
			if(SceneManager._scene.helpWindowRect)
			{
				rectA=SceneManager._scene.helpWindowRect();
				rectA.height = (this.windowHeight ? this.windowHeight() : rectA.height)
			}
			break;
			case "Window_ItemActionCommand":
			case "Window_ItemDiscardConfirm":
			if(SceneManager._scene.itemWindowRect)
			{
				rectA=SceneManager._scene.itemWindowRect();
				rectA.height = (this.windowHeight ? this.windowHeight() : rectA.height)
			}
			break;

			default:
		}
			
			
			
		
		
		var rect = new Rectangle(
		arguments[0]||rectA.x, 
		arguments[1]||rectA.y, 
		arguments[2]||rectA.width ||(this.windowWidth ? this.windowWidth() : 0)  ||400,  
		arguments[3]||rectA.height||(this.windowHeight ? this.windowHeight() : 0)||this.fittingHeight(this.numVisibleRows())||Graphics.boxHeight
		);
		rectFixFinalWindowCommand.call(this,rect)
		
	}
	
};


var rectFixFinalWindowMenuCommand= Window_MenuCommand.prototype.initialize;
Window_MenuCommand.prototype.initialize = function(rect) {
	
	if (arguments[0].constructor.name=='Rectangle') // if our first argument is a rectangle this is MZ code
	{
		rectFixFinalWindowMenuCommand.apply(this,arguments) 
	}else{ //if not, I am assuming it is MV.
		if(arguments.length==1)
		{
			console.log("Only one argument and not a rectangle.  I am guessing this is inheriting from a window that isn't updating")
		}
		
		
		var rectA=new Rectangle(0,0,0,0);
		
		if(SceneManager._scene.commandWindowRect)
		{
			rectA=SceneManager._scene.commandWindowRect();
		}

		var rect = new Rectangle(
		arguments[0]||rectA.x, 
		arguments[1]||rectA.y, 
		arguments[2]||rectA.width ||(this.windowWidth ? this.windowWidth() : 0)  ||400,  
		arguments[3]||rectA.height||(this.windowHeight ? this.windowHeight() : 0)||this.fittingHeight(this.numVisibleRows())||Graphics.boxHeight
		);
		rectFixFinalWindowMenuCommand.call(this,rect)
		
	}
	
};

var rectFixFinalWindowSkillList= Window_SkillList.prototype.initialize;
Window_SkillList.prototype.initialize = function(rect) {
	if (arguments[0].constructor.name=='Rectangle') // if our first argument is a rectangle this is MZ code
	{
		rectFixFinalWindowSkillList.apply(this,arguments) 
	}else{ //if not, I am assuming it is MV.
		if(arguments.length==1)
		{
			console.log("Only one argument and not a rectangle.  I am guessing this is inheriting from a window that isn't updating")
		}
		
		//SRD initializes this tiny and then resizes it, which doesn't work anymore.
		//because the options size doesn't get set beyond the first entry.
		//do the reverse instead - start it big, then trust it to resize down.
		if(this.constructor.name == 'Window_SkillExtend')
		{
			arguments[3]=800;
		}
		
		
		var rect = new Rectangle(
		arguments[0], 
		arguments[1], 
		arguments[2]||(this.windowWidth ? this.windowWidth() : 0)||400,
		arguments[3]||(this.windowHeight ? this.windowHeight() : 0)||Graphics.boxHeight
		);
		rectFixFinalWindowSkillList.call(this,rect)
	}

};

var rectFixFinalWindowEquipCommand= Window_EquipCommand.prototype.initialize;
Window_EquipCommand.prototype.initialize = function(rect) {
	
	if (arguments[0].constructor.name=='Rectangle') // if our first argument is a rectangle this is MZ code
	{
		rectFixFinalWindowEquipCommand.apply(this,arguments) 
	}else{ //if not, I am assuming it is MV.
		if(arguments.length==1)
		{
			console.log("Only one argument and not a rectangle.  I am guessing this is inheriting from a window that isn't updating")
		}
		var rect = new Rectangle(arguments[0], arguments[1], arguments[2]||(this.windowWidth ? this.windowWidth() : 0) ||400,  arguments[3]||(this.windowHeight ? this.windowHeight() : 0)||Graphics.boxHeight);
		rectFixFinalWindowEquipCommand.call(this,rect)
		
	}
	
};

var rectFixFinalWindowSkillStatus= Window_SkillStatus.prototype.initialize;
Window_SkillStatus.prototype.initialize = function(rect) {
	
	if (arguments[0].constructor.name=='Rectangle') // if our first argument is a rectangle this is MZ code
	{
		rectFixFinalWindowSkillStatus.apply(this,arguments) 
	}else{ //if not, I am assuming it is MV.
		if(arguments.length==1)
		{
			console.log("Only one argument and not a rectangle.  I am guessing this is inheriting from a window that isn't updating")
		}
		var rect = new Rectangle(arguments[0], arguments[1], arguments[2]||(this.windowWidth ? this.windowWidth() : 0) ||400,  arguments[3]||(this.windowHeight ? this.windowHeight() : 0)||Graphics.boxHeight);
		rectFixFinalWindowSkillStatus.call(this,rect)
		
	}
	
};

var rectFixFinalWindowStatusBase= Window_StatusBase.prototype.initialize;
Window_StatusBase.prototype.initialize = function(rect) {
	
	if (arguments[0].constructor.name=='Rectangle') // if our first argument is a rectangle this is MZ code
	{
		rectFixFinalWindowStatusBase.apply(this,arguments) 
	}else{ //if not, I am assuming it is MV.
		if(arguments.length==1)
		{
			console.log("Only one argument and not a rectangle.  I am guessing this is inheriting from a window that isn't updating")
		}
		var rect = new Rectangle(arguments[0], arguments[1], arguments[2]||(this.windowWidth ? this.windowWidth() : 0) ||400,  arguments[3]||(this.windowHeight ? this.windowHeight() : 0)||Graphics.boxHeight);
		rectFixFinalWindowStatusBase.call(this,rect)
		
	}
	
};

var rectFixFinalWindowItemList= Window_ItemList.prototype.initialize;
Window_ItemList.prototype.initialize = function(rect) {
	
	if (arguments[0].constructor.name=='Rectangle') // if our first argument is a rectangle this is MZ code
	{
		rectFixFinalWindowItemList.apply(this,arguments) 
	}else{ //if not, I am assuming it is MV.
		if(arguments.length==1)
		{
			console.log("Only one argument and not a rectangle.  I am guessing this is inheriting from a window that isn't updating")
		}
		var rect = new Rectangle(arguments[0], arguments[1], arguments[2]||(this.windowWidth ? this.windowWidth() : 0) ||400,  arguments[3]||(this.windowHeight ? this.windowHeight() : 0)||Graphics.boxHeight);
		rectFixFinalWindowItemList.call(this,rect)
		
	}
	
};

var rectFixFinalWindowEquipSlot= Window_EquipSlot.prototype.initialize;
Window_EquipSlot.prototype.initialize = function(rect) {
	
	if (arguments.length>0 && arguments[0].constructor.name=='Rectangle') // if our first argument is a rectangle this is MZ code
	{
		rectFixFinalWindowEquipSlot.apply(this,arguments) 
	}else{ //if not, I am assuming it is MV.
		if(arguments.length==1)
		{
			console.log("Only one argument and not a rectangle.  I am guessing this is inheriting from a window that isn't updating")
		}
		var rectA=new Rectangle(0,0,0,0);
		if (SceneManager._scene.slotWindowRect)
		{
			rectA=SceneManager._scene.slotWindowRect(); //pick the defaults.
		}
		var rect = new Rectangle(
		(typeof(arguments[0]) == undefined? rectA.x : arguments[0])||0,
		(typeof(arguments[1]) == undefined? rectA.y : arguments[1])||0,
		arguments[2]||(this.windowWidth ? this.windowWidth() : 0) ||400,  
		arguments[3]||(this.windowHeight ? this.windowHeight() : 0)||Graphics.boxHeight
		);
		rectFixFinalWindowEquipSlot.call(this,rect)
		
	}
	
};

var rectFixFinalWindowEquipItem= Window_EquipItem.prototype.initialize;
Window_EquipItem.prototype.initialize = function(rect) {
	
	if (arguments.length && arguments[0].constructor.name=='Rectangle') // if our first argument is a rectangle this is MZ code
	{
		rectFixFinalWindowEquipItem.apply(this,arguments) 
	}else{ //if not, I am assuming it is MV.
		if(arguments.length==1)
		{
			console.log("Only one argument and not a rectangle.  I am guessing this is inheriting from a window that isn't updating")
		}
		
		var rectA=new Rectangle(0,0,0,0);
		if (SceneManager._scene.itemWindowRect)
		{
			rectA=SceneManager._scene.itemWindowRect(); //pick the defaults.
		}
		
		var rect = new Rectangle(
		typeof(arguments[0]) == undefined? rectA.x : arguments[0],
		typeof(arguments[1]) == undefined? rectA.y : arguments[1],
		arguments[2]||rectA.width||(this.windowWidth ? this.windowWidth() : 0) ||400,  
		arguments[3]||rectA.height||(this.windowHeight ? this.windowHeight() : 0)||Graphics.boxHeight);
		
		rectFixFinalWindowEquipItem.call(this,rect)
		
	}
	
};

var rectFixFinalWindowGold= Window_Gold.prototype.initialize;
Window_Gold.prototype.initialize = function(rect) {
	
	if (arguments[0].constructor.name=='Rectangle') // if our first argument is a rectangle this is MZ code
	{
		rectFixFinalWindowGold.apply(this,arguments) 
	}else{ //if not, I am assuming it is MV.
		if(arguments.length==1)
		{
			console.log("Only one argument and not a rectangle.  I am guessing this is inheriting from a window that isn't updating")
		}
		var rectA=new Rectangle(0,0,0,0);
		if (SceneManager._scene.goldWindowRect)
		{
			rectA=SceneManager._scene.goldWindowRect(); //pick the defaults.
		}
		var rect = new Rectangle(
		typeof(arguments[0]) == undefined? rectA.x : arguments[0],
		typeof(arguments[1]) == undefined? rectA.y : arguments[1],
		arguments[2]||rectA.width||(this.windowWidth ? this.windowWidth() : 0) ||400,
		arguments[3]||rectA.height||(this.windowHeight ? this.windowHeight() : 0)||Graphics.boxHeight);
		
		rectFixFinalWindowGold.call(this,rect)
		
	}
	
};


var rectFixFinalWindowHelp= Window_Help.prototype.initialize;
Window_Help.prototype.initialize = function(rect) {
	
	if ((arguments[0]!==undefined) && (arguments[0].constructor.name=='Rectangle')) // if our first argument is a rectangle this is MZ code
	{
		rectFixFinalWindowHelp.apply(this,arguments) 
	}else{ //if not, I am assuming it is MV.
		if(arguments.length==1)
		{
			console.log("Only one argument and not a rectangle. Could be help window inheriting form something that isn't updating, or it could just be RMMV behavior (it takes one number indicating how many lines of text there are)")
		}
		//RMMV passes this in with a single argument, which is how many lines of text
		//there are
		var rectA=new Rectangle(0,0,0,0);
		if (SceneManager._scene.helpWindowRect)
		{
			rectA=SceneManager._scene.helpWindowRect(); //pick the defaults.
		}
		var rect = new Rectangle(
		0||rectA.x, 
		0||rectA.y, 
		rectA.width||Graphics.boxWidth||(this.windowWidth ? this.windowWidth() : 0) ||400, 
		//in RMMV the height in lines is passed as a param.
		this.fittingHeight(arguments[0]||2)||rectA.height||Graphics.boxHeight);
		
		rectFixFinalWindowHelp.call(this,rect)
		
	}
	
};

var rectFixFinalWindowTitleCommand= Window_TitleCommand.prototype.initialize;
Window_TitleCommand.prototype.initialize = function(rect) {
	if (arguments.length==0)
	{//RMMV doesn't take arguments for the title command window.
/* 		var x = (Graphics.boxWidth - this.width) / 2;
		var y = Graphics.boxHeight - this.height - 96;
		var width=240;
		var height=this.fittingHeight(this.numVisibleRows())
		var rect = new Rectangle(x,y,width,height); */
		const rect=SceneManager._scene.commandWindowRect(); //pick the defaults.

		rectFixFinalWindowTitleCommand.call(this,rect)
		return;
	}
	if (arguments[0].constructor.name=='Rectangle') // if our first argument is a rectangle this is MZ code
	{
		rectFixFinalWindowTitleCommand.apply(this,arguments) 
	}else{ //if not, I am assuming it is MV.
		if(arguments.length==1)
		{
			console.log("Only one argument and not a rectangle.  I am guessing this is inheriting from a window that isn't updating")
		}
		var rectA=new Rectangle(0,0,0,0);
		if (SceneManager._scene.commandWindowRect)
		{
			rectA=SceneManager._scene.commandWindowRect(); //pick the defaults.
		}
		var rect = new Rectangle(
		typeof(arguments[0]) == undefined? rectA.x : arguments[0],
		typeof(arguments[1]) == undefined? rectA.y : arguments[1],
		arguments[2]||rectA.width||(this.windowWidth ? this.windowWidth() : 0) ||400,  
		arguments[3]||rectA.height||(this.windowHeight ? this.windowHeight() : 0)||this.fittingHeight(this.numVisibleRows())||Graphics.boxHeight);
		

		rectFixFinalWindowTitleCommand.call(this,rect)
		
	}
	
};


var rectFixFinalWindowBattleSkill= Window_BattleSkill.prototype.initialize;
Window_BattleSkill.prototype.initialize = function(rect) {
	
	if (arguments[0].constructor.name=='Rectangle') // if our first argument is a rectangle this is MZ code
	{
		rectFixFinalWindowBattleSkill.apply(this,arguments) 
	}else{ //if not, I am assuming it is MV.
		if(arguments.length==1)
		{
			console.log("Only one argument and not a rectangle.  I am guessing this is inheriting from a window that isn't updating")
		}
		var rectA=new Rectangle(0,0,0,0);
		if (SceneManager._scene.skillWindowRect)
		{
			rectA=SceneManager._scene.skillWindowRect(); //pick the defaults.
		}
		var rect = new Rectangle(
		typeof(arguments[0]) == undefined? rectA.x : arguments[0],
		typeof(arguments[1]) == undefined? rectA.y : arguments[1],
		arguments[2]||rectA.width||(this.windowWidth ? this.windowWidth() : 0) ||400,  
		arguments[3]||rectA.height||(this.windowHeight ? this.windowHeight() : 0)||this.fittingHeight(this.numVisibleRows())||Graphics.boxHeight);
		
		rectFixFinalWindowBattleSkill.call(this,rect)
		
	}
	
};

var rectFixFinalWindowBattleItem= Window_BattleItem.prototype.initialize;
Window_BattleItem.prototype.initialize = function(rect) {
	
	if (arguments[0].constructor.name=='Rectangle') // if our first argument is a rectangle this is MZ code
	{
		rectFixFinalWindowBattleItem.apply(this,arguments) 
	}else{ //if not, I am assuming it is MV.
		if(arguments.length==1)
		{
			console.log("Only one argument and not a rectangle.  I am guessing this is inheriting from a window that isn't updating")
		}
		
		var rectA=new Rectangle(0,0,0,0);
		if (SceneManager._scene.itemWindowRect)
		{
			rectA=SceneManager._scene.itemWindowRect(); //pick the defaults.
		}
		var rect = new Rectangle(
		typeof(arguments[0]) == undefined? rectA.x : arguments[0],
		typeof(arguments[1]) == undefined? rectA.y : arguments[1],
		arguments[2]||rectA.width||(this.windowWidth ? this.windowWidth() : 0) ||400,  
		arguments[3]||rectA.height||(this.windowHeight ? this.windowHeight() : 0)||this.fittingHeight(this.numVisibleRows())||Graphics.boxHeight);
		
		rectFixFinalWindowBattleItem.call(this,rect)
		
	}
	
};

var rectFixFinalWindowMenuActor= Window_MenuActor.prototype.initialize;
Window_MenuActor.prototype.initialize = function(rect) {
	
	if (arguments.length && arguments[0].constructor.name=='Rectangle') // if our first argument is a rectangle this is MZ code
	{
		rectFixFinalWindowMenuActor.apply(this,arguments) 
	}else{ //if not, I am assuming it is MV.
		if(arguments.length==1)
		{
			console.log("Only one argument and not a rectangle.  I am guessing this is inheriting from a window that isn't updating")
		}
		
		var rectA=new Rectangle(0,0,0,0);
		if (SceneManager._scene.actorWindowRect)
		{
			rectA=SceneManager._scene.actorWindowRect(); //pick the defaults.
		}
		if (Imported.YEP_ShopMenuCore && this.constructor.name =="Window_MenuActor")
		{	//load faces
			this._additionalSprites = {};
			this.loadFaceImages();
			rectA=Scene_Menu.prototype.statusWindowRect()
		}
		var rect = new Rectangle(
		typeof(arguments[0]) == undefined? rectA.x : arguments[0],
		typeof(arguments[1]) == undefined? rectA.y : arguments[1],
		arguments[2]||rectA.width||(this.windowWidth ? this.windowWidth() : 0) ||400,  
		arguments[3]||rectA.height||Graphics.boxHeight||400
		);
		
		rectFixFinalWindowMenuActor.call(this,rect)
		
	}
	


	
};

var rectFixFinalWindowShopBuy= Window_ShopBuy.prototype.initialize;
Window_ShopBuy.prototype.initialize = function(rect) {
	
	if (arguments.length && arguments[0].constructor.name=='Rectangle') // if our first argument is a rectangle this is MZ code
	{
		rectFixFinalWindowShopBuy.apply(this,arguments) 
	}else{ //if not, I am assuming it is MV.
		if(arguments.length==1)
		{
			console.log("Only one argument and not a rectangle.  I am guessing this is inheriting from a window that isn't updating")
		}
		
		var rectA=new Rectangle(0,0,0,0);
		if (SceneManager._scene.buyWindowRect)
		{
			rectA=SceneManager._scene.buyWindowRect(); //pick the defaults.
		}
		
		if(Imported.YEP_ShopMenuCore)
		{
			rectA.width=SceneManager._scene._dummyWindow.width
			rectA.height=SceneManager._scene._dummyWindow.height
		}
		var rect = new Rectangle(
		typeof(arguments[0]) == undefined? rectA.x : arguments[0],
		typeof(arguments[1]) == undefined? rectA.y : arguments[1],
		rectA.width||(this.windowWidth ? this.windowWidth() : 0) ||400,  
		rectA.height||Graphics.boxHeight||400
		);
		
		rectFixFinalWindowShopBuy.call(this,rect)
		
	}
	
};

var rectFixFinalWindowShopSell= Window_ShopSell.prototype.initialize;
Window_ShopSell.prototype.initialize = function(rect) {
	
	if (arguments.length && arguments[0].constructor.name=='Rectangle') // if our first argument is a rectangle this is MZ code
	{
		rectFixFinalWindowShopSell.apply(this,arguments) 
	}else{ //if not, I am assuming it is MV.
		if(arguments.length==1)
		{
			console.log("Only one argument and not a rectangle.  I am guessing this is inheriting from a window that isn't updating")
		}
		
		var rectA=new Rectangle(0,0,0,0);
		if (SceneManager._scene.sellWindowRect)
		{
			rectA=SceneManager._scene.sellWindowRect(); //pick the defaults.
		}
		if(Imported.YEP_ShopMenuCore)
		{
			rectA.width=SceneManager._scene._dummyWindow.width
			rectA.height=SceneManager._scene._dummyWindow.height
		}
		var rect = new Rectangle(
		typeof(arguments[0]) == undefined? rectA.x : arguments[0],
		typeof(arguments[1]) == undefined? rectA.y : arguments[1],
		rectA.width||(this.windowWidth ? this.windowWidth() : 0) ||400,  
		rectA.height||Graphics.boxHeight||400
		);
		
		rectFixFinalWindowShopSell.call(this,rect)
		
	}
	
};

var rectFixFinalWindowShopStatus= Window_ShopStatus.prototype.initialize;
Window_ShopStatus.prototype.initialize = function(rect) {
	
	if (arguments.length && arguments[0].constructor.name=='Rectangle') // if our first argument is a rectangle this is MZ code
	{
		rectFixFinalWindowShopStatus.apply(this,arguments) 
	}else{ //if not, I am assuming it is MV.
		if(arguments.length==1)
		{
			console.log("Only one argument and not a rectangle.  I am guessing this is inheriting from a window that isn't updating")
		}
		
		var rectA=new Rectangle(0,0,0,0);
		if (SceneManager._scene.actorWindowRect)
		{
			rectA=SceneManager._scene.actorWindowRect(); //pick the defaults.
		}
		var rect = new Rectangle(
		typeof(arguments[0]) == undefined? rectA.x : arguments[0],
		typeof(arguments[1]) == undefined? rectA.y : arguments[1],
		arguments[2]||rectA.width||(this.windowWidth ? this.windowWidth() : 0) ||400,  
		arguments[3]||rectA.height||Graphics.boxHeight||400
		);
		
		rectFixFinalWindowShopStatus.call(this,rect)
		
	}
	
};

var rectFixFinalWindowBattleEnemy= Window_BattleEnemy.prototype.initialize;
Window_BattleEnemy.prototype.initialize = function(rect) {
	
	if (arguments[0].constructor.name=='Rectangle') // if our first argument is a rectangle this is MZ code
	{
		rectFixFinalWindowBattleEnemy.apply(this,arguments) 
	}else{ //if not, I am assuming it is MV.
		if(arguments.length==1)
		{
			console.log("Only one argument and not a rectangle.  I am guessing this is inheriting from a window that isn't updating")
		}
		//seeing if this might be a better option for defaults.  Just check what it was set to earlier.
		var rectA=new Rectangle(0,0,0,0);
		if (SceneManager._scene.enemyWindowRect)
		{
			rectA=SceneManager._scene.enemyWindowRect(); //spawn the defaults.
		}
		var rect = new Rectangle(
		(typeof(arguments[0]) == undefined? rectA.x : arguments[0])||0,
		(typeof(arguments[1]) == undefined? rectA.y : arguments[1])||0,
		arguments[2]||rectA.width||400,  
		arguments[3]||rectA.height|400
		)
		rectFixFinalWindowBattleEnemy.call(this,rect)	
	}	
};


var rectFixFinalWindowHorzCommand= Window_HorzCommand.prototype.initialize;
Window_HorzCommand.prototype.initialize = function(rect) {
	
	if (arguments[0].constructor.name=='Rectangle') // if our first argument is a rectangle this is MZ code
	{
		rectFixFinalWindowHorzCommand.apply(this,arguments) 
	}else{ //if not, I am assuming it is MV.
		if(arguments.length==1)
		{
			console.log("Only one argument and not a rectangle.  I am guessing this is inheriting from a window that isn't updating")
		}
		var rect = new Rectangle(
		arguments[0], 
		arguments[1], 
		arguments[2]||(this.windowWidth ? this.windowWidth() : 0) ||400,  
		arguments[3]||(this.windowHeight ? this.windowHeight() : 0)||this.fittingHeight(this.numVisibleRows())||Graphics.boxHeight);
		
		rectFixFinalWindowHorzCommand.call(this,rect)
		
	}
	
};

var rectFixFinalWindowShopCommand= Window_ShopCommand.prototype.initialize;
Window_ShopCommand.prototype.initialize = function(rect) {
    	
	if((typeof(arguments[0])!='undefined' ) && arguments[0].constructor.name=='Rectangle') // if our first argument is a rectangle this is MZ code
	{
		rectFixFinalWindowShopCommand.apply(this,arguments) 
	}else{ //if not, I am assuming it is MV.
		//MV calls it with 
		//Window_ShopCommand(this._goldWindow.x, this._purchaseOnly);
		//which is width,purchaseonly
		//so we'll init with our MZ initialization
		//sadly yanfly does order differently so we have to hardcode this call for the shop core
		var rectA = new Rectangle();
		if(Fossil.pluginNameList.contains('YEP_ShopMenuCore'))
		{
			//copypaste the code out of rmmv_scenes
			const wx = 0;
			const wy = SceneManager._scene.mainAreaTop();
			const ww = arguments[0]||this.windowWidth();
			const wh = this.fittingHeight(this.numVisibleRows());//SceneManager._scene.calcWindowHeight(1, true);
			rectA = new Rectangle(wx, wy, ww, wh);
		}else{
			rectA = SceneManager._scene.commandWindowRect();		
			rectA.width=arguments[0]||rectA.width;
		}
		rectFixFinalWindowShopCommand.call(this,rectA)
		//then we will set the purchaseonly.
		this._purchaseOnly = arguments[1];
	}
};






var rectFixFinalWindowActorCommand= Window_ActorCommand.prototype.initialize;
Window_ActorCommand.prototype.initialize = function(rect) {
		if(arguments.length>0)
	{
		//if we have arguments that are missing in a weird order
		//(like having width and height but no x and y
		//then we should initialize them to 0.
		if (arguments[0]==undefined)
		{
			arguments[0]=0;
		}
		if (arguments[1]==undefined)
		{
			arguments[1]=0;
		}
		if (arguments[2]==undefined)
		{
			arguments[2]=0;
		}
		if (arguments[3]==undefined)
		{
			arguments[3]=0;
		}
		
	}else{
		//if arguments are zero length, throw a warning and set them to all be 0.
		if (Utils.isOptionValid('test'))
		{
			console.log('You created a window without defining the size!')
		}
		arguments=[0,0,0,0]
	}
	if (arguments[0].constructor.name=='Rectangle') // if our first argument is a rectangle this is MZ code
	{
		rectFixFinalWindowActorCommand.apply(this,arguments) 
	}else{ //if not, I am assuming it is MV.
		if(arguments.length==1)
		{
			console.log("Only one argument and not a rectangle.  I am guessing this is inheriting from a window that isn't updating")
		}
		var rect = new Rectangle(
		arguments[0], 
		arguments[1], 
		arguments[2]||(this.windowWidth ? this.windowWidth() : 0) ||400,  
		arguments[3]||(this.windowHeight ? this.windowHeight() : 0)||this.fittingHeight(this.numVisibleRows())||Graphics.boxHeight);
		
		rectFixFinalWindowActorCommand.call(this,rect)
		
	}
	
};
