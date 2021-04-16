 /*:
 * @plugindesc Fossil V0.1 is an interoperability layer for RMMZ, designed
 to make MV plugins work with it. 
 * So far, we support about 40 plugins.  You can help!
 * @author FOSSIL TEAM
 * @target MZ  
 
Fixing Old Software / Special Interoperability Layer (FOSSIL) Version 0.1

FOSSIL is an interoperability plugin.  
The purpose of this layer is to expand the use and usefulness of RPG MAKER MV plugins, by allowing them to work in RPG MAKER MZ projects.
Version 0.1 is a test to see how effective the concept is, focusing primarily upon window calls. 

So far we have interoperability with these MV plugins.  They seem to run with FOSSIL the same way they did in stock MV, free from all but a few little aesthetic glitches.  

==Fully Functional:==
-MOG_ActionName
-MOG_BattleHud
-MOG_BossHp
-MOG_ComboCounter
-MOG_CharacterMotion
-MOG_DizzyEffect
-MOG_EventIndicators
-MOG_TreasurePopup
-MOG_Weather_EX
-MOG_PickupThrow
-MOG_ActorHud
-MOG_GoldHud
-MOG_CharPoses
-MOG_EventSensor
-MOG_ChronoEngine
-MOG_ChronoATBHud
-MOG_ChronoEnemyHp
-MOG_ChronoToolHud
-MOG_ChronoCT

-Reval's Animated Enemies

-GALV_Questlog
-GALV_TimedMessagePopups
-GALV_RollCredits
-GALV_CharacterFrames
-GALV_CFStepSE
-GALV_CharacterAnimations
-GALV_DiagonalMovement

-YEP_SkillCore
-YEP_X_LimitedSkillUses
-YEP_MultiTypeSkills
-YEP_X_SkillCooldowns
-YEP_X_SkillCostItems
-YEP_InstantCast
-YEP_SkillMasteryLevels
-YEP_EquipCore  (Note: Item descriptions are shrunk to one line due to MZ leaving room for touchscreen buttons.)
-YEP_EquipRequirements
-YEP_WeaponUnleash
-YEP_GridFreeDoodads (Some of the UI is ugly, one editor textbox is cut off by the screen)
-YEP_X_ExtDoodadPack1



=Almost Functional:=
-YEP_SkillLearnSystem (Does not crash, but skill confirmation UI is glitched and looks ugly in a weird way.  Will need additional work for actual use in MZ games)




This is the 'pre' half of the plugin.  Put it ABOVE the supported plugins.


Terms of use:


All unique code in FOSSIL is licensed under a Creative Commons Attribution-ShareAlike 4.0 International License.  The remainder is taken from RPG Maker MV and RPG Maker MZ, and is covered under the appropriate licenses. No code from any existing plugin was used. Credit Restart, 'FOSSIL' or 'FOSSIL Team', and link back to the github or the forum thread.

In order to improve clarity, I am officially stating that the 'CC-BY-SA' only requires that code directly derived from FOSSIL be also put under a 'CC-BY-SA' license.  Any other assets in your game, (such as code, art, et cetera) as well as your game as a whole are [b]not[/b] considered to be 'derivative works' for this purpose.

*/

//Since the version number got reset with MZ, plugins that look for MV version number will get confused.  
//We save the correct version number one in this half of the plugin sandwich, then restore it afterwards!
Utils.MZ_VERSION= Utils.RPGMAKER_VERSION;
Utils.RPGMAKER_VERSION="1.7.1";  


ImageCache={};// The image cache works differently now, so let plugins that want to fiddle around with it play with a toy version :)
ImageCache.prototype={};
var Imported = Imported || {};
Imported.Fossil_Pre=true;
var Fossil =Fossil || {}
Fossil.version='0.1'



/*   

////////////////////////////////////////////////////////////
     Window Handling Code
\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

*/

// RMMZ puts color information into ColorManager.textColor() instead.
//so let's redirect any calls to the old windowbase solution to the new location
Window_Base.prototype.textColor = function(n) {
	return ColorManager.textColor(n);
}

//and here's a big block redirecting all those specific color picks.
Window_Base.prototype.crisisColor = function() { return ColorManager.crisisColor() }
Window_Base.prototype.ctGaugeColor1 = function() { return ColorManager.ctGaugeColor1() }
Window_Base.prototype.ctGaugeColor2 = function() { return ColorManager.ctGaugeColor2() }
Window_Base.prototype.deathColor = function() { return ColorManager.deathColor() }
Window_Base.prototype.gaugeBackColor = function() { return ColorManager.gaugeBackColor() }
Window_Base.prototype.hpGaugeColor1 = function() { return ColorManager.hpGaugeColor1() }
Window_Base.prototype.hpGaugeColor2 = function() { return ColorManager.hpGaugeColor2() }
Window_Base.prototype.mpCostColor = function() { return ColorManager.mpCostColor() }
Window_Base.prototype.mpGaugeColor1 = function() { return ColorManager.mpGaugeColor1() }
Window_Base.prototype.mpGaugeColor2 = function() { return ColorManager.mpGaugeColor2() }
Window_Base.prototype.normalColor = function() { return ColorManager.normalColor() }
Window_Base.prototype.pendingColor = function() { return ColorManager.pendingColor() }
Window_Base.prototype.powerDownColor = function() { return ColorManager.powerDownColor() }
Window_Base.prototype.powerUpColor = function() { return ColorManager.powerUpColor() }
Window_Base.prototype.systemColor = function() { return ColorManager.systemColor() }
Window_Base.prototype.tpCostColor = function() { return ColorManager.tpCostColor() }
Window_Base.prototype.tpGaugeColor1 = function() { return ColorManager.tpGaugeColor1() }
Window_Base.prototype.tpGaugeColor2 = function() { return ColorManager.tpGaugeColor2() }
Window_Base.prototype.paramchangeTextColor= function(change) {return ColorManager.paramchangeTextColor(change)}

//MZ uses rectangles instead of multiple numbers being passed in.
//There's even a special check in the MZ code that checks if you forgot a rectangle.
//But I figure, hey, why not make it flexible?  That way legacy code will still work. :)

var rectFixWindowBase= Window_Base.prototype.initialize;
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
		rectFixWindowBase.apply(this,arguments) 
	}else{ //if not, I am assuming it is MV.
		if(arguments.length==1)
		{
			console.log("Only one argument and not a rectangle.  I am guessing this is inheriting from a window that isn't updating")
		}
		var rect = new Rectangle(arguments[0], arguments[1], arguments[2]||400,  arguments[3]||Graphics.boxHeight);
		rectFixWindowBase.call(this,rect)
	}

};

var rectFixWindowSelectable= Window_Selectable.prototype.initialize;
Window_Selectable.prototype.initialize = function(rect) {
	if (arguments[0].constructor.name=='Rectangle') // if our first argument is a rectangle this is MZ code 
	{
		rectFixWindowSelectable.apply(this,arguments) 
	}else{ //if not, I am assuming it is MV. :)
		if(arguments.length==1)
		{
			console.log("Only one argument and not a rectangle.  I am guessing this is inheriting from a window that isn't updating")
		}
		var rect = new Rectangle(arguments[0], arguments[1], arguments[2]||400,  arguments[3]||Graphics.boxHeight);
		rectFixWindowSelectable.call(this,rect)
	}
	
};
//we have to do this each time for each window class :(
var rectFixWindowCommand= Window_Command.prototype.initialize;
Window_Command.prototype.initialize = function(rect) {
	
	if (arguments[0].constructor.name=='Rectangle') // if our first argument is a rectangle this is MZ code
	{
		rectFixWindowCommand.apply(this,arguments) 
	}else{ //if not, I am assuming it is MV.
		if(arguments.length==1)
		{
			console.log("Only one argument and not a rectangle.  I am guessing this is inheriting from a window that isn't updating")
		}
		var rect = new Rectangle(arguments[0], arguments[1], arguments[2]||(this.windowWidth ? this.windowWidth() : 0) ||400,  arguments[3]||(this.windowHeight ? this.windowHeight() : 0)||this.fittingHeight(this.numVisibleRows())||Graphics.boxHeight);
		rectFixWindowCommand.call(this,rect)
		
	}
	
};


var rectFixWindowSkillList= Window_SkillList.prototype.initialize;
Window_SkillList.prototype.initialize = function(rect) {
	if (arguments[0].constructor.name=='Rectangle') // if our first argument is a rectangle this is MZ code
	{
		rectFixWindowSkillList.apply(this,arguments) 
	}else{ //if not, I am assuming it is MV.
		if(arguments.length==1)
		{
			console.log("Only one argument and not a rectangle.  I am guessing this is inheriting from a window that isn't updating")
		}
		var rect = new Rectangle(arguments[0], arguments[1], arguments[2]||(this.windowWidth ? this.windowWidth() : 0)||400,  arguments[3]||(this.windowHeight ? this.windowHeight() : 0)||Graphics.boxHeight);
		rectFixWindowSkillList.call(this,rect)
	}

};

var rectFixWindowEquipCommand= Window_EquipCommand.prototype.initialize;
Window_EquipCommand.prototype.initialize = function(rect) {
	
	if (arguments[0].constructor.name=='Rectangle') // if our first argument is a rectangle this is MZ code
	{
		rectFixWindowEquipCommand.apply(this,arguments) 
	}else{ //if not, I am assuming it is MV.
		if(arguments.length==1)
		{
			console.log("Only one argument and not a rectangle.  I am guessing this is inheriting from a window that isn't updating")
		}
		var rect = new Rectangle(arguments[0], arguments[1], arguments[2]||(this.windowWidth ? this.windowWidth() : 0) ||400,  arguments[3]||(this.windowHeight ? this.windowHeight() : 0)||Graphics.boxHeight);
		rectFixWindowEquipCommand.call(this,rect)
		
	}
	
};

var rectFixWindowSkillStatus= Window_SkillStatus.prototype.initialize;
Window_SkillStatus.prototype.initialize = function(rect) {
	
	if (arguments[0].constructor.name=='Rectangle') // if our first argument is a rectangle this is MZ code
	{
		rectFixWindowSkillStatus.apply(this,arguments) 
	}else{ //if not, I am assuming it is MV.
		if(arguments.length==1)
		{
			console.log("Only one argument and not a rectangle.  I am guessing this is inheriting from a window that isn't updating")
		}
		var rect = new Rectangle(arguments[0], arguments[1], arguments[2]||(this.windowWidth ? this.windowWidth() : 0) ||400,  arguments[3]||(this.windowHeight ? this.windowHeight() : 0)||Graphics.boxHeight);
		rectFixWindowSkillStatus.call(this,rect)
		
	}
	
};

var rectFixWindowStatusBase= Window_StatusBase.prototype.initialize;
Window_StatusBase.prototype.initialize = function(rect) {
	
	if (arguments[0].constructor.name=='Rectangle') // if our first argument is a rectangle this is MZ code
	{
		rectFixWindowStatusBase.apply(this,arguments) 
	}else{ //if not, I am assuming it is MV.
		if(arguments.length==1)
		{
			console.log("Only one argument and not a rectangle.  I am guessing this is inheriting from a window that isn't updating")
		}
		var rect = new Rectangle(arguments[0], arguments[1], arguments[2]||(this.windowWidth ? this.windowWidth() : 0) ||400,  arguments[3]||(this.windowHeight ? this.windowHeight() : 0)||Graphics.boxHeight);
		rectFixWindowStatusBase.call(this,rect)
		
	}
	
};

var rectFixWindowItemList= Window_ItemList.prototype.initialize;
Window_ItemList.prototype.initialize = function(rect) {
	
	if (arguments[0].constructor.name=='Rectangle') // if our first argument is a rectangle this is MZ code
	{
		rectFixWindowItemList.apply(this,arguments) 
	}else{ //if not, I am assuming it is MV.
		if(arguments.length==1)
		{
			console.log("Only one argument and not a rectangle.  I am guessing this is inheriting from a window that isn't updating")
		}
		var rect = new Rectangle(arguments[0], arguments[1], arguments[2]||(this.windowWidth ? this.windowWidth() : 0) ||400,  arguments[3]||(this.windowHeight ? this.windowHeight() : 0)||Graphics.boxHeight);
		rectFixWindowItemList.call(this,rect)
		
	}
	
};

var rectFixWindowEquipSlot= Window_EquipSlot.prototype.initialize;
Window_EquipSlot.prototype.initialize = function(rect) {
	
	if (arguments[0].constructor.name=='Rectangle') // if our first argument is a rectangle this is MZ code
	{
		rectFixWindowEquipSlot.apply(this,arguments) 
	}else{ //if not, I am assuming it is MV.
		if(arguments.length==1)
		{
			console.log("Only one argument and not a rectangle.  I am guessing this is inheriting from a window that isn't updating")
		}
		var rect = new Rectangle(arguments[0], arguments[1], arguments[2]||(this.windowWidth ? this.windowWidth() : 0) ||400,  arguments[3]||(this.windowHeight ? this.windowHeight() : 0)||Graphics.boxHeight);
		rectFixWindowEquipSlot.call(this,rect)
		
	}
	
};

var rectFixWindowEquipItem= Window_EquipItem.prototype.initialize;
Window_EquipItem.prototype.initialize = function(rect) {
	
	if (arguments[0].constructor.name=='Rectangle') // if our first argument is a rectangle this is MZ code
	{
		rectFixWindowEquipItem.apply(this,arguments) 
	}else{ //if not, I am assuming it is MV.
		if(arguments.length==1)
		{
			console.log("Only one argument and not a rectangle.  I am guessing this is inheriting from a window that isn't updating")
		}
		var rect = new Rectangle(arguments[0], arguments[1], arguments[2]||(this.windowWidth ? this.windowWidth() : 0) ||400,  arguments[3]||(this.windowHeight ? this.windowHeight() : 0)||Graphics.boxHeight);
		rectFixWindowEquipItem.call(this,rect)
		
	}
	
};

var rectFixWindowGold= Window_Gold.prototype.initialize;
Window_Gold.prototype.initialize = function(rect) {
	
	if (arguments[0].constructor.name=='Rectangle') // if our first argument is a rectangle this is MZ code
	{
		rectFixWindowGold.apply(this,arguments) 
	}else{ //if not, I am assuming it is MV.
		if(arguments.length==1)
		{
			console.log("Only one argument and not a rectangle.  I am guessing this is inheriting from a window that isn't updating")
		}
		var rect = new Rectangle(arguments[0], arguments[1], arguments[2]||(this.windowWidth ? this.windowWidth() : 0) ||400,  arguments[3]||(this.windowHeight ? this.windowHeight() : 0)||Graphics.boxHeight);
		rectFixWindowGold.call(this,rect)
		
	}
	
};


var rectFixWindowHelp= Window_Help.prototype.initialize;
Window_Help.prototype.initialize = function(rect) {
	
	if ((arguments[0]!==undefined) && (arguments[0].constructor.name=='Rectangle')) // if our first argument is a rectangle this is MZ code
	{
		rectFixWindowHelp.apply(this,arguments) 
	}else{ //if not, I am assuming it is MV.
		if(arguments.length==1)
		{
			console.log("Only one argument and not a rectangle.  I am guessing this is inheriting from a window that isn't updating")
		}
		//RMMV passes this in with a single argument, which is how many lines of text
		//there are
		var rect = new Rectangle(
		0, 
		0, 
		Graphics.boxWidth||(this.windowWidth ? this.windowWidth() : 0) ||400,  
		(this.windowHeight ? this.windowHeight() : 0)||this.fittingHeight(arguments[0]||2)||Graphics.boxHeight);
		
		rectFixWindowHelp.call(this,rect)
		
	}
	
};

var rectFixWindowTitleCommand= Window_TitleCommand.prototype.initialize;
Window_TitleCommand.prototype.initialize = function(rect) {
	if (arguments.length==0)
	{//RMMV doesn't take arguments for the title command window.
		var x = (Graphics.boxWidth - this.width) / 2;
		var y = Graphics.boxHeight - this.height - 96;
		var width=240;
		var height=this.fittingHeight(this.numVisibleRows())
		var rect = new Rectangle(x,y,width,height);
		rectFixWindowTitleCommand.call(this,rect)
		return;
	}
	if (arguments[0].constructor.name=='Rectangle') // if our first argument is a rectangle this is MZ code
	{
		rectFixWindowTitleCommand.apply(this,arguments) 
	}else{ //if not, I am assuming it is MV.
		if(arguments.length==1)
		{
			console.log("Only one argument and not a rectangle.  I am guessing this is inheriting from a window that isn't updating")
		}
		var rect = new Rectangle(arguments[0], arguments[1], arguments[2]||(this.windowWidth ? this.windowWidth() : 0) ||400,  arguments[3]||(this.windowHeight ? this.windowHeight() : 0)||this.fittingHeight(this.numVisibleRows())||Graphics.boxHeight);
		rectFixWindowTitleCommand.call(this,rect)
		
	}
	
};


var rectFixWindowBattleSkill= Window_BattleSkill.prototype.initialize;
Window_BattleSkill.prototype.initialize = function(rect) {
	
	if (arguments[0].constructor.name=='Rectangle') // if our first argument is a rectangle this is MZ code
	{
		rectFixWindowBattleSkill.apply(this,arguments) 
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
		
		rectFixWindowBattleSkill.call(this,rect)
		
	}
	
};

var rectFixWindowBattleItem= Window_BattleItem.prototype.initialize;
Window_BattleItem.prototype.initialize = function(rect) {
	
	if (arguments[0].constructor.name=='Rectangle') // if our first argument is a rectangle this is MZ code
	{
		rectFixWindowBattleItem.apply(this,arguments) 
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
		
		rectFixWindowBattleItem.call(this,rect)
		
	}
	
};

var rectFixWindowHorzCommand= Window_HorzCommand.prototype.initialize;
Window_HorzCommand.prototype.initialize = function(rect) {
	
	if (arguments[0].constructor.name=='Rectangle') // if our first argument is a rectangle this is MZ code
	{
		rectFixWindowHorzCommand.apply(this,arguments) 
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
		
		rectFixWindowHorzCommand.call(this,rect)
		
	}
	
};


var rectFixWindowActorCommand= Window_ActorCommand.prototype.initialize;
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
		rectFixWindowActorCommand.apply(this,arguments) 
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
		
		rectFixWindowActorCommand.call(this,rect)
		
	}
	
};

/*
///////////////////////////////////////////////////////////

\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

*/

//RMMV put drawActorName into Window_Base.  
//RMMZ only puts it into Window_StatusBase.  hook into the new version.

Window_Base.prototype.drawActorCharacter = function(actor, x, y) {	Window_StatusBase.prototype.drawActorCharacter.call(this,actor, x, y) }
Window_Base.prototype.drawActorClass = function(actor, x, y, width) {	Window_StatusBase.prototype.drawActorClass.call(this,actor, x, y, width) }
Window_Base.prototype.drawActorFace = function( actor, x, y, width, height){	Window_StatusBase.prototype.drawActorFace.call(this, actor, x, y, width, height)}
Window_Base.prototype.drawActorIcons = function(actor, x, y, width) {	Window_StatusBase.prototype.drawActorIcons.call(this,actor, x, y, width) }
Window_Base.prototype.drawActorLevel = function(actor, x, y) {	Window_StatusBase.prototype.drawActorLevel.call(this,actor, x, y) }
Window_Base.prototype.drawActorName = function(actor, x, y, width) {	Window_StatusBase.prototype.drawActorName.call(this,actor, x, y, width) }
Window_Base.prototype.drawActorNickname = function(actor, x, y, width) {	Window_StatusBase.prototype.drawActorNickname.call(this,actor, x, y, width) }


//scrolling works differently, so translate the old reset scroll into the new idiom.
Window_Selectable.prototype.resetScroll = function() {
    this.scrollTo(0, 0);
};

//hook the old slot system into the new
Window_EquipSlot.prototype.slotName = function(index) {
	return this.actorSlotName(this._actor,index)
};


var fixnewLineX= Window_Message.prototype.newLineX
Window_Message.prototype.newLineX = function(textState) 
{
	//textstate is now a passed-in argument instead of a property.
	var textState = textState || this._textState;
	return fixnewLineX.call(this,textState)
};


Window_Command.prototype.windowWidth = function() {
    return 240;
};

Window_Gold.prototype.windowWidth = function() {
    return 240;
};

Window_ActorCommand.prototype.windowWidth = function() {
    return 192;
};

Window_ActorCommand.prototype.numVisibleRows = function() {
    return 4;
};

Window_Gold.prototype.windowHeight = function() {
    return this.fittingHeight(1);
};

Window_Command.prototype.windowHeight = function() {
    return this.fittingHeight(this.numVisibleRows());
};

//port over the MV code for rectangular text areas.
Window_Selectable.prototype.itemRectForText = function(index) {
    var rect = this.itemRect(index);
    rect.x += this.textPadding();
    rect.width -= this.textPadding() * 2;
    return rect;
};


//Inherit a bunch of magic numbers, and define ones that weren't used in MZ.  
// I wish there was a less ugly way to do this :(
Window_Selectable.prototype.spacing = function() {
    return 48;
};
Window_Base.prototype.textPadding = function() {
    return 6;
};
Window_Base._iconWidth = ImageManager.iconWidth;
Window_Base._iconHeight = ImageManager.iconHeight;
Window_Base._faceWidth = ImageManager.faceWidth
Window_Base._faceHeight = ImageManager.faceHeight
Sprite_StateIcon._iconWidth = ImageManager.iconWidth;
Sprite_StateIcon._iconHeight = ImageManager.iconHeight;

Window_Base.prototype.standardPadding = function() {
    return 18;
};


Window_Command.prototype.normalColor = function() {
    return "#FFFFFF";
};

Window_Selectable.prototype.gaugeBackColor = function() {
    return "#000000";
};


Window_Command.prototype.numVisibleRows = function() {
	if (!this._list)
	{
		return 7;//default to 7 if we don't know how many rows we need.  Might as well hope we're lucky :)
	}
    return Math.ceil(this.maxItems() / this.maxCols());
};

Window_HorzCommand.prototype.numVisibleRows = function() {
	if (!this._list)
	{
		return 1;//default to 1 if we don't know how many rows we need, if this is horizontal
	}
    return Math.ceil(this.maxItems() / this.maxCols());
};


/**
 * Copied out of RMMV
 * 
 * Sets the x, y, width, and height all at once.
 *
 * @method move
 * @param {Number} x The x coordinate of the window layer
 * @param {Number} y The y coordinate of the window layer
 * @param {Number} width The width of the window layer
 * @param {Number} height The height of the window layer
 */
WindowLayer.prototype.move = function(x, y, width, height) {
	this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
}

//the battlemanager no longer is directly attached to the statuswindow in MZ
//so when people want to refresh the status window using it, we'll direct them
//to the new location.
BattleManager.refreshStatus = function() {
	SceneManager._scene._statusWindow.refresh();
}

/*
	Skill Gauge modifications!

	I am altering the skill gauges so that they can take in item/armor/weapon counts,
	instead of just individual battler stats.
	

*/


var SpriteGaugeCurrent = Sprite_Gauge.prototype.currentValue
Sprite_Gauge.prototype.currentValue = function() {
	if (this._statusType.substring(0,4) == 'item')
	{
		return $gameParty.numItems($dataItems[this._statusType.substring(4)-0]) ;
	}else if (this._statusType.substring(0,5) == 'armor'){
		return $gameParty.numItems($dataArmors[this._statusType.substring(5)-0]) ;
	}else if (this._statusType.substring(0,6) == 'weapon'){
		//this doesn't count equipped stuff, but I don't think you want to burn those for skills anyway.
		return $gameParty.numItems($dataWeapons[this._statusType.substring(6)-0]) ;
	}
    return SpriteGaugeCurrent.call(this);
};

var SpriteGaugeMax = Sprite_Gauge.prototype.currentMaxValue 
Sprite_Gauge.prototype.currentMaxValue = function() {
	if (this._statusType.substring(0,4) == 'item')
	{
		//There's no single good answer to the question of how high this maximum should be
		//Saying '99' or other inventorymax value is likely going to end up with the bar 
		//only having a tiny sliver of it full for basically the whole game, and you'll need to squint
		//to see a difference between 0 and 1.
		//
		//Instead, the bar is totally full if you have items left, and totally empty if you don't.
		//
		 return Math.max($gameParty.numItems($dataItems[this._statusType.substring(4)-0]) ,1);
	}else if (this._statusType.substring(0,5) == 'armor'){
		return Math.max($gameParty.numItems($dataArmors[this._statusType.substring(5)-0]) ,1);
	}else if (this._statusType.substring(0,6) == 'weapon'){
		//this doesn't count equipped stuff, but I don't think you want to burn those for skills anyway.
		return Math.max($gameParty.numItems($dataWeapons[this._statusType.substring(6)-0]) ,1);
	}
	return SpriteGaugeMax.call(this);
};

var SpriteGaugeLabel = Sprite_Gauge.prototype.label

Sprite_Gauge.prototype.label = function() {
	if (this._statusType.substring(0,4) == 'item')
	{
		return $dataItems[this._statusType.substring(4)-0].name ;
	}else if (this._statusType.substring(0,5) == 'armor'){
		return $dataArmors[this._statusType.substring(5)-0].name ;
	}else if (this._statusType.substring(0,6) == 'weapon'){
		//this doesn't count equipped stuff, but I don't think you want to burn those for skills anyway.
		return $dataWeapons[this._statusType.substring(6)-0].name ;
	}
    return SpriteGaugeLabel.call(this);
};


/*   

////////////////////////////////////////////////////////////
     Sprite Handling Code
\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

*/


//RMMZ arranges sprite types differently than RMMV does.  It doesn't even have a Sprite_Base class.
//This is actually really handy!  I can copy over the Sprite_Base definition, and use it
//without any worries.  And since all Sprite_Base things will be RMMV imports, that means
//that they can be altered without worrying about breaking RMMZ sprites. :)
//Anyway, here's the Sprite_Base from RMMV.  
function Sprite_Base() {
    this.initialize.apply(this, arguments);
}

Sprite_Base.prototype = Object.create(Sprite.prototype);
Sprite_Base.prototype.constructor = Sprite_Base;

Sprite_Base.prototype.initialize = function() {
    Sprite.prototype.initialize.call(this);
    this._animationSprites = [];
    this._effectTarget = this;
    this._hiding = false;
};

Sprite_Base.prototype.update = function() {
    Sprite.prototype.update.call(this);
    this.updateVisibility();
    this.updateAnimationSprites();
};

Sprite_Base.prototype.hide = function() {
    this._hiding = true;
    this.updateVisibility();
};

Sprite_Base.prototype.show = function() {
    this._hiding = false;
    this.updateVisibility();
};

Sprite_Base.prototype.updateVisibility = function() {
    this.visible = !this._hiding;
};

Sprite_Base.prototype.updateAnimationSprites = function() {
    if (this._animationSprites.length > 0) {
        var sprites = this._animationSprites.clone();
        this._animationSprites = [];
        for (var i = 0; i < sprites.length; i++) {
            var sprite = sprites[i];
            if (sprite.isPlaying()) {
                this._animationSprites.push(sprite);
            } else {
                //sprite.remove();
				sprite.destroy(); //RMMZ is more hardcore than RMMV
            }
        }
    }
};

Sprite_Base.prototype.startAnimation = function(animation, mirror, delay) {
    var sprite = new Sprite_Animation();
    sprite.setup(this._effectTarget, animation, mirror, delay);
    this.parent.addChild(sprite);
    this._animationSprites.push(sprite);
};

Sprite_Base.prototype.isAnimationPlaying = function() {
    return this._animationSprites.length > 0;
};



//dummy out this function; this is what makes the loading bar moveAbove
//but RMMZ uses a spinner instead!
Graphics.updateLoading = function() {
}




//RMMV calls them 'normal' bitmaps, RMMZ doesn't, I guess RMMZ is just abnormal.
//I am discarding the hue information here because RMMZ does things differently,
//and more efficiently.
//If you need a hue shift on a sprite, use a 'this.setHue(hue)' injection instead.
//sadly, since this is an imagemanager, I can't just stick a setHue in here and solve
//that issue preemptively. :(
ImageManager.loadNormalBitmap = function(url, hue) {
    const cache = url.includes("/system/") ? this._system : this._cache;
    if (!cache[url]) {
        cache[url] = Bitmap.load(url);
    }
    return cache[url];

};

//This rotate hue method from RMMV is very inefficient.
//However, because some old plugins directly blt images together
// I'm including it.  Try to avoid using it if possible - you should never
//need to rotatehue for something that's going into a sprite.
/**
 * Rotates the hue of the entire bitmap.
 *
 * @method rotateHue
 * @param {Number} offset The hue offset in 360 degrees
 */
Bitmap.prototype.rotateHue = function(offset) {
    function rgbToHsl(r, g, b) {
        var cmin = Math.min(r, g, b);
        var cmax = Math.max(r, g, b);
        var h = 0;
        var s = 0;
        var l = (cmin + cmax) / 2;
        var delta = cmax - cmin;

        if (delta > 0) {
            if (r === cmax) {
                h = 60 * (((g - b) / delta + 6) % 6);
            } else if (g === cmax) {
                h = 60 * ((b - r) / delta + 2);
            } else {
                h = 60 * ((r - g) / delta + 4);
            }
            s = delta / (255 - Math.abs(2 * l - 255));
        }
        return [h, s, l];
    }

    function hslToRgb(h, s, l) {
        var c = (255 - Math.abs(2 * l - 255)) * s;
        var x = c * (1 - Math.abs((h / 60) % 2 - 1));
        var m = l - c / 2;
        var cm = c + m;
        var xm = x + m;

        if (h < 60) {
            return [cm, xm, m];
        } else if (h < 120) {
            return [xm, cm, m];
        } else if (h < 180) {
            return [m, cm, xm];
        } else if (h < 240) {
            return [m, xm, cm];
        } else if (h < 300) {
            return [xm, m, cm];
        } else {
            return [cm, m, xm];
        }
    }

    if (offset && this.width > 0 && this.height > 0) {
        offset = ((offset % 360) + 360) % 360;
        var context = this._context;
        var imageData = context.getImageData(0, 0, this.width, this.height);
        var pixels = imageData.data;
        for (var i = 0; i < pixels.length; i += 4) {
            var hsl = rgbToHsl(pixels[i + 0], pixels[i + 1], pixels[i + 2]);
            var h = (hsl[0] + offset) % 360;
            var s = hsl[1];
            var l = hsl[2];
            var rgb = hslToRgb(h, s, l);
            pixels[i + 0] = rgb[0];
            pixels[i + 1] = rgb[1];
            pixels[i + 2] = rgb[2];
        }
        context.putImageData(imageData, 0, 0);
        //this._setDirty();
    }
};



//some plugins try to deal with the pixi tilemap.  Normally this is just pushing a new value to it
//placeholder to avoid crashing.
PIXI.tilemap={}
PIXI.tilemap.TileRenderer={}

//in MV window.onload was the function that ran right after plugins and started the game.
// MZ's load process is different, and sadly since classes are immutable you can't 
// simply patch into main :(

//instead I'm sticking it into Scene_Boot
//and putting in an empty window.onload

 window.onload = function ()
 {
	//a target for injecting before-title-screen code.
	//or it should be, anyway, once I find a place to put it
	//as is, this is where code goes to die. :(
 }
 

/* var oldSceneBootInit= Scene_Boot.prototype.initialize;
Scene_Boot.prototype.initialize = function () {
	oldSceneBootInit.apply(arguments);
	window.onload();
} */
	
//load fonts with the new version
Graphics.loadFont = function(name, url) {
	//in RMMV font loading includes the /font/ tag, but in MZ it doesn't!  Remove that
	if(url.substring(0,6) == 'fonts/')
	{
		url=url.substring(6);
	}
	
	FontManager.load(name,url);
}



Sprite_Animation.prototype.updateFlash = function() {
    if (this._flashDuration > 0) {
        const d = this._flashDuration--;
        this._flashColor[3] *= (d - 1) / d;
		
        if(this._targets.length)
        {
            for (const target of this._targets) {
                target.setBlendColor(this._flashColor);
            }
			
        }else{
			
			if(this._target)
			{
				this._target.setBlendColor(this._flashColor)
			}
        }
    }
};

Sprite_Animation.prototype.targetSpritePosition = function(sprite) {

    const point = new Point(0, -sprite.height / 2);
    if (this._animation.alignBottom) {
        point.y = 0;
    }
	//sprites don't always have parents in MV.  Those poor orphan sprites ... :(
	if(sprite.parent)
	{
		sprite.updateTransform();
	}
    return sprite.worldTransform.apply(point);
};

//make characters be able to request animations again!
//uses the new ones (obvs)
Game_CharacterBase.prototype.requestAnimation = function(animationId) {
    $gameTemp.requestAnimation([this], animationId);
};


//MV includes the '.js' in filenames when calling plugins
//MZ does not.  Check if it's there, and if it is, remove it.
var fixPluginManagerLoadScript= PluginManager.loadScript
PluginManager.loadScript = function(name) {
	if(name.substring(name.length-3)=='.js')
	{
		if (Utils.isOptionValid('test'))
		{
			console.log('trimmed a .js off a plugin call')
		}
		name=name.substring(0,name.length-3)
		
	}
	fixPluginManagerLoadScript.call(this,name);
};



//RMMZ does this as a transform all at once.
//RMMV does x and y as different functions.
//It's inefficient to do it twice, but whatever, it's running a transform
//twice per click, that's nothing.
Window_Base.prototype.canvasToLocalX = function(x) {
    const touchPos = new Point(TouchInput.x, TouchInput.y);
    const localPos = this.worldTransform.applyInverse(touchPos);
    return localPos.x;
};

Window_Base.prototype.canvasToLocalY = function(y) {
    const touchPos = new Point(TouchInput.x, TouchInput.y);
    const localPos = this.worldTransform.applyInverse(touchPos);
    return localPos.y;
};


var addToneToSpritesetBaseInitialize =Spriteset_Base.prototype.initialize
Spriteset_Base.prototype.initialize = function(){
	addToneToSpritesetBaseInitialize.call(this);
	this.createToneChanger();
}


//this is a dummy function for injection (mog needs it)
Spriteset_Base.prototype.createToneChanger = function() {
    //dummy function for injection!
};