const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
   // Restricts commands to bot commands channels
   let botCommandsChannel = message.guild.channels.cache.find(channel => channel.name === "bot-commands")
   const wrongChannelEmbed = new Discord.MessageEmbed()
     .setColor('#FF6961')
     .setTitle("error!")
     .setDescription("Wrong channel!")
     .addField("Please keep discord bot usage in the correct channel:", `<#${botCommandsChannel.id}>`)
     .setTimestamp()
     .setFooter(message.author.tag + " | Peace Keeper", message.author.displayAvatarURL({dynamic: true, size: 1024}))
    ;
   if(message.channel != botCommandsChannel) {
    message.delete()
    message.channel.send(wrongChannelEmbed).then(msg => msg.delete({timeout: 7000}));
   } else {
   let linksembed = new Discord.MessageEmbed()
     .setTitle(message.guild.name)
     .setTimestamp()
     .setFooter(message.author.tag + " | Peace Keeper", message.author.displayAvatarURL({dynamic: true, size: 1024}))
     .setColor('#007FBD')
     .setTitle("Reporting Bugs")
     .setDescription("This is a command used to help you report bugs to us.")
     .addField("To get started you need to use the command:", "```!bug-report <name of bug> | <what is the bug, where does it happen, how does it happen>```",)
     .addField("If you don't need to add details about your bug report leave a blank space after the '|'", "Adding details to your report is optional if it is self-explanatory.")
    ;
   message.channel.send(linksembed).then(msg => msg.delete({timeout: 20000}))
  }
}

module.exports.help = {
  name: "bug-report-help"
}
