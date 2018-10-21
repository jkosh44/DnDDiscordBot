const { characterDb } = require('../db/character-db.js');
const { skillDb } = require('../db/skill-db.js');
const { CharacterWrapper } = require('../wrappers/characterWrapper.js');

module.exports = {
    name: 'ability-check',
    description: 'Rolls an ability check',
    usage: [''],
    aliases: ['check', 'str', 'dex', 'con', 'int', 'wis', 'cha'],
    async execute(message, args, commandName) {
        const characterModel = await characterDb.getCharacterById(message.author.id);
        const allSkills = await skillDb.getAllSkills();
        const characterWrapper = new CharacterWrapper(characterModel, allSkills);
        const roll = Math.floor(Math.random()*20) + 1;
        if(args.length) {
            const abilityName = args[0];
            const ability = characterWrapper.getAbilityByName(abilityName);
            if(!ability) {
                message.reply('Sorry, I don\'t recognize that ability');
            }
            message.reply(`${roll} ${ability.modifier>0 ? '+' : ''}${ability.modifier}`);
        } else if(commandName !== 'check'){
            const ability = characterWrapper.getAbilityByName(commandName);
            if(!ability) {
                message.reply('Sorry, I don\'t recognize that ability');
            }
            message.reply(`${roll} ${ability.modifier>0 ? '+' : ''}${ability.modifier}`);
        }
    },
};