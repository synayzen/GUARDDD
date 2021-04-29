const Discord = require('discord.js');

exports.run = async (client, message, args) => {
 
  let ping = client.ws.ping
  const embed = new Discord.MessageEmbed()
  .setTitle('Ping')
  .setDescription(`Pingim: ${ping}ms'dir. `, message.author.name)
  .setThumbnail(client.user.avatarURL({dynamic:true}))
  message.channel.send(embed)
  
  
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
}
exports.help = {
  name: 'ping',
  description: 'Ping komutudur.',
  usage: 'ping'
}