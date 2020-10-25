const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    let logChannel = message.guild.channels.cache.find(ch => ch.name === "discord-punishments")
    let mentionMessage = message.content.slice(6)
    const mutedUser = message.mentions.users.first()
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
     .addField("Usage:", "```!dunmute <@user>```")
     .setFooter(message.author.tag + " | Peace Keeper", message.author.displayAvatarURL({dynamic: true, size: 1024}))
    ;
    const notMutedEmbed = new Discord.MessageEmbed()
     .setColor('FF6961')
     .setTitle("**error!**")
     .setDescription("Cant unmute a user who is already unmuted!")
     .setFooter(message.author.tag + " | Peace Keeper", message.author.displayAvatarURL({dynamic: true, size: 1024}))
    ;
    const mutedEmbed = new Discord.MessageEmbed()
     .setTitle("** Peace Keeper**")
     .setDescription(`You have been unmuted on the ${message.guild.name} discord server!`)
     .addField(`You regained you chatting ability on the ${message.guild.name} discord server!`, "Be nice this time. ✌")
     .addField("Follow the rules:", "*https://heiwa.gg/rules*")
     .setTimestamp()
     .setFooter(`Peace Keeper • This was an automatic message from ${message.guild.name} discord.`)
     .setColor('#90ee90')
    ; 
    const muteLogEmbed = new Discord.MessageEmbed()
    .setTitle("Someone has unmuted someone on the discord...")
     .setDescription(`${message.author}` + " has muted " + `${mutedUser}` + " on the discord.")
     .addField("Reason: ", mentionMessage)
     .addField('Member:', `<@${mutedUser.id}>`, true)
     .addField('Precense:', mutedUser.status, true)
     .addField('Bot?', mutedUser.bot, true)
     .setThumbnail(mutedUser.displayAvatarURL({dynamic: true, size: 1024}))
     .setTimestamp()
     .setFooter("Peace Keeper")
     .setColor('#90ee90')
    ;

    if(!message.member.hasPermission("MANAGE_ROLES")) return message.reply(noPermsErrEmbed).then(msg => msg.delete({timeout: 5000}));
    if(!mutedUser) return message.reply(noUserErrEmbed).then(msg => msg.delete({timeout: 5000}));
    if(!mutedUser.roles.cache.has("763781380885708820")) {
        message.channel.send(notMutedEmbed).then(message => message.delete({timeout: 5000}))
        return ;
    };     

    mutedUser.roles.remove(mutedRole)
    mutedUser.send(mutedEmbed)
    logChannel.send(muteLogEmbed);
}

module.exports.help = {
    name: "dunmute" 
}