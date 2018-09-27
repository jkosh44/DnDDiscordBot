const { promptForAnswer, promptForAnswerWithChoices, checkUserId, messageIsNumber } = require('../userResponse.js');
const { characterDb } = require('../../db/character-db.js');
const { abilityDb } = require('../../db/ability-db.js');
const { armorDb } = require('../../db/armor-db.js');
const { skillDb } = require('../../db/skill-db.js');
const { dao } = require('../../db/dao.js');

async function getCharacterInfo(user, message) {
    return new Promise(async function(resolve, reject) {
        message.reply(`I don't have any info on your character. Let's create one now, I'll DM you to start the process.`);
        try {
            const name = await promptForAnswer(user, 'What is your characters name?', message);
            const lvl = await promptForAnswer(user, 'What is your chracters starting level?', message, 
                m => messageIsNumber(message, m), r => parseInt(r));
            const race = await promptForAnswer(user, 'What is your characters race?', message);
            const gender = await promptForAnswer(user, 'What is your gender?', message);
            const diety = await promptForAnswer(user, 'What is your diety', message);
            const alignmentLVC = await promptForAnswer(user, 'Is your character Lawful, Nuetral, or Chaotic?', message,
                m => checkUserId(m, message) && ['lawful', 'nuetral', 'chaotic'].includes(m.content.toLowerCase()));
            const alignmentEVG = await promptForAnswer(user, 'Is your character Good, Nuetral, or Evil?', message,
                m => checkUserId(m, message) && ['good', 'nuetral', 'evil'].includes(m.content.toLowerCase()));
            const size = await promptForAnswer(user, 'What is your characters size?', message);
            const hair = await promptForAnswer(user, 'What does your characters hair look like?', message);
            const eyes = await promptForAnswer(user, 'What does your characters eye look like?', message);
            const height = await promptForAnswer(user, 'What is your characters height?', message);
            const weight = await promptForAnswer(user, 'What is your characters weight', message);
            const background = await promptForAnswer(user, 'What is your characters background', message);
            const className = await promptForAnswer(user, 'What is your characters class', message);
            const hitDice = await promptForAnswer(user, 'What is you class\' hit dice?', message, 
                m => messageIsNumber(message, m), r=>parseInt(r));
            const baseHitPoints = await promptForAnswer(user, 'What is your characters base hit points? (Can be found under the Classes section of your character sheet.)', message,
                m => messageIsNumber(message, m), r=>parseInt(r));
            const isWearingArmor = await promptForAnswer(user, 'Are you currently wearing armor (y/n)?', message, 
                m => checkUserId(message, m) && ['y', 'n'].includes(m.content.substring(0,1).toLowerCase()),
                r => r.substring(0,1));
            let armor;
            if(isWearingArmor === 'y') {
                const armorName = await promptForAnswer(user, 'What is the armor name?', message);
                const armorClass = await promptForAnswer(user, 'What is the armor class of your currently worn armor?', message, 
                    m => messageIsNumber(message, m), r=>parseInt(r));
                const armorType = await promptForAnswerWithChoices(user, 'What is your armors type (Reply 1, 2, or 3)?', message, 
                    [
                        {name: 'Light', code: 'L'},
                        {name: 'Medium', code: 'M'},
                        {name: 'Heavy', code: 'H'}
                    ]
                );
                armor = {
                    armor_name: armorName,
                    armor_class: armorClass,
                    armor_type: armorType
                }
            }
                
            //ac = basearmorclass + min(dex, (h->0, m->2, l->dex))
            const characterBio = await promptForAnswer(user, 'What is your characters bio?', message);

            const str = await promptForAnswer(user, 'What is your Strength score?', message,
                m => messageIsNumber(message, m), r=>parseInt(r));
            const dex = await promptForAnswer(user, 'What is your Dexterity score?', message,
                m => messageIsNumber(message, m), r=>parseInt(r));
            const con = await promptForAnswer(user, 'What is your Constitution score?', message,
                m => messageIsNumber(message, m), r=>parseInt(r));
            const int = await promptForAnswer(user, 'What is your Intelligence score?', message,
                m => messageIsNumber(message, m), r=>parseInt(r));
            const wis = await promptForAnswer(user, 'What is your Wisdom score?', message,
                m => messageIsNumber(message, m), r=>parseInt(r));
            const cha = await promptForAnswer(user, 'What is your Charisma score?', message,
                m => messageIsNumber(message, m), r=>parseInt(r));

            const savingThrows = await promptForAnswerWithChoices(user, 'What skills do you have a saving throw for? Select two (in two seperate messages).', message, 
                [
                    {name:'Strength', code: 'str'},
                    {name:'Dexterity', code: 'dex'},
                    {name:'Constitution', code: 'con'},
                    {name:'Intelligence', code: 'int'},
                    {name:'Wisdom', code: 'wis'},
                    {name:'Charisma', code: 'cha'}
                ],
            2);
            const proficiencies = await promptForAnswerWithChoices(user, 'What are your proficiencies? Select three (in three seperate messages).', message,
                [
                    {name:'Acrobatics', code:'Acrobatics'},
                    {name:'Animal Handling', code:'Animal Handling'},
                    {name:'Arcana', code:'Arcana'},
                    {name:'Athletics', code:'Athletics'},
                    {name:'Deception', code:'Deception'},
                    {name:'History', code:'History'},
                    {name:'Insight', code:'Insight'},
                    {name:'Intimidation', code:'Intimidation'},
                    {name:'Investigation', code:'Investigation'},
                    {name:'Medicine', code:'Medicine'},
                    {name:'Nature', code:'Nature'},
                    {name:'Perception', code:'Perception'},
                    {name:'Performance', code:'Performance'},
                    {name:'Persuasion', code:'Persuasion'},
                    {name:'Religion', code:'Religion'},
                    {name:'Sleight of Hand', code:'Sleight of Hand'},
                    {name:'Stealth', code:'Stealth'},
                    {name:'Survival', code:'Survival'}
                ],
            3);
            
            resolve({
                characterInfo: {
                    user_id: user.id,
                    character_name: name,
                    level: lvl,
                    race: race,
                    gender: gender,
                    diety: diety,
                    alignment_lvc: alignmentLVC,
                    alignment_evg: alignmentEVG,
                    size: size,
                    hair: hair,
                    eyes: eyes,
                    height: height,
                    weight: weight,
                    background: background,
                    class: className,
                    hit_dice: hitDice,
                    base_hit_points: baseHitPoints,
                    character_bio: characterBio,
                },
                abilityScores: {
                    str: {
                        score: str,
                        savingThrow: savingThrows.includes('str')
                    },
                    dex: {
                        score: dex,
                        savingThrow: savingThrows.includes('dex')
                    },
                    con: {
                        score: con,
                        savingThrow: savingThrows.includes('con')
                    },
                    int: {
                        score: int,
                        savingThrow: savingThrows.includes('int')
                    },
                    wis: {
                        score: wis,
                        savingThrow: savingThrows.includes('wis')
                    },
                    cha: {
                        score: cha,
                        savingThrow: savingThrows.includes('cha')
                    }
                },
                armor: armor,
                proficiencies: proficiencies
            });
        }
        catch(err) {
            console.log(err);
            reject(err);
        }
    });
}

async function createCharacter(characterInfo, abilityScores, armor, proficiencies) {
    const char = await characterDb.createCharacter(characterInfo);
    console.log(`created character for user: ${characterInfo.user_id}`);
    [str, dex, con, int, wis, cha] = await Promise.all([
        abilityDb.getAbilityByDesc('Str'), abilityDb.getAbilityByDesc('Dex'), 
        abilityDb.getAbilityByDesc('Con'), abilityDb.getAbilityByDesc('Int'), 
        abilityDb.getAbilityByDesc('Wis'), abilityDb.getAbilityByDesc('Cha')
    ]); 
    await Promise.all([
        char.addAbility(str, {through: {ability_score: abilityScores.str.score, saving_throw: abilityScores.str.savingThrow}}),
        char.addAbility(dex, {through: {ability_score: abilityScores.dex.score, saving_throw: abilityScores.dex.savingThrow}}),
        char.addAbility(con, {through: {ability_score: abilityScores.con.score, saving_throw: abilityScores.con.savingThrow}}),
        char.addAbility(int, {through: {ability_score: abilityScores.int.score, saving_throw: abilityScores.int.savingThrow}}),
        char.addAbility(wis, {through: {ability_score: abilityScores.wis.score, saving_throw: abilityScores.wis.savingThrow}}),
        char.addAbility(cha, {through: {ability_score: abilityScores.cha.score, saving_throw: abilityScores.cha.savingThrow}})
    ]);
    console.log(`added ability scores to user: ${characterInfo.user_id}`);
    if(armor) {
        const [storedArmor, created] =  await armorDb.findOrCreateArmor({
            armor_name: armor.armor_name,
            armor_type: armor.armor_type,
            armor_class: armor.armor_class
        });
        await char.addArmor(storedArmor, {through: {currently_worn: true}});
        console.log(`added armor to user: ${characterInfo.user_id}`);
    }
    for(var i=0; i<proficiencies.length; i++) {
        const proficiencyDescription = proficiencies[i];
        const skill = await skillDb.getSkillByDescription(proficiencyDescription);
        await char.addSkill(skill);
    }
    console.log(`added skill proficiencies to user: ${characterInfo.user_id}`);
    await dao.sync();
    return;
}

async function characterExists(user_id) {
    return await characterDb.characterExists(user_id);
}

module.exports = {
    characterCreator: {
        getCharacterInfo,
        createCharacter, 
        characterExists
    }
}