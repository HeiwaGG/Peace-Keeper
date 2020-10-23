const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

   // Restricts commands to bot commands channels
   let botCommandsChannel = message.guild.channels.cache.find(channel => channel.name === "bot-commands")
   const wrongChannelEmbed = new Discord.MessageEmbed()
     .setColor('#FF6961')
     .setTitle("error!")
     .setDescription("Wrong channel!")
     .addField("Please keep discord bot usage in the correct channel:", `${botCommandsChannel}`)
     .setTimestamp()
     .setFooter(message.author.tag + " | Peace Keeper", message.author.displayAvatarURL({dynamic: true, size: 1024}))
     if(message.channel != botCommandsChannel.id) {
         message.delete()
         message.channel.send(wrongChannelEmbed).then(msg => msg.delete({timeout: 7000}));
         return;
     };
    
   // Setups 
    const ticketsCategory = message.guild.channels.cache.find(c => c.name === "Tickets" && c.type === "category")
    var username = message.author.username;
    let servericon = message.guild.iconURL({dynamic: true, size: 1024});
    let StaffPing = message.guild.roles.cache.find(role => role.name === 'Staff')
    let ticketargs = args.slice(0).join(" ").split('|');
    const ticketReason = ticketargs[0]

    // Error Embed due to no reason provided
    var embedCreateNoReasonTicket = new Discord.MessageEmbed()
     .setTitle("**error!**")
     .setColor('#FF6961')
     .setDescription("Please provide a reason on why you are opening this ticket.")
     .addField("Format:", "```!topen <reason>```")
     .setTimestamp()
     .setFooter("Peace Keeper");
    if(!ticketargs[0]) return message.channel.send(embedCreateNoReasonTicket).then(msg => msg.delete({timeout: 7000}));


    // Embed for users trying to open a ticket in which they already have ticket open.
    const newTicketErrEmbed = new Discord.MessageEmbed()
     .setColor('FF6961')
     .setTitle("**error!**")
     .addField("You currently have a ticket open.", "Don't make a new ticket till the current one is closed.")
     .setTimestamp()
     .setFooter(message.author.tag + " | Peace Keeper", message.author.displayAvatarURL({dynamic: true, size: 1024}))
     if(message.guild.channels.cache.find(channel => channel.name === "ticket-" + message.author.username)) return message.channel.send(newTicketErrEmbed);
    ;

    message.guild.channels.create("ticket - " + username, {reason: 'Private ticket channel for ' + username}).then((createdChan) => {
        createdChan.setParent(ticketsCategory.id).then((settedParent) => {
            settedParent.updateOverwrite(message.author, {
              "VIEW_CHANNEL": true, 
              "SEND_MESSAGES": true, 
              "ATTACH_FILES": true,}).then(createdChan.setTopic(`${message.author.id}`));
            
   // Embed for confirming the ticket is open and it's location.
   var embedCreateTicket = new Discord.MessageEmbed()
   .setTitle("**Tickets**")
   .setColor('#ABDFF2')
   .setThumbnail(servericon)
   .setDescription("A ticket has been opened!")
   .addField("Ticket Location:", createdChan, true)
   .addField("Ticket Reason:", ticketReason , true)
   .setTimestamp()
   .setFooter("Peace Keeper");
   message.channel.send(embedCreateTicket)
  ;
    
   // Embed that gets send when the ticket channel gets open and informs staff and the ticket author about this ticket.
   var embedParent = new Discord.MessageEmbed()
    .setTitle("**Tickets**")
    .setColor('#ABDFF2')
    .setDescription("All online staff have been notified, we will get back to you as soon as possible.")
    .addField("Ticket Name:", "#ticket-" + message.author.username, true)
    .addField("Opened By:", `<@${message.author.id}>`, true)
    .addField("Ticket Reason:", ticketReason , true)
    .addField("__Be warned!__", "Harrassment is not taken lightly. If you act malicous in any form towards anyone, the ticket will be closed and you will be punished.")
    .addField("Note:", "*To get this chat's transcript, please allow direct messages from this server.\nIf unsure on how to turn this on, ask here on how to do this.*")
    .setTimestamp()
    .setFooter("Peace Keeper")
   ;
   settedParent.send(`<@&${StaffPing.id}>`)
   settedParent.send(`<@${message.author.id}>`)
   settedParent.send(embedParent);
   createdChan.setTopic(`${message.author.id}`)
        });
    });

    var embedOpenTicket = new Discord.MessageEmbed()
     .setTitle("**Tickets**")
     .setColor('#ABDFF2')
     .setThumbnail(message.author.displayAvatarURL({dynamic: true, size: 1024}))
     .setDescription("A ticket has been opened!")
     .addField("Ticket Name:", "#ticket-" + message.author.username, true)
     .addField("Opened By:", `${message.author.tag}`, true)
     .addField("Ticket Reason:", ticketReason , true)
     .setTimestamp()
     .setFooter("Peace Keeper");
    ;
    var logChannel = message.guild.channels.cache.find(channel => channel.name === "ticket-logs");
    if(!logChannel) return message.channel.send("#ticket-logs doesn't exist!\nPlease make one and keep it private off the masses.");

    message.delete().then(() => {
    logChannel.send(embedOpenTicket);
    });
};
 
module.exports.help = {
  name: "topen"
};

