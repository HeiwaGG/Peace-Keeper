const Discord = require("discord.js");
const client = new Discord.Client();
let servericon = ('https://i.imgur.com/foKcByT.png');

module.exports.run = async (bot, message, args) => {
  // No Perms Embed
  const noPermsErrEmbed = new Discord.MessageEmbed()
  .setColor('FF6961')
  .setTitle("**error!**")
  .setDescription("This command can only be used by staff!")
  .setTimestamp()
  .setFooter(message.author.tag + " | Peace Keeper", message.author.displayAvatarURL({dynamic: true, size: 1024}))
  if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply(noPermsErrEmbed).then(msg => msg.delete(5000));

  let ancArgs = args.slice(0).join(" ").split('|');
  
  if (args.length >= 3) {
    message.delete().then(() => {
      const ancEmbed = new Discord.MessageEmbed()
      .setColor('#ABDFF2')
      .setTitle("** " + ancArgs[0] + " **")
      .setDescription(ancArgs[1])
      .setTimestamp()
      .setThumbnail(ancArgs[2])
      .setFooter(message.author.tag + " | Peace Keeper", message.author.displayAvatarURL({dynamic: true, size: 1024}))
      message.channel.send(ancEmbed);
    })
  } else {
    message.delete()
    const ancErrEmbed = new Discord.MessageEmbed()
      .setColor('FF6961')
      .setTitle("**error!**")
      .setDescription("use the correct format: !special-anc <title> | <message> | <direct link to the image>")
      .setTimestamp()
      .setFooter(message.author.tag + " | Peace Keeper", message.author.displayAvatarURL({dynamic: true, size: 1024}))
      message.reply(ancErrEmbed).then(msg => msg.delete({timeout: 10000}));
  }
}

module.exports.help = {
  name: "special-anc"
}
