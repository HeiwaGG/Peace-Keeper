const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
   // Restricts commands to bot commands channels
   let user = message.author
   let mentionedUser = message.mentions.users.first()
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
    return;
   }

   if(!mentionedUser) {
    message.delete()
    let embed = new Discord.MessageEmbed()
    .setAuthor(`${user.username}'s user `, user.displayAvatarURL({dynamic: true, size: 1024}))
    .setThumbnail(user.displayAvatarURL({dynamic: true, size: 1024}))
    .setColor('#ABDFF2')
    .addField('Handle:', message.author.tag, true)
    .addField('Precense:', message.author.presence.status, true)
    .addField('Bot?', message.author.bot, true)
    .addField("Roles: ", message.member.roles.cache.array(), true)
    .addField("User ID", message.author.id)
    .addField("Account creation:", message.author.createdAt)
    .setFooter(message.author.tag + " | " + bot.user.username, message.author.displayAvatarURL())
    .setTimestamp()
    message.channel.send(embed)
  } else {
    let embed2 = new Discord.MessageEmbed()
    .setAuthor(`${mentionedUser.username}'s Info`, mentionedUser.displayAvatarURL({dynamic: true, size: 1024}))
    .setThumbnail(mentionedUser.displayAvatarURL({dynamic: true, size: 1024}))
    .setColor('#ABDFF2')
    .addField('Handle:', mentionedUser.tag, true)
    .addField('Precense:', mentionedUser.presence.status, true)
    .addField('Bot?', mentionedUser.bot, true)
    .addField("Discord offical?", mentionedUser.system, true)
    .addField("User ID", mentionedUser.id)
    .addField("Account creation:", mentionedUser.createdAt)
    .setFooter(message.author.tag + " | " + bot.user.username, message.author.displayAvatarURL())
    .setTimestamp()
    message.channel.send(embed2)
  }
}
module.exports.help = {
  name: "uinfo"
}

