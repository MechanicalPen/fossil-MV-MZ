 /*:
 * @plugindesc Fossil V0.1 is an interoperability layer for RMMZ, designed
 to make MV plugins work with it. 
 * So far, we support over 100 plugins.  You can help!
 * @author FOSSIL TEAM
 * @target MZ  
 
 * @command useOldPlugin
 * @text 'Enter MV plugin commands'
 * @desc 'They're back! Enter them the same way you used to.'

 * @arg OldPluginCommand
 * @text
 * @ desc Identical to MV's commands.


 
Fixing Old Software / Special Interoperability Layer (FOSSIL) Version 0.1

FOSSIL is an interoperability plugin.  
The purpose of this layer is to expand the use and usefulness of RPG MAKER MV plugins, by allowing them to work in RPG MAKER MZ projects.
Version 0.1 is a test to see how effective the concept is, focusing primarily upon window calls. 

So far we have interoperability with these MV plugins.  They seem to run with FOSSIL the same way they did in stock MV, free from all but a few little aesthetic glitches.  

To invoke old plugin commands, either use the built in OldPluginCommand plugin command, or put oldCommand('whateverthecommandwas') in a script.

///////////////////////////////////////////////////////////////////////
==Fully Functional==  (Alphabetical by plugin maker, then roughly by plugin order)
///////////////////////////////////////////////////////////////////////

-GALV_Questlog
-GALV_TimedMessagePopups
-GALV_RollCredits
-GALV_CharacterFrames
-GALV_CFStepSE
-GALV_CharacterAnimations
-GALV_DiagonalMovement

-MOG_ActionName
-MOG_BattleHud
-MOG_BattleResult
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
*MOG_ChronoEngine
-MOG_ChronoATBHud
-MOG_ChronoEnemyHp
-MOG_ChronoToolHud
-MOG_ChronoCT

-Reval's Animated Enemies

-Shaz_TileChanger

-SRD_SummonCore
-SRD_ReplaceSummons
-SRD_ShakingText 
-SRD_ActorSelect

-VLUE Game Time MV 1.1c
-VLUE questsystem

-WAY_Core (note: requires Fossil_Post_Way to be the NEXT plugin beneath it, or all MZ plugin commands will break.)
-WAY_StorageSystem
-WAY_OptionsMenuCustomActions
-WAY_VerticalScreenShake
-WAY_CustomOnDeathEval
-WAY_Achievements

*YEP_BattleEngineCore	(Note: I haven't added functionality for ATB, since the base plugin doesn't support it. I tried but it was too hard for me.  Sorry!)
-YEP_X_ActionSeqPack1
-YEP_X_ActionSeqPack2
-YEP_X_ActionSeqPack3
-YEP_X_AnimatedSVEnemies
-YEP_X_CounterControl
-YEP_X_InBattleStatus
-YEP_SelfSwVar
*YEP_BuffsStatesCore
-YEP_X_ExtDoT
-YEP_X_StateCategories
-YEP_X_VisualStateFX
-YEP_Z_StateProtection
*YEP_DamageCore
-YEP_X_ArmorScaling
-YEP_X_CriticalControl
-YEP_Z_CriticalSway
*YEP_ElementCore
-YEP_VictoryAftermath
-YEP_HitAccuracy
*YEP_ItemCore
-YEP_X_AttachAugments
-YEP_X_ItemDiscard
-YEP_X_ItemCategories
-YEP_X_ItemPictureImg
-YEP_X_ItemRename
-YEP_X_ItemRequirements
-YEP_X_ItemUpgradeSlots
-YEP_X_ItemSynthesis
*YEP_SkillCore
-YEP_X_LimitedSkillUses
-YEP_MultiTypeSkills
-YEP_PartyLimitGauge
-YEP_X_SkillCooldowns
-YEP_X_SkillCostItems
-YEP_InstantCast
-YEP_SkillLearnSystem 
-YEP_SkillMasteryLevels
*YEP_EquipCore
-YEP_EquipRequirements
-YEP_WeaponUnleash
*YEP_StatusMenuCore
*YEP_AutoPassiveStates
*YEP Equip Battle Skills
-YEP_X_EBSAllowedTypes
-YEP_X_EquipSkillTiers
*YEP_MoveRouteCore
-YEP_X_ExtMovePack1
-YEP_EventChasePlayer
-YEP_X_EventChaseStealth
-YEP_EventMorpher
-YEP_EventSpawner
-YEP_BaseTroopEvents
-YEP_FootstepSounds
*YEP_GridFreeDoodads
-YEP_X_ExtDoodadPack1
-YEP_PictureSpriteSheets
-YEP_RegionEvents
-YEP_RegionRestrictions
-YEP_SaveEventLocations

///////////////////////////////////////////////////////////////////////
==Almost Functional with UI issues==
///////////////////////////////////////////////////////////////////////
-YEP_X_ItemDurability (there's no obvious place to display the durability stat)

///////////////////////////////////////////////////////////////////////
==Special Cases==
///////////////////////////////////////////////////////////////////////
*YEP_MessageCore: Requires dedicated plugins: FOSSIL_Pre_MessageCore & FOSSIL_Post_MessageCore, and word wrap doesn't like fast text advancement.
-YEP_X_ExtMesPack1 (Works AFAICT, except for above word wrap issues with message core)
-YEP_X_ExtMesPack2 (Works AFAICT, except for above word wrap issues with message core)



This is the 'pre' half of the plugin.  Put it ABOVE the supported plugins.


Terms of use:


All unique code in FOSSIL is licensed under a Creative Commons Attribution-ShareAlike 4.0 International License.  The remainder is taken from RPG Maker MV and RPG Maker MZ, and is covered under the appropriate licenses. No code from any existing plugin was used. Credit Restart, 'FOSSIL' or 'FOSSIL Team', and link back to the github or the forum thread.

In order to improve clarity, I am officially stating that the 'CC-BY-SA' only requires that code directly derived from FOSSIL be also put under a 'CC-BY-SA' license.  Any other assets in your game, (such as code, art, et cetera) as well as your game as a whole are [b]not[/b] considered to be 'derivative works' for this purpose.

*/

//Since the version number got reset with MZ, plugins that look for MV version number will get confused.  
//We save the correct version number one in this half of the plugin sandwich, then restore it afterwards!
Utils.MZ_VERSION= Utils.RPGMAKER_VERSION;
Utils.RPGMAKER_VERSION="1.7.1";  
//if we are running MZ we have webgl.
Graphics.hasWebGL=function(){return true}
Graphics.isWebGL=function(){return true}
//alias these again.
Graphics.BLEND_NORMAL = PIXI.BLEND_MODES["NORMAL"];
Graphics.BLEND_ADD = PIXI.BLEND_MODES["ADD"];
Graphics.BLEND_MULTIPLY = PIXI.BLEND_MODES["MULTIPLY"];
Graphics.BLEND_SCREEN = PIXI.BLEND_MODES["SCREEN"];


var Imported = Imported || {};
Imported.Fossil_Pre=true;
var Fossil =Fossil || {}
Fossil.version='0.2.01'


//get a list of what plugins we have installed.  This is necessary because
//we are acting BEFORE we can see that handy Imported convention, and because
//not everyone is nice enough to do that.
Fossil.pluginNameList =  $plugins.map(a => a.name);
if (Fossil.pluginNameList[0] !== 'FOSSIL_Pre')
{
	console.log('FOSSIL_Pre should probably be your first plugin')
	
}

oldCommand = function (oldPluginCommand)
{
	//command356 is still in, just depreciated.  Use that code to invoke.
	const args = oldPluginCommand.split(" ");
    const command = args.shift();
	//initial params (unused in mz).
	var fossilInterpreter = new Game_Interpreter()
	fossilInterpreter._params=[]
	//apparently some MV people like to just read the whole thing raw.  :o
	fossilInterpreter._params[0]=oldPluginCommand;
    fossilInterpreter.pluginCommand(command, args);
    return true;
	
}

PluginManager.registerCommand('FOSSIL_Pre', 'useOldPlugin' , args => {
	const oldPluginCommand = String(args.OldPluginCommand );
	oldCommand(oldPluginCommand)
});


//alter our buttondata in order to include an option for no button type being provided
//as MV doesn't provide this information.  Value is a guess but seems to work.
Sprite_Button.prototype.buttonData = function() {
    const buttonTable = {
		undefined: {x:0 , w:2},
        cancel: { x: 0, w: 2 },
        pageup: { x: 2, w: 1 },
        pagedown: { x: 3, w: 1 },
        down: { x: 4, w: 1 },
        up: { x: 5, w: 1 },
        down2: { x: 6, w: 1 },
        up2: { x: 7, w: 1 },
        ok: { x: 8, w: 2 },
        menu: { x: 10, w: 1 }
    };
    return buttonTable[this._buttonType];
};

//In RMMZ state icons scale with enemies
//in RMMV they do not
//due to the state icons being an excerpt from a bitmap, this means that if you scale a sprite
//you get an irritating invisible state icon frame if they don't have a state
//this fixes that.
Fossil.fixSprite_Enemy_updateBitmapStateIcon =   Sprite_Enemy.prototype.updateBitmap;
Sprite_Enemy.prototype.updateBitmap = function() 
{
	Fossil.fixSprite_Enemy_updateBitmapStateIcon.call(this);
	if(this._enemy.stateIcons().length==0)
	{
		//the frame still shows up even when scaling is implemented, 
		//possibly due to subpixel rounding.
		//if you can't make it stay still, just make it vanish
		this.children[0].visible=false;
	}else{
		//prevent the state icon from scaling with enemies.
		this.children[0].visible=true;
		this.children[0].scale.y = 1/this.scale.y;
		this.children[0].scale.x = 1/this.scale.x;
	}
	
}

//Making custom gauges is more difficult in MZ, because they default is hard-coded to be
//only for a few specific battler stats.
//I am making a custom gauge class (which other people can use if they want), which 
//can reference an arbitary expression for the maxval and targetval


/* 
//example in a window
this.placeFossilGauge('testGauge','$gamePlayer.x','$gameMap.width()','xcoord',50,50,300,50)
//this will monitor the game player's x position, out of how many tiles across the map is.

// If you put in the string 'rate' as the maxExpression
// then it will just use currentExpression as a numerical value (so 0.5 = half full)
// the target param gets stored into this._target
*/

Window_Base.prototype.placeFossilGauge = function(gaugeID, currentExpression, maxExpression,label,x,y,width,height,target) {

	const newGauge = this.fossilCreateInnerSprite(gaugeID, Fossil_Sprite_Gauge);
    newGauge.setup(currentExpression, maxExpression,target)
    newGauge.setupSize(x,y,width,height)
    newGauge._label = label;
	newGauge.show()
	newGauge.drawGauge();
	return newGauge;
};


//create a generic inner sprite for window_base, allowing us to put gauges in any window
Window_Base.prototype.fossilCreateInnerSprite = function(key, spriteClass) {
	this._additionalSprites=this._additionalSprites||{};
    return Window_StatusBase.prototype.createInnerSprite.apply(this,arguments)
};

function Fossil_Sprite_Gauge() {
    this.initialize(...arguments);
}

Fossil_Sprite_Gauge.prototype = Object.create(Sprite_Gauge.prototype);
Fossil_Sprite_Gauge.prototype.constructor = Fossil_Sprite_Gauge;

Fossil_Sprite_Gauge.prototype.initialize = function(rect) {
	if(rect)
	{
		this._barlength=rect.width;
		this._thickness=rect.height;
		this.move(rect.x,rect.y)
	}
	Sprite_Gauge.prototype.initialize.call(this);
    this.initMembers();
    this.createBitmap();
	
};

Fossil_Sprite_Gauge.prototype.setup = function(currentExpression, maxExpression,target) {
	this._target=target||this;//target yourself if you don't have anyone to play with
    this._currentExpression=currentExpression;
	this._maxExpression=maxExpression;
    this._value = this.currentValue();
    this._maxValue = this.currentMaxValue();
    this.updateBitmap();
};


Fossil_Sprite_Gauge.prototype.setupSize = function(x,y,barlength,thickness) {
    if(barlength){this._barlength=barlength};
	if(thickness){this._thickness=thickness};
	this.move(x,y)
	this.createBitmap();//push our change in thickness
};


//commment this out, but leave for injection
Fossil_Sprite_Gauge.prototype.updateFlashing = function() {
}

Fossil_Sprite_Gauge.prototype.bitmapWidth = function() {
    return this._barlength||128;
};

Fossil_Sprite_Gauge.prototype.bitmapHeight = function() {
    return this._thickness+12||24;
};

Fossil_Sprite_Gauge.prototype.gaugeHeight = function() {
    return this._thickness||12;
};

Fossil_Sprite_Gauge.prototype.gaugeX = function() {
    if (this._label === "" || this.hideLabelText) {
        return 0;
    } else {
        return this.measureLabelWidth() + 6;
    }
};

Fossil_Sprite_Gauge.prototype.drawGauge = function() {
    const gaugeX = this.gaugeX();
    const gaugeY = this.bitmapHeight() - this.gaugeHeight();
    const gaugewidth = this.bitmapWidth() - gaugeX;
    const gaugeHeight = this.gaugeHeight()+500;
    this.drawGaugeRect(gaugeX, gaugeY, gaugewidth, gaugeHeight);
};

Fossil_Sprite_Gauge.prototype.isValid = function() {
    if (this._currentExpression && this._maxExpression) {
		return true;
    }
    return false;
};

Fossil_Sprite_Gauge.prototype.gaugeColor1 = function() {
    if (this._gaugeColor1)
	{
		//if we have a string, assume that it's a hex color.
		if(typeof(this._gaugeColor1)=='string')
		{
			return(this._gaugeColor1) 
		}
		return ColorManager.textColor(this._gaugeColor1)
	}
	return ColorManager.normalColor();
};

Fossil_Sprite_Gauge.prototype.gaugeColor2 = function() {
    if (this._gaugeColor2)
	{
		//if we have a string, assume that it's a hex color.
		if(typeof(this._gaugeColor2)=='string')
		{
			return(this._gaugeColor2) 
		}
		return ColorManager.textColor(this._gaugeColor2)
	}
	return ColorManager.normalColor();
};

Fossil_Sprite_Gauge.prototype.valueColor = function() {
    if (this._valueColor)
	{
		//if we have a string, assume that it's a hex color.
		if(typeof(this._valueColor)=='string')
		{
			return(this._valueColor) 
		}
		return ColorManager.textColor(this._valueColor)
	}
	return ColorManager.normalColor();
    
};



Fossil_Sprite_Gauge.prototype.currentValue = function() {
	if (this._maxExpression == 'rate')
	{
		return this._currentExpression
	}
    if (this._currentExpression) {
		
    	return eval(this._currentExpression)
	}
    return NaN;
};

Fossil_Sprite_Gauge.prototype.currentMaxValue = function() {
	if (this._maxExpression == 'rate')
	{
		return 1;
	}
    if (this._maxExpression)
	{
		return eval(this._maxExpression)
	}
    
    return NaN;
};

//just return the label property.
Fossil_Sprite_Gauge.prototype.label = function() {
	return this._label || "";
};


Fossil_Sprite_Gauge.prototype.drawValue = function() {
	if(!this.hideValueText)
	{
		Sprite_Gauge.prototype.drawValue.apply(this);
	}
};


Fossil_Sprite_Gauge.prototype.drawLabel = function() {
	if(!this.hideLabelText)
	{
		Sprite_Gauge.prototype.drawLabel.apply(this);
	}
    
};

//reimplement the drawgauge from RMMV using our new fossil gauge
//note: yes, RMMZ has a 'drawGauge' function, but it's attached to the Sprite_Gauge object.
//don't get them confused
Window_Base.prototype.drawGauge = function(x, y, width, rate, color1, color2) {
	//I am going to gamble and bet that nobody draws multiple different gauges
	//of the exact same x y coordinates and width
	//with the exact same object.  Maybe I'm wrong, but we can deal with that when it comes up
	//so I think it's fine for our key to be this
	gaugeID=[this.constructor.name.toString(),x,y,width].toString()
	//this will be something like "Window_VictoryExp,184,38,416"
	label ='';//no label
	[x,y]=this.FossilTweakGaugeByPlugin(x,y)

    var fillW = Math.floor(width * rate);
    var gaugeY = y + this.lineHeight() - 8;
	var newGauge=this.placeFossilGauge(gaugeID, rate,'rate',label,x,gaugeY,width,12)
	newGauge._gaugeColor1 = color1;
	newGauge._gaugeColor2 = color2;
	newGauge.hideValueText = true;
	newGauge.hideLabelText=true;

};

//helper function to do all our fine positioning, on a per-window basis.
Window_Base.prototype.FossilTweakGaugeByPlugin=function(x,y)
{
	if(this.constructor.name=="Window_VictoryExp")
	{
		x=x-32;
		y=y-12;
	}
	if(this.constructor.name=="Window_PartyLimitGauge")
	{
		
		y=y-36;
	}
	
	
	return [x,y]
}

//now let's reimplement the old RMMV draw actor hp/mp/tp functions with our new gauge

Window_Base.prototype.drawActorHp = function(actor, x, y, width) {
    width = width || 186;
    var color1 = this.hpGaugeColor1();
    var color2 = this.hpGaugeColor2();
	var gaugeID = 'actor'+actor.actorId().toString()+'hpbar'
	var newGauge = this.placeFossilGauge(gaugeID, 'this._target.hp','this._target.mhp',TextManager.hpA,x,y,width,12,actor)
	newGauge._gaugeColor1=color1;
	newGauge._gaugeColor2=color2;
	newGauge._valueColor2 = ColorManager.hpColor(actor);	
};

Window_Base.prototype.drawActorMp = function(actor, x, y, width) {
    width = width || 186;
    var color1 = this.mpGaugeColor1();
    var color2 = this.mpGaugeColor2();
	var gaugeID = 'actor'+actor.actorId().toString()+'mpbar'
	
	var newGauge = this.placeFossilGauge(gaugeID, 'this._target.mp','this._target.mmp',TextManager.mpA,x,y,width,12,actor)
	newGauge._gaugeColor1=color1;
	newGauge._gaugeColor2=color2;
	newGauge._valueColor2 = ColorManager.mpCostColor(actor);
	
};
Window_Base.prototype.drawActorTp = function(actor, x, y, width) {
    width = width || 186;
    var color1 = this.tpGaugeColor1();
    var color2 = this.tpGaugeColor2();
	var gaugeID = 'actor'+actor.actorId().toString()+'tpbar'
	
	var newGauge = this.placeFossilGauge(gaugeID, 'this._target.tp','this._target.maxTp()',TextManager.tpA,x,y,width,12,actor)
	
	newGauge._gaugeColor1=color1;
	newGauge._gaugeColor2=color2;
	newGauge._valueColor2 = ColorManager.tpCostColor(actor);
	
	
};

//text handling tweak; in rmmv putting in no text would have no width.
Fossil.measureTextUndefinedZero=Bitmap.prototype.measureTextWidth;
Bitmap.prototype.measureTextWidth = function(text) {
    if (text === undefined)
	{
		return 0;
	}
    return Fossil.measureTextUndefinedZero.call(this,text)
};

//similarly, don't choke if we're given no text to work with.  Just turn it into an empty string.
Fossil.convertEscapeUndefined=Window_Base.prototype.convertEscapeCharacters;
Window_Base.prototype.convertEscapeCharacters = function(text) {
    if (text === undefined)
	{
		return '';
	}
    return Fossil.convertEscapeUndefined.call(this,text)
};



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

//tell it the standard font size is our system font.
Window_Base.prototype.standardFontSize=function(){
	return $gameSystem.mainFontSize()
}
//get the standard font face
Window_Base.prototype.standardFontFace=function(){
	return $gameSystem.mainFontFace()
}

//preemptive function redirections.
Window_ShopNumber.prototype.itemY = function() {
    return this.itemNameY();
};

Window_ShopNumber.prototype.priceY = function() {
    return this.totalPriceY();
};

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
Window_Base.prototype.hpColor = function(actor) { return ColorManager.hpColor(actor) }
Window_Base.prototype.mpColor = function(actor) { return ColorManager.mpColor(actor) }
Window_Base.prototype.tpColor = function(actor) { return ColorManager.tpColor(actor) }

//dummy out a RMMV function that isn't present, isn't needed, and isn't spelled right
Window_Base.prototype.updateButtonsVisiblity = function(){}


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
		if(this._backupRect) //if we don't have a rectangle now, and backed up one earlier, use that one.
		{
			rect=this._backupRect;
			this._backupRect=undefined;
			rectFixWindowBase.call(this,rect)
			return;
		}
		
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
	
	if (arguments.length>0 && arguments[0].constructor.name=='Rectangle') // if our first argument is a rectangle this is MZ code
	{
		rectFixWindowEquipSlot.apply(this,arguments) 
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
		arguments[0], 
		arguments[1], 
		arguments[2]||(this.windowWidth ? this.windowWidth() : 0) ||400,  
		arguments[3]||(this.windowHeight ? this.windowHeight() : 0)||Graphics.boxHeight
		);
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
		
		var rectA=new Rectangle(0,0,0,0);
		if (SceneManager._scene.itemWindowRect)
		{
			rectA=SceneManager._scene.itemWindowRect(); //pick the defaults.
		}
		
		var rect = new Rectangle(
		arguments[0]||rectA.x, 
		arguments[1]||rectA.y, 
		arguments[2]||rectA.width||(this.windowWidth ? this.windowWidth() : 0) ||400,  
		arguments[3]||rectA.height||(this.windowHeight ? this.windowHeight() : 0)||Graphics.boxHeight);
		
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
		var rectA=new Rectangle(0,0,0,0);
		if (SceneManager._scene.goldWindowRect)
		{
			rectA=SceneManager._scene.goldWindowRect(); //pick the defaults.
		}
		var rect = new Rectangle(
		arguments[0]||rectA.x, 
		arguments[1]||rectA.y, 
		arguments[2]||rectA.width||(this.windowWidth ? this.windowWidth() : 0) ||400,
		arguments[3]||rectA.height||(this.windowHeight ? this.windowHeight() : 0)||Graphics.boxHeight);
		
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
		
		rectFixWindowHelp.call(this,rect)
		
	}
	
};

var rectFixWindowTitleCommand= Window_TitleCommand.prototype.initialize;
Window_TitleCommand.prototype.initialize = function(rect) {
	if (arguments.length==0)
	{//RMMV doesn't take arguments for the title command window.
/* 		var x = (Graphics.boxWidth - this.width) / 2;
		var y = Graphics.boxHeight - this.height - 96;
		var width=240;
		var height=this.fittingHeight(this.numVisibleRows())
		var rect = new Rectangle(x,y,width,height); */
		const rect=SceneManager._scene.commandWindowRect(); //pick the defaults.

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
		var rectA=new Rectangle(0,0,0,0);
		if (SceneManager._scene.commandWindowRect)
		{
			rectA=SceneManager._scene.commandWindowRect(); //pick the defaults.
		}
		var rect = new Rectangle(
		arguments[0]||rectA.x, 
		arguments[1]||rectA.y, 
		arguments[2]||rectA.width||(this.windowWidth ? this.windowWidth() : 0) ||400,  
		arguments[3]||rectA.height||(this.windowHeight ? this.windowHeight() : 0)||this.fittingHeight(this.numVisibleRows())||Graphics.boxHeight);
		

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
		var rectA=new Rectangle(0,0,0,0);
		if (SceneManager._scene.skillWindowRect)
		{
			rectA=SceneManager._scene.skillWindowRect(); //pick the defaults.
		}
		var rect = new Rectangle(
		arguments[0]||rectA.x, 
		arguments[1]||rectA.y, 
		arguments[2]||rectA.width||(this.windowWidth ? this.windowWidth() : 0) ||400,  
		arguments[3]||rectA.height||(this.windowHeight ? this.windowHeight() : 0)||this.fittingHeight(this.numVisibleRows())||Graphics.boxHeight);
		
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
		
		var rectA=new Rectangle(0,0,0,0);
		if (SceneManager._scene.itemWindowRect)
		{
			rectA=SceneManager._scene.itemWindowRect(); //pick the defaults.
		}
		var rect = new Rectangle(
		arguments[0]||rectA.x, 
		arguments[1]||rectA.y, 
		arguments[2]||rectA.width||(this.windowWidth ? this.windowWidth() : 0) ||400,  
		arguments[3]||rectA.height||(this.windowHeight ? this.windowHeight() : 0)||this.fittingHeight(this.numVisibleRows())||Graphics.boxHeight);
		
		rectFixWindowBattleItem.call(this,rect)
		
	}
	
};




var rectFixWindowBattleEnemy= Window_BattleEnemy.prototype.initialize;
Window_BattleEnemy.prototype.initialize = function(rect) {
	
	if (arguments[0].constructor.name=='Rectangle') // if our first argument is a rectangle this is MZ code
	{
		rectFixWindowBattleEnemy.apply(this,arguments) 
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
		arguments[0]||rectA.x||0, 
		arguments[1]||rectA.y||0, 
		arguments[2]||rectA.width||400,  
		arguments[3]||rectA.height|400
		)
		rectFixWindowBattleEnemy.call(this,rect)	
	}	
};

Window_BattleEnemy.prototype.windowWidth = function() {
    return Graphics.boxWidth - 192;
};

Window_BattleEnemy.prototype.windowHeight = function() {
    return this.fittingHeight(this.numVisibleRows());
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



//RMMV defaulted width to 312.  I am going to respect that.
Fossil.FixWindowBaseDrawItemNameWidth=Window_Base.prototype.drawItemName;
Window_Base.prototype.drawItemName = function(item, x, y, width) {
	width = width || 312;
    Fossil.FixWindowBaseDrawItemNameWidth.call(this,item,x,y,width);
};


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

//The MV code for rectangular text areas is now 'with padding' instead of 'for text'
Window_Selectable.prototype.itemRectForText = function(index) {
	return this.itemRectWithPadding(index)
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




//dummy out this function; this is what makes the loading bar move
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

//request balloons.
Game_CharacterBase.prototype.requestBalloon = function(balloonId) {
    $gameTemp.requestBalloon(this,balloonId);
};


Game_Battler.prototype.startAnimation = function (animationId, mirror, delay)
{
	$gameTemp.requestAnimation([this], animationId);
	
}

//MV includes the '.js' in filenames when calling plugins
//MZ does not.  Check if it's there, and if it is, remove it.
Fossil.fixPluginManagerLoadScript= PluginManager.loadScript
PluginManager.loadScript = function(name) {
	if(name.substring(name.length-3)=='.js')
	{
		if (Utils.isOptionValid('test'))
		{
			console.log('trimmed a .js off a plugin call')
		}
		name=name.substring(0,name.length-3)
		
	}
	Fossil.fixPluginManagerLoadScript.call(this,name);
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


ImageCache={};// The image cache works differently now, so let plugins that want to fiddle around with it play with a toy version :)
ImageCache.prototype={};







if (Fossil.pluginNameList.contains('YEP_BattleEngineCore'))
{
	// selection help is broken because the interface with MZ changed
	// if enabled it requires target selection for every ability, regardless of
	// whether or not this selection is needed.
	// so for instance guard will ask which ally to use it on, and regardless 
	// of who you say, still apply it to the user
	// this looks like a pain to fix for a minor cosmetic setting.
	// I'm just forcibly turning the plugin parameter off, since it's on by default.
	if(PluginManager.parameters('YEP_BattleEngineCore')['Select Help Window'])
	{
		if (Utils.isOptionValid('test'))
		{
			console.log('Select Help Window option in YEP_BattleEngineCore is not supported.')
			console.log('Fossil has disabled it.')
		}
		PluginManager.parameters('YEP_BattleEngineCore')['Select Help Window']="false";
		
	}



	/////Battle_Core
	//MV function, but with the equivalent code from MZ's BattleManager.startInput
	BattleManager.clearActor = function() {
		this._currentActor = null;
	};

	Fossil.backupSprite_BattlerDamagePopup=Sprite_Battler.prototype.setupDamagePopup;
	Fossil.backupdisplayHpDamage=Window_BattleLog.prototype.displayHpDamage;
	Fossil.backupdisplayMpDamage=Window_BattleLog.prototype.displayMpDamage;
	Fossil.backupdisplayTpDamage=Window_BattleLog.prototype.displayTpDamage;

	Fossil.backupSpriteDamageSetup=Sprite_Damage.prototype.setup;
	
	
	//avoid name collision with yanfly
	BattleManager.updateBattlePhase = BattleManager.updatePhase;
	//fix it here.
	BattleManager.update = function(timeActive) {
		if (!this.isBusy() && !this.updateEvent()) {
			this.updateBattlePhase(timeActive);
		}
		if (this.isTpb()) {
			this.updateTpbInput();
		}
	};
	
	
	BattleManager.startEndPhase = function()
	{
		this._enteredEndPhase=true;
	}
	BattleManager.endEndPhase = function()
	{
		this._enteredEndPhase=false;
	}
	BattleManager.clearPerformedBattlers = function()
	{
		this._performedBattlers= [];
	}

	//back up the start and end turn functions so we can revert the BC changes to them.
	MZBattleManagerEndTurn=BattleManager.endTurn;
	MZBattleManagerStartTurn=BattleManager.startTurn;
	
	
	//ATB isn't suppported, but this is a tiny step towards eventually doing so.
	
	//need to pass in the active time since BEC doesn't.
	fixactivetimeBECupdateTurn=BattleManager.updateTurn
	BattleManager.updateTurn = function(timeActive = SceneManager._scene.isTimeActive())
	{
		fixactivetimeBECupdateTurn.call(this,timeActive)
	}
	fixactivetimeBEConTurnEnd=Game_Battler.prototype.onTurnEnd;
	
	//if there are no subjects for an action (as can happen with action sequences)
	// RMMZ chokes because it can't end it.  So let's tell it to just stop if it doesn't
	// have a subject.
	Fossil.fixEndActionBEC=BattleManager.endAction
	BattleManager.endAction = function() 
	{
		if(!this._subject){
			return
		}
		Fossil.fixEndActionBEC.apply(this,arguments)
	}
	
}

if(Fossil.pluginNameList.includes('YEP_X_InBattleStatus'))
{
	//move gauges on the in battle status window.
	
	Window_StatusBase.prototype.placeGauge = function(actor, type, x, y) 
	{
		const key = "actor%1-gauge-%2".format(actor.actorId(), type);
		const sprite = this.createInnerSprite(key, Sprite_Gauge);
		sprite.setup(actor, type);
		if(this.constructor.name == 'Window_InBattleStatus')
		{
			sprite.move(x-40,y)
		}else{
			sprite.move(x, y);
		}
		sprite.show();
	};


	Window_StatusBase.prototype.drawActorClass = function(actor, x, y, width) {
		width = width || 168;
		this.resetTextColor();
		if(this.constructor.name == 'Window_InBattleStatus')
		{
			this.drawText(actor.currentClass().name, x-54, y, width,'right');
		}else{
			this.drawText(actor.currentClass().name, x, y, width);
		}
	};
	
	

}

//battle log needs a padded rect definition?
/* Window_BattleLog.prototype.itemRectForText = function(index) {
	return Window_Selectable.prototype.itemRectWithPadding.call(this,index)
};
//and an item rect.  Am guessing it's still selectalbe that it likes
Window_BattleLog.prototype.itemRect = function(index) {
	return Window_Selectable.prototype.itemRect.call(this,index)
};  */

//this is an extra-dangerous command, so make sure the plugin is actually turned on.
if(Fossil.pluginNameList.includes('SRD_ShakingText') && $plugins[Fossil.pluginNameList.indexOf('SRD_ShakingText')].status)
{
	//undo the weird little textstate++/-- shift SRD does in obtainEscapeCode
	//this will cause problems if SRD_ShakingText isn't the last message parsing plugin before Fossil_Post
	//but we'll cross that bridge when we come to it.
	Fossil.FixSRDShakeTextWindowMessageobtainEscapeCodePre = Window_Message.prototype.obtainEscapeCode;
	Window_Message.prototype.obtainEscapeCode = function(textState)
	{
		textState.index++;
		return Fossil.FixSRDShakeTextWindowMessageobtainEscapeCodePre.call(this,textState);
	}
	
}




//There isn't a 'process normal character' function in MZ anymore
//But there isn't one anymore!
//Add a dummy process normal character in the same place it used to be.  
//and give it a chance to tell the plugin that we are done processing it (this will need
//to be added manually)
var addNormaltoWindowBaseProcessCharacter=Window_Base.prototype.processCharacter;
Window_Base.prototype.processCharacter = function(textState) {
	//some plugins, like SRD_ShakingText, put in a full alternate character processing
	//version.  Obviously if this happens we end up with text AlTeRnAtInG between print
	//modes which is no good.  So if we need to stop processing this character, stop.
    this.fossilStopProcessingThisCharacter=false;
	this.processNormalCharacter(textState)

	if(!this.fossilStopProcessingThisCharacter)
	{
		addNormaltoWindowBaseProcessCharacter.call(this,textState);
	}	
}

Window_Base.prototype.processNormalCharacter = function(textState) 
{
	//dummy for injection
}



if(Fossil.pluginNameList.contains('WAY_Core'))
{
	Fossil.backupPluginManagerCommands=PluginManager._commands;
}





