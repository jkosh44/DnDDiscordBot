const { characterDb } = require('../db/character-db.js');
const { skillDb } = require('../db/skill-db.js');
const { CharacterWrapper } = require('../wrappers/characterWrapper.js');
const { characterCreator } = require('../util/character/characterCreator.js');

module.exports = {
    name: 'ability-check',
    description: 'Rolls an ability check',
    usage: [''],
    aliases: ['ability', 'acheck', 'str', 'dex', 'con', 'int', 'wis', 'cha'],
    async execute(message, args, commandName) {
        await characterCreator.characterExists(message.author.id, true, message);
        const characterModel = await characterDb.getCharacterById(message.author.id);
        const allSkills = await skillDb.getAllSkills();
        const characterWrapper = new CharacterWrapper(characterModel, allSkills);
        const roll = Math.floor(Math.random()*20) + 1;
        if(args.length) {
            const abilityName = args[0];
            const ability = characterWrapper.getAbilityByName(abilityName);
            if(!ability) {
                return message.reply('Sorry, I don\'t recognize that ability');
            }
            message.reply(`${roll} ${ability.modifier>=0 ? '+' : ''}${ability.modifier}`);
        } else if(['str', 'dex', 'con', 'int', 'wis', 'cha'].includes(commandName)){
            const ability = characterWrapper.getAbilityByName(commandName);
            if(!ability) {
                return message.reply('Sorry, I don\'t recognize that ability');
            }
            message.reply(`${roll} ${ability.modifier>=0 ? '+' : ''}${ability.modifier}`);
        }
    },
};