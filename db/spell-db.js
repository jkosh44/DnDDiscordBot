const {Spell} = require('./Schema.js');

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