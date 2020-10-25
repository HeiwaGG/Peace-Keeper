const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    let guild = message.guild;
    const bannedUser = message.mentions.members.first();
    let mentionMessage = message.content.slice(6)
    let logChannel = message.guild.channels.cache.find(ch => ch.name === "discord-punishments")

    const noPermsErrEmbed = new Discord.MessageEmbed()
    .setColor('FF6961')
    .setTitle("**error!**")
    .setDescription("You don't have enough permissions to do this!")
    .setTimestamp()
    .setFooter(message.author.tag + " | " + bot.user.username, message.author.displayAvatarURL({dynamic: true, size: 1024}))
    ;
    const noUserErrEmbed = new Discord.MessageEmbed()
     .setColor('FF6961')
     .setTitle("**error!**")
     .setDescription("Provide the user's @!")
     .addField("Usage:", "```!dban <@user> <reason>```")
     .setFooter(message.author.tag + " | " + bot.user.username, message.author.displayAvatarURL({dynamic: true, size: 1024}))
    ;
    const noReasonErrEmbed = new Discord.MessageEmbed()
    .setColor('FF6961')
    .setTitle("**error!**")
    .setDescription("Provide the ban reason!")
    .addField("Usage:", "```!dban <@user> <reason>```")
    .setFooter(message.author.tag + " | " + bot.user.username, message.author.displayAvatarURL({dynamic: true, size: 1024}))
   ;
    const BanEmbed = new Discord.MessageEmbed()
     .setTitle("**Heiwa Peace Keeper**")
     .setDescription("You have been banned off the Heiwa discord server!")
     .addField("What now?", "If you would like access back to the discord server you must first make an appeal on our webiste at: https://heiwa.gg")
     .addField("How do I know if I got accepted?", "If clicking the link provided *below* does nothing within a week of your appeal being sent, then assume that you are still banned off the discord.")
     .addField("If my appeal got rejected, when can I re-appeal?", "You can reappeal after 2 weeks from the date of the last said appeal you have made.")
     .addField("Discord invite link: ", "https://discord.gg/uknX8ha")
     .setTimestamp()
     .setFooter(bot.user.username + ' | This was an automatic message from the ' + `${message.guild.name}` +' discord.')
     .setColor('#FF6961')
    ;
    const BanLogEmbed = new Discord.MessageEmbed()
     .setTitle("Someone has banned someone off the discord...")
     .setDescription(`${message.author}` + " has banned " + `${bannedUser}` + " off the discord.")
     .addField("Reason: ", mentionMessage)
     .addField("Beam me up Kīpā: ", "[Context](" + `${message.url}` + ")", true)
     .addField('Handle:', bannedUser.tag, true)
     .setThumbnail(bannedUser.user.displayAvatarURL({dynamic: true, size: 1024}))
     .setTimestamp()
     .setFooter(bot.user.username, message.author.displayAvatarURL({dynamic: true, size: 1024}))
     .setColor('#FF6961')
    ;

    if(!message.member.hasPermission("BAN_MEMBERS")) return message.reply(noPermsErrEmbed).then(msg => msg.delete({timeout: 5000}));
    if(!bannedUser) return message.reply(noUserErrEmbed).then(msg => msg.delete({timeout: 6000}));
    if(!args[1]) return message.reply(noReasonErrEmbed).then(msg => msg.delete({timeout: 6000}));

    bannedUser.send(BanEmbed).then(() => { 
        guild.members.ban(bannedUser, {reason: mentionMessage})});
    logChannel.send(BanLogEmbed);
}
module.exports.help = {
    name: "dban" 
}
