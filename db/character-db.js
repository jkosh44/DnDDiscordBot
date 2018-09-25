const { dao } = require('../util/dao.js');

async function createCharacter(characterData){
    return dao.getCharacterTable().create({
        user_id: characterData.user_id,
        character_name: characterData.character_name,
        level: characterData.level,
        race: characterData.race,
        alignment_lvc: characterData.alignment_lvc,
        alignment_evg: characterData.alignment_evg,
        size: characterData.size,
        hair: characterData.hair,
        weight: characterData.weight,
        background: characterData.background,
        class: characterData.class,
        base_hit_points: characterData.base_hit_points,
        armor_worn_armor_class: characterData.armor_worn_armor_class,
        armor_worn_type: characterData.armor_worn_type,
        character_bio: characterData.character_bio,
    });
}

async function characterExists(user_id) {
    const count = await dao.getCharacterTable().count({where: {user_id: user_id}});
    return count > 0;
}

module.exports = {
    characterDb: {
        createCharacter,
        characterExists
    }
}