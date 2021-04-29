const Discord = require('discord.js')
const db = require('quick.db')

exports.run = async (client ,message, args) =>{
  if (!message.member.permissions.has("ADMINISTRATOR")) return message.channel.send(`Bu Komutu kullanabilmek için yeterli yetkiye sahip değilsin!`)
  
if(args[0] === 'aç') {
  let sistemlog = message.mentions.channels.first();
  if (!sistemlog) return message.reply('Bir Sistem Log Kanalı Belirt!')
    db.set(`${message.guild.id}.kufur`, true)
    db.set(`reklamEngelcodework_${message.guild.id}`, true)
    db.set(`capslock_${message.guild.id}`, true)
    db.set(`emojik_${message.guild.id}`, true)
    db.set(`rolk_${message.guild.id}`, true)
    db.set(`kanalk_${message.guild.id}`, true)
    db.set(`sistemlogkanalı${message.guild.id}`, sistemlog.id)
    message.channel.send(`Tüm sistemler başarıyla açıldı!`)
  return
}
if (args[0] === 'kapat') {
  db.delete(`${message.guild.id}.kufur`)
  db.delete(`reklamEngelcodework_${message.guild.id}`)
  db.delete(`capslock_${message.guild.id}`)
  db.delete(`emojik_${message.guild.id}`)
  db.delete(`rolk_${message.guild.id}`)
  db.delete(`kanalk_${message.guild.id}`)
  db.delete(`sistemlogkanalı${message.guild.id}`)
message.channel.send(`Tüm sistemler başarıyla kapatıldı!`)
return
}
  message.channel.send('Lütfen **aç** veya **kapat** yazın. Örnek Kullanım: **koruma aç/kapat**')
};
exports.conf = {
 enabled: true,
 guildOnly: false,
 aliases: ['küfürengel'], 
 permLevel: 0
};

exports.help = {
 name: 'koruma',
 description: 'küfürleri engeller',
 usage: 'küfürengel'
};