const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

   // Restricts commands to bot commands channels
   const botCommandsResChannel = "750998349276250123"
   const wrongChannelEmbed = new Discord.MessageEmbed()
     .setColor('#FF6961')
     .setTitle("error!")
     .setDescription("Wrong channel!")
     .addField("Please keep discord bot usage in the correct channel:", "<#750998349276250123>")
     .setTimestamp()
     .setFooter(message.author.tag + " | Peace Keeper", message.author.displayAvatarURL({dynamic: true, size: 1024}))
     if(message.channel != botCommandsResChannel) {
         message.delete()
         message.channel.send(wrongChannelEmbed).then(msg => msg.delete({timeout: 7000}));
         return;
     };
    
   // Setups 
    const categoryID = "730413542653820958";
    var username = message.author.username;
    var bool = false;
    let servericon = message.guild.iconURL({dynamic: true, size: 1024});
    let guild = bot.guilds.cache.get("725636740232249366")
    let StaffPing = '730420809642016828'
    let ticketLocation = `${'#ticket-' + message.author.username}`
    let ticketargs = args.slice(0).join(" ").split('|');
    const ticketReason = ticketargs[0]

    // Error Embed due to no reason provided
    var embedCreateNoReasonTicket = new Discord.MessageEmbed()
    .setTitle("**error!**")
    .setColor('#FF6961')
    .setDescription("Please provide a reason on why you are opening this ticket.")
    .addField("Format: ", "`!topen <reason>`")
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
    if(guild.channels.cache.find(channel => channel.name === "ticket-" + message.author.username)) return message.channel.send(newTicketErrEmbed);

    // Embed for confirming the ticket is open and it's location.
    var embedCreateTicket = new Discord.MessageEmbed()
    .setTitle("**Tickets**")
    .setColor('#ABDFF2')
    .setThumbnail(servericon)
    .setDescription("A ticket has been opened!")
    .addField("Ticket Name:", ticketLocation, true)
    .addField("Ticket Reason:", ticketReason , true)
    .setTimestamp()
    .setFooter("Peace Keeper");

    message.channel.send(embedCreateTicket)
    guild.channels.create("ticket - " + username, {reason: 'Private ticket channel for ' + username}).then((createdChan) => {
        createdChan.setParent(categoryID).then((settedParent) => {
            settedParent.updateOverwrite(message.author, {"VIEW_CHANNEL": true, "SEND_MESSAGES": true, "ATTACH_FILES": true, "CREATE_INSTANT_INVITE": false, "ADD_REACTIONS": false}).then(createdChan.setTopic(`${message.author.id}`) )
            
            // Embed that gets send when the ticket channel gets open and informs staff and the ticket author about this ticket.
            var embedParent = new Discord.MessageEmbed()
            .setTitle("**Tickets**")
            .setColor('#ABDFF2')
            .setDescription("All online staff have been notified, we will get back to you as soon as possible.")
            .addField("Ticket Name:", "#ticket-" + message.author.username, true)
            .addField("Opened By:", `<@${message.author.id}>`, true)
            .addField("Ticket Reason:", ticketReason , true)
            .addField("__Be warned!__", "We do not take harrassment lightly, if you act malicous in any form towards staff, the ticket will be closed and you might be punished.")
            .addField("Note:", "*To get this chat's transcript, please allow direct messages from this server.\nIf unsure on how to turn this on, ask staff here on how to do this.*")
            .setTimestamp()
            .setFooter("Peace Keeper");
            settedParent.send(`<@&${StaffPing}>`)
            settedParent.send(`<@${message.author.id}>`)
            settedParent.send(embedParent);
        });
    });

    var embedOpenTicket = new Discord.MessageEmbed()
    .setTitle("**Tickets**")
    .setColor('#ABDFF2')
    .setThumbnail(servericon)
    .setDescription("A ticket has been opened!")
    .addField("Ticket Name:", "#ticket-" + message.author.username, true)
    .addField("Opened By:", `<@${message.author.id}>`, true)
    .addField("Ticket Reason:", ticketReason , true)
    .setTimestamp()
    .setFooter("Peace Keeper");

    var logChannel = message.guild.channels.cache.find(channel => channel.name === "ticket-logs");
    if(!logChannel) return message.channel.send("Logging channel does not exist!");

    message.delete().then(() => {
    logChannel.send(embedOpenTicket);
    });
}
 
module.exports.help = {
  name: "topen"
}

