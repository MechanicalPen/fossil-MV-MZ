

 /*:
 * @plugindesc Fossil-GFD V0.1 is an interoperability layer for RMMZ, designed
 to make MV plugins work with it. So far, YEP-GFD is working fine!
 * @author FOSSIL TEAM
 * @target MZ 
 
Fixing Old Software / Special Interoperability Layer (FOSSIL) Version 0.1

FOSSIL is an interoperability plugin.  
The purpose of this layer is to expand the use and usefulness of RPG MAKER MV plugins, by allowing them to work in RPG MAKER MZ projects.
Version 0.1 is a test to see how effective the concept is.  

So far we have has verified compatiblity for two MV plugins: YEP_GridFreeDoodads and YEP_X_ExtDoodadPack1

This is the 'post' half of the plugin.  Put it BELOW YEP_GridFreeDoodads and YEP_X_ExtDoodadPack1.


Terms of use:

All code not covered by the RPG Maker MV or RPG Maker MZ license is released under a Creative Commons CC-BY-SA license.  Please credit 'FOSSIL' or 'The FOSSIL TEAM', and link back to the forum thread.

*/

var Imported = Imported || {};
Imported.Fossil_GFD_Post=true;



if(!Imported.Fossil_GFD_Pre)
{
	console.log('Fossil_Post_GFD WARNING: You forgot to import the first half of this plugin!')
	
}




Utils.RPGMAKER_VERSION=Utils.MZ_VERSION

if(Imported.YEP_GridFreeDoodads)
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

	//hue is now done as a sprite property rather than upon bitmap loading.  This uses the new RMMZ version.
	var updateSpriteBaseHue = Sprite_Base.prototype.initialize
	Sprite_Base.prototype.initialize = function() {
		updateSpriteBaseHue.call(this)
		if(this._data && this._data.hue)
		{
			this.setHue(this._data.hue);
		}
	};


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
 
if(Imported.YEP_X_ExtDoodadPack1)
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