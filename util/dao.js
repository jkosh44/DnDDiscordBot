const { getDbSchema } = require('../db/schema.js');

let schema;

async function initSchema() {
    schema = await getDbSchema();
}

async function sync() {
    return await schema.sequelize.sync();
}

function getAbilityTable() {
    return schema.Ability;
}

function getSkillTable() {
    return schema.Skill;
}

function getCharacterTable() {
    return schema.Character;
}

function getManualTable() {
    return schema.Manual;
}

module.exports = {
    dao: {
        initSchema,
        sync,
        getAbilityTable,
        getCharacterTable,
        getSkillTable,
        getManualTable
    }
}