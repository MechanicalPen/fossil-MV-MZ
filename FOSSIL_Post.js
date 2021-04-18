

 /*:
 * @plugindesc FOSSIL V0.1 is an interoperability layer for RMMZ, designed
 to make MV plugins work with it.
 * @author FOSSIL TEAM
 * @target MZ 
 
Fixing Old Software / Special Interoperability Layer (FOSSIL) Version 0.1

FOSSIL is an interoperability plugin.  
The purpose of this layer is to expand the use and usefulness of RPG MAKER MV plugins, by allowing them to work in RPG MAKER MZ projects.
Version 0.1 is a test to see how effective the concept is.  

This is the 'post' half of the plugin.  Put it BELOW the supported MV plugins.


Terms of use:

All code not covered by the RPG Maker MV or RPG Maker MZ license is released under a Creative Commons CC-BY-SA license.  Please credit 'FOSSIL' or 'The FOSSIL TEAM', and link back to the forum thread or github.

*/

var Imported = Imported || {};
Imported.Fossil_Post=true;
var Fossil =Fossil || {}
Fossil.version='0.1'



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
	var fixGameInterpretercommand125=Game_Interpreter.prototype.command125;
	Game_Interpreter.prototype.command125 = function() {
		this._params=arguments[0];
		fixGameInterpretercommand125.apply(this,arguments);
		return this.commandReturnWorkaround
	}
	
	var fix_mog_treaPopUP_gint_command125 = _mog_treaPopUP_gint_command125;
	_mog_treaPopUP_gint_command125=function()
	{
		this.commandReturnWorkaround=fix_mog_treaPopUP_gint_command125.call(this,this._params);
	}
	
	var fixGameInterpretercommand126=Game_Interpreter.prototype.command126;
	Game_Interpreter.prototype.command126 = function() {
		this._params=arguments[0];
		fixGameInterpretercommand126.apply(this,arguments);
		return this.commandReturnWorkaround
	}
	var fix_mog_treaPopUP_gint_command126 = _mog_treaPopUP_gint_command126;
	_mog_treaPopUP_gint_command126=function()
	{
		this.commandReturnWorkaround=fix_mog_treaPopUP_gint_command126.call(this,this._params);
	}
	
	//127
		var fixGameInterpretercommand127=Game_Interpreter.prototype.command127;
	Game_Interpreter.prototype.command127 = function() {
		this._params=arguments[0];
		fixGameInterpretercommand127.apply(this,arguments);
		return this.commandReturnWorkaround
	}
	var fix_mog_treaPopUP_gint_command127 = _mog_treaPopUP_gint_command127;
	_mog_treaPopUP_gint_command127=function()
	{
		this.commandReturnWorkaround=fix_mog_treaPopUP_gint_command127.call(this,this._params);
	}
	
	var fixGameInterpretercommand128=Game_Interpreter.prototype.command128;
	Game_Interpreter.prototype.command128 = function() {
		this._params=arguments[0];
		fixGameInterpretercommand128.apply(this,arguments);
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
	var fixGameInterpretercommand212=Game_Interpreter.prototype.command212;
	Game_Interpreter.prototype.command212 = function() {
		this._params=arguments[0];
		fixGameInterpretercommand212.apply(this,arguments);
		return this.commandReturnWorkaround
	}
	
	var fix_mog_chrono_gint_command212 = _mog_chrono_gint_command212;
	_mog_chrono_gint_command212=function()
	{
		this.commandReturnWorkaround=fix_mog_chrono_gint_command212.call(this,this._params);
	}
	
	var fixGameInterpretercommand205=Game_Interpreter.prototype.command205;
	Game_Interpreter.prototype.command205 = function() {
		this._params=arguments[0];
		fixGameInterpretercommand205.apply(this,arguments);
		return this.commandReturnWorkaround
	}
	
	var fix_mog_chrono_gint_command205 = _mog_chrono_gint_command205;
	_mog_chrono_gint_command205=function()
	{
		this.commandReturnWorkaround=fix_mog_chrono_gint_command205.call(this,this._params);
	}
		
		//if you don't fix this,
		//you can't talk to events!
	var fixUpdateNonmoving=Game_Player.prototype.updateNonmoving;
	Game_Player.prototype.updateNonmoving = function(wasMoving,sceneActive) {
		this.fixMogArgs=arguments;
		fixUpdateNonmoving.call(this,wasMoving,sceneActive);
	}
	
	var fix__mog_toolSys_gPlayer_updateNonmoving = _mog_toolSys_gPlayer_updateNonmoving;
	_mog_toolSys_gPlayer_updateNonmoving=function()
	{
		fix__mog_toolSys_gPlayer_updateNonmoving.call(this,this.fixMogArgs[0],this.fixMogArgs[1]);
	}

}


	
if(Imported.YEP_GridFreeDoodads && !!DoodadManager)  //Only tweak the UI of doodads if the UI is loaded and the plugin exists
{

	// inject the fake RPGMAKER_VERSION when it's trying to save, so the doodad function uses the full path.
	// I was hoping that I only had to spoof RPGM version once, but sadly that's not the case :(
	var saveDoodadFakeVersion=StorageManager.saveDoodadSettings 
	StorageManager.saveDoodadSettings = function() 
	{
		Utils.RPGMAKER_VERSION="1.6.1";
		saveDoodadFakeVersion.call(this)
		Utils.RPGMAKER_VERSION=Utils.MZ_VERSION
	}



	//I want to minimize the number of times I interfere with blt, so I'm going to restrict that to
	//times where it's actually necessary
	var grabHueFromDoodadLoad = ImageManager.loadDoodad
	  ImageManager.loadDoodad = function()
	{
		$gameTemp.lastHue = !!arguments[1];
		return grabHueFromDoodadLoad.apply(this,arguments);
		
	}


	 var updateSpriteDoodadSettingsHue = Window_GFD_SettingsHue.prototype.drawDoodadImage 
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

			updateSpriteDoodadSettingsHue.apply(this,arguments);
			Bitmap.prototype.blt=oldblt;
			
		}
		else
		{
			updateSpriteDoodadSettingsHue.apply(this,arguments);
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

if(Imported.YEP_EquipCore)
{
	//if we're using equip core, then the help bar is at the top!
	//As mentioned elsewhere, the help bar is half size because of touch controls.
	Scene_Base.prototype.isBottomHelpMode = function() {
    return false;
	}
}

// MZ makes status icons the children of sprites
// PROBLEM: this means that when enemies breathe the status icons scale.
// Not only does this look bad, but the resize bleeds onto adjacent icons
// so there's a ghostly frame when enemies have no status ailment :(
// This tells the status icon to breathe in the opposite direction from the sprite
// thus cancelling out (almost) exactly.


if(Imported.AnimatedSVEnemies)
{
	FixRexalASVESprite_Enemy_updateBitmap =   Sprite_Enemy.prototype.updateBitmap;
	Sprite_Enemy.prototype.updateBitmap = function() 
	{
		FixRexalASVESprite_Enemy_updateBitmap.call(this);
		if(this._enemy.stateIcons().length==0)
		{
			//the frame still shows up even when scaling is implemented, 
			//possibly due to subpixel rounding.
			//if you can't make it stay still, just make it vanish
			this.children[0].visible=false;
		}else{
			this.children[0].visible=true;
			this.children[0].scale.y = 1/this.scale.y;
			this.children[0].scale.x = 1/this.scale.x;
		}
		
	}

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


if(Imported.YEP_BattleEngineCore)
{
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
	Sprite_Battler.prototype.setupDamagePopup=backupSprite_BattlerDamagePopup;
	Window_BattleLog.prototype.displayHpDamage=backupdisplayHpDamage;
	Window_BattleLog.prototype.displayMpDamage=backupdisplayMpDamage;
	Window_BattleLog.prototype.displayTpDamage=backupdisplayTpDamage;
}
	
if(Imported.YEP_StatusMenuCore)
{
	//add xp bars 
	AddSprite_GaugeCurrentValueXP= Sprite_Gauge.prototype.currentValue;

		
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
		return AddSprite_GaugeCurrentValueXP.call(this)
	};

		//doing this as a percent
	AddSprite_GaugeCurrentMaxValueXP =Sprite_Gauge.prototype.currentMaxValue;
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
		return AddSprite_GaugeCurrentMaxValueXP.call(this);
	};

	AddSprite_GaugeLabelXP=Sprite_Gauge.prototype.label;
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
		return AddSprite_GaugeLabelXP.call(this);
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
	var fixWindowStatusInfoInitialization = Window_StatusInfo.prototype.initialize
	Window_StatusInfo.prototype.initialize = function()
	{
		this._additionalSprites = {};
		fixWindowStatusInfoInitialization.apply(this,arguments)
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