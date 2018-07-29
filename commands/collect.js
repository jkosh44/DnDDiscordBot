module.exports = {
    name: 'collect-poop',
    description: 'collect\'s your poop',
    usage: ['', '<max poops>'],
    aliases: ['poop'],
	execute(message, args) {
        const filter = m => m.content.includes('poop') && m.author.id == message.author.id;
        
        let collector = null;

        if(args) {
            collector = message.channel.createMessageCollector(filter, {time: 15000, max: args[0]});
        } else {
            collector = message.channel.createMessageCollector(filter, {time: 15000});
        }

        collector.on('collect', m => {
            m.react('💩')
                .catch((e) => m.reply('Looks like I\'m constipated: '+e));
        });

        collector.on('end', collected => {
            message.channel.send(`I pooped ${collected.size} times!`);
        });
    },
};