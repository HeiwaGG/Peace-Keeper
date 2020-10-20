const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    message.delete().catch();
     let linksembed = new Discord.MessageEmbed()
     .setTitle("Store")
     .setAuthor(message.guild.name)
     .setTimestamp()
     .setFooter(message.author.tag + " | Peace Keeper", message.author.displayAvatarURL({dynamic: true, size: 1024}))
     .setColor('#ABDFF2')
     .setDescription("Store Link: https://heiwa.gg/store")
     message.channel.send(linksembed)
}
 
module.exports.help = {
  name: "store"
}