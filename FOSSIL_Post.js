

 /*:
 * @plugindesc FOSSIL is an interoperability layer for RMMZ, designed
 to make MV plugins work with it.
 * @author FOSSIL TEAM
 * @target MZ 
 
Fixing Old Software / Special Interoperability Layer (FOSSIL) Version 0.2.04

FOSSIL is an interoperability plugin.  
The purpose of this layer is to expand the use and usefulness of RPG MAKER MV plugins, by allowing them to work in RPG MAKER MZ projects.

This is the 'post' half of the plugin.  Put it BELOW the supported MV plugins.

Terms of use:

All code not covered by the RPG Maker MV or RPG Maker MZ license is released under a Creative Commons CC-BY-SA license.  Please credit 'FOSSIL', Restart, or 'The FOSSIL TEAM', and link back to the forum thread or github.

*/

var Imported = Imported || {};
Imported.Fossil_Post=true;
var Fossil =Fossil || {}
Fossil.postVersion='0.2.04'
if(Fossil.version!==Fossil.postVersion)
{
	console.log('Version mismatch!  Fossil_Post version is '+Fossil.postVersion +', but Fossil_Pre is version '+Fossil.version)
}



if(!Imported.Fossil_Pre)
{
	console.log('Fossil_Post WARNING: You forgot to import the first half of this plugin!')
	
}


Utils.RPGMAKER_VERSION=Utils.MZ_VERSION

//remove any legacy animation stuff, as well as anything hooked into it.
Sprite_Character.prototype.updateAnimation=function(){}
Sprite_Character.prototype.setupAnimation=function(){}
Sprite_Character.prototype.endAnimation=function(){}
//and speech balloons
Sprite_Character.prototype.setupBalloon=function(){}
Sprite_Character.prototype.updateBalloon=function(){}
Sprite_Character.prototype.startBalloon=function(){}
Sprite_Character.prototype.endBalloon=function(){}

//hue is now done as a sprite property rather than upon bitmap loading.  This uses the new RMMZ version.
var updateSpriteBaseHue = Sprite_Base.prototype.initialize
Sprite_Base.prototype.initialize = function() {
	updateSpriteBaseHue.call(this)
	if(this._data && this._data.hue)
	{
		this.setHue(this._data.hue);
	}
};


	

//Moghunter section

if(Imported.MOG_BattleHud)
{
	//command129 now takes in params as argument, it previously used ._params[]
	//do the same thing.
	
	var fixGameInterpretercommand129=Game_Interpreter.prototype.command129;
	Game_Interpreter.prototype.command129 = function() {
		this._params=arguments[0];
		fixGameInterpretercommand129.apply(this,arguments);
		return this.commandReturnWorkaround
	}
	
	var fix_alias_mog_bhud_command129 = _alias_mog_bhud_command129;
	_alias_mog_bhud_command129=function()
	{
		this.commandReturnWorkaround=fix_alias_mog_bhud_command129.call(this,this._params);
	}
}

if(Imported.MOG_TreasurePopup)
{
	//same with command 125, 126, 127, and 128
	var fixGameInterpretercommand125MOGTP=Game_Interpreter.prototype.command125;
	Game_Interpreter.prototype.command125 = function() {
		this._params=arguments[0];
		fixGameInterpretercommand125MOGTP.apply(this,arguments);
		return this.commandReturnWorkaround
	}
	
	var fix_mog_treaPopUP_gint_command125 = _mog_treaPopUP_gint_command125;
	_mog_treaPopUP_gint_command125=function()
	{
		this.commandReturnWorkaround=fix_mog_treaPopUP_gint_command125.call(this,this._params);
	}
	
	var fixGameInterpretercommand126MOGTP=Game_Interpreter.prototype.command126;
	Game_Interpreter.prototype.command126 = function() {
		this._params=arguments[0];
		fixGameInterpretercommand126MOGTP.apply(this,arguments);
		return this.commandReturnWorkaround
	}
	var fix_mog_treaPopUP_gint_command126 = _mog_treaPopUP_gint_command126;
	_mog_treaPopUP_gint_command126=function()
	{
		this.commandReturnWorkaround=fix_mog_treaPopUP_gint_command126.call(this,this._params);
	}
	
	//127
		var fixGameInterpretercommand127MOGTP=Game_Interpreter.prototype.command127;
	Game_Interpreter.prototype.command127 = function() {
		this._params=arguments[0];
		fixGameInterpretercommand127MOGTP.apply(this,arguments);
		return this.commandReturnWorkaround
	}
	var fix_mog_treaPopUP_gint_command127 = _mog_treaPopUP_gint_command127;
	_mog_treaPopUP_gint_command127=function()
	{
		this.commandReturnWorkaround=fix_mog_treaPopUP_gint_command127.call(this,this._params);
	}
	
	var fixGameInterpretercommand128MOGTP=Game_Interpreter.prototype.command128;
	Game_Interpreter.prototype.command128 = function() {
		this._params=arguments[0];
		fixGameInterpretercommand128MOGTP.apply(this,arguments);
		return this.commandReturnWorkaround
	}
	
	var fix_mog_treaPopUP_gint_command128 = _mog_treaPopUP_gint_command128;
	_mog_treaPopUP_gint_command128=function()
	{
		this.commandReturnWorkaround=fix_mog_treaPopUP_gint_command128.call(this,this._params);
	}
	
	
	Sprite_Damage.digitHeight = function()
	{
		return this.fontSize();
	}
	Sprite_Damage.digitWidth = function()
	{
		return Math.floor(this.fontSize()*3.0);
	}
	
}

if(Imported.MOG_ChronoEngine)
{
	var fixGameInterpretercommand212CE=Game_Interpreter.prototype.command212;
	Game_Interpreter.prototype.command212 = function() {
		this._params=arguments[0];
		fixGameInterpretercommand212CE.apply(this,arguments);
		return this.commandReturnWorkaround
	}
	
	var fix_mog_chrono_gint_command212 = _mog_chrono_gint_command212;
	_mog_chrono_gint_command212=function()
	{
		this.commandReturnWorkaround=fix_mog_chrono_gint_command212.call(this,this._params);
	}
	
	var fixGameInterpretercommand205CE=Game_Interpreter.prototype.command205;
	Game_Interpreter.prototype.command205 = function() {
		this._params=arguments[0];
		fixGameInterpretercommand205CE.apply(this,arguments);
		return this.commandReturnWorkaround
	}
	
	var fix_mog_chrono_gint_command205 = _mog_chrono_gint_command205;
	_mog_chrono_gint_command205=function()
	{
		this.commandReturnWorkaround=fix_mog_chrono_gint_command205.call(this,this._params);
	}
		
		//if you don't fix this,
		//you can't talk to events!
	Fossil.fixUpdateNonmoving=Game_Player.prototype.updateNonmoving;
	Game_Player.prototype.updateNonmoving = function(wasMoving,sceneActive) {
		this.fixMogArgs=arguments;
		Fossil.fixUpdateNonmoving.call(this,wasMoving,sceneActive);
	}
	
	Fossil.fix__mog_toolSys_gPlayer_updateNonmoving = _mog_toolSys_gPlayer_updateNonmoving;
	_mog_toolSys_gPlayer_updateNonmoving=function()
	{
		Fossil.fix__mog_toolSys_gPlayer_updateNonmoving.call(this,this.fixMogArgs[0],this.fixMogArgs[1]);
	}

}


	
if(Imported.YEP_GridFreeDoodads && !!DoodadManager)  //Only tweak the UI of doodads if the UI is loaded and the plugin exists
{

	// inject the fake RPGMAKER_VERSION when it's trying to save, so the doodad function uses the full path.
	// I was hoping that I only had to spoof RPGM version once, but sadly that's not the case :(
	Fossil.saveDoodadFakeVersion=StorageManager.saveDoodadSettings 
	StorageManager.saveDoodadSettings = function() 
	{
		Utils.RPGMAKER_VERSION="1.6.1";
		Fossil.saveDoodadFakeVersion.call(this)
		Utils.RPGMAKER_VERSION=Utils.MZ_VERSION
	}



	//I want to minimize the number of times I interfere with blt, so I'm going to restrict that to
	//times where it's actually necessary
	Fossil.grabHueFromDoodadLoad = ImageManager.loadDoodad
	  ImageManager.loadDoodad = function()
	{
		$gameTemp.lastHue = !!arguments[1];
		return Fossil.grabHueFromDoodadLoad.apply(this,arguments);
		
	}


	Fossil.updateSpriteDoodadSettingsHue = Window_GFD_SettingsHue.prototype.drawDoodadImage 
	Window_GFD_SettingsHue.prototype.drawDoodadImage = function() {
		if($gameTemp.lastHue)
		{
			//this is for the hue selection window.
			//there isn't a good target for injection between when the bitmap gets loaded 
			//and when it gets blted to the window
			//so instead I am overriding blt and forcing it to rotate hue, only in this specific function call
			//then putting it back afterwards.
			var oldblt=Bitmap.prototype.blt;
			Bitmap.prototype.blt = function(source, sx, sy, sw, sh, dx, dy, dw, dh) {
				
				this.rotateHue(-10) // we reuse the same bitmap repeatedly, rotating it 10 degrees each time.
				dw = dw || sw;
				dh = dh || sh;
				try {
					const image = source._canvas || source._image;
					this.context.globalCompositeOperation = "source-over";
					this.context.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh);
					this._baseTexture.update();
				} catch (e) {
					//
				}
			};

			Fossil.updateSpriteDoodadSettingsHue.apply(this,arguments);
			Bitmap.prototype.blt=oldblt;
			
		}
		else
		{
			Fossil.updateSpriteDoodadSettingsHue.apply(this,arguments);
		}

	} 
}	 
 
if(Imported.YEP_X_ExtDoodadPack1 && !!DoodadManager)
{
	//while this was an issue in the MV version as well
	//the party member names being hard to read is worse in MZ by default
	//this extends the first textbox and scrunches the other ones so they're all legible. :)
	var updatePartyWindowTextSize = Window_GFD_SettingsParty.prototype.itemRect 
	Window_GFD_SettingsParty.prototype.itemRect = function() {
		this._textWidth=(this._textWidth-40)||80;
		return updatePartyWindowTextSize.apply(this,arguments)
	}
 
}

if(Imported.YEP_SkillCore)
{
	// Gauge swapping using the MV commands is totally unworkable because 
	// the basic drawactorhp, drawactormp, etc were all removed in RMMZ
	// but, once more, we have a nice opportunity to use the existing 
	// properties stored in the actors, and make it work anyway! :)
	Window_StatusBase.prototype.placeBasicGauges = function(actor, x, y) {
		this.placeGauge(actor, actor.gauge1().toLowerCase()||"hp", x, y);
		this.placeGauge(actor, actor.gauge2().toLowerCase()||"mp", x, y + this.gaugeLineHeight());
		if ($dataSystem.optDisplayTp) {
			this.placeGauge(actor, actor.gauge3().toLowerCase()||"tp", x, y + this.gaugeLineHeight() * 2);
		}
	};
}


//force the help window to the top, for yanfly plugins that assume it'll be there
Fossil.moveHelpWindowForYEP=Scene_MenuBase.prototype.helpAreaTop;
Scene_MenuBase.prototype.helpAreaTop= function()
{
	//for YEP_EquipCore
	if(this.constructor.name == "Scene_Equip")
	{
		return 0;
	}
	//this is for YEP_EquipCustomize
	if(this.constructor.name =="Scene_EquipCustomize")
	{
		return 0;
	}
	
	//this is for YEP_OptionsCore
	if(Imported.YEP_OptionsCore && this.constructor.name =="Scene_Options")
	{
		return 0;
	}
	
	if(Imported.YEP_ShopMenuCore && this.constructor.name == "Scene_Shop")
	{
		return 0;
	}
	
	return Fossil.moveHelpWindowForYEP.call(this,arguments);
}

if(Imported.YEP_EquipCore)
{
	//if we're using equip core, then the help bar is at the top!
	//As mentioned elsewhere, the help bar is half size because of touch controls.
	Scene_Base.prototype.isBottomHelpMode = function() {
    return false;
	}
	
	//due to scrunching caused by the help bar we gotta shrink something.  
	//Command window (and the associated actor window with empty space) seems a good candidate.
	Window_EquipCommand.prototype.numVisibleRows = function() {
		return 3;
	};
}


if(Imported.YEP_X_EquipCustomize)
{
	//fix the window Y location
	Fossil.moveEquipCustomizeWindow=Scene_EquipCustomize.prototype.setCustomizedItem;
	Scene_EquipCustomize.prototype.setCustomizedItem = function() 
	{
		//scootch this down.
		Fossil.moveEquipCustomizeWindow.call(this)
 		this._itemActionWindow.move
		(
		this._itemActionWindow.x,
		(this._commandWindow.height+this._helpWindow.height),
		this._itemActionWindow.width,
		this._itemActionWindow.height+this._itemActionWindow.y-(this._commandWindow.height+this._helpWindow.height)
		) 
	}

	
}


if(Imported.AnimatedSVEnemies)
{

	//rexal spent a lot of effort setting a battleSprite, then at the last moment
	//RMMZ decides to undo the work.
	//Well, this un-undoes it :)
	var fixGame_EnemybattlerName= Game_Enemy.prototype.battlerName;
	Game_Enemy.prototype.battlerName = function() {
		if(this._battleSprite)
		{
			return this._battleSprite;
		}
		fixGame_EnemybattlerName.call(this)
		
	};
	
	var fixGame_ActorbattlerName= Sprite_Actor.prototype.battlerName;
	Sprite_Actor.prototype.battlerName = function() {
		if(this._battleSprite)
		{
			return this._battleSprite;
		}
		fixGame_ActorbattlerName.call(this)
	};


}


if(Imported.Galv_MessageCaptions)
{
	// parameter passing is handled differently between these. 
	// RMMV attaches it to the object, RMMZ passes it as an argument.
	// I also need to make it return true.
	// You know what happens if it doesn't return true?
	//  -Yes
	//  -No
    //
	//  -Yes
	//  -No
	// It makes the game repeat every choice box twice!  How horrifying :o
	var fixGameInterpretercommand101=Game_Interpreter.prototype.command101;
	Game_Interpreter.prototype.command101 = function() {
		this._params=arguments[0];
		fixGameInterpretercommand101.apply(this,arguments);
		return this.commandReturnWorkaround
	}
		
	//now I have to inject the params back into his injection when he calls the original function :o
	var FixGalvMpupGame_Interpreter_command101 =Galv.Mpup.Game_Interpreter_command101;
	Galv.Mpup.Game_Interpreter_command101=function(){
		this.commandReturnWorkaround=FixGalvMpupGame_Interpreter_command101.call(this,this._params)

	}
	//
		
}



//DTextpicture creates a hidden window, we need to set an opacity on it
//so RMMZ doesn't flip out
if( typeof(Window_Hidden) !== 'undefined')
{	
	var rectFixWindowHidden= Window_Hidden.prototype.initialize;
	Window_Hidden.prototype.initialize = function(rect) {
		
		if (arguments[0].constructor.name=='Rectangle') // if our first argument is a rectangle this is MZ code
		{
			rectFixWindowHidden.apply(this,arguments) 
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
			
			rectFixWindowHidden.call(this,rect)
		}
	};
}


if(Imported.YEP_StatusMenuCore)
{
	//add xp bars 
	Fossil.AddSprite_GaugeCurrentValueXP= Sprite_Gauge.prototype.currentValue;

		
	Sprite_Gauge.prototype.currentValue = function() 
	{
		//if we see a number assume it's a parameter id
		if(typeof(this._statusType)=='number')
		{
			//and return it
			return SceneManager._scene._infoWindow._actor.param(this._statusType) //Math.round(SceneManager._scene._infoWindow.calcParamRate(this._statusType)*this._largestParam)
		}
		if (this._battler) 
		{
			switch (this._statusType) 
			{
				case "xp":
					return Math.floor(100*Window_StatusInfo.prototype.actorCurrentExpRate(this._battler));
				case "xp2":
					return Math.floor(100*Window_StatusInfo.prototype.actorExpRate(this._battler));
			}
		}
		return Fossil.AddSprite_GaugeCurrentValueXP.call(this)
	};

		//doing this as a percent
	Fossil.AddSprite_GaugeCurrentMaxValueXP =Sprite_Gauge.prototype.currentMaxValue;
	Sprite_Gauge.prototype.currentMaxValue = function() 
	{
		if(typeof(this._statusType)=='number')
		{
			//these gauges are relative to the largest parameter
			return SceneManager._scene._infoWindow._largestParam;
		}
		if (this._battler) 
		{

			switch (this._statusType) 
			{
				case "xp":
				case "xp2":
					return 100;
			}
		}
		return Fossil.AddSprite_GaugeCurrentMaxValueXP.call(this);
	};

	Fossil.AddSprite_GaugeLabelXP=Sprite_Gauge.prototype.label;
	Sprite_Gauge.prototype.label = function() 
	{
 		if(typeof(this._statusType)=='number')
		{
			//return nothing if the statustype is a number
			return ''
			//if these weren't already labelled you could use this
			/* if ((this._statusType>=0)&&this._statusType<=7)
			{
				return ['mhp','mmp','atk','def','mat','mdf','agi','luk'][this._statusType]
			} */
		} 
		switch (this._statusType) 
		{
			case "xp":
			case "xp2":
				return TextManager.expA + '%';
		}
		return Fossil.AddSprite_GaugeLabelXP.call(this);
	};

     for (var i in Window_StatusBase.prototype) 
	{

		if(Window_StatusInfo.prototype[i]==undefined)
		{
			Window_StatusInfo.prototype[i] = Window_StatusBase.prototype[i];
		}

    } 
	
	//add the additional sprites as an empty thing since we can't change the prototype
	//directly to statusbase.
	Fossil.fixWindowStatusInfoInitialization = Window_StatusInfo.prototype.initialize
	Window_StatusInfo.prototype.initialize = function()
	{
		this._additionalSprites = {};
		Fossil.fixWindowStatusInfoInitialization.apply(this,arguments)
	}
	
	//replace with a normal xp gauge
	Window_StatusInfo.prototype.placeGauge=Window_StatusBase.prototype.placeGauge
	Window_StatusInfo.prototype.drawExpGauge = function()
	{
		//if we already have an xp gauge, make a new one that's going to be total xp
		if(this._additionalSprites["actor%1-gauge-%2".format(arguments[0].actorId(), "xp")])
		{
			this.placeGauge(arguments[0], "xp2", arguments[2].x, arguments[2].y);
		}else{
			this.placeGauge(arguments[0], "xp", arguments[2].x, arguments[2].y);
		}
	}
	
	Window_StatusInfo.prototype.drawParamGauge = function(dx, dy, dw, paramId)
	{
		this.placeGauge(this._actor,paramId, dx+100, dy);
	}
	
	//tell it to hide sprites like statusbase does.
	var hideSpritesWindow_StatusInfoRefresh = Window_StatusInfo.prototype.refresh;
	Window_StatusInfo.prototype.refresh = function() {
		this.hideAdditionalSprites();
		hideSpritesWindow_StatusInfoRefresh.call(this)
	}
	
}

if(Imported.YEP_OptionsCore)
{
	//tell it to redraw the gauges every frame, like in RMMV 
	//(since they can be scrolled up and down this is needed)
	var eraseGaugesdrawAllItems = Window_Selectable.prototype.drawAllItems;
	Window_Selectable.prototype.drawAllItems = function() 
	{
		if ((this.constructor.name == "Window_Options") && this._additionalSprites)
		{
			this._additionalSprites = {};
		}
		eraseGaugesdrawAllItems.apply(this,arguments)
	}
	
	var hideSpritesWindow_OptionsRefresh = Window_Options.prototype.refresh
	Window_Options.prototype.refresh = function() 
	{
		if (this._additionalSprites)
		{
			Window_StatusBase.prototype.hideAdditionalSprites.call(this);
		}
		hideSpritesWindow_OptionsRefresh.apply(this,arguments)
	}
	
}


if(Imported.YEP_SelfSwVar)
{
	//fix a whole lot of command injections
	
	var fixGameInterpretercommand101Self=Game_Interpreter.prototype.command101;
	Game_Interpreter.prototype.command101 = function() {
		this._params=arguments[0];
		fixGameInterpretercommand101Self.apply(this,arguments);
		return this.commandReturnWorkaround
	}
	
	var fixYanflySSVGame_Interpreter_command101 = Yanfly.SSV.Game_Interpreter_command101;
	Yanfly.SSV.Game_Interpreter_command101=function()
	{
		this.commandReturnWorkaround=fixYanflySSVGame_Interpreter_command101.call(this,this._params);
	}
	
	var fixGameInterpretercommand104Self=Game_Interpreter.prototype.command104;
	Game_Interpreter.prototype.command104 = function() {
		this._params=arguments[0];
		fixGameInterpretercommand104Self.apply(this,arguments);
		return this.commandReturnWorkaround
	}
	
	var fixYanflySSVGame_Interpreter_command104 = Yanfly.SSV.Game_Interpreter_command104;
	Yanfly.SSV.Game_Interpreter_command104=function()
	{
		this.commandReturnWorkaround=fixYanflySSVGame_Interpreter_command104.call(this,this._params);
	}
	
	var fixGameInterpretercommand111Self=Game_Interpreter.prototype.command111;
	Game_Interpreter.prototype.command111 = function() {
		this._params=arguments[0];
		fixGameInterpretercommand111Self.apply(this,arguments);
		return this.commandReturnWorkaround
	}
	
	var fixYanflySSVGame_Interpreter_command111 = Yanfly.SSV.Game_Interpreter_command111;
	Yanfly.SSV.Game_Interpreter_command111=function()
	{
		this.commandReturnWorkaround=fixYanflySSVGame_Interpreter_command111.call(this,this._params);
	}
	
	var fixGameInterpretercommand121Self=Game_Interpreter.prototype.command121;
	Game_Interpreter.prototype.command121 = function() {
		this._params=arguments[0];
		fixGameInterpretercommand121Self.apply(this,arguments);
		return this.commandReturnWorkaround
	}
	
	var fixYanflySSVGame_Interpreter_command121 = Yanfly.SSV.Game_Interpreter_command121;
	Yanfly.SSV.Game_Interpreter_command121=function()
	{
		this.commandReturnWorkaround=fixYanflySSVGame_Interpreter_command121.call(this,this._params);
	}
	
	var fixGameInterpretercommand122Self=Game_Interpreter.prototype.command122;
	Game_Interpreter.prototype.command122 = function() {
		this._params=arguments[0];
		fixGameInterpretercommand122Self.apply(this,arguments);
		return this.commandReturnWorkaround
	}
	
	var fixYanflySSVGame_Interpreter_command122 = Yanfly.SSV.Game_Interpreter_command122;
	Yanfly.SSV.Game_Interpreter_command122=function()
	{
		this.commandReturnWorkaround=fixYanflySSVGame_Interpreter_command122.call(this,this._params);
	}
	
	var fixGameInterpretercommand201Self=Game_Interpreter.prototype.command201;
	Game_Interpreter.prototype.command201 = function() {
		this._params=arguments[0];
		fixGameInterpretercommand201Self.apply(this,arguments);
		return this.commandReturnWorkaround
	}
	
	var fixYanflySSVGame_Interpreter_command201 = Yanfly.SSV.Game_Interpreter_command201;
	Yanfly.SSV.Game_Interpreter_command201=function()
	{
		this.commandReturnWorkaround=fixYanflySSVGame_Interpreter_command201.call(this,this._params);
	}
	var fixGameInterpretercommand202Self=Game_Interpreter.prototype.command202;
	Game_Interpreter.prototype.command202 = function() {
		this._params=arguments[0];
		fixGameInterpretercommand202Self.apply(this,arguments);
		return this.commandReturnWorkaround
	}
	
	var fixYanflySSVGame_Interpreter_command202 = Yanfly.SSV.Game_Interpreter_command202;
	Yanfly.SSV.Game_Interpreter_command202=function()
	{
		this.commandReturnWorkaround=fixYanflySSVGame_Interpreter_command202.call(this,this._params);
	}
	var fixGameInterpretercommand203Self=Game_Interpreter.prototype.command203;
	Game_Interpreter.prototype.command203 = function() {
		this._params=arguments[0];
		fixGameInterpretercommand203Self.apply(this,arguments);
		return this.commandReturnWorkaround
	}
	
	var fixYanflySSVGame_Interpreter_command203 = Yanfly.SSV.Game_Interpreter_command203;
	Yanfly.SSV.Game_Interpreter_command203=function()
	{
		this.commandReturnWorkaround=fixYanflySSVGame_Interpreter_command203.call(this,this._params);
	}
	
	var fixGameInterpretercommand231Self=Game_Interpreter.prototype.command231;
	Game_Interpreter.prototype.command231 = function() {
		this._params=arguments[0];
		fixGameInterpretercommand231Self.apply(this,arguments);
		return this.commandReturnWorkaround
	}
	
	var fixYanflySSVGame_Interpreter_command231 = Yanfly.SSV.Game_Interpreter_command231;
	Yanfly.SSV.Game_Interpreter_command231=function()
	{
		this.commandReturnWorkaround=fixYanflySSVGame_Interpreter_command231.call(this,this._params);
	}
	
	var fixGameInterpretercommand232Self=Game_Interpreter.prototype.command232;
	Game_Interpreter.prototype.command232 = function() {
		this._params=arguments[0];
		fixGameInterpretercommand232Self.apply(this,arguments);
		return this.commandReturnWorkaround
	}
	
	var fixYanflySSVGame_Interpreter_command232 = Yanfly.SSV.Game_Interpreter_command232;
	Yanfly.SSV.Game_Interpreter_command232=function()
	{
		this.commandReturnWorkaround=fixYanflySSVGame_Interpreter_command232.call(this,this._params);
	}
	
	var fixGameInterpretercommand285Self=Game_Interpreter.prototype.command285;
	Game_Interpreter.prototype.command285 = function() {
		this._params=arguments[0];
		fixGameInterpretercommand285Self.apply(this,arguments);
		return this.commandReturnWorkaround
	}
	
	var fixYanflySSVGame_Interpreter_command285 = Yanfly.SSV.Game_Interpreter_command285;
	Yanfly.SSV.Game_Interpreter_command285=function()
	{
		this.commandReturnWorkaround=fixYanflySSVGame_Interpreter_command285.call(this,this._params);
	}
	
}


if(Imported["SumRndmDde Summon Core"])
{
	Sprite_Summon.prototype.setupIntroAnimation = function(){
		if(this._actor.introAnimation())
		{
			$gameTemp.requestAnimation([this._actor], this._actor.introAnimation());
			this.opacity=0;
		}
		//initialize this so it can start moving.
		if(BattleManager.isTpb())
		{
			this._battler.clearTpbChargeTime();
			this._motion=0;//make a little pose after summoning before animation starts
		}
		SceneManager._scene._statusWindow.refresh();
	}
	
	Sprite_Summon.prototype.updateTransition = function()
	{
		this._summonFrames=this._summonFrames||0;
		
		var flashStart=0;
		var flashEnd=0;
		if(this._actor)
		{
			
				//we can't get animation duration directly, so we'll go with
				//flashing.
			if(this._actor.introAnimation() && $dataAnimations[this._actor.introAnimation()].flashTimings.length)
			{
				var flashList = $dataAnimations[this._actor.introAnimation()].flashTimings;
				flashStart=flashList[flashList.length-1].frame ||0
				flashEnd=flashList[flashList.length-1].duration+flashStart ||0;
			}
			//fully appear at the end of the last flash.
			
			
			if (this._summonFrames<flashEnd)
			{
				//flashEnd must be >=1
				this.opacity=Math.floor( 255* Math.min(this._summonFrames-flashStart,0)/(flashEnd-flashStart))
			}
			else
			{
				//done with transition
				this.opacity=255;
				this._transitionType = 0;
				this._summonSprite = null;
				
			}
			this._summonFrames++;
		}

	}
	
	Sprite_Summon.prototype.setupExitAnimation = function(){
		if(this._exitAnimation)
		{
			$gameTemp.requestAnimation([this], this._exitAnimation);
			
		}
		this.opacity=0;
		SceneManager._scene._statusWindow.refresh();
	}
	

	//only count actual members of the party for speed
	Game_Unit.prototype.tpbBaseSpeed = function() {
		const members = this.rawBattleMembers();
		return Math.max(...members.map(member => member.tpbBaseSpeed()));
	};
	
}


if(Imported.YEP_BattleEngineCore)
{
	//if we don't have improved battle backs imported, then get rid of this function
	//which is moving our battlebacks
	if (!Imported.YEP_ImprovedBattlebacks) {
		Spriteset_Battle.prototype.updateZCoordinates = function() {}
	}
  
	
	//in MV the battlelog inherited all the selectable stuff.
	//in mz it only gets window_base.  
	//since so many of these selections are needed, I am just changing the prototype
	//in theory this shouldn't break things too much (since window_selectable 
	//is also derived from window_base, and we aren't overwriting) but who knows?

	//rip out all the properties that exist in window_selectable
	//that don't exist in window_battlelog
	//and stick them in!
	
     for (var i in Window_Selectable.prototype) 
	{
        //if (Object.hasOwnProperty.call(Window_Selectable.prototype, i)) 
		//{
			if(Window_BattleLog.prototype[i]==undefined)
			{
				Window_BattleLog.prototype[i] = Window_Selectable.prototype[i];
			}
        //}
    } 
	
	//initialize it since we now have scrollable properties
	Fossil.fixBattleLogScrollInit=Window_BattleLog.prototype.initialize;
	Window_BattleLog.prototype.initialize = function(rect) {
		Fossil.fixBattleLogScrollInit.call(this, rect);
		this._scrollX = 0;
		this._scrollY = 0;
		this._scrollBaseX = 0;
		this._scrollBaseY = 0;
		this.clearScrollStatus();
	};
	
	
	Sprite_Battler.prototype.setupDamagePopup=Fossil.backupSprite_BattlerDamagePopup;
	Window_BattleLog.prototype.displayHpDamage=Fossil.backupdisplayHpDamage;
	Window_BattleLog.prototype.displayMpDamage=Fossil.backupdisplayMpDamage;
	Window_BattleLog.prototype.displayTpDamage=Fossil.backupdisplayTpDamage;


	Sprite_Damage.prototype.initialize =Yanfly.BEC.Sprite_Damage_initialize;
	Sprite_Damage.prototype.setup=Fossil.backupSpriteDamageSetup;
	//revert changes to start turn and end turn functions, since BEC's are
	//derived directly from RMMV.
	//then update phases so BEC knows what's happening
	if(!Imported.YEP_X_BattleSysSTB)
	{
		BattleManager.startTurn=function()
		{
			this.endEndPhase();
			this.clearPerformedBattlers();
			MZBattleManagerStartTurn.apply(this,arguments)
		}
	}else{
		//override the redirection in YEP_X_BattleSysSTB, so we can get back to the original MZ start turn, but still keep the failed escape processing.
		Yanfly.STB.BattleManager_startTurn=function()
		{
			this.endEndPhase();
			this.clearPerformedBattlers();
			MZBattleManagerStartTurn.apply(this,arguments)
		} 
	}
	

	BattleManager.endTurn=function()
	{
		this.startEndPhase();
		MZBattleManagerEndTurn.apply(this,arguments)
	}
	
/* 	Fossil.fixIndividualTurnUpdate=BattleManager.update;
	BattleManager.update=function()
	{
		Fossil.fixIndividualTurnUpdate.apply(this,arguments)
		this.updateTpbInput()
	} */
	
	//if we have a custom battle system, change our actor setup
	if(	Fossil.pluginNameList.contains('YEP_X_BattleSysATB') ||
		Fossil.pluginNameList.contains('YEP_X_BattleSysCTB') ||
		Fossil.pluginNameList.contains('YEP_X_BattleSysSTB')  )
	{
		//revert to RMMV version of this.  But update our _currentActor to reflect actor index.
		Fossil.fixPickBattleManagerActor=BattleManager.actor;
		
		BattleManager.actor = function() 
		{
			var MVactor = this._actorIndex >= 0 ? $gameParty.members()[this._actorIndex] : null;
			this._currentActor = MVactor;
			return MVactor;
		};
		
		Fossil.fixchangeCurrentActor=BattleManager.changeCurrentActor;
		BattleManager.changeCurrentActor = function(forward) 
		{
			this._currentActor=this.actor();
			Fossil.fixchangeCurrentActor.apply(this,arguments);
		}
		
	}
	
	if( Fossil.pluginNameList.contains('YEP_X_BattleSysATB')|| Fossil.pluginNameList.contains('YEP_X_BattleSysCTB'))
	{
		//This lets you go back to the party window so you can flee a battle in ATB mode.
		//you know, if you're a coward :p
		Scene_Battle.prototype.commandCancel = function() {
			Fossil.ATBCowards=true;
			this.selectPreviousCommand();
		};
		
		Scene_Battle.prototype.commandFight = function() {
			Fossil.ATBCowards=false;
			this.startActorCommandSelection();
		};
		
		Scene_Battle.prototype.commandEscape = function() {
			Fossil.ATBCowards=false; //at least you have the courage to ADMIT you can't fight.
			BattleManager.processEscape();
			this.changeInputWindow();
		};
		
		Fossil.FixInputWindowSwap=Scene_Battle.prototype.needsInputWindowChange;
		Scene_Battle.prototype.needsInputWindowChange = function() {
			if(Fossil.ATBCowards) return false;
			return Fossil.FixInputWindowSwap.apply(this,arguments);
		};
		
 		Scene_Battle.prototype.changeInputWindow = function() {
			this.hideSubInputWindows();
			if (BattleManager.isInputting()) {
				if (BattleManager.actor() && !Fossil.ATBCowards) {
					this.startActorCommandSelection();
				} else {
					this.startPartyCommandSelection();
				}
			} else {
				this.endCommandSelection();
			}
		}; 
		
		//we don't use this anymore
		BattleManager.statusUpdateATB =function(){}
		//instead we hook into the rpgmaker MZ atbgauge
		
	}
	
	if(Fossil.pluginNameList.contains('YEP_X_BattleSysSTB'))
	{
		//no savescumming escapes, if you miss it it goes to the next party member.
		Scene_Battle.prototype.commandEscape = function() {
			BattleManager.stbSetSubject();
			BattleManager.processEscape();
			this.selectNextCommand();
			BattleManager.endAction();
		};

		
	}
	
	
	Fossil.fixBECisStartActorCommand=Scene_Battle.prototype.isStartActorCommand;
	Scene_Battle.prototype.isStartActorCommand = function() {
		//if we are a time based system we need to tell BEC to shut up and stop starting new turns
		if(BattleManager.isTpb())
		{
			return false
		}
		Fossil.fixBECisStartActorCommand.call(this)
	};
	
	Fossil.BECWARNINGSCENEBATTLEINIT=Scene_Battle.prototype.initialize
	Scene_Battle.prototype.initialize = function() {
		if(BattleManager.isTpb())
		{
				$gameMessage.setBackground(1)
				$gameMessage.setPositionType(1)
				$gameMessage.add("Fossil note: Sadly, BattleEngineCore does not work")
				$gameMessage.add("with ''Time Progress Battle' settings. Maybe it will")
				$gameMessage.add("someday, no promises.")
				$gameMessage.add("Sorry! At least you can use Yanfly's ATB system.")
				console.log('Battle Engine Core only works in standard turn based battle system. If you want ATB, use YEP_X_BattleSysATB.');
		}
		Fossil.BECWARNINGSCENEBATTLEINIT.call(this);
	};
	
	
	if(Imported.YEP_X_SelectionControl || Imported.YEP_BattleSelectCursor ||Imported.YEP_X_BattleSysATB||Imported.YEP_X_BattleSysCTB||Imported.YEP_X_BattleSysSTB)
	{
		Fossil.fixDrawBattleEnemyFakeSelectionControl=Window_BattleEnemy.prototype.drawItem
		Window_BattleEnemy.prototype.drawItem = function(index) {
			if(typeof(this._enemies[index]) =='string')
			{
				this.resetTextColor();
				const name = this._enemies[index];
				const rect = this.itemLineRect(index);
				this.drawText(name, rect.x, rect.y, rect.width);
			}else{
				Fossil.fixDrawBattleEnemyFakeSelectionControl.call(this,index)
			}
		};
		
		Fossil.hideEnemySelectWindow=Scene_Battle.prototype.createEnemyWindow
		Scene_Battle.prototype.createEnemyWindow = function() 
		{
			Fossil.hideEnemySelectWindow.apply(this,arguments)
			
			this._enemyWindow.move(0,0,0,0);//we want this to be invisible but usable.
 			
		};
	}
	
	if(Imported.YEP_X_VisualHpGauge)
	{
		
		Fossil.fixHpGaugeUpdate=Window_VisualHPGauge.prototype.update;
		Window_VisualHPGauge.prototype.update = function() 
		{
			//hide sprites if they aren't supposed to be shown.
			if (this._additionalSprites)
			{
				if(this.contentsOpacity==0)
				{
					Window_StatusBase.prototype.hideAdditionalSprites.call(this);
				}else{
					for (const sprite of Object.values(this._additionalSprites)) 
					{
						sprite.opacity=this.contentsOpacity;
						sprite.show();
					}
				}
			}
			Fossil.fixHpGaugeUpdate.apply(this,arguments)
		}
	}
 	if(Imported.YEP_X_VisualATBGauge)
	{

		//create a special gauge drawer for the enemy visual atb,
		//don't get them confused
		Window_EnemyVisualATB.prototype.drawGauge = function(x, y, width, rate, color1, color2) 
		{
			//width changes for this one, fixing it on a case-by-case basis
			gaugeID=[this.constructor.name.toString(),x,y].toString()
			label ='';//no label
			[x,y]=this.FossilTweakGaugeByPlugin(x,y)

			var fillW = Math.floor(width * rate);
			var gaugeY = y + this.lineHeight() - 20;
			if(this.drawingChargeGauge)
			{
				var newGauge=this.placeFossilGauge(
					gaugeID+'charging',
					rate,
					'rate',
					label,
					x,
					gaugeY,
					width,
					12+8*(!!Yanfly.Param.VATBThick),
					this._battler
				)
				newGauge.chargeGauge=true;
			}else{
				var newGauge=this.placeFossilGauge(
					gaugeID+'normal',
					rate,
					'rate',
					label,
					x,
					gaugeY,
					width,
					12+8*(!!Yanfly.Param.VATBThick),
					this._battler
				)
			}
			newGauge._gaugeColor1 = color1;
			newGauge._gaugeColor2 = color2;
			newGauge.hideValueText = true;
			newGauge.hideLabelText=true;
		};

		Fossil.markChargeGauge=Window_Base.prototype.drawAtbChargeGauge;
		Window_EnemyVisualATB.prototype.drawAtbChargeGauge = function(actor, wx, wy, ww) {
			this.drawingChargeGauge=true;
			Fossil.markChargeGauge.apply(this,arguments)
			this.drawingChargeGauge=undefined;
		};
		
		//erase gauges when enemies are dead.
		Fossil.EraseDeadGaugeFix=Window_EnemyVisualATB.prototype.updateRefresh;
		Window_EnemyVisualATB.prototype.updateRefresh = function(actor, wx, wy, ww) 
		{
			Fossil.EraseDeadGaugeFix.apply(this,arguments);
			//hide both gauges if actor is dead.
			 if(this._battler.isDead())
			 {
				 Window_StatusBase.prototype.hideAdditionalSprites.call(this);
			 }else{
				 //otherwise, hide the overlay if the actor isn't overcharged and prepping to act.
				for (const sprite of Object.values(this._additionalSprites)) 
				{
					if(sprite.chargeGauge&&(this._battler.atbChargeRate() == 0))
					{
						sprite.hide()
					}
					else
					{
						sprite.opacity=this.contentsOpacity;
						sprite.show();
					}
				}
			 }

		}
		
		
	} 

	if(Imported.YEP_X_TurnOrderDisplay)
	{

		//increase the icon size parameter so it scales properly on screen.
		//basically it didn't used to include the window frame size, but now it does.
		//4 pixel frame around image, 8 pixel frame around window, present on BOTH sides
		Yanfly.Param.TODIconSize+=24;
		
		//this expects the windowlayer to have a .x of 0, but in RMMZ the window layer has a .x of 4 by default
		//to avoid causing lasting issues, we'll set it and then refresh it
		Fossil.fixTurnOrderWindowOpacity = Window_TurnOrderIcon.prototype.isReduceOpacity 
		Window_TurnOrderIcon.prototype.isReduceOpacity = function() 
		{
			if(this._windowLayer)
			{
				var saveWLX = this._windowLayer.x;
				this._windowLayer.x = 0;
				var tempVar = Fossil.fixTurnOrderWindowOpacity.apply(this,arguments)
				this._windowLayer.x = saveWLX;
				return tempVar
			}else{
				return Fossil.fixTurnOrderWindowOpacity.apply(this,arguments);
			}
		}
		
		//smooth images 
		Fossil.fixWindow_TurnOrderIconsetup=Window_TurnOrderIcon.prototype.setup
		Window_TurnOrderIcon.prototype.setup = function() {
			Fossil.fixWindow_TurnOrderIconsetup.apply(this,arguments)
			this._image.smooth=true;
		};
		
		
		//fix spacing since it's double-counting the frame here.
		Fossil.fixWindow_TurnOrderIconcalculateDestinationXIndex=Window_TurnOrderIcon.prototype.calculateDestinationXIndex;
		Window_TurnOrderIcon.prototype.calculateDestinationXIndex = function() {
			var backupWidth=this.width;
			this.width-=24;
			Fossil.fixWindow_TurnOrderIconcalculateDestinationXIndex.call(this);
			this.width = backupWidth;
		}

		
		//if we have a visual enemy select, we use the enemy window instead of the help
		//window to determine what we're looking at.
		if(Imported.YEP_X_SelectionControl || Imported.YEP_BattleSelectCursor)
		{
			Fossil.fixScene_BattlesetupTurnOrderDisplayWindow=Scene_Battle.prototype.setupTurnOrderDisplayWindow;
			Scene_Battle.prototype.setupTurnOrderDisplayWindow = function(win) 
			{
				Fossil.fixScene_BattlesetupTurnOrderDisplayWindow.call(this,win);
				win._helpWindow = this._enemyWindow;
			  
			};
		}
	}

}

if(Imported.YEP_X_InBattleStatus)
{
	//import all the status window functions into the inbattlestatelist.
     for (var i in Window_StatusBase.prototype) 
	{
			if(Window_InBattleStatus.prototype[i]==undefined)
			{
				Window_InBattleStatus.prototype[i] = Window_StatusBase.prototype[i];
			}
    } 
	//tell it to hide gauge sprites like the statusinfo window does 
	Fossil.hideSpritesWindow_InBattleStatusRefresh = Window_InBattleStatus.prototype.refresh;
	Window_InBattleStatus.prototype.refresh = function() {
		this.hideAdditionalSprites();
		Fossil.hideSpritesWindow_InBattleStatusRefresh.call(this)
	}

	Fossil.fixWindowInBattleStatusInitialization = Window_InBattleStatus.prototype.initialize
	Window_InBattleStatus.prototype.initialize = function()
	{
		this._additionalSprites = {};
		Fossil.fixWindowInBattleStatusInitialization.apply(this,arguments)
	}
	
}

if(Imported.YEP_X_PartyLimitGauge)
{
	//this expects the windowlayer to have a .x of 0, but in RMMZ the window layer has a .x of 4 by default
	//to avoid causing lasting issues, we'll set it and then refresh it
	Fossil.fixWindow_PartyLimitGaugeupdateOpacity=Window_PartyLimitGauge.prototype.updateOpacity;
	Window_PartyLimitGauge.prototype.updateOpacity = function() {
		var saveWLX = this._windowLayer.x;
		this._windowLayer.x = 0;
		Fossil.fixWindow_PartyLimitGaugeupdateOpacity.call(this)
		this._windowLayer.x = saveWLX;
		
	}
		
    Fossil.fixWindow_PartyLimitGaugeinitialize=Window_PartyLimitGauge.prototype.initialize;
	Window_PartyLimitGauge.prototype.initialize = function(unit) 
	{
        Fossil.fixWindow_PartyLimitGaugeinitialize.call(this,unit)
		//this.opacity=128
		//opacity should be 0 but if you want to see the windows for debugging set it here
	}
	
	//scoot our party
	Fossil.fixWindow_BasedrawPartyLimitIcon=Window_Base.prototype.drawPartyLimitIcon;
	Window_Base.prototype.drawPartyLimitIcon =function(unit,x,y,w,h)
	{
		if(unit.partyLimitGaugeIconAlign() === 'right')
		{
			//alignment is different in RMMZ.  Scootch it a little to the left.
			x-=h/3
		}
		Fossil.fixWindow_BasedrawPartyLimitIcon.call(this,unit,x,y,w,h);
	}
	
	//when we draw the limit gauges, reduce the width to account for window border size
	Fossil.fixWindow_BasedrawPartyLimitGauge=Window_Base.prototype.drawPartyLimitGauge 
	Window_Base.prototype.drawPartyLimitGauge = function(unit, x, y, w) 
	{
		this.width-=24;
		Fossil.fixWindow_BasedrawPartyLimitGauge.call(this,unit,x,y,w)
		this.width+=24;
	}
	
	
}

if(Imported.YEP_X_ItemUpgrades)
{
	
	
	//there's a one-character typo at line 320.  It says
	//item.types.contain
	//but it should say
	//item.types.contains
	//if we could edit the plugin this would be ez pzy to fix but we can't so instead
	//nasty injection time :(
	
	Fossil.fixprocessupgradenotetags = DataManager.processUpgradeNotetags
	
	DataManager.processUpgradeNotetags = function(item) {
		//we need to predefine this item types
		if(!item.types){
			item.types=['ALL']
		}
		if(!item.types.contain)
		{
			//define a 'contain' that does the same thing as 'contains'.
			item.types.contain= function()
			{
				this.contains.apply(this, arguments)
			}
		}
	}	
}


if(Imported["SumRndmDde Shaking Text"])
{
	
		//remove iteration from textState so we don't double-tap it.
	Fossil.fixWindow_MessageCreateShakingCharacter = Window_Message.prototype.createShakingCharacter;
	Window_Message.prototype.createShakingCharacter = function(textState, c, w, h) {
		this.fossilStopProcessingThisCharacter=true;
		
		textState.x -=w;
		
		
		if (c.charCodeAt(0) < 0x20) {
			
			
			this.flushTextState(textState);
			//this doesn't always count the '\' for our text index and ends up printing it.
			this.processControlCharacter(textState, c);
			
			//c.charCodeAt(0)==0x10 //means a newline character.  If we did a newline, step back appropriately
			if(c.charCodeAt(0)==0x10)
			{
				textState.x-=12;
			}
			
			 //control character means we never advanced.
		}else{
			//our shakey characters are too far to the right by half a slot.  Correct this.
			textState.x +=w/2;
			Fossil.fixWindow_MessageCreateShakingCharacter.call(this,textState, c, w, h)
			textState.x +=w/2;
		}
	}
	
	//undo the weird little textstate++/-- shift SRD does in obtainEscapeCode
	//this will cause problems if SRD_ShakingText isn't the last message parsing plugin before Fossil_Post
	//but we'll cross that bridge when we come to it.
	Fossil.FixSRDShakeTextWindowMessageobtainEscapeCodePost=Window_Message.prototype.obtainEscapeCode;
	Window_Message.prototype.obtainEscapeCode = function(textState){
		textState.index--;
		return Fossil.FixSRDShakeTextWindowMessageobtainEscapeCodePost.call(this,textState)
	}
	
}

if(Imported.YEP_Footsteps)
{
	Fossil.fixplayFootstepSound =Game_CharacterBase.prototype.playFootstepSound
	Game_CharacterBase.prototype.playFootstepSound = function(volume, pitch, pan) 
	{
		Fossil.tempCoords=[this.x,this.y]
		
		//fix the coordinates to identify the next tile (this is bugged in the base plugin)
		//if someone includes a diagonal movement that expands the .direction() beyond the four
		//base coordinates, this will be futureproofed.
		Fossil.tempCoord[0] += ([3,6,9].contains(this.direction())) - ([1,4,7].contains(this.direction()));
		Fossil.tempCoord[1] += ([1,2,3].contains(this.direction())) - ([7,8,9].contains(this.direction()));

		var backupRegion=$gameMap.regionId;
		var backupTerrain=$gameMap.terrainTag;
		$gameMap.regionId=function(x,y)
		{
			return backupRegion(Fossil.tempCoord[0],Fossil.tempCoord[1])
		}
		$gameMap.terrainTag=function(x,y)
		{
			return backupTerrain(Fossil.tempCoord[0],Fossil.tempCoord[1])
		}
		
		Fossil.fixplayFootstepSound.apply(this,arguments);
		
		$gameMap.regionId=backupRegion;
		$gameMap.terrainTag=backupTerrain;
	}
	
	
}

if(Imported.YEP_X_ItemDiscard)
{
	//
	Fossil.fixWindow_ItemActionCommandCreateDiscardCommandName =Window_ItemActionCommand.prototype.createDiscardCommandName;
	Window_ItemActionCommand.prototype.createDiscardCommandName = function() 
	{
		
		var text = Fossil.fixWindow_ItemActionCommandCreateDiscardCommandName.call(this);
		
		//trim the trailing '/' if you have independent items on.
		if((text[text.length-1] == '/') && ($gameParty.maxItems(this._item) <= 1))
		{
			text = text.slice(0,text.length-1)
		}
		
		return text;
	}
}

if(Imported.YEP_X_ItemRequirements)
{
	
	//this is bugged; it runs an eval (which is supposed to be caught in 'value'), but 
	//doesn't actually catch the true/false in 'value'.
	//I'm checking to see if 'value' ever gets referenced in the provided code
	// (if it does, then someone did a workaround and I don't want to mess with it)
	//if it is included I don't mess with it.
	//if not, I am correcting the behavior to match the documentation.
	Fossil.fixItemManagerUsableItemRequirementEval =ItemManager.usableItemRequirementEval;
	ItemManager.usableItemRequirementEval=function(code)
	{
		if(!code.contains('value'))
		{
			//if we don't reference 'value', store whatever statement we make into it.
			code = "value = ("+code+")";
		}
		return Fossil.fixItemManagerUsableItemRequirementEval.call(this,code);
	}
	
}


//if we have imported the STV_BeastBook plugin
if (Fossil.pluginNameList.contains('STV_BeastBook') &&(typeof(Scene_BeastBook)!=='undefined'))
{
	Fossil.fixWindow_BeastBook_updateStatus= Window_BeastBook_Info.prototype.setBeast
     Window_BeastBook_Info.prototype.setBeast  = function(beast) 
	{
		if (this._additionalSprites)
		{
			Window_StatusBase.prototype.hideAdditionalSprites.call(this);
		}
		Fossil.fixWindow_BeastBook_updateStatus.call(this,beast);
    };
	
}

if(Imported.YEP_ShopMenuCore)
{
	//unique windowtype in YEP_Shop_Menu_Core needs to be given a rect.
	Window_ShopCategory.prototype.initialize = function() 
	{
		//this is always MV so we gotta make a rect for it.  Use the default
		//var rect = new Rectangle(0,,this.windowWidth(),
		var rect= new Rectangle(SceneManager._scene._commandWindow.x,SceneManager._scene._commandWindow.y,SceneManager._scene._commandWindow.width,SceneManager._scene._commandWindow.height)
		Window_ItemCategory.prototype.initialize.call(this,rect)
		
	};
	
	
	//put shopgoods into this becuase it didn't get handed off for some reason.
	
	Fossil.GiveShopGoodsToShopBuyWindow=Window_ShopBuy.prototype.initialize
	Window_ShopBuy.prototype.initialize =function()
	{
		this._shopGoods=arguments[3];//grab the shop goods.
		Fossil.GiveShopGoodsToShopBuyWindow.apply(this,arguments);
	}
	
	//move the category window to where it used to be
	Fossil.moveYEPcreateCategoryWindow =Scene_Shop.prototype.createCategoryWindow 
	Scene_Shop.prototype.createCategoryWindow = function() 
	{
		Fossil.moveYEPcreateCategoryWindow.apply(this,arguments)
		//this._categoryWindow.move(this._commandWindow.x,this._commandWindow.y,this._commandWindow.width,this._commandWindow.height);
	}
	
	//scootch the item buy/sell information up a tiny bit
	Fossil.fixYEPitemNameY=Window_ShopNumber.prototype.itemNameY;
	Window_ShopNumber.prototype.itemNameY = function() {
		return Fossil.fixYEPitemNameY.apply(this,arguments)-24;
	};

	
}

if(Imported.YEP_X_Subclass)
{
	//YEP is trying to overwrite the wrong function, correct it.
	Window_StatusBase.prototype.drawActorClass = Window_Base.prototype.drawActorClass;
}

if(Fossil.pluginNameList.contains('KMS_Minimap'))
{
	Fossil.fixKMSMiniMapUpdate=Spriteset_Map.prototype.update;
	//fading is accomplished in a different way, but we can 
	//still create a fake fadesprite to pass in the info about the opacity
	Spriteset_Map.prototype.update = function()
	{
		this._fadeSprite=this._fadeSprite||{};
		this._fadeSprite.opacity = 255-$gameScreen.brightness();
		Fossil.fixKMSMiniMapUpdate.apply(this,arguments)
	};
	
}



//defaults go somewhere else now!
if(Fossil.pluginNameList.contains('Olivia_AntiPlayerStress'))
{
	AudioManager._bgmVolume = Olivia.AntiPlayerStress.DefaultVolume;
	AudioManager._bgsVolume = Olivia.AntiPlayerStress.DefaultVolume;
	AudioManager._meVolume = Olivia.AntiPlayerStress.DefaultVolume;
	AudioManager._seVolume = Olivia.AntiPlayerStress.DefaultVolume;
}