# fossil-MV-MZ
Project Fossil (Fixing Old Software / Script Interoperability Layer) is a series of RPG Maker MZ plugins designed to expand the use and usefulness of RPG MAKER MV plugins, by allowing them to work in RPG MAKER MZ projects.

How to use: 
Import Fossil_Pre into your MZ project as plugin, before all your MV plugins.  Put Fossil_Post after all your MZ plugins.

Some old MV plugins require extra attention to detail, and you have to sandwich them in an additional FOSSIL pair of Fossil_Pre_Pluginname, and Fossil_Post_Pluginname .  This is to avoid side-effects when jumping over plugin function redefinitions.

Terms of use:

All unique code in FOSSIL is licensed under a Creative Commons Attribution-ShareAlike 4.0 International License ( https://creativecommons.org/licenses/by-sa/4.0/ ).  The remainder is taken from RPG Maker MV and RPG Maker MZ, and is covered under the appropriate licenses. No code from any existing plugin was used. Credit Restart, 'FOSSIL' or 'FOSSIL Team', and link back to the github or the forum thread.

In order to improve clarity, I am officially stating that the 'CC-BY-SA' only requires that code directly derived from FOSSIL be also put under a 'CC-BY-SA' license.  Any other assets in your game, (such as code, art, et cetera) as well as your game as a whole are NOT considered to be 'derivative works' for this purpose.

