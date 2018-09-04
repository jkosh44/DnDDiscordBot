const {Ability} = require('../db/schema.js');
const {Skill} = require('../db/schema.js');

async function initDb() {
    findOrCreate('Str', [
        {skill_description: 'Athletics'}
    ]);
    findOrCreate('Dex', [
        {skill_description: 'Acrobatics'},
        {skill_description: 'Sleight of Hand'},
        {skill_description: 'Stealth'}
    ]);
    findOrCreate('Con', []);
    findOrCreate('Int', [
        {skill_description: 'Arcana'},
        {skill_description: 'History'},
        {skill_description: 'Investigation'},
        {skill_description: 'Nature'},
        {skill_description: 'Religion'}
    ]);
    findOrCreate('Wis', [
        {skill_description: 'Animal Handling'},
        {skill_description: 'Insight'},
        {skill_description: 'Medicine'},
        {skill_description: 'Perception'},
        {skill_description: 'Survival'}
    ]);
    findOrCreate('Cha', [
        {skill_description: 'Deception'},
        {skill_description: 'Intimidation'},
        {skill_description: 'Performance'},
        {skill_description: 'Persuasion'}
    ]);
}

async function findOrCreate(desc, skills) {
    const count = await Ability.count({where: {ability_description: desc}});
    if(count === 0) {
        await Ability.create({
            ability_description: desc,
            skills: skills
        }, {
            include: [Skill]
        });
    }
}

module.exports = {
    initDb
}