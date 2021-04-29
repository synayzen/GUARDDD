const Discord = require('discord.js');
const db = require('quick.db');

exports.run = async (client, message, args) => {
  if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply(`Bu Komutu Kullanabilmek İçin Yeterli Yetkiye Sahip Değilsin!`);
 let sistemlogkanal = message.mentions.channels.first()
if (!sistemlogkanal) return message.channel.send('Lütfen Sistem Log Kanalını Etiketlermisin?')
   
  db.set(`sistemlogkanalı${message.guild.id}`, sistemlogkanal.id)

 
  message.channel.send(`Sistem Log Kanalı Başarıyla Ayarlandı; **${sistemlogkanal}**`)
 };

exports.conf = {
 enabled: true,
 guildOnly: false,
 aliases: [],
 permLevel: 0,
kategori:"yetkili"
};

exports.help = {
 name: 'sistemlog',
 description: 'kayıt kanalı Olunacak kanalı seçersiniz',
 usage: 'kicklog-kanal <#kanal>'
};