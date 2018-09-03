const Sequelize = require('sequelize');

const sequelize = new Sequelize('database', 'user', 'password', {
    host: 'localhost',
    dialect: 'sqlite',
    logging: false,
    operatorsAliases: false,
    // SQLite only
    storage: 'database.sqlite',
});

const Ability = sequelize.define('ability', {
    ability_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    ability_description: {
        type: Sequelize.STRING
    },
});

const Armor = sequelize.define('armor', {
    armor_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    armor_name: {
        type: Sequelize.STRING
    },
    armor_type: {
        type: Sequelize.STRING,
        allowNull: true
    },
    armor_class: {
        type: Sequelize.INTEGER
    }
});

const CharacterAbilityScore = sequelize.define('characterAbilityScore', {
    ability_score: {
        type: Sequelize.INTEGER
    }
});

const Character = sequelize.define('character', {
    user_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    character_name: {
        type: Sequelize.STRING
    },
    level: {
        type: Sequelize.INTEGER
    },
    race: {
        type: Sequelize.STRING
    },
    alignment_lvc: {
        type: Sequelize.ENUM('Lawful', 'Nuetral', 'Choatic')
    },
    alignment_evg: {
        type: Sequelize.ENUM('Evil', 'Nuetral', 'Good')
    },
    size: {
        type: Sequelize.STRING
    },
    hair: {
        type: Sequelize.STRING
    },
    weight: {
        type: Sequelize.STRING
    },
    background: {
        type: Sequelize.STRING
    },
    class: {
        type: Sequelize.STRING
    },
    initiation_bonus: {
        type: Sequelize.INTEGER
    },
    hit_points: {
        type: Sequelize.INTEGER
    },
    armor_class: {
        type: Sequelize.INTEGER
    },
    character_bio: {
        type: Sequelize.STRING
    }
});

const Feature = sequelize.define('feature', {
    feature_name: {
        type: Sequelize.STRING
    },
    feature_description: {
        type: Sequelize.STRING
    }
});

const Item = sequelize.define('item', {
    item_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    item_name: {
        type: Sequelize.STRING
    },
    item_description: {
        type: Sequelize.STRING
    }
});

const Manual = sequelize.define('manual', {
    entry_name: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
    },
    entry_description: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    master: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
    },
});

const Proficiency = sequelize.define('proficiency', {
    proficiency_description: {
        type: Sequelize.STRING
    }
});

const Skill = sequelize.define('skill', {
    skill_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    skill_description: {
        type: Sequelize.STRING
    },
});

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

const Weapon = sequelize.define('weapon', {
    weapon_id : {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    weapon_name: {
        type: Sequelize.STRING,
    },
    hit: {
        type: Sequelize.INTEGER
    },
    num_of_attacks: {
        type: Sequelize.INTEGER
    },
    damage: {
        type: Sequelize.STRING
    },
    range: {
        type: Sequelize.INTEGER
    },
    weapon_type: {
        type: Sequelize.STRING,
        allowNull: true
    }, 
    notes: {
        type: Sequelize.STRING,
        allowNull: true
    }
});
Ability.belongsToMany(Skill, {through: 'skillAbility'});
Skill.belongsToMany(Ability, {through: 'skillAbility'});

Character.hasMany(Feature);
Character.hasMany(Proficiency);

Weapon.belongsTo(Character, {through: 'characterWeapon'});
Character.belongsToMany(Weapon, {through: 'characterWeapon'});

Spell.belongsToMany(Character, {through: 'characterSpell'});
Character.belongsToMany(Spell, {through: 'characterSpell'});

Skill.belongsToMany(Character, {through: 'characterProficiencySkill'});
Character.belongsToMany(Skill, {through: 'characterProficiencySkill'});

Item.belongsToMany(Character, {through: 'characterItem'});
Character.belongsToMany(Item, {through: 'characterItem'});

Character.belongsToMany(Ability, {through: 'characterAbilityScore'});
Ability.belongsToMany(Character, {through: 'characterAbilityScore'});

Character.belongsToMany(Armor, {through: 'characterArmor'});
Armor.belongsToMany(Character, {through: 'characterArmor'});

module.exports = {
    Ability,
    Armor,
    CharacterAbilityScore,
    Character,
    Feature,
    Item,
    Manual,
    Proficiency,
    Skill,
    Spell,
    Weapon,
    sequelize
}