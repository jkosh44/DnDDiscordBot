module.exports = {
    name: 'name',
    description: 'asks for your name and then returns it',
    usage: [''],
    authorizedUsers: ['259396529016537088'],
	execute(message) {
        filter = m => true;
        if(message.channel.type !== 'dm') {
            message.channel.send('Bout to slide into your dms...');
        }
        promptForAnswer(message.author, 'What\'s your name?', m=>true, 'name')
            .then(name => console.log(name.content));  
    },
};

function promptForAnswer(user, prompt, filter, fieldName){
    return user.send(prompt).then(m => {
        return m.channel.awaitMessages(filter, {max: 1})
            .then(collected => {
                const response = collected.first();
                return confirm(response, m.channel)
                    .then(conf => {
                        console.log('conf: ' + conf);
                        if(conf) {
                            return response;
                        }
                        else {
                            return promptForAnswer(user, prompt, filter, fieldName);
                        }
                    })
            })
            .catch(collected => {
                m.channel.send(`something happened: ${collected}`);
            });
    });
}

function confirm(response, channel) {
    return channel.send(`You said ${response}. Please give this message a thumbs up to confirm or a thumbs down to reject.`)
        .then(conf => {
            return conf.awaitReactions(() => true, {max: 1})
                .then(collectedReactions => {
                    const emoji = collectedReactions.first().emoji.name;
                    if(emoji === '👍') {
                        channel.send('Confirmed');
                        return true;
                    }
                    else if(emoji === '👎') {
                        channel.send('denied');
                        return false;
                    }
                    else {
                        m.channel.send('invalid reaction');
                        return confirm(response, channel);
                    }
                })
                .catch(e => {
                    m.channel.send(`something happened: ${e}`);
                });
    });
}