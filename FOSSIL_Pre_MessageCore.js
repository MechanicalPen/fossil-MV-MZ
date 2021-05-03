/*
Message Core WIP FOSSIL module.

This is a bit of an oddity - we need two plugins dedicated just to deal with ONE plugin.
The problem is that Yanfly did such a good job with messagecore that a lot of the 
improvements were folded into core RMMZ.  

Because of that, we need to tell the rest of the game to ignore the definitions in YEP_Messagecore, since they're conflicting with the namespace from RMMZ.

This might be bad for compatibility with other yanfly-derived name box plugins, but I feel like
being able to use the built-in editor namebox is probably more useful for people, and i had 
to pick one or the other.  Sorry if this does break compatibility, we can probably deal with it on a case-by case-basis if it ends up being a problem.

Known bugs: 
 - Word wrap doesn't like the 'advance all text on a line instantly' command, and will stop word wrapping the moment that happens.  I've banged my head against the wall on this one long enough, time to move on.  
 - None of the name box commands work (we have them by default now so I don't want to bother)
 
 

Put this immediately above Messagecore (and YEP_X_ExtMesPack1 and YEP_X_ExtMesPack2 if you have them).

*/

var Imported = Imported || {};
Imported.YEPMCPre=true;

//create a copy of the current namebox definition, so we can undo the changes messagecore
//makes to it.
MZ_Window_NameBox=Window_NameBox;


//normal character injection MOVED to Fossil_Pre

//I have to overwrite the definition for a message window here
//so that it respects yanfly's new definitions.
Scene_Message.prototype.messageWindowRect = function() {
    const ww = $gameSystem.messageWidth()||Graphics.boxWidth;
    const wh = this.calcWindowHeight($gameSystem._messageRows||4, false) + 8;
    const wx = (Graphics.boxWidth - ww) / 2;
    const wy = 0;
    return new Rectangle(wx, wy, ww, wh);
};
