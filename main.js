const fs = require('fs');
const config = require('./config.json');
const roblox = require('roblox-js');
const Discord = require('discord.js');
const client = new Discord.Client();
const uuid = require('uuid');
const translate = require('google-translate-api');
const isoConv = require('iso-language-converter');
const os = require("os");
const ytdl = require('ytdl-core');
const ud = require('urban-dictionary')
const path = require('path')

let activeverifies = new Map()
let randomwords = ['curious']
let ids = new Map()
client.on('ready', () => {
  console.log('I am ready!');
  client.user.setPresence({
    game: {
      name :(`:help | Guilds: ${client.guilds.size}`),
      type: 0
    }
  });
  client.guilds.array().forEach(function(element) {
    activeverifies.set(element.id, new Map())
}, this);
});
const prefix = config.prefix;
client.on('message', message => {
  // Return if it is a bot
  if (message.author.bot) return;
  // Return if it is a DM
  if (!message.guild) {
    message.channel.send("You cannot do any of the bot's commands in DM")
    return;
  }

  // Saving memory, if there is no prefix it quits.
  if (!message.content.slice(1) === prefix) return;


  //Function for command checking
  function commandIs(command) {
    if (message.content.startsWith(prefix + command)) {
      return true;
    }
  }






//Membercount servie







































































































if(commandIs("membercount")){
  let member = message.guild.member(message.author);
  let guild = message.guild
  const embed = new Discord.RichEmbed()
    .setDescription("Membercount")
    .setAuthor(message.author.username, message.author.avatarURL)
    .setColor(0x70b080)
    .setFooter("xAtomX", client.user.avatarURL)
    .setTimestamp(new Date())
    .addField("Server Name", message.guild.name)
    .addField("Members", guild.memberCount)
  message.channel.send(embed)
  return;

}

  //Ping Command
  if (commandIs("ping")) {
    message.channel.send(`Pong! The bot's ping is ${Date.now() - message.createdTimestamp} ms`);
    return;
  }
  //mute command need to work on it
if(commandIs("mute")){
  try {
       let role = message.guild.roles.find("name", "Muted");
       let member = message.mentions.members.first();
       let bot = message.guild.member(client.user);

       if (!member) {
         message.channel.send("Please mention a valid member in this guild.");
         return;
       }
       if (!role) {
         message.guild.createRole({
           name: 'Muted',
           color: 'BLACK',
         }).catch(err => message.channel.send(ess.errorHandle(err)))
         message.channel.send("There was no Muted role so I created it. Try the mute command again.")
         return;
       }

       member.setMute(true)
       message.channel.overwritePermissions(member, {
         "SEND_MESSAGES": false
       })
       member.addRole(role)
       message.channel.send("Muted!")
     } catch (err) {
       message.channel.send(ess.errorHandle(err));
     }
}
  // Whois Command updated version
  if (commandIs("userinfo")) {
    let member = message.guild.member(message.author);
    let guild = message.guild
    const embed = new Discord.RichEmbed()
      .setDescription("Description and information about yourself.")
      .setAuthor(message.author.username, message.author.avatarURL)
      .setColor(0x70b080)
      .setFooter("xAtomX", client.user.avatarURL)
      .setImage(message.author.avatarURL)
      .setThumbnail(client.user.avatarURL)
      .setTimestamp(new Date())
      .addField("Server Name", message.guild.name)
      .addField("Nickname", member.nickname)
      .addField("Moderator", member.hasPermission("BAN_MEMBERS"))
      .addField("Status", member.presence.status)
    message.channel.send(embed)
    return;
  }
  if(commandIs("botinfo")){
    try {

      //CPU Stuff
      function cpuAverage() {
        var totalIdle = 0,
          totalTick = 0;
        var cpus = os.cpus();

        for (var i = 0, len = cpus.length; i < len; i++) {
          var cpu = cpus[i];
          for (type in cpu.times) {
            totalTick += cpu.times[type];
          }
          totalIdle += cpu.times.idle;
        }
        return {
          idle: totalIdle / cpus.length,
          total: totalTick / cpus.length
        };
      }

      var startMeasure = cpuAverage();

      setTimeout(function() {
          var endMeasure = cpuAverage();
          var idleDifference = endMeasure.idle - startMeasure.idle;
          var totalDifference = endMeasure.total - startMeasure.total;
          var percentageCPU = 100 - ~~(100 * idleDifference / totalDifference);
          //CPU STUFF OVER

          var botMembers = 0
          for (var i = 0; i < client.guilds.array().length; i++) {
            botMembers = botMembers + client.guilds.array()[i].memberCount
          }

          //HHMMSS
          String.prototype.toHHMMSS = function() {
            var sec_num = parseInt(this, 10); // don't forget the second param
            var hours = Math.floor(sec_num / 3600);
            var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
            var seconds = sec_num - (hours * 3600) - (minutes * 60);

            if (hours < 10) {
              hours = "0" + hours;
            }
            if (minutes < 10) {
              minutes = "0" + minutes;
            }
            if (seconds < 10) {
              seconds = "0" + seconds;
            }
            var time = hours + ':' + minutes + ':' + seconds;
            return time;
          }
          //

          const rich = new Discord.RichEmbed()
            .setTitle("Server Internal Status")
            .setDescription("Shows you the internal specification of the server's status")
            .setColor(0xd38cff)
            .setThumbnail("https://nodejs.org/static/images/logo-hexagon.png")
            .setTimestamp(new Date())
            .setFooter("xAtomX", client.user.avatarURL, true)
            .addField("CPU Percentage", `${percentageCPU}%`, true)
            .addField("RAM Usage", `${Math.round(process.memoryUsage().heapUsed/ 1024 / 1024 * 100) / 100} MB`, true)
            .addField("Uptime", `${process.uptime().toString().toHHMMSS()}`, true)
            .addField("Servers", client.guilds.array().length, true)
            .addField("Users", botMembers, true)
            .addField("Bot Version", `V1`, true)

          message.channel.send(rich);

        },
        100);
      return;
    } catch (err) {
      message.channel.send(ess.errorHandle(err));
    }
  }
//Serverinfo command
if(commandIs("serverinfo")){
  try {
    let guild = message.guild

    const embed = new Discord.RichEmbed()
      .setDescription("Description and information about this server")
      .setColor(0x70b080)
      .setThumbnail(guild.iconURL)
      .setTimestamp(new Date())
      .addField("Name", guild.name, true)
      .addField("ID", guild.id, true)
      .addField("Owner", guild.owner.user.tag, true)
      .addField("Region", guild.region, true)

      .addField("Verification Level", guild.verificationLevel, true)
      .addField("Channels", guild.channels.array().length, true)
      .addField("Members", guild.memberCount, true)
      .addField("Creation Date", guild.createdAt, true)

    message.channel.send(embed)
    return;
  } catch (err) {
    console.log(err);
    message.channel.send(ess.errorHandle(err));
  }

}
//Help commandIs





if (commandIs("help")) {
  const embed = new Discord.RichEmbed()
    .setTitle("Commands List for xAtomX")
    .setDescription(`All the commands provided for the release version of xAtomX. Default prefix is ${prefix}`)
    .setColor(0x70b080)
    .addField("help", "This help panel")
    .addField("ping", "Shows ping (message round trip) of the bot")
    .addField("userinfo", "Information about user in the server")
    .addField("verify", "Gives you a verified role (smart-automatic detection)")
    .addField("creator", "Credits for the bot")
    .addField("purge", "Delete a bulk load of messages (100 max)")
    .addField("ban", "Bans a member from the server")
    .addField("unban", "Unbans the member from the server")
    .addField("kick", "Kicks a member from the server")
    .addField("mute", "Make user not allowed to talk")
    .addField("unmute", "Make user allowed to talk")
    .addField("serverinfo", "Gives all of the information of the server")
    .addField("botinfo", "Shows CPU, RAM, Guild number and more")
    .addField("wordsearch", "Search any word in english")
    .addField("membercount", "Server user count")
    .setFooter("xAtomX", client.user.avatarURL)
    .setThumbnail(client.user.avatarURL)

  message.channel.send(embed);
}

if(commandIs("creator")){
  message.channel.send("xAtomBear made this cool bot")
}


  if (commandIs("purge")) {
    try {
      if (!Number(message.content.split(" ")[1])) {
        message.channel.send("Please provide numbers to delete")
        return;
      }
      let deleteCount = parseInt(message.content.split(" ")[1])
      if (deleteCount > 99) {
        message.channel.send("Max is 100, Please reenter the amount");
        return;
      }

      message.channel.fetchMessages({
        limit: deleteCount + 1
      }).then(messages => message.channel.bulkDelete(messages));
      message.channel.send("Cleared").then(msg => msg.delete())


    } catch (err) {
      message.channel.send(ess.errorHandle(err));
    }
  }
  //this

  if(commandIs("wordsearch")){
    try {
      let splitmes = message.content.split(" ");
      if (!splitmes[1]) {
        message.channel.send("Enter a word to search!")
        return;
      }
      let search = splitmes.slice(1).join(" ")

      ud.term(search, function(error, entries, tags, sounds) {
        if (error) {
          message.channel.send("I couldn't find a definition for that :thinking:")
        } else {
          let term = entries[0]

          let word = term.word
          let definition = term.definition
          let example = term.example
          let author = term.author
          let thumbs_up = term.thumbs_up
          let thumbs_down = term.thumbs_down
          let id = term.defid


          const rich = new Discord.RichEmbed()
            .setDescription("Search term information about " + word)
            .setColor(0xd38cff)
            .setAuthor(term.author + " - Definition author")
            .setThumbnail("https://vignette.wikia.nocookie.net/creation/images/b/b7/Urban_dictionary_--_logo.jpg/revision/latest?cb=20161002212954")
            .setTimestamp(new Date())
            .setFooter("xAtomX", client.user.avatarURL)
            .addField("Word", word)
            .addField("Definition", definition)
            .addField("Example in a sentence", example)
            .addField("Accuracy", Math.round((thumbs_up / (thumbs_up + thumbs_down) * 100) * 100) / 100 + "%")
            .addField("Link", `https://www.urbandictionary.com/define.php?term=${word.split(" ").join("+")}&defid=${id}`)


          message.channel.send(rich)
        }
      })

      return;
    } catch (err) {
      message.channel.send(ess.errorHandle(err));
    }
  }
    // Play function


  //this

  if (commandIs("kick")) {
    try {
      let member = message.mentions.members.first();
      if (!member) {
        message.channel.send("Please mention a valid member in this guild.");
        return;
      }
      if (!member.kickable) {
        message.channel.send("I cannot kick this user. Please check permissions.");
        return;
      }

      let reason = message.content.split(" ").slice(2).join(" ")
      if (!reason) {
        message.channel.send("Please indicate a reason for the kick!");
        return;
      }

      member.kick(reason)
      message.channel.send(`${member.user.tag} has been kicked by ${message.author.tag} of the reason that ${reason}`);
      return;


    } catch (err) {
      message.channel.send(ess.errorHandle(err));
    }
  }
  if (message.content.startsWith("!ban")) {
    try {
      let member = message.mentions.members.first();
      if (!member) {
        message.channel.send("Please mention a valid member in this guild.");
        return;
      }
      if (!member.bannable) {
        message.channel.send("I cannot ban this user. Please check permissions.");
        return;
      }

      let reason = message.content.split(" ").slice(2).join(" ")
      if (!reason) {
        message.channel.send("Please indicate a reason for the ban!");
        return;
      }

      member.send(`You are banned `).then(member.ban(reason))
      message.channel.send(`${member.user.tag} has been baned by ${message.author.tag} of the reason that ${reason}`);
      return;


    } catch (err) {
      message.channel.send(ess.errorHandle(err));
    }
  }

if(commandIs("unban")){
  try {

    let userid = message.content.split(" ").slice(1).join(" ")
    if (!userid) {
      message.channel.send("Please use an ID of the user to unban.");
      return;
    }

    message.guild.unban(userid)
    message.channel.send(`<@357479079378681857> has been unbaned by ${message.author.tag}. Lets go to mars to bring my boy back home`);
    return;


  } catch (err) {
    message.channel.send(ess.errorHandle(err));
  }
}
if(commandIs("unmute")){
  try {
      let role = message.guild.roles.find("name", "Muted");
      let member = message.mentions.members.first();
      if (!member) {
        message.channel.send("Please mention a valid member in this guild.");
        return;
      }

      member.removeRole(role).catch(e => e)
      member.setMute(false)
      message.channel.permissionOverwrites.get(member.id).delete()
      message.channel.send("Unmuted User!")
      return;
    } catch (err) {
      message.channel.send(ess.errorHandle(err));
    }
}

})

client.on('message', message => {
    if (message.content === ':verify') {
        if (message.member.roles.has(config.role)) {
            message.reply("You are already verified!")
        } else {
            message.channel.send({embed: {
                title: "Verification instructions",
                description: "To verify your account with roblox, please type your username.",
            }})
            activeverifies.get(message.guild.id).set(message.author.id, 1)
        }
    } else if (activeverifies.get(message.guild.id).get(message.author.id) == 1) {
        roblox.getIdFromUsername(message.content).then((id) => {
            message.reply("Perfect! Give me a moment.\n(i think ur id is "+id+")");
             let theid = randomwords;
                message.channel.send({embed: {
                title: "Verification",
                description: "Okay, now add the text `"+theid+"` to your roblox profile description and send anything when done. NOT ROBLOX STATUS"
             }});
            ids.set(message.author.id, [id, theid, message.content]);
            activeverifies.get(message.guild.id).set(message.author.id, 2);
        }).catch( (reason) => {
            message.reply("Mission failed with: " + reason.toString())
            activeverifies.get(message.guild.id).delete(message.author.id);
        })
    } else if (activeverifies.get(message.guild.id).get(message.author.id) == 2) {
        let id = ids.get(message.author.id)
        let role = message.guild.roles.find("name", "British Personal");
        roblox.getBlurb(id[0]).then((blurb) => {
            if (blurb.includes(id[1])) {
                message.channel.send({embed: {
                    title: "Verification complete!",
                    description: "You did it!"
                }})
                message.guild.member(message.author).addRole(role)
                message.guild.member(message.author).setNickname(id[2])
            } else {
                message.reply("I couldnt find that in your description...\n Try again? `:verify`")
            }
            activeverifies.get(message.guild.id).delete(message.author.id)
        }).catch( (reason) => {
            message.reply("Errored with: " + reason.toString())
            activeverifies.get(message.guild.id).delete(message.author.id);
        })
    }
    if(message.content.startsWith("!eval"))
{
    if(message.author.id !== config.owner) return message.channel.send("That's only for my Poppy.");
    let code = message.content.split(" ").slice(1).join(" ");
    try {
        let evaled = eval(code);
        message.channel.send(evaled, { code:"js" });
    } catch(err) {
        message.channel.send(err, { code:"js" });
    }
}
})
function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}


client.login(process.env.TOKEN);
