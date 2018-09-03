const {Skill} = require('./Schema.js');

async function getSkillById(skill_id) {
    return await Skill.findById(skill_id);
}

async function getSkillByDescription(skill_description) {
    return await Skill.findOne({where: {skill_description: skill_description}});
}