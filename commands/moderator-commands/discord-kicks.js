const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    let logChannel = message.guild.channels.cache.find(ch => ch.name === "discord-punishments")
    let generalChannel = message.guild.channels.cache.find(channel => channel.name === "general")
    let mentionMessage = message.content.slice(7)
    const kickedUser = message.mentions.users.first()
    let punishmentArgs = args.join(" ")

    const noUserErrEmbed = new Discord.MessageEmbed()
    .setColor('FF6961')
      .setTitle("**error!**")
     .setDescription("Provide the user's @!")
     .addField("Usage:", "```!dkick <@user> <reason>```")
     .setFooter(message.author.tag + " | " + bot.user.username, message.author.displayAvatarURL({dynamic: true, size: 1024}))
     
     if(!kickedUser) {
         message.delete()
         message.channel.send(noUserErrEmbed).then(msg => msg.delete({timeout: 6000}));
         return ;
     }
    ;
    const noReasonErrEmbed = new Discord.MessageEmbed()
    .setColor('FF6961')
    .setTitle("**error!**")
    .setDescription("Provide the kick reason!")
    .addField("Usage:", "```!dkick <@user> <reason>```")
    .setFooter(message.author.tag + " | " + bot.user.username, message.author.displayAvatarURL({dynamic: true, size: 1024}))
    if(!args[1]) {
        message.delete()
        message.channel.send(noReasonErrEmbed).then(msg => msg.delete({timeout: 5000}));
        return ;

    }
   ;
    const noPermsErrEmbed = new Discord.MessageEmbed()
     .setColor('FF6961')
     .setTitle("**error!**")
     .setDescription("You do not have enough permissions to do this!")
     .setTimestamp()
     .setFooter(message.author.tag + " | " + bot.user.username, message.author.displayAvatarURL({dynamic: true, size: 1024}))
    if(!message.member.hasPermission("KICK_MEMBERS")) return message.reply(noPermsErrEmbed).then(msg => msg.delete({timeout: 5000}));
    ;

    generalChannel.createInvite({temporary: false, maxAge: 0, reason: "Kick invitation back"}).then(invite => {
        const kickEmbed = new Discord.MessageEmbed()
         .setTitle("**Peace Keeper**")
         .setDescription(`You have been kicked out the ${message.guild.name} discord server!`)
         .addField("What now?", "You are free to join back, *however* if you continue doing what you were doing before you were kicked a harsher punishment will be handed out.")
         .addField("Rules: ", "https://heiwa.gg/rules")
         .addField("Discord invite link: ", `https://discord.gg/${invite.code}`)
         .setTimestamp()
         .setFooter(bot.user.username + ' | This was an automatic message from the ' + `${message.guild.name}` +' discord.')
         .setColor('#fdfd96')
        ;
        const kickLogEmbed = new Discord.MessageEmbed()
         .setTitle("Someone has kicked someone out the discord...")
         .setDescription(`${message.author}` + " has kicked " + `${kickedUser}` + " out off the discord.")
         .addField("Reason: ", mentionMessage)
         .addField("Beam me up Kīpā: ", "[Context](" + `${message.url}` + ")", true)
         .addField('Handle:', kickedUser.tag, true)
         .setThumbnail(kickedUser.displayAvatarURL({dynamic: true, size: 1024}))
         .setTimestamp()
         .setFooter(bot.user.username, message.author.displayAvatarURL({dynamic: true, size: 1024}))
         .setColor('#fdfd96')
        ;
        kickedUser.send(kickEmbed).catch(Error).then(() => { 
            message.mentions.members.first().kick(kickedUser, {reason: mentionMessage})});
        logChannel.send(kickLogEmbed);
    })
}

module.exports.help = {
    name: "dkick" 
}
