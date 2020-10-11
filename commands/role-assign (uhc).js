const Discord = require("discord.js");
const client = new Discord.Client();
const uhc = '726227757238845511'

module.exports.run = async (bot, message, args) => {
// Restricts commands to bot commands channels
   let botCommandsChannel = message.guild.channels.cache.get('750998349276250123')
   const wrongChannelEmbed = new Discord.MessageEmbed()
    .setColor('#FF6961')
    .setTitle("error!")
    .setDescription("Wrong channel!")
    .addField("Please keep discord bot usage in the correct channel:", `<#${botCommandsChannel.id}>`)
    .setTimestamp()
    .setFooter(message.author.tag + " | Peace Keeper", message.author.displayAvatarURL({dynamic: true, size: 1024}))
   if(message.channel != botCommandsChannel) {
    message.delete()
    message.channel.send(wrongChannelEmbed).then(msg => msg.delete({timeout: 7000}));
    }

   if(message.member.roles.cache.has(uhc)) {
        message.delete()
        message.member.roles.remove(uhc);  
        const uhcOff = new Discord.MessageEmbed()
         .setColor('#FF6961')
         .setTitle('**Your UHC role has been removed**')
         .setDescription('To be notified of upcoming UHC games please do: **`!uhc`** again!')
         .setTimestamp()
         .setFooter(message.author.tag + " | Peace Keeper", message.author.displayAvatarURL({dynamic: true, size: 1024}))
         message.channel.send(uhcOff).then(msg => msg.delete({timeout: 10000}));
    }

   if(!message.member.roles.cache.has(uhc)){
    message.member.roles.add(uhc);  
    const uhcOn = new Discord.MessageEmbed()
     .setColor('#ABDFF2')
     .setTitle('**You have been given the UHC role!**')
     .setDescription('*You will now be notifed of upcoming UHC games!*')
     .setTimestamp()
     .setFooter(message.author.tag + " | Peace Keeper", message.author.displayAvatarURL({dynamic: true, size: 1024}))
     message.channel.send(uhcOn)
   }
}

module.exports.help = {
    name: "uhc"
}