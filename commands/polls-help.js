const Discord = require("discord.js");

module.exports.run = async (bot, message) => {
   // Restricts commands to bot commands channels
   let botCommandsChannel = message.guild.channels.cache.find(channel => channel.name === "bot-commands")
   const wrongChannelEmbed = new Discord.MessageEmbed()
   .setColor('#FF6961')
   .setTitle("error!")
   .setDescription("Wrong channel!")
   .addField("Please keep discord bot usage in the correct channel:", `<#${botCommandsChannel.id}>`)
   .setTimestamp()
   .setFooter(message.author.tag + " | Peace Keeper", message.author.displayAvatarURL({dynamic: true, size: 1024}))
   if(message.channel != botCommandsChannel) {
    message.delete()
    message.channel.send(wrongChannelEmbed).then(msg => msg.delete({timeout: 7000}));
   }
    else {   
  message.delete().catch();
   let linksembed = new Discord.MessageEmbed()
   .setTitle(message.guild.name)
   .setTimestamp()
   .setFooter(message.author.tag + " | Peace Keeper", message.author.displayAvatarURL({dynamic: true, size: 1024}))
   .setColor('#007FBD')
   .setTitle("Using Polls")
   .setDescription("This is a command used to help you start a poll in the <#726235115063083018> channel")
   .addField("To start one you need to use the format:", "`!polls-start <title of your suggestion> | <details of your suggestion>`")
   .addField("Keep your title short!", "If you wish to explain your suggestion more, write it out after putting the '|'")
   .addField("If you don't wish to add details about your suggestion leave a blank space after the '|'", 'Adding details to your suggestion is optional if it is self-explanatory such as *"fix kb"* and etc.')
   message.channel.send(linksembed).then(msg => msg.delete({timeout: 30000}));
   } 
}
module.exports.help = {
name: "polls-help"
}