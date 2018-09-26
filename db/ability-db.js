const { dao } = require('./dao.js');

async function getAbilityById(ability_id) {
    return await dao.getAbilityTable().findById(ability_id);
}

async function getAbilityByDesc(ability_description) {
    return await dao.getAbilityTable().findOne({where: {ability_description: ability_description}});
}

module.exports = {
    abilityDb: {
        getAbilityById,
        getAbilityByDesc
    }
}