const {Armor} = require('./Schema.js');

async function addArmor(armor_name, armor_type, armor_class='') {
    return await Armor.create({
        armor_name: armor_name,
        armor_type: armor_type,
        armor_class: armor_class
    });
}

async function getArmorById(armor_id) {
    return await Armor.findById(armor_id);
}

async function getArmorByName(armor_name) {
    return await Armor.findOne({where: {armor_name: armor_name}});
}