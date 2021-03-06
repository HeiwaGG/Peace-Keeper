const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    const noPermsErrEmbed = new Discord.MessageEmbed()
    .setColor('FF6961')
    .setTitle("**error!**")
    .setDescription("This command can only be used by staff!")
    .setTimestamp()
    .setFooter(message.author.tag + " | Peace Keeper", message.author.displayAvatarURL({dynamic: true, size: 1024}))

    const slowmodeErrEmbed = new Discord.MessageEmbed()
    .setColor('FF6961')
    .setTitle("**error!**")
    .setDescription("use the correct format: ```!slowmode seconds```")
    .addField("Note:", "No decimal values or usage of letters.")
    .setTimestamp()
    .setFooter(message.author.tag + " | Peace Keeper", message.author.displayAvatarURL({dynamic: true, size: 1024}))

    const slowmodeEmbed = new Discord.MessageEmbed()
    .setColor('FF6961')
    .setTitle("**Success!**")
    .setDescription("Set channel cooldown to " + `${args[0]}` + " seconds.")
    .setTimestamp()
    .setFooter(message.author.tag + " | Peace Keeper", message.author.displayAvatarURL({dynamic: true, size: 1024}))

    const slowmodeRemovedEmbed = new Discord.MessageEmbed()
    .setColor('FF6961')
    .setTitle("**Success!**")
    .setDescription("Removed the cooldown.")
    .setTimestamp()
    .setFooter(message.author.tag + " | " +  bot.username, message.author.displayAvatarURL({dynamic: true, size: 1024}))

    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply(noPermsErrEmbed).then(msg => msg.delete({timeout: 6000}));
    if(!args[0]) return message.reply(slowmodeErrEmbed).then(msg => msg.delete({timeout: 6000}))
    if(isNaN(args[0])) return message.reply(slowmodeErrEmbed).then(msg => msg.delete({timeout: 6000}));
    if(args[0] === "0") {
        message.delete()
        message.channel.send(slowmodeRemovedEmbed).then(message => message.delete({timeout: 7000}))
        message.channel.setRateLimitPerUser(args[0]);
        return ;
    }

    message.delete()
    message.channel.send(slowmodeEmbed).then(message => message.delete({timeout: 7000}))
    message.channel.setRateLimitPerUser(args[0]);
}

module.exports.help = {
    name: "slowmode"
  }