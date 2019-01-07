const { characterDb } = require('../db/character-db.js');
const { skillDb } = require('../db/skill-db.js');
const { CharacterWrapper } = require('../wrappers/characterWrapper.js');
const { characterCreator } = require('../util/character/characterCreator.js');

const ACROBATICS = 'Acrobatics';
const ANINAL_HANDLING = 'Animal Handling';
const ARCANA = 'Arcana';
const ATHLETICS = 'Athletics';
const DECEPTION = 'Deception';
const HISTORY = 'Histroy';
const INSIGHT = 'Insight';
const INTIMIDATION = 'Intimidation';
const INVESTIGATION = 'Investigation';
const MEDICINE = 'Medicine';
const NATURE = 'Nature';
const PERCEPTION = 'Perception';
const PERFORMANCE = 'Performance';
const PERSUASSION = 'Persuassion';
const RELIGION = 'Religion';
const SLEIGHT_OF_HAND = 'Sleight of Hand';
const STEALTH = 'Stealth';
const SURVIVAL = 'Survival';

const skillMap = new Map([
    ['acr',  ACROBATICS],
    ['acrobatics', ACROBATICS],
    ['animal', ANINAL_HANDLING],
    ['Animal Handling', ANINAL_HANDLING],
    ['arc', ARCANA],
    ['arcana', ARCANA],
    ['athl', ATHLETICS],
    ['athletics', ATHLETICS],
    ['dec', DECEPTION],
    ['deception', DECEPTION],
    ['hist', HISTORY],
    ['history', HISTORY],
    ['ins', INSIGHT],
    ['insight', INSIGHT],
    ['int', INTIMIDATION],
    ['intimitdation', INTIMIDATION],
    ['inv', INVESTIGATION],
    ['invest', INVESTIGATION],
    ['investigation', INVESTIGATION],
    ['med', MEDICINE],
    ['medicine', MEDICINE],
    ['nat', NATURE],
    ['nature', NATURE],
    ['perc', PERCEPTION],
    ['percep', PERCEPTION],
    ['perception', PERCEPTION],
    ['perf', PERFORMANCE],
    ['perform', PERFORMANCE],
    ['performance', PERFORMANCE],
    ['pers', PERSUASSION],
    ['persuassion', PERSUASSION],
    ['rel', RELIGION],
    ['religion', RELIGION],
    ['sleight', SLEIGHT_OF_HAND],
    ['sleight of hand', SLEIGHT_OF_HAND],
    ['stealth', STEALTH],
    ['surv', SURVIVAL],
    ['survival', SURVIVAL]
]);

module.exports = {
    name: 'skill-check',
    description: 'Rolls a skill check',
    usage: [''],
    aliases: ['skill', 'check', ...skillMap.keys()],
    async execute(message, args, commandName) {
        await characterCreator.characterExists(message.author.id, true, message);
        const characterModel = await characterDb.getCharacterById(message.author.id);
        const allSkills = await skillDb.getAllSkills();
        const characterWrapper = new CharacterWrapper(characterModel, allSkills);
        const roll = Math.floor(Math.random()*20) + 1;
        let skillName = '';
        if(args.length) {
            skillName = skillMap.get(args[0].toLowerCase());
        } else {
            skillName = skillMap.get(commandName.toLowerCase());
        }
        const skill = characterWrapper.getSkillByName(skillName);
        if(!skill) {
            return message.reply('Sorry, I don\'t recognize that skill');
        }
        return message.reply(`${roll} ${skill.roll>=0 ? '+' : ''}${skill.roll}`);
    },
};