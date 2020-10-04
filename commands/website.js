const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    message.delete().catch();
     let linksembed = new Discord.MessageEmbed()
     .setTitle("Website")
     .setTimestamp()
     .setFooter(message.author.tag + " | Peace Keeper", message.author.displayAvatarURL({dynamic: true, size: 1024}))
     .setColor('#E3E3E3')
     .setDescription("Server website: https://heiwa.gg")
     message.channel.send(linksembed)
}
 
module.exports.help = {
  name: "website"
}