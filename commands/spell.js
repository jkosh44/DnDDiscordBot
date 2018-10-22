const { characterDb } = require('../db/character-db.js');
const { skillDb } = require('../db/skill-db.js');
const { CharacterWrapper } = require('../wrappers/characterWrapper.js');
const { characterCreator } = require('../util/character/characterCreator.js');

module.exports = {
    name: 'spell',
    description: 'Rolls spell attack',
    usage: [''],
    async execute(message, args, commandName) {
        await characterCreator.characterExists(message.author.id, true, message);
        const characterModel = await characterDb.getCharacterById(message.author.id);
        const allSkills = await skillDb.getAllSkills();
        const characterWrapper = new CharacterWrapper(characterModel, allSkills);
        const roll = Math.floor(Math.random()*20) + 1;
        const spellAttack = characterWrapper.spellAttack;
        message.reply(`${roll} ${spellAttack>=0 ? '+' : ''}${spellAttack}`);
    },
};