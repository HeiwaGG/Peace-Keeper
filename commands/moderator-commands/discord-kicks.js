const Discord = require("discord.js");

module.exports.run = async (bot, message) => {

    let logChannel = message.guild.channels.cache.find(ch => ch.name === "discord-punishments")
    let mentionMessage = message.content.slice(6)
    const kickedUser = message.mentions.users.first()

    const noUserErrEmbed = new Discord.MessageEmbed()
    .setColor('FF6961')
    .setTitle("**error!**")
    .setDescription("Provide the user's @!")
    .addField("Usage:", "!dkick `<@user>` <reason>")
    .setFooter(message.author.tag + " | Peace Keeper", message.author.displayAvatarURL({dynamic: true, size: 1024}))

    if(!kickedUser) return message.reply(noUserErrEmbed).then(msg => msg.delete({timeout: 5000}));

    const noPermsErrEmbed = new Discord.MessageEmbed()
    .setColor('FF6961')
    .setTitle("**error!**")
    .setDescription("This command can only be used by staff!")
    .setTimestamp()
    .setFooter(message.author.tag + " | Peace Keeper", message.author.displayAvatarURL({dynamic: true, size: 1024}))

    if(!message.member.hasPermission("KICK_MEMBERS")) return message.reply(noPermsErrEmbed).then(msg => msg.delete({timeout: 5000}));

    const kickEmbed = new Discord.MessageEmbed()
    .setTitle("**Heiwa Peace Keeper**")
    .setDescription("You have been kicked out the Heiwa discord server!")
    .addField("What now?", "You are free to join back, *however* if you continue doing what you were doing before you were kicked a harsher punishment will be handed out.")
    .addField("Rules: ", "https://heiwa.gg/rules")
    .addField("Discord invite link: ", "https://discord.gg/uknX8ha")
    .setTimestamp()
    .setFooter("Peace Keeper • This was an automatic message from Heiwa's discord.")
    .setColor('#fdfd96')

    const kickLogEmbed = new Discord.MessageEmbed()
    .setTitle("Someone has kicked someone out the discord...")
    .setDescription(`${message.author}` + " has kicked " + `${kickedUser}` + " out off the discord.")
    .addField("Reason: ", mentionMessage)
    .addField('Member:', `<@${mutedUser.id}>`, true)
    .addField('Precense:', kickedUser.status, true)
    .addField('Bot?', kickedUser.bot, true)
    .setThumbnail(kickedUser.displayAvatarURL({dynamic: true, size: 1024}))
    .setTimestamp()
    .setFooter("Peace Keeper")
    .setColor('#fdfd96')

    kickedUser.send(kickEmbed).then(() => { 
        message.mentions.members.first().kick(kickedUser, {reason: mentionMessage})});
    logChannel.send(kickLogEmbed);
}

module.exports.help = {
    name: "dkick" 
}