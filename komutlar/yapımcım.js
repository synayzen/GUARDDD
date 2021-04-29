//----------------YAPIMCIM-----------------------------//
const  Discord = require("discord.js"); 

exports.run = (client, message, args) => {

  const davet = new Discord.MessageEmbed()
  .setColor("PURPLE")
  .setTitle("Yapımcılar")
  .setDescription("[**Yapımcım = <@595903529898737664>**]() \n [**Synayzen muahh 💖 **]()")
  message.channel.send(davet)
}


exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'yapımcım',
  description: '',
  usage: ''
};