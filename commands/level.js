const Discord = require("discord.js");
let xp = require("../indiscriminate/xp.json");

module.exports.run = async (bot, message) => {

    if(!xp[message.author.id]) {
        xp[message.author.id] = {
            xp: 0,
            level: 1
        };
    }

    message.delete().catch();

    let curxp = xp[message.author.id].xp;
    let curlvl = xp[message.author.id].level;
    let nxtLvlXp = curlvl * 300;
    let difference = nxtLvlXp - curxp;

    let lvlEmbed = new Discord.MessageEmbed()
      .setColor('#ABDFF2')
      .setTitle("** " + message.guild.name + " **")
      .addField("**Current Level:**", curlvl, true)
      .addField("**Current XP:**", curxp, true)
      .setFooter(message.author.tag + ` | ${difference} XP til next level up!`, message.author.displayAvatarURL({dynamic: true, size: 1024}));
      message.channel.send(lvlEmbed);
}
 
module.exports.help = {
  name: "slevel"
}