const { characterDb } = require('../db/character-db.js');
const { skillDb } = require('../db/skill-db.js');
const { CharacterWrapper } = require('../wrappers/characterWrapper.js');
const { characterCreator } = require('../util/character/characterCreator.js');

const abilityList = ['str', 'dex', 'con', 'int', 'wis', 'cha'];

module.exports = {
    name: 'ability-check',
    description: 'Rolls an ability check',
    usage: ['<ability-name> or $<ability-name>'],
    aliases: ['ability', 'acheck', ...abilityList],
    async execute(message, args, commandName) {
        await characterCreator.characterExists(message.author.id, true, message);
        const characterModel = await characterDb.getCharacterById(message.author.id);
        const allSkills = await skillDb.getAllSkills();
        const characterWrapper = new CharacterWrapper(characterModel, allSkills);
        const roll = Math.floor(Math.random()*20) + 1;
        let abilityName = '';
        if(args.length) {
            abilityName = args[0];
        } else if(abilityList.includes(commandName)){
            abilityName = commandName;
        } else {
            return message.reply('Please indicate which ability you\'d like to roll a check for. Available abilities are:\n'+abilityList);
        }
        const ability = characterWrapper.getAbilityByName(abilityName);
        if(!ability) {
            return message.reply('Sorry, I don\'t recognize that ability');
        }
        return message.reply(`${roll} ${ability.modifier>=0 ? '+' : ''}${ability.modifier}`);
    },
};