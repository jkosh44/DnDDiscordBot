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
        initiation_bonus: characterData.initiation_bonus,
        hit_points: characterData.hit_points,
        armor_class: characterData.armor_class,
        character_bio: characterData.character_bio,
    });
}

async function characterExists(user_id) {
    const count = await dao.getCharacterTable().count({where: {user_id: user_id}});
    return count > 0;
}

module.exports = {
    characterDb: {
        createCharacter
    }
}