const {Ability} = require('./Schema.js');

async function getAbilityById(ability_id) {
    return await Ability.findById(ability_id);
}

async function getAbilityByDesc(ability_description) {
    return await Ability.findOne({where: {ability_description: ability_description}});
}

module.exports = {
    AbilityDb: {
        getAbilityById,
        getAbilityByDesc
    }
}