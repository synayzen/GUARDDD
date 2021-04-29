const discord = require('discord.js');
const fs = require('fs');
const http = require('http');
const db = require('quick.db');
const moment = require('moment')
const express = require('express');
const ayarlar = require('./ayarlar.json');
const app = express();
app.get("/", (request, response) => {
response.sendStatus(200);
});
app.listen(process.env.PORT);


//READY.JS

const Discord = require('discord.js');
const client = new Discord.Client();
client.on('ready', () => {
console.log(`Logged in as ${client.user.tag}!`);
console.log("Streamstatus synayzen")

client.user.setActivity(`Synayzen lvar 💕 Assassin's Creed Family`, {
type: "STREAMING",
url: "https://www.twitch.tv/synayzen"})
    .then(presence => console.log(`Your Status has been set to  ${presence.game ? presence.game.none : 'none'}`))
    .catch(console.error);
});

const log = message => {
  console.log(` ${message}`);
};
require('./util/eventLoader.js')(client);

//READY.JS SON

//KOMUT ALGILAYICI

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
    if (err) console.error(err);
    log(`${files.length} komut yüklenecek.`);
    files.forEach(f => {
        let props = require(`./komutlar/${f}`);
        log(`Yüklenen komut: ${props.help.name}.`);
        client.commands.set(props.help.name, props);
        props.conf.aliases.forEach(alias => {
            client.aliases.set(alias, props.help.name);
        });
    });
});




client.reload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
           reject(e);
        }
    });
};

client.load = command => {
    return new Promise((resolve, reject) => {
        try {
            let cmd = require(`./komutlar/${command}`);
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};




client.unload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

//KOMUT ALGILAYICI SON

client.elevation = message => {
    if (!message.guild) {
        return;
    }
    let permlvl = 0;
    if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
    if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
    if (message.author.id === ayarlar.sahip) permlvl = 4;
    return permlvl;
};
client.login(process.env.TOKEN)


//-----------------------KOMUTLAR-----------------------\\
//EVERYONE-HERE ENGEL

client.on("message", async msg => {
  
let hereengelle = await db.fetch(`hereengel_${msg.guild.id}`)
 if (hereengelle == 'acik') {
   
      const here = ["@here", "@everyone"];
  if (here.some(word => msg.content.toLowerCase().includes(word)) ) {
    if (!msg.member.permissions.has("ADMINISTRATOR")) {
      msg.delete()
       return msg.reply('Yakaladım Seni! Everyone ve Here Etiketlemek Yasak <a:yeil_alev:836538102310240296> ').then(nordx => nordx.delete({timeout: 5000}))
        }
    }
 } else if (hereengelle == 'kapali') {
 
}
});
    
//EVERYONE-HERE ENGEL SON

// küfür-engel

client.on("message", async (msg, member) => {
 const i = await db.fetch(`${msg.guild.id}.kufur`)
    if (i) {
        const kufur = ["oç", "amk", "ananı sikiyim", "ananıskm", "piç", "amk", "amsk", "sikim", "sikiyim","a m k","orospu çocuğu", "piç kurusu", "kahpe", "orospu","sik", "yarrak","amcık", "skrm", "amık", "yarram", "sikimi ye", "aq", "amq",];
      if (kufur.some(word => msg.content.toLowerCase().includes(word))) {
          try {
            if(!msg.member.roles.cache.has(db.fetch(`engellenmeyecekrol${msg.guild.id}`)) && !msg.member.hasPermission('ADMINISTRATOR')) {
                  msg.delete();
               return msg.reply('Yakaladım seni! Küfür Yasak <a:etherum:836538171297628161>').then(nordx => nordx.delete({timeout: 5000}))
              
            }              
          } catch(err) {
            console.log(err);
          }
        }
     }
    if (!i) return;
});

client.on("messageUpdate", async (oldMsg, newMsg) => {
 const i = db.fetch(`${oldMsg.guild.id}.kufur`)
    if (i) {
        const kufur = ["oç", "amk", "ananı sikiyim", "ananıskm", "piç", "amk", "amsk", "sikim", "sikiyim","a m k","orospu çocuğu", "piç kurusu", "kahpe", "orospu","sik", "yarrak","amcık", "amık", "skrm", "yarram", "sikimi ye", "aq","amq",];
        if (kufur.some(word => newMsg.content.toLowerCase().includes(word))) {
          try {
            if(!newMsg.member.roles.cache.has(db.fetch(`engellenmeyecekrol${newMsg.guild.id}`)) && !newMsg.member.hasPermission('ADMINISTRATOR')) {
                  newMsg.delete();   
                      return oldMsg.reply('Mesajı Düzenlediğini Yakaladım! Küfür yasak <a:etherum:836538171297628161> ').then(jkood => jkood.delete({timeout: 5000}))
            }              
          
        } catch(err) {
            console.log(err);
          }
        }
  
    }
    if (!i) return;
});

// küfür-engel

// reklam-engel

client.on('message', async message => {
let aktif = await db.fetch(`reklamEngelcodework_${message.guild.id}`)
if (!aktif) return 
let reklamlar = ["discord.app", "discord.gg" ,"discordapp","discordgg",  ".xyz", ".tk", ".pw", ".io", ".me", ".gg",".gl", ".biz" , ".party", ".rf.gd", ".az", ".cf", ".me", ".in"]
let kelimeler = message.content.slice(" ").split(/ +/g)
if (reklamlar.some(word => message.content.toLowerCase().includes(word))) {
if(message.member.roles.cache.has(db.fetch(`engellenmeyecekrol${message.guild.id}`)) && !message.member.hasPermission('ADMINISTRATOR')) return; message.delete()
message.reply('Reklamları engelliyorum! <a:ban:836249026499837982>').then(jkood => jkood.delete({timeout: 7000}))
}
});

client.on("messageUpdate", async (oldMsg, newMsg) => {
let aktif = await db.fetch(`reklamEngelcodework_${oldMsg.guild.id}`)
if(!aktif) return
let reklamlar = ["discord.app", "discord.gg","discordapp","discordgg",  ".xyz", ".tk", ".pw", ".io", ".me", ".gg",  ".gl", ".biz", ".party", ".rf.gd", ".az", ".cf", ".me", ".in"]
let kelimeler = newMsg.content.slice(" ").split(/ +/g)
if (reklamlar.some(word => newMsg.content.toLowerCase().includes(word))) {
if(newMsg.member.roles.cache.has(db.fetch(`engellenmeyecekrol${newMsg.guild.id}`)) && !newMsg.member.hasPermission('ADMINISTRATOR')) return; newMsg.delete()
oldMsg.reply('Mesajı Düzenlediğini Yakaladım! Reklam Yapmak Yasak. <a:ban:836249026499837982>').then(jkood => jkood.delete({timeout: 7000})) 
}
});

// reklam-engel

// caps-engel

client.on("message", async msg => {
  if (msg.channel.type === "dm") return;
  if (msg.author.bot) return;
  if (msg.content.length > 1) {
    if (db.fetch(`capslock_${msg.guild.id}`)) {
      let caps = msg.content.toUpperCase();
      if (msg.content == caps) {
        if(!msg.member.roles.cache.has(db.fetch(`engellenmeyecekrol${msg.guild.id}`)) && !msg.member.hasPermission('ADMINISTRATOR')) {
          if (!msg.mentions.users.first()) {
            msg.delete();
            return msg.channel.send(`${msg.member}, Capslock Kapat Lütfen! <a:alev:836538220744671232>`).then(nordx => nordx.delete({timeout: 5000}))
              
          }
        }
      }
    }
  }
});

client.on("messageUpdate", async (oldMsg, newMsg) => {
  if (newMsg.channel.type === "dm") return;
  if (newMsg.author.bot) return;
  if (newMsg.content.length > 1) {
    if (db.fetch(`capslock_${oldMsg.guild.id}`)) {
      let caps = newMsg.content.toUpperCase();
      if (newMsg.content == caps) {
        if(!newMsg.member.roles.cache.has(db.fetch(`engellenmeyecekrol${newMsg.guild.id}`)) && !newMsg.member.hasPermission('ADMINISTRATOR')) {
          if (!oldMsg.mentions.users.first()) {
            newMsg.delete();
            return oldMsg.channel.send(`${oldMsg.member}, Mesajı Düzenlediğini Yakaladım! CapsLock Kullanımı Yasak. <a:alev:836538220744671232>`).then(nordx => nordx.delete({timeout: 5000}))
              
          }
        }
      }
    }
  }
});

// caps-engel

// emoji-koruma

client.on("emojiDelete", async (emoji, message, channels) => {
  let emojik = await db.fetch(`emojik_${emoji.guild.id}`)
  if (emojik) {
  const entry = await emoji.guild.fetchAuditLogs({ type: "EMOJI_DELETE" }).then(audit => audit.entries.first());
  let user = client.users.cache.get(entry.executor.id)
  if (entry.executor.id == client.user.id) return;
  if (entry.executor.id == emoji.guild.owner.id) return;
  if (!emoji.guild.members.cache.get(entry.executor.id).hasPermission('ADMINISTRATOR')) {
  emoji.guild.emojis.create(`${emoji.url}`, `${emoji.name}`).catch(console.error);
    const embed = new Discord.MessageEmbed()
    .setColor("GRAY")
    .addField(`Bir Emoji Silindi`, `**${emoji.name}** Adlı Emoji Başarıyla Oluşturuldu.`)
    .addField(`Silen Kişi`, `<@${user.id}>`)
    .setTimestamp()
    client.channels.cache.get(db.fetch(`sistemlogkanalı${emoji.guild.id}`)).send(embed)  
  
  }
  }
});

client.on("emojiCreate", async (emoji, message, channels) => {
  let emojik = await db.fetch(`emojik_${emoji.guild.id}`)
  if (emojik) {
  const entry = await emoji.guild.fetchAuditLogs({ type: "EMOJI_CREATE" }).then(audit => audit.entries.first());
  let user = client.users.cache.get(entry.executor.id)
  if (entry.executor.id == client.user.id) return;
  if (entry.executor.id == emoji.guild.owner.id) return;
  if (!emoji.guild.members.cache.get(entry.executor.id).hasPermission('ADMINISTRATOR')) {
  emoji.delete().catch(console.error);
    const embed = new Discord.MessageEmbed()
    .setColor("GRAY")
    .addField(`Bir Emoji Oluşturuldu`, `**${emoji.name}** Adlı Emoji Başarıyla Silindi.`)
    .addField(`Oluşturan Kişi`, `<@${user.id}>`)
    .setTimestamp()
    client.channels.cache.get(db.fetch(`sistemlogkanalı${emoji.guild.id}`)).send(embed)  
  
  }
  }
});

// emoji-koruma

// rol-koruma

client.on("roleDelete", async role => {
  let rolko = await db.fetch(`rolk_${role.guild.id}`);
  if (rolko) { 
    const entry = await role.guild.fetchAuditLogs({ type: "ROLE_DELETE" }).then(audit => audit.entries.first());
    let user = client.users.cache.get(entry.executor.id)
    if (entry.executor.id == client.user.id) return;
    if (!role.guild.members.cache.get(entry.executor.id).hasPermission('ADMINISTRATOR')) {
  role.guild.roles.create({ data: {
          name: role.name,
          color: role.color,
          hoist: role.hoist,
          permissions: role.permissions,
          mentionable: role.mentionable,
          position: role.position
}, reason: 'Silinen Roller Tekrar Açıldı.'})
    const embed = new Discord.MessageEmbed()
    .setColor("GRAY")
    .addField(`Bir Rol Silindi`, `**${role.name}** Adlı Rol Başarıyla Oluşturuldu.`)
    .addField(`Silen Kişi`, `<@${user.id}>`)
    .setTimestamp()
    client.channels.cache.get(db.fetch(`sistemlogkanalı${role.guild.id}`)).send(embed)  
      
    }
  }
})

//

client.on("roleCreate", async role => {
  let rolk = await db.fetch(`rolk_${role.guild.id}`);
  if (rolk) { 
       const entry = await role.guild.fetchAuditLogs({ type: "ROLE_CREATE" }).then(audit => audit.entries.first());
    let user = client.users.cache.get(entry.executor.id)
    if (entry.executor.id == client.user.id) return;
    if (!role.guild.members.cache.get(entry.executor.id).hasPermission('ADMINISTRATOR')) {
  role.delete()
      const embed = new Discord.MessageEmbed()
    .setColor("GRAY")
    .addField(`Bir Rol Oluşturuldu`, `**${role.name}** Adlı Rol Başarıyla Silindi.`)
    .addField(`Oluşturan Kişi`, `<@${user.id}>`)
    .setTimestamp()
    client.channels.cache.get(db.fetch(`sistemlogkanalı${role.guild.id}`)).send(embed)
      
    }
}
})

// rol-koruma

// kanal-koruma

client.on("channelDelete", async function(channel, member) {
    let rol = await db.fetch(`kanalk_${channel.guild.id}`);
  if (rol) {
const entry = await channel.guild.fetchAuditLogs({ type: "CHANNEL_DELETE" }).then(audit => audit.entries.first());    
const guild = channel.guild.cache;
let channelp = channel.parentID;
let user = client.users.cache.get(entry.executor.id)
if (!channel.guild.members.cache.get(entry.executor.id).hasPermission('ADMINISTRATOR')) {    

  channel.clone().then(z => {
    let kanal = z.guild.channels.cache.find(c => c.name === z.name);
    kanal.setParent(
      kanal.guild.channels.cache.find(channel => channel.id === channelp))
    const embed = new Discord.MessageEmbed()
    .setColor("GRAY")
    .addField(`Bir Kanal Silindi`, `**${channel.name}** Adlı Kanal Başarıyla Oluşturuldu.`)
    .addField(`Silen Kişi`, `<@${user.id}>`)
    .setTimestamp()
    client.channels.cache.get(db.fetch(`sistemlogkanalı${channel.guild.id}`)).send(embed)
    
  });
  }
  }
})

client.on("channelCreate", async function(channel, member) {
    let rol = await db.fetch(`kanalk_${channel.guild.id}`);
  if (rol) {
const entry = await channel.guild.fetchAuditLogs({ type: "CHANNEL_CREATE" }).then(audit => audit.entries.first());    
const guild = channel.guild.cache;
let channelp = channel.parentID;
let user = client.users.cache.get(entry.executor.id)
if (!channel.guild.members.cache.get(entry.executor.id).hasPermission('ADMINISTRATOR')) {    
channel.delete()
  channel.clone().then(z => {
    let kanal = z.guild.channels.cache.find(c => c.name === z.name);
    kanal.setParent(
      kanal.guild.channels.cache.find(channel => channel.id === channelp))
    const embed = new Discord.MessageEmbed()
    .setColor("GRAY")
    .addField(`Bir Kanal Oluşturuldu`, `**${channel.name}** Adlı Kanal Başarıyla Silindi.`)
    .addField(`Oluşturan Kişi`, `<@${user.id}>`)
    .setTimestamp()
    client.channels.cache.get(db.fetch(`sistemlogkanalı${channel.guild.id}`)).send(embed)
    
  });
  }
  }
})

// kanal-koruma

// Anti-Raid (Bot Koruma)

client.on("guildMemberAdd", async member => {
let kanal = await db.fetch(`antiraidK_${member.guild.id}`)== "anti-raid-aç"
  if (!kanal) return;  
  if (member.user.bot === true) {
     if (db.fetch(`botizin_${member.guild.id}.${member.id}`) == "aktif") {
    let darknesguardv2 = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setThumbnail(member.user.avatarURL({dynamic:true}))
      .setDescription(`**${member.user.tag}** (${member.id}) adlı bota bir yetkili izin verdi eğer kaldırmak istiyorsanız **!bot-izni kaldır <botid>**.`);
    client.channels.cache.get(db.fetch(`sistemlogkanalı${member.guild.id}`)).send(darknesguardv2)
     } else {
       let izinverilmemişbot = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setThumbnail(member.user.avatarURL({dynamic:true}))
      .setDescription("**" + member.user.tag +"**" + " (" + member.id+ ") " + "**yandaki bilgilere ait bot sunucuya eklendi ve banlandı. <a:ban:836249026499837982> **")
       member.ban();
       client.channels.cache.get(db.fetch(`sistemlogkanalı${member.guild.id}`)).send(izinverilmemişbot)
       client.channels.cache.get(db.fetch(`sistemlogkanalı${member.guild.id}`)).send("<@&799724043879317544>")
}
  }
});

// Anti-Raid (Bot Koruma)

//--------------------BOTU_KANALA_SOKMA-------------------------//

client.on("ready", () => {
  client.channels.cache.get("801730967910875188").join();
});

//------------------------------------------------------------//