const Discord = require('discord.js');
const db = require('quick.db')

exports.run = async(client, message, args) => {

    let codework2 = new Discord.MessageEmbed()
    .setThumbnail(message.author.avatarURL({dynamic:true}))
    .setTimestamp()
    .setFooter(`${message.author.tag} Tarafından İstendi.`)
    .addField(`**Komut Bilgi Menüsü**`, `
    **▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**
    \`Reklam-Engel\` = Reklamları engeller. Düzenlenen mesajda da çalışır.
    \`Caps-Engel\` = Büyük Harfleri engeller. Düzenlenen mesajda da çalışır.
    \`Rol-Koruma\` = Silinen rolü izinleriyle beraber tekrar açar. Açılan rolü siler.
    \`Kanal-Koruma\` = Silinen kanalı izinleriyle beraber tekrar açar. Açılan kanalı siler.
    \`Emoji-Koruma\` = Silinen emojiyi tekrar açar. Açılan emojiyi siler.
    \`Küfür-Engel\` = Küfürleri engeller. Düzenlenen mesajda da çalışır.
    \`Anti-Raid\` = Sunucuya eklenen botları banlar.
    \`Tag-Taraması\` = Tagları kontrol eder.
    \`Reklam-Taraması\` = Reklamları kontrol eder.
    \`Sistemlog\` = Güvenlik mesajlarını göndereceği kanal.
    \`Rolekle\` = Güvenlik sistemlerinden etkilenmeyen rol.
    \`Koruma\` = Tüm güvenlik sistemlerini açar.
    `)
    message.channel.send(codework2)
}
exports.conf = {
 enabled: true,
 guildOnly: false,
 aliases: ["komut-bilgilendirme","komut-bilgi","komutbilgilendirme"],
 permLevel: 0,
};
exports.help = {
 name: 'komutbilgi'
};