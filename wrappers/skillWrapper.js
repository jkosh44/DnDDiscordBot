class SkillWrapper {
    constructor(description, proficiency, ability){
        this.description = description;
        this.proficiency = proficiency;
        this.ability = ability;
    }

    get roll() {
        return this.ability.modifier + (this.proficiency ? 2 : 0);
    }
}

module.exports = {
    SkillWrapper
}