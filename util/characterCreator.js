const { characterDb } = require('../db/character-db.js');
const { dao } = require('./dao.js');

async function createCharacter(characterInfo, abilityScores) {
    const char = await characterDb.createCharacter(characterInfo);
    [str, dex, con, int, wis, cha] = await Promise.all([
        getAbility('Str'), getAbility('Dex'), getAbility('Con'), getAbility('Int'), getAbility('Wis'), getAbility('Cha')
    ]); 
    await char.addAbility(str, {through: {ability_score: abilityScores.str}});
    await char.addAbility(dex, {through: {ability_score: abilityScores.dex}});
    await char.addAbility(con, {through: {ability_score: abilityScores.con}});
    await char.addAbility(int, {through: {ability_score: abilityScores.int}});
    await char.addAbility(wis, {through: {ability_score: abilityScores.wis}});
    await char.addAbility(cha, {through: {ability_score: abilityScores.cha}});
}

async function getAbility(abilityName) {
    return await dao.getAbilityTable().findOne({where: {ability_description: abilityName}});
}

module.exports = {
    createCharacter
}