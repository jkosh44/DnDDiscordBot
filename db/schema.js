const Sequelize = require('sequelize');

async function getDbSchema() {
    const sequelize = await new Sequelize('database', 'user', 'password', {
        host: 'localhost',
        dialect: 'sqlite',
        logging: false,
        operatorsAliases: false,
        // SQLite only
        storage: 'database.sqlite',
    });

    [Ability, Armor, CharacterAbilityScore, CharacterArmorMap, Character, Feature, Item, Manual, Proficiency, Skill, Spell, Weapon] = 
        await Promise.all([    
            sequelize.define('ability', {
                ability_id: {
                    type: Sequelize.INTEGER,
                        primaryKey: true,
                        autoIncrement: true
                    },
                    ability_description: {
                        type: Sequelize.STRING
                    },
            }),
                    
            sequelize.define('armor', {
                armor_id: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
                    autoIncrement: true
                },
                armor_name: {
                    type: Sequelize.STRING
                },
                armor_type: {
                    type: Sequelize.ENUM('L', 'M', 'H'),
                    allowNull: true
                },
                armor_class: {
                    type: Sequelize.INTEGER
                }
            }),
                    
            sequelize.define('characterAbilityScore', {
                ability_score: {
                    type: Sequelize.INTEGER
                },
                saving_throw: {
                    type: Sequelize.BOOLEAN
                }
            }),
               
            sequelize.define('characterArmor', {
                currently_worn: {
                    type: Sequelize.BOOLEAN
                }
            }),

            sequelize.define('character', {
                user_id: {
                    type: Sequelize.INTEGER,
                    primaryKey: true
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
                eyes: {
                    type: Sequelize.STRING
                },
                height: {
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
                base_hit_points: {
                    type: Sequelize.INTEGER
                },
                character_bio: {
                    type: Sequelize.STRING
                }
            }),
                    
            Feature = sequelize.define('feature', {
                feature_name: {
                    type: Sequelize.STRING
                },
                feature_description: {
                    type: Sequelize.STRING
                }
            }),
                    
            sequelize.define('item', {
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
            }),
                    
            sequelize.define('manual', {
                entry_name: {
                    type: Sequelize.INTEGER,
                    allowNull: false
                },
                entry_description: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                },
                entry_type: {
                    type: Sequelize.ENUM('Master', 'Manual', 'Notes'),
                    allowNull: false,
                },
            }),
                    
            sequelize.define('proficiency', {
                proficiency_description: {
                    type: Sequelize.STRING
                }
            }),
                    
            sequelize.define('skill', {
                skill_id: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
                    autoIncrement: true
                },
                skill_description: {
                    type: Sequelize.STRING
                },
            }),
                    
            sequelize.define('spell', {
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
            }),
                    
            sequelize.define('weapon', {
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
            })
        ]);
    
    await Promise.all([
        Ability.belongsToMany(Skill, {through: 'skillAbility'}),
        Skill.belongsToMany(Ability, {through: 'skillAbility'}),

        Character.hasMany(Feature),
        Character.hasMany(Proficiency),

        Weapon.belongsTo(Character, {through: 'characterWeapon'}),
        Character.belongsToMany(Weapon, {through: 'characterWeapon'}),

        Spell.belongsToMany(Character, {through: 'characterSpell'}),
        Character.belongsToMany(Spell, {through: 'characterSpell'}),

        Skill.belongsToMany(Character, {through: 'characterProficiencySkill'}),
        Character.belongsToMany(Skill, {through: 'characterProficiencySkill'}),

        Item.belongsToMany(Character, {through: 'characterItem'}),
        Character.belongsToMany(Item, {through: 'characterItem'}),

        Character.belongsToMany(Ability, {through: 'characterAbilityScore'}),
        Ability.belongsToMany(Character, {through: 'characterAbilityScore'}),

        Character.belongsToMany(Skill, {through: 'characterSkillProficiency'}),
        Skill.belongsToMany(Character, {through: 'characterSkillProficiency'}),

        Character.belongsToMany(Armor, {through: 'characterArmor'}),
        Armor.belongsToMany(Character, {through: 'characterArmor'}),
    ]);

    return {
        sequelize,
        Ability, 
        Armor, 
        CharacterAbilityScore,
        CharacterArmorMap, 
        Character, 
        Feature, 
        Item, 
        Manual, 
        Proficiency, 
        Skill, 
        Spell, 
        Weapon
    }
}

module.exports = {
    getDbSchema
}