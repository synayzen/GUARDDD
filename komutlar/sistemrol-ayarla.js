const Discord = require('discord.js');
const db = require('quick.db');

exports.run = async (client, message, args) => {
  let engelsizrol = message.mentions.roles.first()
  if (!engelsizrol) return message.channel.send('Lütfen Koruma Sisteminden Engellenmeyecek rolü etiketlermisin?')
   
  db.set(`engellenmeyecekrol${message.guild.id}`, engelsizrol.id)
  message.channel.send(`Koruma Sisteminden Engellenmeyecek Rol Başarıyla Ayarlandı; **${engelsizrol}**`)
 };

exports.conf = {
 enabled: true,
 guildOnly: false,
 aliases: [],
 permLevel: 3,
  kategori:"yetkili"
};

exports.help = {
 name: 'rolekle',
 description: 'kayıt Olunca Verilecek rolü ayarlarsınız',
 usage: 'kayıt-rol <@rol>'
};