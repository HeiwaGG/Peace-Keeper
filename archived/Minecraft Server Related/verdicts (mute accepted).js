const Discord = require("discord.js");
const client = new Discord.Client();

module.exports.run = async (bot, message, args) => {
    
    let acceptedMuteEmbed = new Discord.MessageEmbed()
    .setTitle("**Heiwa Mute Verdict**")
    .setDescription("Congratulations! Your mute appeal has been **accepted**!")
    .setTimestamp()
    .setThumbnail(message.guild.iconURL)
    .addField("You regained you chatting ability on `heiwa.gg`!", "Be nice this time. ✌")
    .setFooter("Peace Keeper • This was an automatic message from Heiwa discord.")
    .setColor('#90ee90')

    const noPermsErrEmbed = new Discord.MessageEmbed()
    .setColor('FF6961')
    .setTitle("**error!**")
    .setDescription("This command can only be used by staff!")
    .setTimestamp()
    .setFooter("Peace Keeper")


    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply(noPermsErrEmbed).then(msg => msg.delete({timeout: 5000}));
    
    msg = message.content.toLocaleLowerCase();
  
    if(message.author.bot) return;
  
    mention = message.mentions.users.first();
  
    if(message.content.startsWith ("!smute-accept")) {
      if(mention == null) return;
      mentionMessage = message.content.slice(13);
      mention.send(acceptedMuteEmbed);
      
      let logChannel = message.guild.channels.cache.find(ch => ch.name === "punishment-verdicts")
      if(!logChannel) return;
    
      let acceptedMuteLogEmbed = new Discord.MessageEmbed()
        .setTitle("**Someone has server unmuted a user...**")
        .setDescription(`${message.author}` + " has server unmuted " + `${mention}`)
        .addField('Member:', mention.tag, true)
        .addField('Precense:', mention.status, true)
        .addField('Bot?', mention.bot, true)
        .setTimestamp()
        .setThumbnail(mention.displayAvatarURL({dynamic: true, size: 1024}))
        .setFooter("Peace Keeper")
        .setColor('#90ee90')
      logChannel.send(acceptedMuteLogEmbed);
    }
}

module.exports.help = {
    name: "smute-accept"
}
