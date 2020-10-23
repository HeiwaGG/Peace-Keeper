const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client();
bot.commands = new Discord.Collection();

  const { prefix, token }  = require("./indiscriminate/config.json");
  const racicalWords = require('./chat-filters/racicalWords.json');
  const toxicityWords = require('./chat-filters/toxicityWords.json');
  const linksWords = require('./chat-filters/linkWords.json');

// File Loaders
fs.readdir("./commands/", (err, files) => {

  if(err) console.log(err);

  let jsfile = files.filter(f => f.split(".").pop() === "js")
  if(jsfile.length <= 0){
    console.log("There are no .js files in this directory...");
    return;
  }

  jsfile.forEach((f) =>{
    let props = require(`./commands/${f}`);
    console.log(`${f} loaded!`);
    bot.commands.set(props.help.name, props);
  });

});
fs.readdir("./commands/moderator-commands/", (err, files) => {

  if(err) console.log(err);

  let jsfile = files.filter(f => f.split(".").pop() === "js")
  if(jsfile.length <= 0){
    console.log("Couldn't find moderator-commands folder.");
    return;
  }

  jsfile.forEach((f) =>{
    let props = require(`./commands/moderator-commands/${f}`);
    console.log(`${f} loaded!`);
    bot.commands.set(props.help.name, props);
  });

});

// Command Hanlders & anti-DMing
bot.on('message', message => {
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);
  let commandfile = bot.commands.get(cmd.slice(prefix.length));
  let noCommandEmbed = new Discord.MessageEmbed()
   .setColor("FF6961")
   .setTitle("error!")
   .setDescription("Command doesn't exist")
   .addField("Please do `!help` to see what commands you can do!", "*Keep in mind these are all cap sensitive!*")
    .setTimestamp()
   .setFooter() 
   .setFooter(message.author.tag + " | " + bot.user.username, message.author.displayAvatarURL({dynamic: true, size: 1024}))
  ;
  let notHereEmbed = new Discord.MessageEmbed()
   .setColor('FF6961')
   .setTitle('error!')
   .addField('Do not send me messages directly!', "Only use me in <#750998349276250123>")
   .setTimestamp()
   .setFooter(message.author.tag + " | " + bot.user.username, message.author.displayAvatarURL({dynamic: true, size: 1024}))
  ;

  if(message.author.bot) return ;
  if(message.channel.type === "dm") {
    message.reply(notHereEmbed).then(message => message.delete({timeout: 7500}));
    return ;
  }

  if(message.content.startsWith(prefix) && !commandfile) {
    message.channel.send(noCommandEmbed).then(message => message.delete({timeout: 6000}));
    return;
  } ;
  if(commandfile) commandfile.run(bot,message,args);
});

// Server Logs
  // Logging members who have joined
  bot.on('guildMemberAdd', (member) => {
    let logChannel = member.guild.channels.cache.find(channel => channel.name === 'bot-peacekeeper-logger')
    if (!logChannel) return undefined;
  let joinEmbed = new Discord.MessageEmbed()
  .setTitle("**A user has joined the discord...**")
  .setDescription(`<@${member.user.id}>` + " joined the discord.")
  .setThumbnail(member.user.displayAvatarURL({dynamic: true, size: 1024}))
  .addField("User Details:", member.user.tag, true)
  .addField("Status:", member.presence.status, true)
  .addField("Bot?", member.user.bot, true)
  .setFooter(bot.user.username, bot.user.displayAvatarURL({dynamic: true, size: 1024}))
  .setTimestamp()
  .setColor('#ABDFF2')
  logChannel.send(joinEmbed);
});

  // Logging memebers who have left
  bot.on('guildMemberRemove', (member) => {
  let logChannel = member.guild.channels.cache.find(channel => channel.name === 'bot-peacekeeper-logger')
  if (!logChannel) return undefined;
  let leaveEmbed = new Discord.MessageEmbed()
  .setTitle("**A user has left the discord...**")
  .setDescription(`<@${member.user.id}>` + " has left the discord.")
  .setTimestamp()
  .setThumbnail(member.user.displayAvatarURL({dynamic: true, size: 1024}))
  .addField("User Details:", member.user.tag, true)
  .addField("Status:", member.presence.status, true)
  .addField("Bot?", member.user.bot, true)
  .setFooter(bot.user.username, bot.user.displayAvatarURL({dynamic: true, size: 1024}))
  .setColor('#007FBD')
  logChannel.send(leaveEmbed);
});

  // Logging messages that have been editied
  bot.on('messageUpdate', async(oldMessage, newMessage) => {
  if(oldMessage.content === newMessage.content){
    return;
  };
  
  let editEmbed = new Discord.MessageEmbed()
  .setTitle("**A message was edited...**")
  .setDescription("By: " + `<@${oldMessage.author.id}>` + "," + " in channel: " + `${oldMessage.channel}`)
  .setTimestamp()
  .addField("Before:", '"*'+`${oldMessage.content}`+'*"' , false)
  .addField("After:", '"*'+`${newMessage.content}`+'*"' , false)
  .setThumbnail(oldMessage.author.displayAvatarURL({dynamic: true, size: 1024}))
  .setFooter(bot.user.username, bot.user.displayAvatarURL({dynamic: true, size: 1024}))
  .setColor('#E3E3E3')
  
  let logChannel = oldMessage.guild.channels.cache.find(channel => channel.name === 'bot-peacekeeper-logger')
  if(!logChannel) return;
  logChannel.send(editEmbed);
});

  // Logging messages that have been deleted
  bot.on('messageDelete', async message => {
  if(message.author.bot) return;
  
  let deleteEmbed = new Discord.MessageEmbed()
   .setTitle("**A message was deleted...**")
   .setDescription("Author: " + `<@${message.author.id}>`)
   .setTimestamp()
   .setThumbnail(message.author.displayAvatarURL({dynamic: true, size: 1024}))
   .addField("Message:", '"**'+`${message.content}`+'**"' + " *in channel:*" + " " + `${message.channel}`, false)
   .setFooter(bot.user.username, bot.user.displayAvatarURL({dynamic: true, size: 1024}))
   .setColor('#E3E3E3')
  ;

  let logChannel = message.guild.channels.cache.find(channel => channel.name === 'bot-peacekeeper-logger')
  if(!logChannel) return;
  
  if(message.author.bot) return;
  logChannel.send(deleteEmbed);
});

// Words filters
bot.on('message', message => {

  // Conststants setup
  const icon = 'https://i.dlpng.com/static/png/6658651_preview.png'
  
  const racicalEmbed = new Discord.MessageEmbed()
   .setTitle('error!')
   .setDescription('Do not say any racial slurs.')
   .addField('If you continue doing such you will be punished!', "We do not take toxicity lightly.")
   .setColor('FF6961')
   .setThumbnail(icon)
   .setTimestamp()
   .setFooter(message.author.tag + " | Peace Keeper", message.author.displayAvatarURL({dynamic: true, size: 1024}))
  ;
  const toxicityEmbed = new Discord.MessageEmbed()
   .setTitle('error!')
   .setDescription('Do not say such offensive words.')
   .addField('If you continue doing such you will be punished!', "We do not take toxicity lightly.")
   .setColor('FF6961')
   .setThumbnail(icon)
   .setTimestamp()
   .setFooter(message.author.tag + " | " + bot.user.username, message.author.displayAvatarURL({dynamic: true, size: 1024}))
  ;
  const linksEmbed = new Discord.MessageEmbed()
   .setTitle('error!')
   .setDescription('Do not post any links.')
   .addField('If you continue doing such you will be punished!', "Read up on our rules here")
   .setColor('FF6961')
   .setThumbnail(icon)
   .setTimestamp()
   .setFooter(message.author.tag + " | Peace Keeper", message.author.displayAvatarURL({dynamic: true, size: 1024}))
  ;

  // Checks for racial slurs
  for (x = 0; x < racicalWords.length; x++) {
    if(message.content.includes(racicalWords[x])) {
      message.delete();
      message.channel.send(racicalEmbed).then(msg => msg.delete({timeout: 8500}))
      return;
    }   
  };
  // Checks for toxicity
  for (z = 0; z < toxicityWords.length; z++) {
    if(message.content.includes(toxicityWords[z])) {
      message.delete();
      message.channel.send(toxicityEmbed).then(msg => msg.delete({timeout: 8500}))
      return;
    }
  };
    // Checks for links
  for (y = 0; y < linksWords.length; y++) {
    if(message.author.bot) {
      return;
    }
    if(message.content.includes(linksWords[y])) {
      message.delete();
      message.channel.send(linksEmbed).then(msg => msg.delete({timeout: 8500}))
      return;
    }
  };
});

// Confirming the bot is running and is changing the status of it on discord
bot.on('ready', () => {
  console.log('This bot is now online and running (ﾉ´ヮ´)ﾉ*:･ﾟ✧');
   bot.user.setActivity('heiwa.gg | !help', {type: "WATCHING"});
})

// Error catching
process.on('unhandledRejection', (error, message) => { 
  var mentionAymhh = "<@176610715686273024>"
  var loggingChannel = bot.channels.cache.get("768004556889784321")
  var errorEmbed = new Discord.MessageEmbed()
   .setColor('FF6961')
   .setTitle("error!")
   .setDescription("An error has occured!")
   .addField("Issue: ", "```" + error + "```")
   .setTimestamp()
   .setFooter(bot.user.id + " | " + bot.user.username, bot.user.displayAvatarURL({dynamic: true, size: 1024}))
  ;
  loggingChannel.send(errorEmbed)
  loggingChannel.send(mentionAymhh).then(message => message.delete())
  console.error('Unhandled promise rejection:', error)
});
bot.on('error', (err, message) => {
  var mentionAymhh = "<@176610715686273024>"
  var loggingChannel = bot.channels.cache.get("768004556889784321")
  var errorEmbed = new Discord.MessageEmbed()
   .setColor('FF6961')
   .setTitle("error!")
   .setDescription("An error has occured!")
   .addField("Issue: ", "```" + error + "```")
   .setTimestamp()
   .setFooter(bot.user.id + " | " + bot.user.username, bot.user.displayAvatarURL({dynamic: true, size: 1024}))
  ;
  loggingChannel.send(errorEmbed)
  loggingChannel.send(mentionAymhh).then(message => message.delete())
  console.error('Unhandled promise rejection:', err) 
})

bot.login(token);