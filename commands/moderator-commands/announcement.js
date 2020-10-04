const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  let ancArgs = args.slice(0).join(" ").split('|');
  const noPermsErrEmbed = new Discord.MessageEmbed()
  .setColor('FF6961')
  .setTitle("**error!**")
  .setDescription("This command can only be used by staff!")
  .setTimestamp()
  .setFooter(message.author.tag + " | Peace Keeper", message.author.displayAvatarURL({dynamic: true, size: 1024}))
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply(noPermsErrEmbed).then(msg => msg.delete(5000));  
  if (args.length >= 3) {
    message.delete().then(() => {
      const ancEmbed = new Discord.MessageEmbed()
      .setColor('#ABDFF2')
      .setTitle("** " + ancArgs[0] + " **")
      .setDescription(ancArgs[1])
      .setTimestamp()
      .setFooter(message.author.tag + " | Peace Keeper", message.author.displayAvatarURL({dynamic: true, size: 1024}))
      message.channel.send(ancEmbed);
    })
  } else {
    message.delete().catch();
    const ancErrEmbed = new Discord.MessageEmbed()
      .setColor('FF6961')
      .setTitle("**error!**")
      .setDescription("use the correct format: !anc <title> | <message>")
      .setTimestamp()
      .setFooter(message.author.tag + " | Peace Keeper", message.author.displayAvatarURL({dynamic: true, size: 1024}))
      message.reply(ancErrEmbed).then(msg => msg.delete({timeout: 10000}));
  }
}

module.exports.help = {
  name: "anc"
}
