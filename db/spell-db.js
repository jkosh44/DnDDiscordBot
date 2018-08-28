const Sequelize = require('sequelize');
const {sequelize} = require('./db.js');

const Spell = sequelize.define('spell', {
    spell_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    spell_name: {
        type: Sequelize.STRING
    },
    level: {
        type: Sequelize.INTEGER
    },
    school: {
        type: Sequelize.STRING
    },
    casting_time: {
        type: Sequelize.INTEGER
    },
    range: {
        type: Sequelize.INTEGER
    },
    area_targets: {
        type: Sequelize.STRING
    },
    effect: {
        type: Sequelize.STRING
    },
    save_attack: {
        type: Sequelize.STRING,
        allowNull: true
    },
    duration: {
        type: Sequelize.STRING,
        allowNull: true
    },
    concentration: {
        type: Sequelize.STRING,
        allowNull: true
    },
    ritual: {
        type: Sequelize.STRING,
        allowNull: true
    },
    components: {
        type: Sequelize.STRING,
        allowNull: true
    },
    cost: {
        type: Sequelize.STRING,
        allowNull: true
    }
});

async function getSpellById(spell_id) {
    return await Spell.findById(spell_id);
}

async function getSpellByName(spell_name) {
    return await Spell.findOne({
        spell_name: spell_name
    });
}

async function addSpell(id, name, lvl, school, cast_time, rng, effect, saveAtk, duration, conc, ritual, comp, cost) {
    return await Spell.create({
        spell_id: id,
        spell_name: name,
        level: lvl,
        school: school,
        casting_time: cast_time,
        range: rng,
        effect: effect,
        save_attack: saveAtk,
        duration: duration,
        concentration: conc,
        ritual: ritual,
        components: comp,
        cost: cost
    });
}