const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = '$'

client.on('ready',  () => {
  console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~'); 
  console.log('by Universe');
  console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
  console.log(`Logged in as  * [ " ${client.user.username} " ] servers! [ " ${client.guilds.size} " ]`);
  console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
  console.log('is online')
client.user.setStatus("dnd");
});

// playing
client.on('ready', () => {                           
client.user.setGame(``,'https://www.twitch.tv/tarikrs');                                                                                                                                                                                                                                                                                                                                                                                                                             client.user.setGame(`-help | On 20 Servers`,'https://www.twitch.tv/v5bz');
});          


 const Discord = require('discord.js');

const Util = require('discord.js');

const getYoutubeID = require('get-youtube-id');

const fetchVideoInfo = require('youtube-info');

const YouTube = require('simple-youtube-api');

const youtube = new YouTube("AIzaSyAdORXg7UZUo7sePv97JyoDqtQVi3Ll0b8");

const queue = new Map();

const ytdl = require('ytdl-core');

const fs = require('fs');

const gif = require("gif-search");

const client = new Discord.Client({disableEveryone: true});

const prefix = "#";
/////////////////////////
////////////////////////

client.on('message', async message => { // Alpha Codes Server.
    if(message.author.bot) return;
    if(message.channel.type === 'dm') return;
 
    var prefix = '#'; //<==== تقدر تغير البرفكس
    var args = message.content.toLowerCase().split(" "); // Alpha Codes Server.
    var command = args[0];
 
  if(command == prefix + 'bc') {
        if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(':no_entry: | You dont have **ADMINISTRATOR** Permission!'); // Alpha Codes Server.
        if(!message.guild.member(client.user).hasPermission('EMBED_LINKS')) return message.channel.send(':no_entry: | I dont have **EMBED_LINKS** Permission!');
       
        let bcCommand = new Discord.RichEmbed()
        .setTitle(':white_check_mark: **BroadCast Command.**')
        .setColor('GREEN')
        .setDescription(`**\n${prefix}bc <MESSAGE>**\n➥ \`\`Send for all members the message.\`\`\n\n**${prefix}bc <ROLE> <MESSAGE>**\n➥ \`\`Send the message to members have the role selected.\`\`\n\n**${prefix}bc admins <MESSAGE>**\n➥ \`\`Send the message to members have ADMINISTRATOR permission.\`\`\n\n**${prefix}bc members <MESSAGE>**\n➥ \`\`Send the message to members not have ADMINISTRATOR permission.\`\``)
        .setTimestamp()
        .setFooter(message.author.tag, message.author.avatarURL)
       
        if(!args[1]) return message.channel.send(bcCommand); // Alpha Codes Server.
       
        var getRole = message.mentions.roles.first() || message.guild.roles.find(r => r.id === args[1]) || message.guild.roles.find(r => r.name.toLowerCase().includes(args[1]));
       
        if(args[1] === 'admins' || args[1] === 'members' || getRole) {
            var argsM = message.content.split(' ').slice(2).join(' ');
        }else if(args[1] !== 'admins' || args[1] !== 'members' || !getRole) { // Alpha Codes Server.
            var argsM = message.content.split(' ').slice(1).join(' ');
        }
       
        if(args[1] === 'admins' || args[1] === 'members') {
            if(args[1] === 'admins') {
                var admin = message.guild.members.filter(m => m.hasPermission('ADMINISTRATOR') && !m.user.bot);
                if(admin.size <= 1) return message.channel.send(':no_entry: | No admins in this server!');
               
                let notArgsM = new Discord.RichEmbed()
                .setTitle(':white_check_mark: **BroadCast Command.** (ADMINISTRATOR)')
                .setColor('GREEN')
                .setDescription(`**\n${prefix}bc admins <MESSAGE>**\n➥ \`\`Send the message to members have ADMINISTRATOR permission.\`\``)
                .setTimestamp()
                .setFooter(message.author.tag, message.author.avatarURL) // Alpha Codes Server.
               
                if(!argsM) return message.channel.send(notArgsM);
               
                let adminMsg = new Discord.RichEmbed()
                .setTitle(':white_check_mark: **BroadCast Command.** (ADMINISTRATOR)')
                .setColor('GREEN')
                .setDescription(`**\n**:red_circle: Are you sure to send the message to **${admin.size}** Admins?\n\n**➥ Message:**\n${argsM}`)
                .setTimestamp()
                .setFooter(message.author.tag, message.author.avatarURL) // Alpha Codes Server.
               
                message.channel.send(adminMsg).then(msgB => {
                    msgB.react('✅').then(() => msgB.react('❎'))
                   
                    let sendR = (reaction, user) => reaction.emoji.name === '✅'  && user.id === message.author.id;
                    let dontSendR = (reaction, user) => reaction.emoji.name === '❎' && user.id === message.author.id;
                    let send = msgB.createReactionCollector(sendR);
                    let dontSend = msgB.createReactionCollector(dontSendR);
                   
                    send.on('collect', r => {
                        msgB.delete();
                        message.channel.send(`:timer: | Wait some time to send the message to **${admin.size}** Admins ...`).then(msg => {
                            admin.forEach(async a => { // Alpha Codes Server.
                                let bcMessage = new Discord.RichEmbed()
                                .setTitle(`:loudspeaker: ${a.user.username}`)
                                .setColor('GREEN')
                                .addField(':pencil: **Sender:**', message.author.username, true)
                                .addField(':globe_with_meridians: **Server:**', message.guild.name, true)
                                .addField(':scroll: **Message:**', argsM.replace('[user]', a))
                                .setTimestamp()
                                .setFooter(message.author.tag, message.author.avatarURL)
                               
                                a.send(bcMessage)
                                await msg.edit(`:white_check_mark: | <@${message.author.id}> Successfully send the message to **${admin.size}** Admins!`);
                            })
                        })
                    })
                    dontSend.on('collect', r => {
                        msgB.delete(); // Alpha Codes Server.
                        message.channel.send(':negative_squared_cross_mark: | The command has been canceld.').then(msg => msg.delete(5000));
                    })
                })
            }else if(args[1] === 'members') {
                var member = message.guild.members.filter(m => !m.hasPermission('ADMINISTRATOR') && !m.user.bot);
                if(member.size === 0) return message.channel.send(':no_entry: | No members in this server!');
               
                let notArgsM = new Discord.RichEmbed()
                .setTitle(':white_check_mark: **BroadCast Command.** (MEMBER)')
                .setColor('GREEN')
                .setDescription(`**\n${prefix}bc members <MESSAGE>**\n➥ \`\`Send the message to members not have ADMINISTRATOR permission.\`\``)
                .setTimestamp() // Alpha Codes Server.
                .setFooter(message.author.tag, message.author.avatarURL)
               
                if(!argsM) return message.channel.send(notArgsM);
               
                let memberMsg = new Discord.RichEmbed()
                .setTitle(':white_check_mark: **BroadCast Command.** (MEMBER)')
                .setColor('GREEN')
                .setDescription(`**\n**:red_circle: Are you sure to send the message to **${member.size}** Members?\n\n**➥ Message:**\n${argsM}`)
                .setTimestamp()
                .setFooter(message.author.tag, message.author.avatarURL)
               
                message.channel.send(memberMsg).then(msgB => {
                    msgB.react('✅').then(() => msgB.react('❎'))
                    // Alpha Codes Server.
                    let sendR = (reaction, user) => reaction.emoji.name === '✅'  && user.id === message.author.id;
                    let dontSendR = (reaction, user) => reaction.emoji.name === '❎' && user.id === message.author.id;
                    let send = msgB.createReactionCollector(sendR);
                    let dontSend = msgB.createReactionCollector(dontSendR);
                   
                    send.on('collect', r => {
                        msgB.delete();
                        message.channel.send(`:timer: | Wait some time to send the message to **${member.size}** Members ...`).then(msg => {
                            member.forEach(async m => {
                                let bcMessage = new Discord.RichEmbed()
                                .setTitle(`:loudspeaker: ${m.user.username}`)
                                .setColor('GREEN')
                                .addField(':pencil: **Sender:**', message.author.username, true)
                                .addField(':globe_with_meridians: **Server:**', message.guild.name, true)
                                .addField(':scroll: **Message:**', argsM.replace('[user]', m))
                                .setTimestamp()
                                .setFooter(message.author.tag, message.author.avatarURL)
                               
                                m.send(bcMessage) // Alpha Codes Server.
                                await msg.edit(`:white_check_mark: | <@${message.author.id}> Successfully send the message to **${member.size}** Members!`);
                            })
                        })
                    })
                    dontSend.on('collect', r => {
                        msgB.delete();
                        message.channel.send(':negative_squared_cross_mark: | The command has been canceld.').then(msg => msg.delete(5000));
                    })
                }) // Alpha Codes Server.
            }
        }else if(getRole) {
            var membersRole = message.guild.members.filter(m => m.roles.has(getRole.id) && !m.user.bot);
            if(membersRole.size === 0) return message.channel.send(`:no_entry: | No members have **${getRole.name}** Role!`);
           
            let notArgsM = new Discord.RichEmbed()
            .setTitle(`:white_check_mark: **BroadCast Command.** (${getRole.name})`)
            .setColor('GREEN')
            .setDescription(`**\n${prefix}bc <ROLE> <MESSAGE>**\n➥ \`\`Send the message to members have the role selected.\`\``)
            .setTimestamp()
            .setFooter(message.author.tag, message.author.avatarURL) // Alpha Codes Server.
           
            if(!argsM) return message.channel.send(notArgsM);
           
            let membersRoleMsg = new Discord.RichEmbed()
            .setTitle(`:white_check_mark: **BroadCast Command.** (${getRole.name})`)
            .setColor('GREEN')
            .setDescription(`**\n**:red_circle: Are you sure to send the message to **${membersRole.size}** Members?\n\n**➥ Message:**\n${argsM}`)
            .setTimestamp()
            .setFooter(message.author.tag, message.author.avatarURL)
           
            message.channel.send(membersRoleMsg).then(msgB => {
                msgB.react('✅').then(() => msgB.react('❎')) // Alpha Codes Server.
               
                let sendR = (reaction, user) => reaction.emoji.name === '✅'  && user.id === message.author.id;
                let dontSendR = (reaction, user) => reaction.emoji.name === '❎' && user.id === message.author.id;
                let send = msgB.createReactionCollector(sendR);
                let dontSend = msgB.createReactionCollector(dontSendR);
               
                send.on('collect', r => {
                    msgB.delete(); // Alpha Codes Server.
                    message.channel.send(`:timer: | Wait some time to send the message to **${membersRole.size}** Members ...`).then(msg => {
                        membersRole.forEach(async mR => {
                            let bcMessage = new Discord.RichEmbed()
                            .setTitle(`:loudspeaker: ${mR.user.username}`)
                            .setColor('GREEN')
                            .addField(':pencil: **Sender:**', message.author.username, true)
                            .addField(':globe_with_meridians: **Server:**', message.guild.name, true)
                            .addField(':scroll: **Message:**', argsM.replace('[user]', mR))
                            .setTimestamp()
                            .setFooter(message.author.tag, message.author.avatarURL)
                           
                            mR.send(bcMessage)
                            await msg.edit(`:white_check_mark: | <@${message.author.id}> Successfully send the message to **${membersRole.size}** Members!`); // Alpha Codes Server.
                        })
                    })
                })
                dontSend.on('collect', r => {
                    msgB.delete();
                    message.channel.send(':negative_squared_cross_mark: | The command has been canceld.').then(msg => msg.delete(5000));
                })
            })
        }else if(args[1] !== 'admins' && args[1] !== 'members' && !getRole) {
            var allB = message.guild.members.filter(m => !m.user.bot);
            if(allB.size === 1) return message.channel.send(`:no_entry: | No members in this server!`);
           
            let allMsg = new Discord.RichEmbed() // Alpha Codes Server.
            .setTitle(`:white_check_mark: **BroadCast Command.** (ALL)`)
            .setColor('GREEN')
            .setDescription(`**\n**:red_circle: Are you sure to send the message to **${allB.size}** Members?\n\n**➥ Message:**\n${argsM}`)
            .setTimestamp()
            .setFooter(message.author.tag, message.author.avatarURL) // Alpha Codes Server.
           
            message.channel.send(allMsg).then(msgB => {
                msgB.react('✅').then(() => msgB.react('❎'))
               
                let sendR = (reaction, user) => reaction.emoji.name === '✅'  && user.id === message.author.id;
                let dontSendR = (reaction, user) => reaction.emoji.name === '❎' && user.id === message.author.id;
                let send = msgB.createReactionCollector(sendR);
                let dontSend = msgB.createReactionCollector(dontSendR); // Alpha Codes Server.
               
                send.on('collect', r => {
                    msgB.delete();
                    message.channel.send(`:timer: | Wait some time to send the message to **${allB.size}** Members ...`).then(msg => {
                        allB.forEach(async m => {
                            let bcMessage = new Discord.RichEmbed()
                            .setTitle(`:loudspeaker: ${m.user.username}`) // Alpha Codes Server.
                            .setColor('GREEN')
                            .addField(':pencil: **Sender:**', message.author.username, true)
                            .addField(':globe_with_meridians: **Server:**', message.guild.name, true)
                            .addField(':scroll: **Message:**', argsM.replace('[user]', m))
                            .setTimestamp()
                            .setFooter(message.author.tag, message.author.avatarURL)
                           
                            m.send(bcMessage)
                            await msg.edit(`:white_check_mark: | <@${message.author.id}> Successfully send the message to **${allB.size}** Members!`);
                        })
                    })
                })
                dontSend.on('collect', r => {
                    msgB.delete();
                    message.channel.send(':negative_squared_cross_mark: | The command has been canceld.').then(msg => msg.delete(5000));
                })
            })
        }
    }
});

client.on('ready', () => {
   console.log(`----------------`);
      console.log(`Desert Bot- Script By : Diamond Codes`);
        console.log(`----------------`);
      console.log(`ON ${client.guilds.size} Servers '     Script By : Diamond Codes ' `);
    console.log(`----------------`);
  console.log(`Logged in as ${client.user.tag}!`);
client.user.setGame(`Sea World Brodcast`,"http://twitch.tv/S-F")
client.user.setStatus("online")
 
});

client.login(process.env.BOT_TOKEN);
