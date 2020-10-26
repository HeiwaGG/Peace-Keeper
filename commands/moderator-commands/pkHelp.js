const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  // No Perms Embed
  const noPermsErrEmbed = new Discord.MessageEmbed()
   .setColor('FF6961')
   .setTitle("**error!**")
   .setDescription("This command can only be used by administrators!")
   .setTimestamp()
   .setFooter(message.author.tag + " | " + bot.user.username, message.author.displayAvatarURL({dynamic: true, size: 1024}))
  ;
  if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply(noPermsErrEmbed).then(msg => msg.delete(5000));
  

  if (args.length >= 1) {
    message.delete().then(() => {
      var mentionAymhh = "<@176610715686273024>"
      const helpopEmbed = new Discord.MessageEmbed()
       .setColor('#ABDFF2')
       .setTitle("**Helpop Request Received...**")
       .setDescription("```" + `${message.content.slice(8)}` + "```")
       .addField("From:", message.guild.name, true)
       .addField("Author:", message.author.tag, true)
       .setThumbnail(message.guild.iconURL({dynamic: true, size: 1024}))
       .setTimestamp()
       .setFooter(message.author.id + " | " + message.guild.name, message.author.displayAvatarURL({dynamic: true, size: 1024}))
      bot.channels.cache.get('769578830607941633').send(helpopEmbed).then(
        bot.channels.cache.get('769578830607941633').send(mentionAymhh).then(message => message.delete())
      );
      const receivedEmbed = new Discord.MessageEmbed()
       .setColor('ABDFF2')
       .setTitle("**Success!**")
       .setDescription("Your helpop request has been send and will be looked at ASAP!")
       .setTimestamp()
       .setFooter(message.author.tag + " | " + bot.user.username, message.author.displayAvatarURL({dynamic: true, size: 1024}))
      message.channel.send(receivedEmbed)
    });
  } else {
    message.delete()
    const ancErrEmbed = new Discord.MessageEmbed()
      .setColor('FF6961')
      .setTitle("**error!**")
      .setDescription("use the correct format: ```!pkHelp <message>```")
      .setTimestamp()
      .setFooter(message.author.tag + " | " + bot.user.username, message.author.displayAvatarURL({dynamic: true, size: 1024}))
      message.reply(ancErrEmbed).then(msg => msg.delete({timeout: 10000}));
  };
};

module.exports.help = {
  name: "pkHelp"
}
