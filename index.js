const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client();
bot.commands = new Discord.Collection();
const certificationChannel = '726231376239788063'
const { token }  = require("./indiscriminate/config.json");
const racicalWords = require('./chat-filters/racicalWords.json')
const linkWords = require('./chat-filters/linkWords.json')
const toxicityWords = require('./chat-filters/toxicityWords.json')
let xp = require("./indiscriminate/xp.json");

// Command Handlers
fs.readdir("./commands/", (err, files) => {

  if(err) console.log(err);

  let jsfile = files.filter(f => f.split(".").pop() === "js")
  if(jsfile.length <= 0){
    console.log("Couldn't find commands folder.");
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

// Logging members who have joined
bot.on('guildMemberAdd', (member) => {
  let logChannel = message.guild.channels.cache.get('726648800743260211')
  if (!logChannel) return undefined;
  let joinEmbed = new Discord.MessageEmbed()
  .setTitle("**A user has joined the discord...**")
  .setDescription(`<@${member.user.id}>` + " joined the discord.")
  .setTimestamp()
  .setThumbnail(member.user.displayAvatarURL({dynamic: true, size: 1024}))
  .addField("User Details:", member.user.tag, true)
  .addField("Status:", member.presence.status, true)
  .addField("Bot?", member.user.bot, true)
  .setFooter(`Peace Keeper`)
  .setColor('#ABDFF2')
  logChannel.send(joinEmbed);
});

// Logging memebers who have left
bot.on('guildMemberRemove', (member) => {
  let logChannel = message.guild.channels.cache.get('726648800743260211')
  if (!logChannel) return undefined;
  let leaveEmbed = new Discord.MessageEmbed()
  .setTitle("**A user has left the discord...**")
  .setDescription(`<@${member.user.id}>` + " has left the discord.")
  .setTimestamp()
  .setThumbnail(member.user.displayAvatarURL({dynamic: true, size: 1024}))
  .addField("User Details:", member.user.tag, true)
  .addField("Status:", member.presence.status, true)
  .addField("Bot?", member.user.bot, true)
  .setFooter(`Peace Keeper`)
  .setColor('##007FBD')
  logChannel.send(leaveEmbed);
});

// Logging messages that have been editied
bot.on('messageUpdate', async(oldMessage, newMessage) => {
  if(oldMessage.content === newMessage.content){
    return;
  }
  let editEmbed = new Discord.MessageEmbed()
  .setTitle("**A message was edited...**")
  .setDescription("By: " + `<@${oldMessage.author.id}>` + "," + " in channel: " + `${oldMessage.channel}`)
  .setTimestamp()
  .addField("Before:", '"*'+`${oldMessage.content}`+'*"' , false)
  .addField("After:", '"*'+`${newMessage.content}`+'*"' , false)
  .setThumbnail(oldMessage.author.displayAvatarURL({dynamic: true, size: 1024}))
  .setFooter(`Peace Keeper`)
  .setColor('#E3E3E3')
  
  let logChannel = oldMessage.guild.channels.cache.get('726648800743260211')
  if(!logChannel) return;

  logChannel.send(editEmbed);
});

// Logging messages that have been deleted
bot.on('messageDelete', async message => {
  await (`10`)
  let deleteEmbed = new Discord.MessageEmbed()
  .setTitle("**A message was deleted...**")
  .setDescription("By: " + `<@${message.author.id}>`)
  .setTimestamp()
  .setThumbnail(message.author.displayAvatarURL({dynamic: true, size: 1024}))
  .addField("Message:", '"**'+`${message.content}`+'**"' + " *in channel:*" + " " + `${message.channel}`, false)
  .setFooter(`Peace Keeper`)
  .setColor('#E3E3E3')
  
  let logChannel = message.guild.channels.cache.get('726648800743260211')
  if(!logChannel) return;

  logChannel.send(deleteEmbed);
});


// XP related scripts
bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let xpAdd = Math.floor(Math.random() * 7) + 8;

  if(!xp[message.author.id]) {
    xp[message.author.id] = {
      xp: 0,
      level: 1
    };
  }

  
  let curxp = xp[message.author.id].xp;
  let curlvl = xp[message.author.id].level;
  let nxtLvl = xp[message.author.id].level * 300;
  xp[message.author.id].xp = curxp + xpAdd;
  if(nxtLvl <= xp[message.author.id].xp) {
    xp[message.author.id].level = curlvl + 1;

    let levelChannel = message.guild.channels.cache.get('726648800743260211')


    if(!levelChannel) {
      const lvlChanNotFoundEmbed = new Discord.MessageEmbed()
      .setColor('##FF6961')
      .setTitle("**error!**")
      .setDescription("Level logging channel not found! \n Please create a new channel called `levels` to log all level ups!")
      .setFooter("Peace Keeper")
      message.channel.send(lvlChanNotFoundEmbed);
    } else {
        if(levelChannel) {
        let lvlUpMsgEmbed = new Discord.MessageEmbed()
        .setColor('#ABDFF2')
        .setTitle("**"+ message.author.tag +"**")
        .setThumbnail(message.author.displayAvatarURL({dynamic: true, size: 1024}))
        .addField("**Leveled up to:**", curlvl + 1)
        .setTimestamp()
        .setFooter(`Peace Keeper`);
      levelChannel.send(lvlUpMsgEmbed);
    }
    }
  }

  fs.writeFile("./indiscriminate/xp.json", JSON.stringify(xp), (err) => {
    if(err) console.log(err)
  });

  let prefix = "!";

  if(!message.content.startsWith(prefix)) return;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  let commandfile = bot.commands.get(cmd.slice(prefix.length));
  if(commandfile) commandfile.run(bot,message,args);

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
    .setFooter(message.author.tag + " | Peace Keeper", message.author.displayAvatarURL({dynamic: true, size: 1024}))
  ;
    const linksEmbed = new Discord.MessageEmbed()
    .setTitle('error!')
    .setDescription('Do not post any links.')
    .addField('If you continue doing such you will be punished!', "Read up on our rules here: https://heiwa.gg/rules")
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
  }

  // Checks for toxicity
  for (z = 0; z < toxicityWords.length; z++) {
    if(message.content.includes(toxicityWords[z])) {
      message.delete();
      message.channel.send(toxicityEmbed).then(msg => msg.delete({timeout: 8500}))
      return;
    }
  }

  // Checks for links
  for (y = 0; y < linkWords.length; y++) {
    if(message.content.includes(linkWords[y])) {
      message.delete();
      message.channel.send(linksEmbed).then(msg => msg.delete({timeout: 8500}))
      return;
    }
  }
});


// Confirming the bot is running and is changing the status of it on discord
bot.on('ready', () => {
  console.log('This bot is now online and running (ﾉ´ヮ´)ﾉ*:･ﾟ✧');
   bot.user.setActivity('heiwa.gg | !help');
})

bot.login(token)