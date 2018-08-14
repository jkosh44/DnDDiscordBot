module.exports = {
    name: 'collect-cheese',
    description: 'collect\'s your cheese',
    usage: ['', '<max cheese>'],
    aliases: [''],
    authorizedUsers: ['259396529016537088'],
	execute(message, args) {
        const filter = m => m.content.includes('cheese') && m.author.id == message.author.id;
        
        let collector = null;

        if(args) {
            collector = message.channel.createMessageCollector(filter, {time: 15000, max: args[0]});
        } else {
            collector = message.channel.createMessageCollector(filter, {time: 15000});
        }

        collector.on('collect', m => {
            m.react('🧀')
                .catch((e) => m.reply('Looks like I\'m lactose intolerant: '+e));
        });

        collector.on('end', collected => {
            message.channel.send(`I've cheesed ${collected.size} times!`);
        });
    },
};