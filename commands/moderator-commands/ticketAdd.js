const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

   // Setups 
    const categoryID =  message.guild.channels.cache.find(c => c.name === "Tickets" && c.type === "category")
    let mentionedUser = message.mentions.users.first()
    let ticketargs = args.slice(0).join(" ").split('|');
  ;

  const noPermsErrEmbed = new Discord.MessageEmbed()
   .setColor('FF6961')
   .setTitle("**error!**")
   .setDescription("This command can only be used by staff!")
   .setTimestamp()
   .setFooter("Peace Keeper")
  ;
  const ticketChanErrEmbed = new Discord.MessageEmbed()
   .setColor('FF6961')
   .setTitle("**error!**")
   .setDescription("This command can only be used inside ticket channels!")
   .setTimestamp()
   .setFooter("Peace Keeper")
  ;
  const noUserErrEmbed = new Discord.MessageEmbed()
   .setColor('FF6961')
   .setTitle("**error!**")
   .setDescription("Mention a user you want added to this ticket!")
   .addField("Command format:", "```!tadd <@user>```")
   .setTimestamp()
   .setFooter("Peace Keeper")
  ;
  const Success = new Discord.MessageEmbed()
   .setColor('FF6961')
   .setTitle("**Success!**")
   .setDescription(`<@${mentionedUser.id}>` + " has been added to this channel!")
   .setTimestamp()
   .setFooter(message.author.tag + " | Peace Keeper", message.author.displayAvatarURL({dynamic: true, size: 1024}))
  ;
  
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply(noPermsErrEmbed).then(msg => msg.delete({timeout: 5000}));
  if(message.channel.parentID != categoryID) return message.channel.send(ticketChanErrEmbed).then(msg => msg.delete({timeout: 5000}));
  if(!mentionedUser) return message.channel.send(noUserErrEmbed).then(msg => msg.delete({timeout: 5000}));

  message.channel.updateOverwrite(mentionedUser, {
    "VIEW_CHANNEL": true, 
    "SEND_MESSAGES": true, 
    "ATTACH_FILES": true, 
    "CREATE_INSTANT_INVITE": false, 
    "ADD_REACTIONS": false}).then(message.channel.send(Success));
  message.channel.send(`<@${mentionedUser.id}>`).then(message => message.delete())
}
 
module.exports.help = {
  name: "tadd"
}

