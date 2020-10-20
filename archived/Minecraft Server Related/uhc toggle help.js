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
  if(message.channel != botCommandsChannel) {
   message.delete()
   message.channel.send(wrongChannelEmbed).then(msg => msg.delete({timeout: 7000}));
  }
   else {
    message.delete().catch();
     let uhcsembed = new Discord.MessageEmbed()
     .setTitle('UHC alerts')
     .setAuthor(message.guild.name)
     .setTimestamp()
     .setFooter(message.author.tag + " | Peace Keeper", message.author.displayAvatarURL({dynamic: true, size: 1024}))
     .setColor('#ABDFF2')
     .setDescription("How to toggle the UHC alerts: \n `!uhc-toggle`")
     message.channel.send(uhcsembed).then(msg => msg.delete({timeout: 10000}));
}
}

module.exports.help = {
  name: "uhc-help"
}