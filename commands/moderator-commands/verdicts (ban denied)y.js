const Discord = require("discord.js");
const client = new Discord.Client();

module.exports.run = async (bot, message, args) => {
    let acceptedBanEmbed = new Discord.MessageEmbed()
    .setTitle("**Heiwa Ban Verdict**")
    .setDescription("Unfortunately, your ban appeal has been **denied**!")
    .setTimestamp()
    .setThumbnail(message.guild.iconURL)
    .addField("You are __not__ allowed to publish another ban appeal within 2 weeks of receiving this message.", "If you do they will be disregarded and may hinder your chances for a successful ban appeal in the future.")
    .addField("Appeal location:", "https://heiwa.gg/punishment-appeals")
    .setFooter("Peace Keeper • This was an automatic message from Heiwa's discord.")
    .setColor('#FF6961')
    
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
  
    if(message.content.startsWith ("!sban-deny")) {
      if(mention == null) return;
      mentionMessage = message.content.slice(10);
      mention.send(acceptedBanEmbed);
      
      let logChannel = message.guild.channels.cache.find(ch => ch.name === "punishment-verdicts")
      if(!logChannel) return;
    
      let unBanLogEmbed = new Discord.MessageEmbed()
        .setTitle("**Someone has denied a server ban appeal...**")
        .setDescription(`${message.author}` + " has denied " + `${mention}` + "'s server ban appeal.")
        .addField("Reason:", message.content.slice(10))
        .addField('Member:', mention.tag, true)
        .addField('Precense:', mention.status, true)
        .addField('Bot?', mention.bot, true)
        .setTimestamp()
        .setThumbnail(mention.displayAvatarURL({dynamic: true, size: 1024}))
        .setFooter("Peace Keeper")
        .setColor('#FF6961')
      logChannel.send(unBanLogEmbed);
    }
}

module.exports.help = {
    name: "sban-deny"
}
