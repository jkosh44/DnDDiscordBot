const { dao } = require('./dao.js');

async function getSpellById(spell_id) {
    return await dao.getSpellTable().findById(spell_id);
}

async function getSpellByName(spell_name) {
    return await dao.getSpellTable().findOne({
        where: {spell_name: spell_name}
    });
}

async function addSpell(id, name, lvl, school, cast_time, rng, effect, saveAtk, duration, conc, ritual, comp, cost) {
    return await dao.getSpellTable().create({
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