const { dao } = require('./dao.js');

async function addArmor(armor_name, armor_type, armor_class='') {
    const armorTable = dao.getArmorTable();
    return await armorTable.create({
        armor_name: armor_name,
        armor_type: armor_type,
        armor_class: armor_class
    });
}

async function getArmorById(armor_id) {
    const armorTable = dao.getArmorTable();
    return await armorTable.findById(armor_id);
}

async function getArmorByName(armor_name) {
    const armorTable = dao.getArmorTable();
    return await armorTable.findOne({where: {armor_name: armor_name}});
}

async function findOrCreateArmor(armor) {
    const armorTable = dao.getArmorTable();
    return await armorTable.findOrCreate({
        where: {
            armor_name: armor.armor_name, 
            armor_type: armor.armor_type, 
            armor_class: armor.armor_class
        }
    });
}

module.exports = {
    armorDb: {
        addArmor,
        getArmorById,
        getArmorByName,
        findOrCreateArmor
    }
}