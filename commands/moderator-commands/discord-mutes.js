const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    let logChannel = message.guild.channels.cache.find(ch => ch.name === "discord-punishments")
    let mentionMessage = message.content.slice(6)
    const mutedUser = message.mentions.users.first()
    const mutedRole = message.guild.roles.cache.find(r => r.name === "Muted");

    const noPermsErrEmbed = new Discord.MessageEmbed()
     .setColor('FF6961')
     .setTitle("**error!**")
     .setDescription("This command can only be used by staff!")
     .setTimestamp()
     .setFooter(message.author.tag + " | Peace Keeper", message.author.displayAvatarURL({dynamic: true, size: 1024}))
    if(!message.member.hasPermission("MANAGE_ROLES")) return message.reply(noPermsErrEmbed).then(msg => msg.delete({timeout: 5000}));
    ;
    const noUserErrEmbed = new Discord.MessageEmbed()
     .setColor('FF6961')
     .setTitle("**error!**")
     .setDescription("Provide the user's @!")
     .addField("Usage:", "`!dmute <@user> <reason>`")
     .setFooter(message.author.tag + " | Peace Keeper", message.author.displayAvatarURL({dynamic: true, size: 1024}))
    if(!mutedUser) return message.reply(noUserErrEmbed).then(msg => msg.delete({timeout: 5000}));
    ;
    const alrMutedEmbed = new Discord.MessageEmbed()
     .setColor('FF6961')
     .setTitle("**error!**")
     .setDescription("Cant mute a user who is already muted!")
     .setFooter(message.author.tag + " | Peace Keeper", message.author.displayAvatarURL({dynamic: true, size: 1024}))
    if(mutedUser.roles.cache.has(mutedRole)) return message.reply(alrMutedEmbed).then(msg => msg.delete({timeout: 5000}));    
    ;
    const mutedEmbed = new Discord.MessageEmbed()
     .setTitle("**Heiwa Peace Keeper**")
     .setDescription("You have been muted on the Heiwa discord server!")
     .addField("What now?", "You will be unmuted within due time, however if you keep repeating what you already been muted for, you'll be punished for even longer.")
     .addField("Follow the rules:", "*https://heiwa.gg/rules*")
     .setTimestamp()
     .setFooter("Peace Keeper • This was an automatic message from Heiwa's discord.")
     .setColor('#fdfd96')
    ; 
    const muteLogEmbed = new Discord.MessageEmbed()
    .setTitle("Someone has muted someone on the discord...")
     .setDescription(`${message.author}` + " has muted " + `${mutedUser}` + " on the discord.")
     .addField("Reason: ", mentionMessage)
     .addField('Member:', mutedUser.tag, true)
     .addField('Precense:', mutedUser.status, true)
     .addField('Bot?', mutedUser.bot, true)
     .setThumbnail(mutedUser.displayAvatarURL({dynamic: true, size: 1024}))
     .setTimestamp()
     .setFooter("Peace Keeper")
     .setColor('#fdfd96')
    ;

    mutedUser.send(mutedEmbed)
    logChannel.send(muteLogEmbed);
}

module.exports.help = {
    name: "dmute" 
}