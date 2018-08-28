const Sequelize = require('sequelize');
const {sequelize} = require('./db.js');

const Armor = sequelize.define('armor', {
    armor_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    armor_name: {
        type: Sequelize.STRING
    },
    armor_type: {
        type: Sequelize.STRING,
        allowNull: true
    },
    armor_class: {
        type: Sequelize.INTEGER
    }
});

async function addArmor(armor_name, armor_class, armor_class='') {
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