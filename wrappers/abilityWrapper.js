class AbilityWrapper {
    constructor(description, score, savingThrow) {
        this.description = description;
        this.score = score;
        this.savingThrow = savingThrow;
    }

    get modifier() {
        return Math.floor(this.score/2) - 5;
    }
    get savingModifier() {
        return this.modifier + (this.savingThrow ? 2 : 0);
    }
}

module.exports = {
    AbilityWrapper
}