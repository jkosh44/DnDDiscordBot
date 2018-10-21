const { characterCreator } = require('../util/character/characterCreator.js');
const { characterPrinter } = require('../util/character/characterPrinter.js');

module.exports = {
    name: 'char',
    description: 'Interact with your character sheet',
    usage: [''],
    aliases: [],
	async execute(message, args) {
        const user = message.author;
        await characterCreator.characterExists(user.id, true, message);
        const data = await characterPrinter.prettyPrint(user.id);
        user.send(data);
        
        //     const characterInfo =
        //     { user_id: '259396529016537088',
        //       character_name: 'Joe',
        //       level: 1,
        //       race: 'Teifling',
        //       gender: 'Male',
        //       alignment_lvc: 'Chaotic',
        //       alignment_evg: 'Evil',
        //       diety: 'Garfield',
        //       size: 'big',
        //       hair: 'brown',
        //       eyes: 'hazel',
        //       height: 'tall',
        //       weight: 'heavy',
        //       background: 'old',
        //       class: 'gnome',
        //       hit_dice: 8,
        //       base_hit_points: 24,
        //       character_bio: 'biog' };
        //    const abilityScores = 
        //     { str: { score: 13, savingThrow: true },
        //       dex: { score: 12, savingThrow: false },
        //       con: { score: 14, savingThrow: false },
        //       int: { score: 15, savingThrow: false },
        //       wis: { score: 10, savingThrow: true },
        //       cha: { score: 9, savingThrow: false } };
        //    const armor = { armor_name: 'chain', armor_class: 12, armor_type: 'M' };
        //    const proficiencies = [ 'Intimidation', 'Persuasion', 'Investigation' ];
        //    characterCreator.createCharacter(characterInfo, abilityScores, armor, proficiencies);

        
    }
}