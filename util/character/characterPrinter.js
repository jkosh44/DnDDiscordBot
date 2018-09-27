const { characterDb } = require('../../db/character-db.js');

async function plainPrint(characterId) {
    //TODO
    const character = await characterDb.getCharacterById(characterId);
    data = [];
    data.push(`Name: ${character.character_name}`);
    data.push(`Level: ${character.level}`);
    data.push(`Race: ${character.race}`);
    data.push(`Gender: ${character.gender}`);
    data.push(`Alignment: ${character.alignment_lvc} ${character.alignment_evg}`);
    data.push(`Size: ${character.size}`);
    data.push(`Hair: ${character.hair}`);
    data.push(`Eyes: ${character.eyes}`);
    data.push(`Height: ${character.height}`);
    data.push(`Weight: ${character.weight}`);
    data.push(`Background: ${character.background}`);
    const abilities = character.getAbilities();
    data.push(`**Ability Scores and Saving Throws**`);
    
}

function prettyPrint(characterId) {
    
} 

module.exports = {
    characterPrinter: {
        plainPrint,
        prettyPrint
    }
}