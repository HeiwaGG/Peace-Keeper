const Discord = require("discord.js");
const client = new Discord.Client();

module.exports.run = async (bot, message, args) => {

    let guild = message.guild;
    const bannedUser = await bot.users.fetch(args[0]);

    const noUserErrEmbed = new Discord.MessageEmbed()
    .setColor('FF6961')
    .setTitle("**error!**")
    .setDescription("Provide the user's ID!")
    .addField("Usage:", "!dunban `<id>`")
    .setFooter(message.author.tag + " | Peace Keeper", message.author.displayAvatarURL({dynamic: true, size: 1024}))

    const noPermsErrEmbed = new Discord.MessageEmbed()
    .setColor('FF6961')
    .setTitle("**error!**")
    .setDescription("This command can only be used by staff!")
    .setTimestamp()
    .setFooter(message.author.tag + " | Peace Keeper", message.author.displayAvatarURL({dynamic: true, size: 1024}))

    const unBanLogEmbed = new Discord.MessageEmbed()
    .setColor('90ee90')
    .setTitle("Someone has unbanned someone off the discord...")
    .setDescription(`${message.author}` + " has unbanned " + `${bannedUser}` + " off the discord.")
    .addField('Member:', bannedUser.tag, true)
    .addField('Precense:', bannedUser.status, true)
    .addField('Bot?', bannedUser.bot, true)
    .setThumbnail(bannedUser.displayAvatarURL({dynamic: true, size: 1024}))
    .setTimestamp()
    .setFooter(message.author.tag + " | Peace Keeper", message.author.displayAvatarURL({dynamic: true, size: 1024}))

    let logChannel = message.guild.channels.cache.find(ch => ch.name === "discord-punishments")

    if(message.content.startsWith ("!dunban")) {
        if(!message.member.hasPermission("BAN_MEMBERS")) return message.reply(noPermsErrEmbed).then(msg => msg.delete({timeout: 5000}));
        if(!bannedUser) return message.reply(noUserErrEmbed).then(msg => msg.delete({timeout: 5000}));
        guild.members.unban(bannedUser);
        mentionMessage = message.content.slice(8);
        logChannel.send(unBanLogEmbed);
    }
}

module.exports.help = {
    name: "dunban"
}