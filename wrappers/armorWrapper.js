class ArmorWrapper {
    constructor(name, type, armorClass,currentlyWorn, charDexMod) {
        this.name = name;
        this.type = type;
        this.armorClass = armorClass;
        this.currentlyWorn = currentlyWorn;
        this._charDexMod = charDexMod;
    }

    get armorDexMod() {
        if(this.type === 'M') {
            return 2;
        } else if(this.type === 'L') {
            return this._charDexMod;
        } else {
            return 0;
        }
    }
}

module.exports = {
    ArmorWrapper
}