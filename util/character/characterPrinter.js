async function characterPrint(character_id) {
    //TODO: make pretty and finish
    const character = await characterDb.getCharacter(character_id);
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
    console.log(character);
    const abilities = await character.getAbilities();
    console.log(abilities);

}

function prettyPrint(characterId) {
    
} 