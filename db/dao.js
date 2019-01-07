const { getDbSchema } = require('./schema.js');

let schema;

async function initSchema() {
    schema = await getDbSchema();
    return;
}

async function sync() {
    return await schema.sequelize.sync();
}

function getAbilityTable() {
    return schema.Ability;
}

function getArmorTable() {
    return schema.Armor;
}

function getCharacterTable() {
    return schema.Character;
}

function getItemTable() {
    return schema.Item;
}

function getManualTable() {
    return schema.Manual;
}

function getSkillTable() {
    return schema.Skill;
}

function getSpellTable() {
    return schema.Spell;
}

function getWeaponTable() {
    return schema.Weapon;
}

async function initDb() {
    findOrCreateAbility('Str', [
        {skill_description: 'Athletics'}
    ]);
    findOrCreateAbility('Dex', [
        {skill_description: 'Acrobatics'},
        {skill_description: 'Sleight of Hand'},
        {skill_description: 'Stealth'}
    ]);
    findOrCreateAbility('Con', []);
    findOrCreateAbility('Int', [
        {skill_description: 'Arcana'},
        {skill_description: 'History'},
        {skill_description: 'Investigation'},
        {skill_description: 'Nature'},
        {skill_description: 'Religion'}
    ]);
    findOrCreateAbility('Wis', [
        {skill_description: 'Animal Handling'},
        {skill_description: 'Insight'},
        {skill_description: 'Medicine'},
        {skill_description: 'Perception'},
        {skill_description: 'Survival'}
    ]);
    findOrCreateAbility('Cha', [
        {skill_description: 'Deception'},
        {skill_description: 'Intimidation'},
        {skill_description: 'Performance'},
        {skill_description: 'Persuasion'}
    ]);
}

async function findOrCreateAbility(desc, skills) {
    const abilityTable = schema.Ability;
    const skillTable = schema.Skill;
    const count = await abilityTable.count({where: {ability_description: desc}});
    if(count === 0) {
        await abilityTable.create({
            ability_description: desc,
            skills: skills
        }, {
            include: [skillTable]
        });
    }
}

module.exports = {
    dao: {
        initSchema,
        initDb,
        sync,
        getAbilityTable,
        getArmorTable,
        getCharacterTable,
        getItemTable,
        getManualTable,
        getSkillTable,
        getSpellTable,
        getWeaponTable
    }
}