# fossil-MV-MZ
Project Fossil (Fixing Old Software / Script Interoperability Layer) is a series of RPG Maker MZ plugins designed to expand the use and usefulness of RPG MAKER MV plugins, by allowing them to work in RPG MAKER MZ projects.

How to use: 

This should be reasonably plug-and-play.  There aren't really parameters to configure.

**Recommended Plugin Order**

1) Fossil_Pre (First plugin)

2) All your MV plugins

3) Fossil_Post

4) All your MZ plugins

5) Fossil_Final_Windows (Last plugin, only add if you have a mix of MV and MZ plugins and there are issues with window sizes)

In addition, some plugins in the list, like YEP_MessageCore or WAY_Core, require dedicated fossil layers.  See the list in the header of Fossil_Pre, or on the rpgmaker forum ( https://forums.rpgmakerweb.com/index.php?threads/135523/ )

**Invoking MV Plugin Commands**
You can invoke MV plugin commands using MZ's plugin command interface (OldPluginCommand in Fossil_Pre).

Alternatively, you can put the command into a script using the oldCommand function.  For instance, 

oldCommand('somePlugin arguments et cetera');



Terms of use:

All unique code in FOSSIL is licensed under a Creative Commons Attribution-ShareAlike 4.0 International License ( https://creativecommons.org/licenses/by-sa/4.0/ ).  The remainder is taken from RPG Maker MV and RPG Maker MZ, and is covered under the appropriate licenses. No code from any existing plugin was used. Credit Restart, 'FOSSIL' or 'FOSSIL Team', and link back to the github or the forum thread.

In order to improve clarity, I am officially stating that the 'CC-BY-SA' only requires that code directly derived from FOSSIL be also put under a 'CC-BY-SA' license.  Any other assets in your game, (such as code, art, et cetera) as well as your game as a whole are NOT considered to be 'derivative works' for this purpose; they're just a 'collection of materials'.

