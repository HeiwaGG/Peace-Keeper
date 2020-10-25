const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  // Restricts commands to bot commands channels
  let botCommandsChannel = message.guild.channels.cache.find(channel => channel.name === "bot-commands")
  let suggestionsChannel = message.guild.channels.cache.find(channel => channel.name === "suggestions")
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
    let helpMembersEmbed = new Discord.MessageEmbed()
     .setTitle(`Peace Keeper Help Menu`)
     .setDescription("All the possible commands you can do you can do!\n*Reminder that these are all case sensitive commands!*")
     .addField("`!topen`", "Opens a new support ticket.")
     .addField('`!polls-start`', `Starts a poll in the <#${suggestionsChannel.id}> channel.`)
     .addField("`!bug-report`", "Used for reporting bugs to the staff team.")
     .addField("`!sinfo`", "Tell's you the discord server information.")
     .addField("`!uinfo`", "Tell's you your discord account information or someone else's.")
     .addField("`!about`", "Information about the creator of this bot!")
     .setThumbnail(message.guild.iconURL({dynamic: true, size: 1024}))
     .setTimestamp()
     .setColor('#ABDFF2')
     .setFooter(message.author.tag + " | " + bot.user.username, message.author.displayAvatarURL({dynamic: true, size: 1024}))
    ;
   let helpStaffEmbed = new Discord.MessageEmbed()
     .setTitle(`Peace Keeper Staff Help Menu`)
     .setDescription("All the possible commands you can do you can do!\n*Reminder that these are all case sensitive commands!*")
     .addField("`!dkick`", "Kick's a user out of the discord.")
     .addField('`!dban`', `Ban's a user off this discord.`)
     .addField('`!dunban`', `Clears someone's ban from the discord.`)
     .addField("`!dmute`", "Restricts a user from talking in the discord.")
     .addField("`!dunmute`", "Removes a user's talking restrictions.")
     .addField("`!clear`", "Bluk clear messages.")
     .addField("`!slowmode`", "Set's the chat slowmode to any number.")
     .addField("`!tadd`", "Add's a user to a ticket channel.")
     .addField("`!tclose`", "Closes an open ticket.")
     .addField("`!tset`", "Set's the ticket of a user to another user.")
     .addField("`!transcript`", "Collects the messages of a channel and send you them in a HTML format.")
     .setThumbnail(message.guild.iconURL({dynamic: true, size: 1024}))
     .setTimestamp()
     .setColor('#ABDFF2')
     .setFooter(message.author.tag + " | " + bot.user.username, message.author.displayAvatarURL({dynamic: true, size: 1024}))
    ;
   let helpAdminEmbed = new Discord.MessageEmbed()
     .setTitle(`Peace Keeper Administrator Help Menu`)
     .setDescription("All the possible commands you can do you can do!\n*Reminder that these are all case sensitive commands!*")
     .addField("`!anc`", "Sends announcment message in an embed format (No mentions).")
     .addField('`!special-anc`', `Sends announcment message in an embed format with an image of your choice (No mentions).`)
     .addField("`!pkHelp`", "Sends a helpop message to the author of this bot!")
     .addField("Want to view the member's help menu?", "Click the ️⬇️ below!")
     .setThumbnail(message.guild.iconURL({dynamic: true, size: 1024}))
     .setTimestamp()
     .setColor('#ABDFF2')
     .setFooter(message.author.tag + " | " + bot.user.username, message.author.displayAvatarURL({dynamic: true, size: 1024}))
    ;
  
    if(message.member.permissions.has("ADMINISTRATOR")) return message.channel.send(helpAdminEmbed);

    if(message.member.roles.cache.find(role => role.name === 'Staff')) return message.channel.send(helpStaffEmbed).then(message => message.react('⬇️'));

    if(!message.member.roles.cache.find(role => role.name === 'Staff')) return message.channel.send(helpMembersEmbed);
      
  
    
  }
};

module.exports.help = {
  name: "help"
};