const { characterDb } = require('../db/character-db.js');
const { skillDb } = require('../db/skill-db.js');
const { CharacterWrapper } = require('../wrappers/characterWrapper.js');

module.exports = {
    name: 'save',
    description: 'Rolls a saving throw',
    usage: [''],
    async execute(message, args, commandName) {
        if(args.length) {
            const characterModel = await characterDb.getCharacterById(message.author.id);
            const allSkills = await skillDb.getAllSkills();
            const characterWrapper = new CharacterWrapper(characterModel, allSkills);
            const roll = Math.floor(Math.random()*20) + 1;
            const ability = characterWrapper.getAbilityByName(args[0]);
            if(!ability) {
                return message.reply('I don\'t recognize that ability.');
            }
            const savingMod = ability.savingModifier;
            message.reply(`${roll} ${savingMod>0 ? '+' : ''}${savingMod}`);
        } else {
            message.reply('Please provide an ability.');
        }
    },
};