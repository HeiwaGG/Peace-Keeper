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
//
  const bugReportsChannel = message.guild.channels.cache.get('753222755100393522');

  let pollArgs = args.slice(0).join(" ").split('|');
  
  const tyBugEmbed = new Discord.MessageEmbed()
    .setColor('#ABDFF2')
    .setTitle("**Bug Reported!**")
    .setDescription("Thank you for reporting these bugs! You make a great contribution to the network!")
    .addField('*Keep in mind:*', '*You maybe contacted again to discuss this bug report inorder for us to understand it better.*')
    .setTimestamp()
    .setThumbnail(message.author.displayAvatarURL({dynamic: true, size: 1024}))
    .setFooter(message.author.tag + " | " + bot.user.username, message.author.displayAvatarURL({dynamic: true, size: 1024}))
  
  const detailsEmbed = new Discord.MessageEmbed()
    .setColor('#ABDFF2')
    .setTitle("**" + pollArgs[0] + "**")
    .setDescription(pollArgs[1])
    .addField('*This is a bug report!*', 'Details of the reporter is found here if needed to contact them again.')
    .setTimestamp()
    .setThumbnail(message.author.displayAvatarURL({dynamic: true, size: 1024}))
    .setFooter(message.author.tag + " | Peace Keeper", message.author.displayAvatarURL({dynamic: true, size: 1024}))
  const bugErrEmbed = new Discord.MessageEmbed()
    .setColor('FF6961')
    .setTitle("**error!**")
    .addField("use the correct format: `!bug-report <name of bug> | <what is the bug, where does it happen, how does it happen>`", "*If you need help do: `!bug-report-help`.*")
    .setTimestamp()
    .setFooter(message.author.tag + " | Peace Keeper", message.author.displayAvatarURL({dynamic: true, size: 1024}))
  
  if (!pollArgs[1]) {
    pollArgs[1] = "No description was given..."
  }

  if (args.length >= 1) {
      message.delete()
      bugReportsChannel.send(detailsEmbed).then(botCommandsChannel.send(tyBugEmbed));
    } 
  else {
      message.delete()
      message.reply(bugErrEmbed);
    }
  }
};

module.exports.help = {
  name: "bug-report"
}