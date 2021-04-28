//accessory plugin for WAY_Core to avoid overlap.

Imported.Fossil_PostWay=true;

var correctPosition= Fossil.pluginNameList[Fossil.pluginNameList.indexOf('WAY_Core')+1]=='Fossil_Post_WAY';

if(Imported.Fossil_Pre && (Fossil.pluginNameList.contains('WAY_Core')) && correctPosition)
{
	PluginManager._commands=Fossil.backupPluginManagerCommands;
	
	Fossil.WAYpluginaddCommand=PluginManager.addCommand;
	PluginManager.addCommand = function (command, actions) 
	{
		var backupPluginManagerCommands=PluginManager._commands;
		PluginManager._commands=Fossil._WAYcommands ||{};
		Fossil.WAYpluginaddCommand.call(this,command,actions);
		Fossil._WAYcommands=PluginManager._commands;
		PluginManager._commands= backupPluginManagerCommands;
	};

	Fossil.WAYplugingetcommand=PluginManager.getCommand;
	PluginManager.getCommand = function (command) 
	{
		var backupPluginManagerCommands=PluginManager._commands;
		PluginManager._commands=Fossil._WAYcommands ||{};
		var newcommand =Fossil.WAYplugingetcommand.call(this,command);
		Fossil._WAYcommands=PluginManager._commands;
		PluginManager._commands= backupPluginManagerCommands;
		return newcommand;
	};
	
}else{
	console.log('Fossil_Post_WAY does not have the needed other plugins installed.')
	
	if(!correctPosition)
	{
		console.log('Fossil_Post_Way MUST be immediately beneath WAY_Core')
	}
	
}