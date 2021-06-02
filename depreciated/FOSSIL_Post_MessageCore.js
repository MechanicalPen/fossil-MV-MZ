/*:
 * @plugindesc FOSSIL_Post_MessageCore goes below message core and its add-ons.
 * @author FOSSIL TEAM
 * @target MZ 
FOSSIL Post Message Core module.

This is a bit of an oddity - we need two plugins dedicated just to deal with ONE plugin.
The problem is that Yanfly did such a good job with messagecore that a lot of the 
improvements were folded into core RMMZ.  

Because of that, we need to tell the rest of the game to ignore the definitions in YEP_Messagecore, since they're conflicting with the namespace from RMMZ.

This might be bad for compatibility with other yanfly-derived name box plugins, but I feel like
being able to use the built-in editor namebox is probably more useful for people, and i had 
to pick one or the other.  Sorry if this does break compatibility, we can probably deal with it on a case-by case-basis if it ends up being a problem.

Put this immediately below YEP_MessageCore (and below YEP_X_ExtMesPack1 and YEP_X_ExtMesPack2)



 * @help Fossil_Pre_MessageCore goes below YEP_MessageCore and any message core
 expansion like YEP_X_ExtMesPack1
 It is designed specifically for this plugin. 
 You also need Fossil_Pre_MessageCore
 
 
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

		forceRefreshWindowMessageupdatePlacement.apply(this,arguments)
	}
		

	//copied out of RMMV, checks for bottom row.
	Window_Selectable.prototype.bottomRow = function() {
		return Math.max(0, this.topRow() + this.maxPageRows() - 1);
	};
	
	Window_Message.prototype.shouldBreakHere = function(textState) {
		if (this.canBreakHere(textState)) {
			if(this._needsWordWrapRefresh)
			{
				this._needsWordWrapRefresh=false;
				return true;
			}
			if (!this._showFast && !this._lineShowFast) {
				return true;
			}
			if (this.isWaiting()) {
				return true;
			}
		}
		return false;
	};

	//this disables where word wrap checking is hooked into yanfly.
	Window_Base.prototype.processNormalCharacter=Yanfly.Message.Window_Base_processNormalCharacter;
	//by undoing the overwrite.
	//then we overwrite the function again, but in a different way
    Fossil.FixWordWrapPNC = Window_Base.prototype.processNormalCharacter;
	Window_Base.prototype.processNormalCharacter = function(textState) {
		
		if (this.checkWordWrap(textState))
		{
			//if our current character is a space, replace it with a newline.  otherwise insert a newline.
			if (textState.text[textState.index]==' ')
			{
				textState.text=textState.text.slice(0,textState.index)+'\n'+textState.text.slice(textState.index+1);
			}else{
				textState.text=textState.text.slice(0,textState.index)+'\n'+textState.text.slice(textState.index);
			}
			
		}else{
			Fossil.FixWordWrapPNC.apply(this,arguments);
		}
	};


	Fossil.FixUpdateMessageWW=Window_Message.prototype.updateMessage;
	Window_Message.prototype.updateMessage = function() {
		const textState = this._textState;
		if(this._wordWrap)
		{
			if (textState) {
				while (!this.isEndOfText(textState)) {
					if (this.needsNewPage(textState)) {
						this.newPage(textState);
					}
					this.updateShowFast();
					this.processCharacter(textState);
					if (this.shouldBreakHere(textState)) {
						break;
					}else{
						//if we have word wrap we still 
						//will need to process all the text
						//so do it here real quick.
						//otherwise it loops through all text without printing it which means you get it all on one big line with no gaps
						while (!this.isEndOfText(textState)) 
						{
							if(!this._wordWrap)
							{
								//if we turn off word wrap or, stop fast rendering.
								return true;
							}
							if (this.needsNewPage(textState)) {
								return true;
							}
							this.processCharacter(textState);
							this.flushTextState(textState);
							//if we turn off the fast text we go back to normal processing.
							if(this.shouldBreakHere(textState))
							{
								return true;
							}
						}
						break;
					}
				}
				this.flushTextState(textState);
				if (this.isEndOfText(textState) && !this.isWaiting()) {
					this.onEndOfText();
				}
				return true;
			} else {
				return false;
			}
		
		}else{
			return Fossil.FixUpdateMessageWW.apply(this,arguments);
		}
	};

	Fossil.sendBufferSignalWordWrap=Window_Base.prototype.checkWordWrap;
	Window_Base.prototype.checkWordWrap = function(textState) {
		var wordWrapState=Fossil.sendBufferSignalWordWrap.call(this,textState);
		this._needsWordWrapRefresh=wordWrapState;
		return wordWrapState;
		
	};

	Fossil.fixprocessNewLine=Window_Message.prototype.processNewLine 
	Window_Message.prototype.processNewLine = function(textState) {
		if (this._wordWrap)
		{
			//fast line showing shouldn't stop when wordwrapping just becuase we move to a new line
			//instead we should only stop it when we get the /< signal.
			//so comment this out:
			//this._lineShowFast = false;
			//and do the rest
			//it'll still stop autoadvancing in a new message box though.
			Window_Base.prototype.processNewLine.call(this, textState);
			if (this.needsNewPage(textState)) {
				this.startPause();
			}
		}else{
			Fossil.fixprocessNewLine.apply(this,arguments)
		}
	};
		
}else{
	console.log('I am missing a prereq plugin!')
}


