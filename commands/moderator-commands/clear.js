const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    let staffCommandsChannel = message.guild.channels.cache.get('753795028211466280')

    let deletemessage = new Discord.MessageEmbed()
    .setAuthor(message.guild.name)
    .setColor("#ABDFF2")
    .setTitle("Mass Cleaner")
    .addField("Removed ", `${args[0]} messages!`)
    .setTimestamp()
    .setFooter(message.author.tag + " | Peace Keeper", message.author.displayAvatarURL({dynamic: true, size: 1024}))
    
    const noPermsErrEmbed = new Discord.MessageEmbed()
    .setColor('FF6961')   
    .setTitle("**error!**")
    .setDescription("This command can only be used by staff!")
    .setTimestamp()
    .setFooter("Peace Keeper")
    .setFooter(message.author.tag + " | Peace Keeper", message.author.displayAvatarURL({dynamic: true, size: 1024}))

    const usage = new Discord.MessageEmbed()
    .setColor('FF6961')
    .setTitle("**error!**")
    .addField("Usage", "`!clear <number>`")
    .addField("Note: Due to discord API limitation: ", "*You can't clear more than 100 messages at a time!* \n You can't delete messages that are under 14 days old.")
    .setTimestamp()
    .setFooter(message.author.tag + " | Peace Keeper", message.author.displayAvatarURL({dynamic: true, size: 1024}))
    
    const restrictedChan = new Discord.MessageEmbed()
    .setColor('FF6961')
    .setTitle("**error!**")
    .setDescription("You can't delete messages in this channel!")
    .setTimestamp()
    .setFooter(message.author.tag + " | Peace Keeper", message.author.displayAvatarURL({dynamic: true, size: 1024}))

    
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply(noPermsErrEmbed).then(msg => msg.delete({timeout: 9500}));
    if(!args[0]) return message.reply(usage).then(msg => msg.delete({timeout: 8000}));
    if(args[0] > 100) return message.reply(usage).then(msg => msg.delete({timeout: 8000}));
    if(message.channel === '753795028211466280') return message.reply(restrictedChan).then(msg => msg.delete({timeout: 7000}));
    
  
    message.channel.bulkDelete(args[0]).then(() => {
        message.channel.send(deletemessage).then(msg => msg.delete({timeout: 5000}));
    });
};

module.exports.help = {
  name: "clear"
}