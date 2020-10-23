const Discord = require("discord.js");
const client = new Discord.Client();
const UHCrole = '726227757238845511'

module.exports.run = async (bot, message, args) => {
  const CertifiedRole = message.guild.roles.cache.find(roles => roles.name === 'Certified')
  const certificationChannel = message.guild.channels.cache.find(channel => channel.name === "certification");

  const channelEmbed = new Discord.MessageEmbed()
    .setColor('#FF6961')
    .setTitle("error!")
    .setDescription("You can't do this here...")
    .setTimestamp()
    .setFooter(message.author.tag + " | Peace Keeper", message.author.displayAvatarURL({dynamic: true, size: 1024}))
  ;
  
  message.delete();

  if(message.channel != certificationChannel) {
    message.channel.send(channelEmbed).then(msg => msg.delete({timeout: 5000}))};
    
  if(message.content === '!certify') {
    message.member.roles.add(CertifiedRole)};
};
module.exports.help = {
  name: "certify"
}