const { characterCreator } = require('../util/character/characterCreator.js');

module.exports = {
    name: 'char',
    description: 'Interact with your character sheet',
    usage: [''],
    aliases: [],
	async execute(message, args) {
        const user = message.author;
        const userExists = await characterCreator.characterExists(user.id);
        // const armor = await armorDb.findOrCreateArmor({
        //     armor_name: 'Chain',
        //     armor_type: 'L',
        //     armor_class: 12
        // });
        //console.log(armor);
        // const char = await characterDb.getCharacterByName('q');
        // console.log(char);
        // char.addArmor(armor, {through: {currently_worn: true}})
        if(userExists){
            //characterUtil.characterPrint(user.id);
        } else {
            try {
                const char = await characterCreator.getCharacterInfo(user, message); 
                console.log(char);
                characterCreator.createCharacter(char.characterInfo, char.abilityScores, char.armor);
            }
            catch(err) {
                if(err === 'Character creation timed out') {
                    user.send('Character creation timed out')
                } else {
                    user.send('Error creating character');
                }
            }
        }
    }
}