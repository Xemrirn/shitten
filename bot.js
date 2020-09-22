require('dotenv').config();

const { Client, DiscordAPIError, MessageEmbed} = require('discord.js');
const Discord = require ('discord.js');
const client = new Client();
const PREFIX = '.';
const embedHelp = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle('Help')
                .setDescription('Lists of the commands availables for now')
                .addFields(
                    { name: 'help', value: 'Gives the list of the actual commands'},
                    { name: 'kick', value: 'Kick a member out of the server by indicating his ID next to the command'},
                    { name: 'ban', value: 'Ban a member out of the server by indicating his ID next to the command'}
                    );

client.on('ready', () => {
    console.log(`${client.user.username} has logged in.`);
});

client.on('message', (message) => {
    if (message.mentions.users.first() === undefined) return;
    if (message.mentions.users.first().id === client.user.id) {
        message.channel.send('The prefix is' + ' ' + "'" + PREFIX + "'" + ' ' + '.');
    }
});

client.on('message', (message) =>{
    if (message.content === 'Hello'){
        message.channel.send('The bot is logged in.');
    }
});

client.on('message', (message) => {
    if (message.content === 'hentai' || message.content === 'Hentai' ){
        message.reply('It\' hentai time b*tch');
    };
})

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

    }

    if (cmd_name === 'help') {
        message.channel.send(embedHelp);
        console.log('Helped.');
    };

    }
});

client.login(process.env.Bot_Token);
