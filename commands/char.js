const { characterUtil } = require('../util/characterUtil.js');

module.exports = {
    name: 'char',
    description: 'Interact with your character sheet',
    usage: [''],
    aliases: [],
	async execute(message, args) {
        const user = message.author;
        const userExists = await characterUtil.characterExists(user.id);
        if(userExists){
            //TODO
        } else {
            createCharacter(user, message);
        }
    }
}

async function createCharacter(user, message) {
    //TODO: figure out time outs
    message.reply(`I don't have any info on your character. Let's create one now, I'll DM you to start the process.`);
    const name = await promptForAnswer(user, 'What is your characters name?', message);
    const lvl = await promptForAnswer(user, 'What is your chracters starting level?', message, 
        m => messageIsNumber(message, m), r => parseInt(r));
    const race = await promptForAnswer(user, 'What is your characters race?', message);
    const alignmentLVC = await promptForAnswer(user, 'Is your character Lawful, Nuetral, or Chaotic?', message,
        m => checkUserId(m, message) && ['lawful', 'nuetral', 'chaotic'].includes(m.content.toLowerCase()));
    const alignmentEVG = await promptForAnswer(user, 'Is your character Good, Nuetral, or Evil?', message,
        m => checkUserId(m, message) && ['good', 'nuetral', 'evil'].includes(m.content.toLowerCase()));
    const size = await promptForAnswer(user, 'What is your characters size?', message);
    const hair = await promptForAnswer(user, 'What does your characters hair look like?', message);
    const weight = await promptForAnswer(user, 'What is your characters weight', message);
    const background = await promptForAnswer(user, 'What is your characters background', message);
    const className = await promptForAnswer(user, 'What is your characters class', message);
    const baseHitPoints = await promptForAnswer(user, 'What is your characters base hit points? (Can be found under the Classes section of your character sheet.)', message,
        m => messageIsNumber(message, m), r=>parseInt(r));
    const baseArmorClass = await promptForAnswer(user, 'What is the armor class of your currently worn armor?', message, 
        m => messageIsNumber(message, m), r=>parseInt(r));
    const baseArmorType = await promptForAnswer(user, 'What is your armors type (Reply 1, 2, or 3)?\n1. Light\n2. Medium\n3. Heavy', message,
        m => messageIsNumber(message, m) && m.content > 0 && m.content < 4, 
        response => {
            const responseNum = parseInt(response);
            if(responseNum === 1) {
                return 'L';
            } else if(responseNum === 2) {
                return 'M';
            } else if(responseNum === 3) {
                return 'H';
            }
        }
    );
    //ac = basearmorclass + min(dex, (h->0, m->2, l->dex))
    const characterBio = await promptForAnswer(user, 'What is your characters bio?', message);

    const str = await promptForAnswer(user, 'What is your Strength score?', message,
        m => messageIsNumber(message, m), r=>parseInt(r));
    const dex = await promptForAnswer(user, 'What is your Dexterity score?', message,
        m => messageIsNumber(message, m), r=>parseInt(r));
    const con = await promptForAnswer(user, 'What is your Constitution score?', message,
        m => messageIsNumber(message, m), r=>parseInt(r));
    const int = await promptForAnswer(user, 'What is your Intelligence score?', message,
        m => messageIsNumber(message, m), r=>parseInt(r));
    const wis = await promptForAnswer(user, 'What is your Wisdom score?', message,
        m => messageIsNumber(message, m), r=>parseInt(r));
    const cha = await promptForAnswer(user, 'What is your Charisma score?', message,
        m => messageIsNumber(message, m), r=>parseInt(r));
    
    await characterUtil.createCharacter(
        {
            user_id: user.id,
            character_name: name,
            level: lvl,
            race: race,
            alignment_lvc: alignmentLVC,
            alignment_evg: alignmentEVG,
            size: size,
            hair: hair,
            weight: weight,
            background: background,
            class: className,
            base_hit_points: baseHitPoints,
            armor_worn_armor_class: baseArmorClass,
            armor_worn_type: baseArmorType,
            character_bio: characterBio,
        },
        {
            str: str,
            dex: dex,
            con: con,
            int: int,
            wis: wis,
            cha: cha
        }
    );
    return;
}

async function promptForAnswer(user, prompt, message, filter=m => checkUserId(m, message), map=r => r) {
    const promptMessage = await user.send(prompt);
    const collected = await promptMessage.channel.awaitMessages(filter, {max: 1, time: 60000});
    const response = map(collected.first().content);
    if(response) {
        const confirm = await confirmAnswer(response, promptMessage.channel, user);
        if(confirm) {
            return response;
        } else {
            return promptForAnswer(user, prompt, message, filter, map);
        }
    } else {
        promptMessage.channel.send('Character creation timed out');
        return null;
    }
}

async function confirmAnswer(response, channel, user) {
    return true;
    // const m = await channel.send(`You said ${response}. Please give this message a thumbs up to confirm or a thumbs down to reject.`);
    // m.react('👍').then(() => m.react('👎'));
    // const filter = (reaction, sender) => {
    //     return sender.id === user.id && ['👍','👎'].includes(reaction.emoji.name);
    // };
    // const collected = await m.awaitReactions(filter, {max: 1, time: 60000});
    // if(collected.first()) {
    //     const emoji = collected.first().emoji.name;
        
    //     if(emoji === '👍') {
    //         return true;
    //     }
    //     else if(emoji === '👎') {
    //         return false;
    //     }
    //     else {
    //         m.channel.send('invalid reaction');
    //         return confirmAnswer(response, channel, user);
    //     }
    // } else {
    //     //Timed out
    //     return false;
    // }
}

function checkUserId(message, m) {
    return m.author.id === message.author.id;
}

function messageIsNumber(message, m) {
    return checkUserId(message, m) && !isNaN(m.content);
}