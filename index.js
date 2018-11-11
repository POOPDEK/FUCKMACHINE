const botconfig = require("./botconfig.json")
const Discord = require("discord.js")

const bot = new Discord.Client()

// log in
bot.on("ready", async() => {
  console.log(`${bot.user.username} is ONLINE.`);
  bot.user.setGame('FUCK')
});
bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

// allow space in cmd
  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  //commands
  if(cmd === `${prefix}`){
    return message.channel.send("nya");
  };
  //BOT INFO
  if(cmd === `${prefix}info`){
    let botEmbed = new Discord.RichEmbed()
    .setColor("#ffffff")
    .addField("Bot Name", bot.user.username)
    .addField("Commands", "cmd list");
    return message.channel.send(botEmbed);
  };
  //REPORT
  if(cmd === `${prefix}report`){
    let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!rUser) return message.channel.send("Couldn't find user");
    let reason = args.join(" ").slice(22);

    let reportEmbed = new Discord.RichEmbed()
      .setDescription("reports")
      .setColor("#ffffff")
      .addField("reported user",`${rUser} with ID: ${rUser.id}`)
      .addField("reported by",`${message.author} with ID: ${message.author.id}`)
      .addField("reason", reason);

      let reportchannel = message.guild.channels.find(`name`,"reports");
      if(!reportchannel) return message.channel.send("Couldn't find channel.");
//remember to add command to add channel if not exist

message.delete().catch(O_o=>{});
    reportchannel.send(reportEmbed);
return;};

//KICK
if (cmd === `${prefix}k`){
  let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!kUser) return message.channel.send("Couldn't find user");
  if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("Couldn't kick user");
  if(kUser.hasPermission("ADMINISTRATOR")) return message.channel.send("Cannot kick admins");


  let kickEmbed = new Discord.RichEmbed()
  .setColor("#ff0000")
  .addField("KICK",`${message.author} kicked ${kUser} from the server.`);

  message.guild.member(kUser).kick();
  message.channel.send(kickEmbed);
  return;};

  //BAN
  if (cmd === `${prefix}b`){
    let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    let bReason = args.join(" ").slice(22);let reason = args.join(" ").slice(22);
    
    if(!bUser) return message.channel.send("Couldn't find user");
    if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("Couldn't ban user");
    if(bUser.hasPermission("ADMINISTRATOR")) return message.channel.send("Cannot ban admins");


    let banEmbed = new Discord.RichEmbed()
    .setColor("#ff0000")
    .addField("BAN",`${bUser} has been banned from the server.`);

    message.guild.member(bUser).ban(bReason);
    message.channel.send(banEmbed);
    return;};
  //command end
});


bot.login(botconfig.token);
