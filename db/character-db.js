const { dao } = require('./dao.js');

async function createCharacter(characterInfo){
    return dao.getCharacterTable().create(characterInfo);
}

async function characterExists(user_id) {
    const count = await dao.getCharacterTable().count({where: {user_id: user_id}});
    return count > 0;
}

async function getCharacterById(user_id) {
    return await dao.getCharacterTable().findById(user_id, { include: [{ all: true, nested: true }]});
}

async function getCharacterByName(name) {
    return await dao.getCharacterTable().findOne({where: {character_name: name}}, { include: [{ all: true, nested: true }]});
}

module.exports = {
    characterDb: {
        createCharacter,
        characterExists,
        getCharacterById,
        getCharacterByName
    }
}