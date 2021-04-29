const gamedig = require("gamedig");
const Discord = require('discord.js')
exports.run = async(client, message, args) => {
var serverIP = "208.103.169.233:27016";
var channelID = "817869944364204113";

const CodAre = new Discord.MessageEmbed()
.setAuthor("MTA Sunucu İstatistik","https://multitheftauto.com/mtasa_icon_hq.png")
.setColor("#FF7F00")
.setThumbnail("https://multitheftauto.com/mtasa_icon_hq.png");

gamedig.query({
  type: "garrysmod",
  host: serverIP
})
.then(state => {
  CodAre
  .setDescription(`
     **Sunucu Durumu:** :green_circle:
     **Sunucu İsim:** ${state.name}
     **Sunucu IP:** ${state.connect}
     **Oyuncu Sayısı:** ${state.raw.numplayers}/${state.maxplayers}
     **Sunucu Pingi:** ${state.ping}
    `)
   client.channels.cache.get(channelID).send(CodAre);
})
.catch(e => {
  CodAre
  .setDescription(`
    **Sunucu Durumu:** :red_circle:
    **Sunucu IP:** ${serverIP} 
    Sunucuya ulaşılamıyor veya veri çekilemiyor.
    `)
  client.channels.cache.get(channelID).send(CodAre);
});

}

exports.conf = {
 enabled: true,
 guildOnly: false,
 aliases: [],
 permLevel: 0,
kategori:"yetkili"
};

exports.help = {
 name: 'sunucudurum',
 description: 'kayıt kanalı Olunacak kanalı seçersiniz',
 usage: 'kicklog-kanal <#kanal>'
};