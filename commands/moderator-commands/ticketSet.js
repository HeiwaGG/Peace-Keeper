const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
   // Setups 
<<<<<<< Updated upstream
    const categoryID = message.guild.channels.cache.find(c => c.name.includes("Tickets") && c.type === "category").id
    let mentionedUser = message.mentions.users.first()
  
=======
   const categoryID = message.guild.channels.cache.find(c => c.name.includes("Tickets") && c.type === "category").id
   let mentionedUser = message.mentions.users.first()
    let ticketargs = args.slice(0).join(" ").split('|');
  ;
>>>>>>> Stashed changes
   const noPermsErrEmbed = new Discord.MessageEmbed()
   .setColor('FF6961')
   .setTitle("**error!**")
   .setDescription("You don't have enought permissions to do this!")
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
   .setDescription("Mention the ticket opener!")
   .addField("Command format:", "```!tset <@user>```")
   .setTimestamp()
   .setFooter("Peace Keeper")
  ;
  const Success = new Discord.MessageEmbed()
   .setColor('ABDFF2')
   .setTitle("**Success!**")
   .setDescription("Ticket has been updated!")
   .setTimestamp()
   .setFooter("Peace Keeper")
  ;
  const noNeedEmbed = new Discord.MessageEmbed()
   .setColor('FF6961')
   .setTitle("**error!**")
   .setDescription("This ticket already belongs to that user!")
   .setTimestamp()
   .setFooter("Peace Keeper")
  ;
<<<<<<< Updated upstream
  
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply(noPermsErrEmbed).then(msg => msg.delete({timeout: 5000}));
  if(message.channel.parentID != categoryID) return message.channel.send(ticketChanErrEmbed).then(msg => msg.delete({timeout: 5000}));
  if(!mentionedUser) return message.channel.send(noUserErrEmbed).then(msg => msg.delete({timeout: 5000}));
  if(message.channel.topic === mentionedUser.id && message.channel.name === `ticket-${mentionedUser.username}`) return message.channel.send(noNeedEmbed);
  
  message.channel.setTopic(mentionedUser.id).then(message.channel.setName("ticket-" + mentionedUser.username, ["Make ticket subject to another user."]))
=======
  if(message.channel.topic == mentionedUser.id) return message.channel.send(noNeedEmbed);
  
  
>>>>>>> Stashed changes
  message.channel.send(Success)
}
 
module.exports.help = {
  name: "tset",
  description: "to set a ticket to a different user."
}