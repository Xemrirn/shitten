require('dotenv').config();

const { Client, DiscordAPIError} = require('discord.js');
const client = new Client();
const PREFIX = '.';

client.on('ready', () => {
    console.log(`${client.user.username} has logged in.`);
});

client.on('message', (message) =>{
    if (message.content === 'Hello'){
        message.channel.send('The bot is logged in.');
    }
});

client.on('message', async (message) => {

    if (message.author.bot) return;
    if (message.content.startsWith(PREFIX)) {
        const [cmd_name, ...args] = message.content.trim()
        .substring(PREFIX.length)
        .split(/\s+/);

    if(cmd_name === 'kick'){
        if (!message.member.hasPermission('KICK_MEMBERS'))
            return message.reply('**Softly** Don\'t');
        if (args.length === 0) return message.reply('Please provide an ID');
        const member = message.guild.members.cache.get(args[0]);
        if (member) {
            member
                .send('You\'ve been kicked.')
                .kick()
                .then((member) => message.channel.send(`${member} was kicked outta here.(that potato)`))
                .catch((err) => message.channel.send('Missing Permissions'))
                console.log('kicked');
        }else{
            message.channel.send('Member Unknown');
        }
    }else if (cmd_name === 'ban'){
        if (!message.member.hasPermission('BAN_MEMBERS'))
            return message.reply('**Quietly** I\'ll kill you');
        if (args.length === 0) return message.reply('Please provide an ID');

       try {
           await client.users.cache.get(args[0]).send('Banned');
           const user = await message.guild.members.ban(args[0]);
           message.channel.send('User banned successfully');
           console.log('Banned');
        } catch (err){
            console.log(err);
            message.channel.send('An error occured.');
        }

    if (cmd_name === 'help') {
        message.channel.send('/kick -> indicate a user id and Shitten will kick the user from this server');
        message.channel.reply('/ban -> indicate a user id and Shitten will ban the user from this server');
        console.log('Helped.');
    }

    }

    }
});

client.login(process.env.Bot_Token);
