const { characterCreator } = require('../util/character/characterCreator.js');
const { characterPrinter } = require('../util/character/characterPrinter.js');

module.exports = {
    name: 'char',
    description: 'Interact with your character sheet',
    usage: [''],
    aliases: [],
	async execute(message, args) {
        const user = message.author;
        const userExists = await characterCreator.characterExists(user.id);
        if(userExists){
            const data = await characterPrinter.plainPrint(user.id);
            user.send(data, { split: true });
        } else {
            try {
                const char = await characterCreator.getCharacterInfo(user, message); 
                characterCreator.createCharacter(char.characterInfo, char.abilityScores, char.armor, char.proficiencies);
                user.send('Character creation complete');
            }
            catch(err) {
                if(err === 'Character creation timed out') {
                    user.send('Character creation timed out')
                } else {
                    user.send('Error creating character');
                }
            }

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
        //     { str: { score: 1, savingThrow: true },
        //       dex: { score: 2, savingThrow: false },
        //       con: { score: 3, savingThrow: false },
        //       int: { score: 4, savingThrow: false },
        //       wis: { score: 5, savingThrow: true },
        //       cha: { score: 6, savingThrow: false } };
        //    const armor = { armor_name: 'chain', armor_class: 12, armor_type: 'M' };
        //    const proficiencies = [ 'Intimidation', 'Persuasion', 'Investigation' ];
        //    characterCreator.createCharacter(characterInfo, abilityScores, armor, proficiencies);

        }
    }
}