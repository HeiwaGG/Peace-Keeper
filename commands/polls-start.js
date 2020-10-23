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
  const suggestionschannel = message.guild.channels.cache.get('726235115063083018');
  let pollArgs = args.slice(0).join(" ").split('|');

  if (args.length >= 2) {
    message.delete()
      const pollEmbed = new Discord.MessageEmbed()
       .setColor('#ABDFF2')
       .setTitle("**" + pollArgs[0] + "**")
       .setDescription(pollArgs[1])
       .addField('*Click on the reactions below to cast your opinion on this poll!*', 'If you would like to start your own poll: `!polls-help` in <#750998349276250123>')
       .setTimestamp()
       .setThumbnail(message.author.displayAvatarURL({dynamic: true, size: 1024}))
       .setFooter(message.author.tag + " | Peace Keeper", message.author.displayAvatarURL({dynamic: true, size: 1024}))
      ;
      const suggestionSentEmbed = new Discord.MessageEmbed()
       .setColor('#ABDFF2')
       .setTitle("**success!**")
       .addField('Suggestion sent! You can find it in the suggestions channel!', '<#726235115063083018>')
       .setTimestamp()
       .setThumbnail(message.author.displayAvatarURL({dynamic: true, size: 1024}))
       .setFooter(message.author.tag + " | Peace Keeper", message.author.displayAvatarURL({dynamic: true, size: 1024}))
      ;
      let yes = ('750604758188032009')
      let no = ('750604757500166234')
      suggestionschannel.send(pollEmbed).then(message => {
        message.react(yes);
        message.react(no);
      message.channel.send(suggestionSentEmbed)
        });
  } else {
    message.delete();
    const pollErrEmbed = new Discord.MessageEmbed()
      .setColor('FF6961')
      .setTitle("**error!**")
      .addField("use the correct format: ```!polls-start <title> | <details>```", "If you need help do: `!polls-help`.")
      .setTimestamp()
      .setFooter(message.author.tag + " | Peace Keeper", message.author.displayAvatarURL({dynamic: true, size: 1024}))
      message.reply(pollErrEmbed).then(msg => msg.delete({timeout: 10000}));
  }
 }
}
module.exports.help = {
  name: "polls-start"
}