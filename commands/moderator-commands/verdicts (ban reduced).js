const Discord = require("discord.js");
const client = new Discord.Client();

module.exports.run = async (bot, message, args) => {
    let acceptedBanEmbed = new Discord.MessageEmbed()
    .setTitle("**Heiwa Ban Verdict**")
    .setDescription("Good news! Your ban has been **reduced**!")
    .setTimestamp()
    .setThumbnail(message.guild.iconURL)
    .addField("Your ban appeal has been accepted *however*, it has been reduced to just 5 days", "*Do not play on an alt account during this cooldown period or you may be banned for longer than you originally have been.*")
    .setFooter("Peace Keeper • This was an automatic message from Heiwa's discord.")
    .setColor('#fdfd96')
    
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
  
    if(message.content.startsWith ("!sban-reduce")) {
      if(mention == null) return;
      mentionMessage = message.content.slice(12);
      mention.send(acceptedBanEmbed);
      
      let logChannel = message.guild.channels.cache.find(ch => ch.name === "punishment-verdicts")
      if(!logChannel) return;
    
      let unBanLogEmbed = new Discord.MessageEmbed()
        .setTitle("**Someone has reduced someone's server ban appeal...**")
        .setDescription(`${message.author}` + " has reduced " + `${mention}` + "'s server ban appeal.")
        .addField("Reason:", message.content.slice(12))
        .addField('Member:', mention.tag, true)
        .addField('Precense:', mention.status, true)
        .addField('Bot?', mention.bot, true)
        .setTimestamp()
        .setThumbnail(mention.displayAvatarURL({dynamic: true, size: 1024}))
        .setFooter("Peace Keeper")
        .setColor('#fdfd96')
      logChannel.send(unBanLogEmbed);
    }
}

module.exports.help = {
    name: "sban-reduce"
}
