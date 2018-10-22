class AbilityWrapper {
    constructor(description, score, savingThrow, proficiencyBonus) {
        this.description = description;
        this.score = score;
        this.savingThrow = savingThrow;
        this.proficiencyBonus = proficiencyBonus;
    }

    get modifier() {
        return Math.floor(this.score/2) - 5;
    }
    get savingModifier() {
        return this.modifier + (this.savingThrow ? this.proficiencyBonus : 0);
    }
}

module.exports = {
    AbilityWrapper
}