class SkillWrapper {
    constructor(description, proficiency, ability, proficiencyBonus){
        this.description = description;
        this.proficiency = proficiency;
        this.ability = ability;
        this.proficiencyBonus = proficiencyBonus;
    }

    get roll() {
        return this.ability.modifier + (this.proficiency ? this.proficiencyBonus : 0);
    }

    get descriptionWithAbility() {
        return `${this.description} (${this.ability.description})`;
    }
}

module.exports = {
    SkillWrapper
}