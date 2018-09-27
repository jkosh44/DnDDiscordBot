const { characterDb } = require('../../db/character-db.js');
const { skillDb } = require('../../db/skill-db.js');

async function plainPrint(characterId) {
    //TODO
    const character = await characterDb.getCharacterById(characterId);
    data = [];
    data.push(`Name: ${character.character_name}`);
    data.push(`Level: ${character.level}`);
    data.push(`Race: ${character.race}`);
    data.push(`Gender: ${character.gender}`);
    data.push(`Alignment: ${character.alignment_lvc} ${character.alignment_evg}`);
    data.push(`Diety: ${character.diety}`);
    data.push(`Size: ${character.size}`);
    data.push(`Hair: ${character.hair}`);
    data.push(`Eyes: ${character.eyes}`);
    data.push(`Height: ${character.height}`);
    data.push(`Weight: ${character.weight}`);
    data.push(`Background: ${character.background}`);
    const abilities = character.abilities;
    data.push(`**Ability Scores and Saving Throws**`);
    for(var i=0; i<abilities.length; i++) {
        const ability = abilities[i];
        const abilityScore = ability.characterAbilityScore.ability_score;
        const abilityModifier = Math.floor(abilityScore/2) - 5;
        data.push(`${ability.ability_description}: ${abilityScore}; ${abilityModifier<0 ? '' : '+'}${abilityModifier}; Saving Throw: ${ability.characterAbilityScore.saving_throw ? 'yes' : 'no'}`);
    }
    const abilityModifierMap = abilities.reduce((map, ability) => {
        const abilityScore = ability.characterAbilityScore.ability_score; 
        map[ability.ability_description] = Math.floor(abilityScore/2)-5;
        return map;
    }, {});
    data.push(`**Class**`);
    const lvl = character.level;
    const con = lvl*abilityModifierMap['Con']
    data.push(`name: ${character.class}; Lvl: ${lvl}; Hit Dice: ${lvl}d${character.hit_dice}; HP: ${character.base_hit_points};Con: ${con};`);
    data.push(`Init: ${abilityModifierMap['Dex']}`);
    data.push(`**Skills**`);
    const proficiencies = character.skills;
    //TODO order by skill desc
    const skills = await skillDb.getAllSkills();
    for(var i=0; i<skills.length; i++) {
        const skill = skills[i];
        const proficienct = proficiencies.includes(skill.skill_description);
        const abilityDesc = skill.abilities[0].ability_description;
        const mod = abilityModifierMap[abilityDesc];
        const roll = mod + (proficienct ? 2 : 0);
        data.push(`Roll: ${(roll<0 ? '' : '+')}${roll}; Skill: desc ${skill.skill_description} (${abilityDesc}); Prof: ${proficienct ? 'yes' : 'no'}`);
    }
    const armorWorn = character.armors.filter(armor => armor.characterArmor.currently_worn);
    const armorWornAC = armorWorn.reduce((sum, armor) => sum+armor.armor_class, 0);
    const totArmorDexMods = armorWorn.reduce((sum, armor) => {
        const armorType = armor.armor_type;
        let armorDexMod = 0;
        if(armorType === 'H') {
            armorDexMod = 0;
        } else if(armorType === 'M') {
            armorDexMod = 2;
        } else if(armorType === 'L') {
            armorDexMod = abilityModifierMap['Dex'];
        }
        return sum+armorDexMod;
    }, 0);
    const totHP = character.base_hit_points+armorWornAC;
    const hitPoints = totHP + con;
    data.push(`Hit Points: ${hitPoints}`);
    const ac = armorWornAC + totArmorDexMods;
    data.push(`AC: ${ac}`);
    data.push(`**Armor**`);
    for(var i=0; i<armorWorn.length; i++) {
        const armor = armorWorn[i];
        const armorType = armor.armor_type;
        let armorDexMod = 0;
        if(armorType === 'H') {
            armorDexMod = 0;
        } else if(armorType === 'M') {
            armorDexMod = 2;
        } else if(armorType === 'L') {
            armorDexMod = abilityModifierMap['Dex'];
        }
        data.push(`Armor Worn: ${armor.armor_name}; Type: ${armorType}; AC: ${armor.armor_class}; Dex: ${armorDexMod}`);
    }
    return data;
}

function prettyPrint(characterId) {
    
} 

module.exports = {
    characterPrinter: {
        plainPrint,
        prettyPrint
    }
}