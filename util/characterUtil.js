const { characterDb } = require('../db/character-db.js');
const { dao } = require('./dao.js');

function prettyPrint(characterId) {
    
} 

async function createCharacter(characterInfo, abilityScores) {
    const char = await characterDb.createCharacter(characterInfo);
    console.log(`created character for user: ${characterInfo.user_id}`);
    [str, dex, con, int, wis, cha] = await Promise.all([
        getAbility('Str'), getAbility('Dex'), getAbility('Con'), getAbility('Int'), getAbility('Wis'), getAbility('Cha')
    ]); 
    await char.addAbility(str, {through: {ability_score: abilityScores.str}});
    await char.addAbility(dex, {through: {ability_score: abilityScores.dex}});
    await char.addAbility(con, {through: {ability_score: abilityScores.con}});
    await char.addAbility(int, {through: {ability_score: abilityScores.int}});
    await char.addAbility(wis, {through: {ability_score: abilityScores.wis}});
    await char.addAbility(cha, {through: {ability_score: abilityScores.cha}});
    console.log(`added ability scores to user: ${characterInfo.user_id}`);
}

async function characterExists(userId) {
    return await characterDb.characterExists(userId);
}

async function getAbility(abilityName) {
    return await dao.getAbilityTable().findOne({where: {ability_description: abilityName}});
}

module.exports = {
    characterUtil: {
        createCharacter,
        characterExists
    }
}