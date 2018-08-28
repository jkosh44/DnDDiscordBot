const Sequelize = require('sequelize');
const {sequelize} = require('./db.js');

const Weapon = sequelize.define('weapon', {
    weapon_id : {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    weapon_name: {
        type: Sequelize.STRING,
    },
    hit: {
        type: Sequelize.INTEGER
    },
    num_of_attacks: {
        type: Sequelize.INTEGER
    },
    damage: {
        type: Sequelize.STRING
    },
    range: {
        type: Sequelize.INTEGER
    },
    weapon_type: {
        type: Sequelize.STRING,
        allowNull: true
    }, 
    notes: {
        type: Sequelize.STRING,
        allowNull: true
    }
});

async function getWeaponById(weapon_id) {
    return await Weapon.findById(weapon_id);
}

async function getWeaponByName(weapon_name) {
    return await Weapon.findOne({where:{weapon_name: weapon_name}});
}

async function addWeapon(name, hit, attackNum, dmg, range, type='', notes='') {
    return await Weapon.create({
        weapon_name: name,
        hit: hit,
        num_of_attacks: attackNum,
        damage: dmg,
        range: range,
        weapon_type: type,
        notes: notes
    });
}