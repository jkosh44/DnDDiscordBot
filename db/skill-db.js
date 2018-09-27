const { dao } = require('./dao.js');

async function getSkillById(skill_id) {
    return await dao.getSkillTable().findById(skill_id);
}

async function getSkillByDescription(skill_description) {
    return await dao.getSkillTable().findOne({where: {skill_description: skill_description}});
}

async function getAllSkills() {
    return await dao.getSkillTable().findAll({include: [{ all: true, nested: true}]});
}

module.exports = {
    skillDb: {
        getSkillById,
        getSkillByDescription,
        getAllSkills
    }
}

