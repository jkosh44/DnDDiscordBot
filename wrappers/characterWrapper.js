const { AbilityWrapper } = require('./abilityWrapper.js');
const { SkillWrapper } = require('./skillWrapper.js');
const { ArmorWrapper } = require('./armorWrapper.js');

class CharacterWrapper {
    constructor(characterModel, allSkills) {
        this.characterModel = characterModel;
        this.abilities = getAbilitiesFromCharacter(characterModel);
        this.abilityModifierMap = getAbilityModifierMapFromCharacter(characterModel);
        this.armors = getArmorFromCharacter(characterModel, this.abilityModifierMap);
        this.skills = getSkillsFromCharacter(characterModel, this.abilities, allSkills);
    }

    get name() {
        return this.characterModel.character_name;
    }
    get level() {
        return this.characterModel.level;
    }
    get race() {
        return this.characterModel.race;
    }
    get gender() {
        return this.characterModel.gender;
    }
    get alignment() {
        return `${this.characterModel.alignment_lvc} ${this.characterModel.alignment_evg}`;
    }
    get diety() {
        return this.characterModel.diety;
    }
    get size() {
        return this.characterModel.size;
    }
    get hair() {
        return this.characterModel.hair;
    }
    get eyes() {
        return this.characterModel.eyes;
    }
    get height() {
        return this.characterModel.height;
    }
    get weight() {
        return this.characterModel.weight;
    }
    get background() {
        return this.characterModel.background;
    }
    get con() {
        return this.level*this.abilityModifierMap['Con'];
    }
    get class() {
        return this.characterModel.class;
    }
    get baseHitDice() {
        return this.characterModel.hit_dice;
    }
    get currentHitDice() {
        return `${this.level}d${this.baseHitDice}`
    }
    get armorsWorn() {
        return this.armors.filter(armor => armor.currentlyWorn);
    }
    get armorClass() {
        const totArmorWornAc = this.armorsWorn.reduce((sum, armor) => sum+armor.armorClass, 0);
        const totArmorDexMod = this.armorsWorn.reduce((sum, armor) => sum+armor.armorDexMod, 0);
        return totArmorWornAc + totArmorDexMod;
    }
    get baseHp() {
        return this.characterModel.base_hit_points;
    }
    get hp() {
        return this.armorClass + this.baseHp + this.con;
    }
    get init() {
        return this.abilityModifierMap['Dex'];
    }

    getAbilityByName(abilityName) {
        const ability = this.abilities.filter(curAbility => curAbility.description.toLowerCase() === abilityName.toLowerCase());
        return ability[0];
    }

    getSkillByName(skillName) {
        const skill = this.skills.filter(curSkill => curSkill.description.toLowerCase() === skillName.toLowerCase());
        return skill[0];
    }
}

function getAbilitiesFromCharacter(character) {
    let res = new Array();
    const abilities = character.abilities;
    for(var i=0; i<abilities.length; i++){
        const ability = abilities[i];
        const abilityWrapper = new AbilityWrapper(ability.ability_description, ability.characterAbilityScore.ability_score, ability.characterAbilityScore.saving_throw);
        res.push(abilityWrapper);
    }
    return res;
}

function getAbilityModifierMapFromCharacter(character) {
    return character.abilities.reduce((map, ability) => {
        const abilityScore = ability.characterAbilityScore.ability_score; 
        map[ability.ability_description] = Math.floor(abilityScore/2)-5;
        return map;
    }, {});
}

function getSkillsFromCharacter(character, abilities, skills) {
    let res = new Array();
    const proficiencies = character.skills.map(skill => skill.skill_description);
    for(var i=0; i<skills.length; i++){
        const skill = skills[i];
        const proficiency = proficiencies.includes(skill.skill_description);
        const abilityDesc = skill.abilities[0].ability_description;
        const ability = abilities.filter(ability => ability.description===abilityDesc)[0];
        res.push(new SkillWrapper(skill.skill_description, proficiency, ability));
    }
    return res;
}

function getArmorFromCharacter(character, abilityModifierMap) {
    return character.armors.map(armor => 
        new ArmorWrapper(armor.armor_name, armor.armor_type,
            armor.armor_class, armor.characterArmor.currently_worn, 
            abilityModifierMap['Dex']));
}

module.exports = {
    CharacterWrapper
}