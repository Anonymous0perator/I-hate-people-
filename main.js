const Discord = require("discord.js");
const client = new Discord.Client();
const config = require('./config.json')
const fs = require("fs")
const rbx = require('roblox-js');
const os = require("os");

client.on('ready', () => {
  console.log(`Ready to server on 1 server, for ${client.users.size} users.`);
  client.user.setPresence({
    game: {
      name :(`Testing Beta Phase, for ${client.users.size} users.`),
      type: 0
    }
  });
  client.guilds.array().forEach(function(element) {
  },);
});

const prefix = config.prefix

client.on('message', message => {

  if (message.author.bot) return;
  // Return if it is a DM

  // Saving memory, if there is no prefix it quits.
  if (!message.content.slice(1) === prefix) return;


  //Function for command checking
  function commandIs(command) {
    if (message.content.startsWith(prefix + command)) {
      return true;
    }
  }

  if(message.member.roles.find("name", "GUEST")){
    let member = message.guild.member(message.author);
    member.setNickname(`[${member.highestRole.name}] ${member.user.username}`)
      }

      if(commandIs("donate")){
        try {

      let donationmenu = {
        embed: {
          color: 0xd38cff,
          title: "Invite Links",
          description: "Thank you for using hexcore Beta the bot! To donate to the creators of the bot as a thank you, here are some links you can check out.",
          fields: [{
              name: "**PayPal (preferred)**",
              value: `https://paypal.me/heotech`
            },
            {
              name: "**Patreon (for monthly donations)**",
              value: `https://www.patreon.com/joeyheo`
            },
            {
              name: "If you donate, you will be able to get a Donator role in my Discord server!",
              value: "https://discord.gg/CjDywuX"
            }
          ],
          timestamp: new Date(),
          footer: {
            icon_url: client.user.avatarURL,
            text: "hexcore beta"
          }
        }
      }
      message.channel.send(donationmenu)
    } catch (err) {
      message.channel.send(ess.errorHandle(err));
    }
      }
      if(commandIs("serverinfo")){
        try {
          let guild = message.guild

          const embed = new Discord.RichEmbed()
            .setDescription("Description and information about this server")
            .setColor(3447003)
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

if(commandIs("userinfo")){
  try {
     if (message.mentions.members.first()) {
       let member = message.mentions.members.first().user
       let guildMember = message.mentions.members.first()
       const embed = new Discord.RichEmbed()
         .setDescription("Description and information about " + member.tag)
         .setAuthor(member.username, member.displayAvatarURL)
         .setColor(3447003)
         .setThumbnail(member.displayAvatarURL)
         .setTimestamp(new Date())
         .setFooter("hexcore Beta", client.user.avatarURL)
         .addField("ID", member.id)
         .addField("Discriminator", member.discriminator)
         .addField("Status", member.presence.status)

         .addField("Nickname", guildMember.nickname)
         .addField("Moderator", guildMember.hasPermission("BAN_MEMBERS"))
         .addField("Joined at", guildMember.joinedAt)
         .addField("Role(s)", guildMember.roles.array().join(", "))
       message.channel.send(embed)
     } else {
       let member = message.author
       let guildMember = message.guild.member(member)
       const embed = new Discord.RichEmbed()
         .setDescription("Description and information about " + member.tag)
         .setAuthor(member.username, member.displayAvatarURL)
         .setColor(3447003)
         .setThumbnail(member.displayAvatarURL)
         .setTimestamp(new Date())
         .setFooter("hexcore Beta", client.user.avatarURL)
         .addField("ID", member.id)
         .addField("Discriminator", member.discriminator)
         .addField("Status", member.presence.status)

         .addField("Nickname", guildMember.nickname)
         .addField("Moderator", guildMember.hasPermission("BAN_MEMBERS"))
         .addField("Joined at", guildMember.joinedAt)
         .addField("Role(s)", guildMember.roles.array().join(", "))
       message.channel.send(embed)
     }
     return;
   } catch (err) {
     message.channel.send(ess.errorHandle(err));
   }
}
if(commandIs("botstatus")){
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

         var botMembers = client.users.size

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
           .setFooter("hexcore beta", client.user.avatarURL, true)
           .addField("CPU Percentage", `${percentageCPU}%`, true)
           .addField("RAM Usage", `${Math.round(process.memoryUsage().heapUsed/ 1024 / 1024 * 100) / 100} MB`, true)
           .addField("Uptime", `${process.uptime().toString().toHHMMSS()}`, true)
           .addField("Guilds", client.guilds.array().length, true)
           .addField("Users", botMembers, true)
           .addField("Bot Version", `beta`, true)

         message.channel.send(rich);

       },
       100);
     return;
   } catch (err) {
     message.channel.send(ess.errorHandle(err));
   }
}
if(commandIs("info")){
  message.channel.send({embed: {
    color: 3447003,
    author: {
      name: client.user.username,
      icon_url: client.user.avatarURL
    },
    title: "hexcore Beta",
    url: "",
    description: "Hexcore beta was created by ExternalMixture#3252, the current status is beta",
    fields: [
      {
        name: "Support server",
        value: "Join our support server [here](https://discord.gg/CjDywuX)"
      }
    ],
    timestamp: new Date(),
    footer: {
      icon_url: client.user.avatarURL,
      text: "hexcore Beta"
    }
  }
});
}
if(commandIs("buy")){
  message.channel.send({embed: {
    color: 3447003,
    author: {
      name: client.user.username,
      icon_url: client.user.avatarURL
    },
    title: "hexcore Beta",
    url: "",
    description: "hexcore Beta helps you connect your discord server and your roblox group.",
    fields: [
      {
        name: "Plan",
        value: "You can find monthly plan [here](https://docs.google.com/document/d/1ifi0dCPOgsRpdPx0K_LzqjrTmb8vB1KxUyw30SvMIYg/edit?usp=sharing)"
      }
    ],
    timestamp: new Date(),
    footer: {
      icon_url: client.user.avatarURL,
      text: "hexcore Beta"
    }
  }
});
}
if(commandIs('update', message)){
  message.channel.send("All of the commands are disabled in current server.")
}
if(commandIs("membercount")){
	try {
      let guild = message.guild

      const embed = new Discord.RichEmbed()
        .setDescription("membercount")
        .setColor(3447003)
        .setThumbnail(guild.iconURL)
        .setTimestamp(new Date())
        .addField("Name", guild.name, true)
        .addField("ID", guild.id, true)
        .addField("Owner", guild.owner.user.tag, true)
        .addField("Members", guild.memberCount, true)

      message.channel.send(embed)
      return;
    } catch (err) {
      console.log(err);
      message.channel.send(ess.errorHandle(err));
    }
}
if(commandIs('listrank', message)){
  let groupID = 4590447;
  if(message.member.hasPermission('ADMINISTRATOR')){
    message.channel.send("Loading all ranks from the follow group " + ' https://www.roblox.com/groups/group.aspx?gid='+ groupID )
    rbx.getRoles(4590447)
                      .then(function (roles) {
                      roles.forEach(function(item){
                        message.channel.send('"' + item.Name + '",')
                      })
                      })
}

}

if(commandIs("tagme", message)){
  message.channel.send("All of the commands are currently disabled.")
}

if (commandIs("purge")) {
    if (message.member.hasPermission("MANAGE_MESSAGES")) {
     try {
      if (!Number(message.content.split(" ")[1])) {
        message.channel.send("Please provide a number for amount of messages to be deleted.")
        return;
      }
      let deleteCount = parseInt(message.content.split(" ")[1])
      if (deleteCount > 99) {
        message.channel.send("Please try lower number than 100.");
        return;
      }

      message.channel.fetchMessages({
        limit: deleteCount + 1
      }).then(messages => message.channel.bulkDelete(messages));
      message.channel.send("Purged and cleared!").then(msg => msg.delete())


    } catch (err) {
      message.channel.send(ess.errorHandle(err));
    }
    }
  }

})

  // Return if it is a bot



client.login(process.env.TOKEN);
