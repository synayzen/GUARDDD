const Discord = require('discord.js');
const db = require('quick.db')

exports.run = async(client, message, args) => {

    let codework2 = new Discord.MessageEmbed()
    .setThumbnail(message.author.avatarURL({dynamic:true}))
    .setTimestamp()
    .setFooter(`${message.author.tag} Tarafından İstendi.`)
    .addField(`**Komutlar**`, `
    **▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**
    d!reklam-engel \`aç/kapat\`
    d!küfür-engel \`aç/kapat\`
    d!caps-engel \`aç/kapat\`
    d!emoji-koruma \`aç/kapat\`
    d!rol-koruma \`aç/kapat\`
    d!kanal-koruma \`aç/kapat\`
    d!anti-raid \`aç/kapat\`
    d!tag-taraması
    d!reklam-taraması
    `)
    .addField(`**Diğer Komutlar**`, `
    **▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**
    d!koruma \`aç/kapat #logkanal\` Tüm sistemleri açar veya kapatır.
    d!rolekle \`@rol\` Koruma sistemlerinden etkilenmeyecek rolü ayarlar.
    d!sistemlog \`#kanal\` Koruma mesajlarının gönderileceği kanal.
    \`d!komutbilgi\` komutların ne işe yaradığını gösterir.
    `)
    message.channel.send(codework2)
}
exports.conf = {
 enabled: true,
 guildOnly: false,
 aliases: ["yardım","help","komutlar"],
 permLevel: 0,
};
exports.help = {
 name: 'yardım'
};