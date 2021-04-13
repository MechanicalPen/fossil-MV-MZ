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

This is the 'pre' half of the plugin.  Put it ABOVE YEP_GridFreeDoodads and YEP_X_ExtDoodadPack1.


Terms of use:

All code not covered by the RPG Maker MV or RPG Maker MZ license is released under a Creative Commons CC-BY-SA license.  Please credit 'FOSSIL' or 'The FOSSIL TEAM', and link back to the forum thread.

*/

//Since the version number got reset with MZ, plugins that look for MV version number will get confused.  
//We save the correct version number one in this half of the plugin sandwich, then restore it afterwards!
Utils.MZ_VERSION= Utils.RPGMAKER_VERSION;
Utils.RPGMAKER_VERSION="1.7.1";  


ImageCache={};// The image cache works differently now, so let plugins that want to fiddle around with it play with a toy version :)
ImageCache.prototype={};
var Imported = Imported || {};
Imported.Fossil_GFD_Pre=true;


//MZ uses rectangles instead of multiple numbers being passed in.
//There's even a special check in the MZ code that checks if you forgot a rectangle.
//But I figure, hey, why not make it flexible?  That way legacy code will still work. :)
var rectFixWindowSelectable= Window_Selectable.prototype.initialize;
Window_Selectable.prototype.initialize = function(rect) {
	if (arguments[0].constructor.name=='Rectangle') // if our first argument is a rectangle this is MZ code 
	{
		rectFixWindowSelectable.apply(this,arguments) 
	}else{ //if not, I am assuming it is MV. :)
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
		var rect = new Rectangle(arguments[0], arguments[1], arguments[2]||(this.windowWidth ? this.windowWidth() : 0) ||400,  arguments[3]||(this.windowHeight ? this.windowHeight() : 0)||Graphics.boxHeight);
		rectFixWindowCommand.call(this,rect)
		
	}
	
};

var rectFixWindowBase= Window_Base.prototype.initialize;
Window_Base.prototype.initialize = function(rect) {
	if (arguments[0].constructor.name=='Rectangle') // if our first argument is a rectangle this is MZ code
	{
		rectFixWindowBase.apply(this,arguments) 
	}else{ //if not, I am assuming it is MV.
		var rect = new Rectangle(arguments[0], arguments[1], arguments[2]||400,  arguments[3]||Graphics.boxHeight);
		rectFixWindowBase.call(this,rect)
	}

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

Window_Command.prototype.standardPadding = function() {
    return 18;
};

Window_Command.prototype.windowWidth = function() {
    return 240;
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
                sprite.remove();
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
