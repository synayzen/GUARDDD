const Discord = require('discord.js');
const db = require('quick.db');
const ayarlar = require('../ayarlar.json');

exports.run = async (client, message, args) => {
  
const code = message.mentions.channels.first() || message.channel
const codework = args[0]
  
if (!codework) {
const embed = new Discord.MessageEmbed()
.setDescription(`Reklam engel sistemini açmak için ${ayarlar.prefix}**reklam-engel aç #kanal** veya ${ayarlar.prefix}**reklam-engel aç** yazmalısın!`)
.setColor('RED')
return message.channel.send(embed)
}
 
if (codework == 'aç') { 
let açıkkapalı = await db.fetch(`reklamEngelcodework_${message.guild.id}`)
db.set(`reklamEngelcodework_${message.guild.id}`,'açık')

const embed = new Discord.MessageEmbed()
.setDescription(`Reklam engel sistemi başarıyla aktif edildi!`)
.setColor('GREEN')
return message.channel.send(embed)
}
  
if (codework == 'kapat') {
let açıkkapalı = await db.fetch(`reklamEngelcodework_${message.guild.id}`)
db.delete(`reklamEngelcodework_${message.guild.id}`)
  
const embed = new Discord.MessageEmbed()
.setDescription(`Reklam engel sistemi başarıyla deaktif edildi!`)
.setColor('GREEN')
return message.channel.send(embed)
}
  
};

exports.conf = {
  enabled: false,
  guildOnly: false,
  aliases: [],
  permLevel: 3
};
exports.help = {
  name: 'reklam-engel',
  description: 'reklam engellemeyi açar',
  usage: 'reklam-engel'
}