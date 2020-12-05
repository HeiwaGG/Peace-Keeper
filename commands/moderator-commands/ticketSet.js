const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
   // Setups 
   const supportCategory = message.guild.channels.cache.find(c => c.name.includes("Support") && c.type === "category")
   let supportCategoryid = supportCategory.id
   let mentionedUser = message.mentions.users.first()
   let ticketargs = args.slice(0).join(" ").split('|');
  ;
   const noPermsErrEmbed = new Discord.MessageEmbed()
   .setColor('FF6961')
   .setTitle("**error!**")
   .setDescription("You don't have enough permissions to do this!")
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
  
  if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply(noPermsErrEmbed)
  if(message.channel.id !== supportCategoryid) return message.reply(ticketChanErrEmbed)
  if(!mentionedUser) return message.reply(noUserErrEmbed)

  return message.channel.send(Success)
}
 
module.exports.help = {
  name: "tset"
}