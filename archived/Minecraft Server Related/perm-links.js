const Discord = require("discord.js");

module.exports.run = async (bot, message) => {
    // No Perms Embed
    const noPermsErrEmbed = new Discord.MessageEmbed()
    .setColor('FF6961')
    .setTitle("**error!**")
    .setDescription("You don't have access to that command.")
    .setTimestamp()
    .setFooter(message.author.tag + " | Peace Keeper", message.author.displayAvatarURL({dynamic: true, size: 1024}))
    if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply(noPermsErrEmbed).then(msg => msg.delete({timeout: 5000})).then(message.delete().catch());
    

    message.delete().catch();
     let servericon = message.guild.iconURL();
     let linksembed = new Discord.MessageEmbed()
     .setAuthor(message.guild.name)
     .setTimestamp()
     .setFooter(message.author.tag + " | Peace Keeper", message.author.displayAvatarURL({dynamic: true, size: 1024}))
     .setColor('#ABDFF2')
     .setDescription("All information related to Heiwa can be answered through here:")
     .addField('Server IP:', 'heiwa.gg')
     .addField('Website:', 'http://heiwa.gg')
     .addField('Applications:', 'https://heiwa.gg/apply')
     .addField('Store:', 'http://heiwa.gg/store')
     .addField('Rules:', 'http://heiwa.gg/rules')
     .addField('*Using the bot:*', '*Type `!help` in <#750998349276250123>*')
     .addField('`NOTE:`', '`The server rules may change at anytime and it is your responsibility to keep up-to-date with them.`', true)
     .setThumbnail(servericon)
     message.channel.send(linksembed);
}
 
module.exports.help = {
  name: "perm-links"
}