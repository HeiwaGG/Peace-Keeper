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
     let helpEmbed = new Discord.MessageEmbed()
     .setTitle("Heiwa Help Menu")
     .setDescription("All the possible commands you can do you can do!\n*Reminder that these are all case sensitive commands!*")
     .addField("```!topen```", "Opens a new support ticket.")
     .addField('```!polls-start```', "Starts a poll in the <#726235115063083018> channel.")
     .addField("```!bug-report```", "Used for reporting bugs to the staff team.")
     .addField("```!website```", "Tell's you the official Heiwa website.")
     .addField("```!sinfo```", "Tell's you the discord server information.")
     .addField("```!uinfo```", "Tell's you your discord account information or someone else's.")
     .addField("```!about```", "Information about the creator of this bot!")
     .setThumbnail(message.guild.iconURL({dynamic: true, size: 1024}))
     .setTimestamp()
     .setColor('#ABDFF2')
     .setFooter(message.author.tag + " | " + bot.user.username, message.author.displayAvatarURL({dynamic: true, size: 1024}))
    ;
  message.reply(helpEmbed)
  }
}

module.exports.help = {
  name: "help",
  cooldown: "3"
}