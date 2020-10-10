const Discord = require("discord.js");

module.exports.run = async (bot, message) => {
   // Restricts commands to bot commands channels
   let botCommandsChannel = message.guild.channels.cache.find(channel => channel.name === "bot-commands")
   const wrongChannelEmbed = new Discord.MessageEmbed()
   .setColor('#FF6961')
   .setTitle("error!")
   .setDescription("Wrong channel!")
   .addField("Please keep discord bot usage in the correct channel:", "<#750998349276250123>")
   .setTimestamp()
   .setFooter(message.author.tag + " | Peace Keeper", message.author.displayAvatarURL({dynamic: true, size: 1024}))
   if(message.channel != botCommandsChannel) {
    message.delete()
    message.channel.send(wrongChannelEmbed).then(msg => msg.delete({timeout: 7000}));
   }
    else {

   
    message.delete().catch();
     let servericon = message.guild.iconURL;
     let rewardsembed = new Discord.MessageEmbed()
     .setAuthor(message.guild.name)
     .setTimestamp()
     .setFooter(message.author.tag + " | Peace Keeper", message.author.displayAvatarURL({dynamic: true, size: 1024}))
     .setColor('#ABDFF2')
     .setDescription("**All the help links can be found here:**")
     .addField("**!topen:**", "Opens a new support ticket.")
     .addField('**!polls-start:**', "Starts a poll in the <#726235115063083018> channel.")
     .addField("**!bug-report:**", "Used for reporting bugs to the staff team.")
     .addField("**!ip:**", "Tell's you what the server's IP is.")
     .addField('**!uhc:**', "Toggling UHC alerts.")
     .addField("**!website**", "Tell's you the official's Heiwa website.")
     .addField('**!store:**', "Tell's you the store to buy ranks and such.")
     .addField("**!sinfo:**", "Tell's you the discord server information.")
     .addField("**!uinfo:**", "Tell's you your discord account information or someone else's.")
     .setThumbnail(servericon)
     message.channel.send(rewardsembed).then(msg => msg.delete({timeout: 30000}));
}
}

module.exports.help = {
  name: "help"
}