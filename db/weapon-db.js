const {Weapon} = require('./Schema.js');

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