const {Ability} = require('./Schema.js');

async function addAbility(description) {
    try {
        const ability = await Ability.create({
            ability_description: description
        });
        console.log(`created new ability" ${ability.ability_description}`);
        return ability;
    }
    catch(e) {
        console.log(e);
        return null;
    }
}

async function getAbilityById(ability_id) {
    return await Ability.findById(ability_id);
}

async function getAbilityByDesc(ability_description) {
    return await Ability.findOne({where: {ability_description: ability_description}});
}

module.exports = {
    AbilityDb: {
        addAbility,
        getAbilityById,
        getAbilityByDesc
    }
}