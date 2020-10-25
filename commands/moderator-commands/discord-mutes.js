const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    let logChannel = message.guild.channels.cache.find(ch => ch.name === "discord-punishments")
    const mutedUser = message.mentions.users.first()
    let mentionMessage = message.content.slice(7)
    const mutedRole = message.guild.roles.cache.find(r => r.name === "Muted");

    const noPermsErrEmbed = new Discord.MessageEmbed()
     .setColor('FF6961')
     .setTitle("**error!**")
     .setDescription("You do not have enough permissions to do this!")
     .setTimestamp()
     .setFooter(message.author.tag + " | Peace Keeper", message.author.displayAvatarURL({dynamic: true, size: 1024}))
    ;
    const noUserErrEmbed = new Discord.MessageEmbed()
     .setColor('FF6961')
     .setTitle("**error!**")
     .setDescription("Provide the user's @!")
     .addField("Usage:", "```!dmute <@user> <reason>```")
     .setFooter(message.author.tag + " | Peace Keeper", message.author.displayAvatarURL({dynamic: true, size: 1024}))
    ;
    const noReasonErrEmbed = new Discord.MessageEmbed()
    .setColor('FF6961')
    .setTitle("**error!**")
    .setDescription("Provide the reason for the mute!")
    .addField("Usage:", "```!dmute <@user> <reason>```")
    .setFooter(message.author.tag + " | " + bot.user.username, message.author.displayAvatarURL({dynamic: true, size: 1024}))
   ;
    const alrMutedEmbed = new Discord.MessageEmbed()
     .setColor('FF6961')
     .setTitle("**error!**")
     .setDescription("Cant mute a user who is already muted!")
     .setFooter(message.author.tag + " | Peace Keeper", message.author.displayAvatarURL({dynamic: true, size: 1024}))   
    ;
    const mutedEmbed = new Discord.MessageEmbed()
     .setTitle("**Peace Keeper**")
     .setDescription(`You have been muted on the ${message.guild.name} discord server!`)
     .addField("What now?", "You will be unmuted within due time, however if you keep repeating what you were already muted for, you'll be punished for even longer.")
     .addField("Follow the rules:", "*https://heiwa.gg/rules*")
     .setTimestamp()
     .setFooter(bot.user.username + ' | This was an automatic message from the ' + `${message.guild.name}` +' discord.')
     .setColor('#fdfd96')
    ; 
    const muteLogEmbed = new Discord.MessageEmbed()
    .setTitle("Someone has muted someone on the discord...")
     .setDescription(`${message.author}` + " has muted " + `${mutedUser}` + " on the discord.")
     .addField("Reason: ", mentionMessage)
     .addField("Beam me up Kīpā: ", "[Context](" + `${message.url}` + ")", true)
     .addField("Handle:", mutedUser.tag, true)
     .setThumbnail(mutedUser.displayAvatarURL({dynamic: true, size: 1024}))
     .setTimestamp()
     .setFooter("Peace Keeper")
     .setColor('#fdfd96')
    ;

    if(!message.member.hasPermission("MANAGE_ROLES")) return message.reply(noPermsErrEmbed).then(msg => msg.delete({timeout: 5000}));
    if(!mutedUser) return message.reply(noUserErrEmbed).then(msg => msg.delete({timeout: 5000}));
    if(!args[1]) return message.reply(noReasonErrEmbed).then(msg => msg.delete({timeout: 5000}));
    if(mutedUser.roles.cache.has(mutedRole)) {
        message.channel.send(alrMutedEmbed).then(message => message.delete({timeout: 5000}))
        return ;
    }  

    mutedUser.roles.add(mutedRole)
    mutedUser.send(mutedEmbed)
    logChannel.send(muteLogEmbed);
}

module.exports.help = {
    name: "dmute" 
}
