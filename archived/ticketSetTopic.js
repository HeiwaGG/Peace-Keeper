const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
   // Setups 
    const categoryID = message.guild.channels.cache.find(category => category.name === "Tickets").id
    let mentionedUser = message.mentions.users.first()
    let guild = bot.guilds.cache.get("725636740232249366")
    let ticketargs = args.slice(0).join(" ").split('|');
  ;
   const noPermsErrEmbed = new Discord.MessageEmbed()
   .setColor('FF6961')
   .setTitle("**error!**")
   .setDescription("This command can only be used by staff!")
   .setTimestamp()
   .setFooter("Peace Keeper")
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply(noPermsErrEmbed).then(msg => msg.delete({timeout: 5000}));
  ;
  const ticketChanErrEmbed = new Discord.MessageEmbed()
   .setColor('FF6961')
   .setTitle("**error!**")
   .setDescription("This command can only be used inside ticket channels!")
   .setTimestamp()
   .setFooter("Peace Keeper")
  if(message.channel.parentID != categoryID) return message.channel.send(ticketChanErrEmbed).then(msg => msg.delete({timeout: 5000}));
  ;
  const noUserErrEmbed = new Discord.MessageEmbed()
   .setColor('FF6961')
   .setTitle("**error!**")
   .setDescription("Mention the ticket opener!")
   .addField("Command format:", "`!tsettopic <@user>`")
   .setTimestamp()
   .setFooter("Peace Keeper")
  if(!mentionedUser) return message.channel.send(noUserErrEmbed).then(msg => msg.delete({timeout: 5000}));
  ;
  const Success = new Discord.MessageEmbed()
   .setColor('ABDFF2')
   .setTitle("**Success!**")
   .setDescription("Ticket channel topic updated!")
   .setTimestamp()
   .setFooter("Peace Keeper")
  ;
  const noNeedEmbed = new Discord.MessageEmbed()
   .setColor('FF6961')
   .setTitle("**error!**")
   .setDescription("The ticket topic is alread the ID of the ticket opener!")
   .setTimestamp()
   .setFooter("Peace Keeper")
  ;
  if(message.channel.topic === mentionedUser.id) return message.channel.send(noNeedEmbed);
  
  message.channel.setTopic(mentionedUser.id)
  message.channel.send(Success)
}
 
module.exports.help = {
  name: "tsetTopic",
  description: "a backup method in case setTopic did not work."
}

