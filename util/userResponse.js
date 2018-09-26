async function promptForAnswer(user, prompt, message, filter=m => checkUserId(m, message), map=r => r, max=1) {
    const promptMessage = await user.send(prompt);
    const collected = await promptMessage.channel.awaitMessages(filter, {max: max, time: 60000});
    if(collected.size) {
        const response = collected.map(m => map(m.content));
        const confirm = await confirmAnswer(response, promptMessage.channel, user);
        if(confirm) {
            if(max > 1) {
                return response;
            } else {
                return response[0];
            }
        } else {
            return promptForAnswer(user, prompt, message, filter, map);
        }
        // const response = map(collected.first().content);
        // const confirm = await confirmAnswer(response, promptMessage.channel, user);
        // if(confirm) {
        //     return response;
        // } else {
        //     return promptForAnswer(user, prompt, message, filter, map);
        // }
    } else {
        throw 'Character creation timed out';
    }
}

async function promptForAnswerWithChoices(user, prompt, message, choices, max=1)  {
    let promptMsg = prompt+'\n';
    for(var i = 0; i<choices.length; i++) {
        promptMsg += `\t${i+1}. ${choices[i].name}\n`;
    }
    const response = await promptForAnswer(user, promptMsg, message,
        m => messageIsNumber(message, m) && m.content > 0 && m.content <= choices.length, 
        r => choices[parseInt(r)-1].code,
        max
    );
    return response;
}

async function confirmAnswer(response, channel, user) {
    // return true;
    const m = await channel.send(`You said ${response}. Please give this message a thumbs up to confirm or a thumbs down to reject.`);
    m.react('👍').then(() => m.react('👎'));
    const filter = (reaction, sender) => {
        return sender.id === user.id && ['👍','👎'].includes(reaction.emoji.name);
    };
    const collected = await m.awaitReactions(filter, {max: 1, time: 60000});
    if(collected.first()) {
        const emoji = collected.first().emoji.name;
        
        if(emoji === '👍') {
            return true;
        }
        else if(emoji === '👎') {
            return false;
        }
        else {
            m.channel.send('invalid reaction');
            return confirmAnswer(response, channel, user);
        }
    } else {
        //Timed out
        return false;
    }
}

function checkUserId(message, m) {
    return m.author.id === message.author.id;
}

function messageIsNumber(message, m) {
    return checkUserId(message, m) && !isNaN(m.content);
}

module.exports = {
    promptForAnswer,
    promptForAnswerWithChoices,
    checkUserId,
    messageIsNumber
}