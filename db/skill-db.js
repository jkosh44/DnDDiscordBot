const Sequelize = require('sequelize');
const {sequelize} = require('./db.js');
const {Ability} = require('./ability-db.js');

const Skill = sequelize.define('skill', {
    skill_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    skill_description: {
        type: Sequelize.STRING
    },
});
Skill.hasOne(Ability);

async function getSkillById(skill_id) {
    return await Skill.findById(skill_id);
}

async function getSkillByDescription(skill_description) {
    return await Skill.findOne({where: {skill_description: skill_description}});
}