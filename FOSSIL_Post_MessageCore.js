/*
Message Core WIP FOSSIL module.

This is a bit of an oddity - we need two plugins dedicated just to deal with ONE plugin.
The problem is that Yanfly did such a good job with messagecore that a lot of the 
improvements were folded into core RMMZ.  

Because of that, we need to tell the rest of the game to ignore the definitions in YEP_Messagecore, since they're conflicting with the namespace from RMMZ.

This might be bad for compatibility with other yanfly-derived name box plugins, but I feel like
being able to use the built-in editor namebox is probably more useful for people, and i had 
to pick one or the other.  Sorry if this does break compatibility, we can probably deal with it on a case-by case-basis if it ends up being a problem.

Known bugs: word wrap doesn't like the 'advance all text on a line' instantly command, and
will stop word wrapping the moment that happens.  I've banged my head against the wall on this one long enough, time to move on.

Put this immediately below YEP_MessageCore (and below YEP_X_ExtMesPack1 and YEP_X_ExtMesPack2)

*/
var Imported = Imported || {};
Imported.YEPMCPost=true;


if(Imported.YEP_MessageCore && Imported.YEPMCPre)
{
	//revert the namebox changes from messagecore, restoring to stock rmmz
	Window_NameBox= MZ_Window_NameBox;
	MZ_Window_NameBox=undefined;//clean up after ourselves.
	//yanfly just replaces the command101 function outright.
	//we actually don't want that, because we lose the new noteboxes.  Revert it.
	//we need to pass in the ._params it wants
 	var fixMessageCoreCommand101Params=Game_Interpreter.prototype.command101
	Game_Interpreter.prototype.command101 = function(params) {
		this._params=arguments[0];
		
		if ($gameMessage.isBusy()) 
		{
			return false;
		}
		
		$gameMessage.setSpeakerName(params[4]);
		
		fixMessageCoreCommand101Params.call(this);
	} 
	

	
	//tell rpg maker to ignore the namebox parsing code, and have it just return
	//whatever gets put into it.
	//Window_Message.prototype.convertNameBox=function(){return arguments[0]};
	
	//because Window_Message.prototype.createSubWindows never happens, the name windows
	//never get created by message core.  That's generally good, but it means that we have
	//to put in a decoy so yanfly's code can close something and won't crash.
	//so give a couple dummies so message core thinks its closing its own windows 
	var makeFakeNameBoxesWindowMessage= Window_Message.prototype.initialize;
	Window_Message.prototype.initialize = function(rect) {
		this._nameWindow={};
		this._nameWindow.deactivate = function(){};
		this._backupRect=rect;
		if($gameSystem.messageWidth())
		{
			rect.width=$gameSystem.messageWidth()
		}
		if($gameSystem.messageRows())
		{
			
		}
		
		if(Imported.YEP_X_MessageBacklog)
		{
			//we don't create subwindows, so call the existing message backlog window code from here
			this.createMessageBacklogWindow();
		}

		makeFakeNameBoxesWindowMessage.apply(this,arguments)
	}
	//undo yanfly's injection into the rendering code; this prevents the
	// Window_Message.prototype.adjustWindowSettings from being called unnecessarily.
    Window_Message.prototype.newPage = Yanfly.Message.Window_Message_newPage;
	
	//in RMMZ message window size and stuff doesn't get reset whenever they get touched.
	//this forces them to do that, so when we have plugin commands to change width it happens 
	forceRefreshWindowMessageupdatePlacement=Window_Message.prototype.updatePlacement;
	Window_Message.prototype.updatePlacement = function() {
		//look up a couple levels to find our scene and the default generation
		var rect=this.parent.parent.messageWindowRect();
		// check if our window is different than the original.  If so, change location and refresh it.
		if((this.x!==rect.x)||(this.y!==rect.y)||(this.width!==rect.width)||(this.height!==rect.height))
		{
			this.move(rect.x , rect.y, rect.width, rect.height);
			this.createContents();
		}

		forceRefreshWindowMessageupdatePlacement.call(this)
	}
		

	//copied out of RMMV, checks for bottom row.
	Window_Selectable.prototype.bottomRow = function() {
		return Math.max(0, this.topRow() + this.maxPageRows() - 1);
	};
	

		
		
}else{
	console.log('I am missing a prereq plugin!')
}


