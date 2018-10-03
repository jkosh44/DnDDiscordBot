const Discord = require('discord.js');
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

async function prettyPrint(characterId) {
    //TODO
    const character = await characterDb.getCharacterById(characterId);
    const abilities = character.abilities;
    const abilityModifierMap = abilities.reduce((map, ability) => {
        const abilityScore = ability.characterAbilityScore.ability_score; 
        map[ability.ability_description] = Math.floor(abilityScore/2)-5;
        return map;
    }, {});

    const embed = new Discord.RichEmbed()
        .attachFiles(['./resources/imgs/logo.png','./resources/imgs/thumbnail.png'])
        .setColor('#0099ff')
        .setTitle('Character Name')
        .setAuthor('Character Sheet', 'attachment://logo.png')
        .setDescription(character.character_name)
        .setThumbnail('attachment://thumbnail.png')
        .addField('Level', character.level, true)
        .addField('Race', character.race, true)
        .addField('Gender', character.gender, true)
        .addField('Alignment', `${character.alignment_lvc} ${character.alignment_evg}`, true)
        .addField('Diety', character.diety, true)
        .addBlankField()
        .addField('Size', character.size, true)
        .addField('Hair', character.hair, true)
        .addField('Eyes', character.eyes, true)
        .addField('Height', character.height, true)
        .addField('Weight', character.weight, true)
        .addField('Background', character.background, true)
        .addBlankField();

    let abilityScores = '';
    for(var i=0; i<abilities.length; i++) {
        const ability = abilities[i];
        const abilityBuffer = ability.ability_description === 'Str' ? '\\_' : ability.ability_description === 'Int' ? '\\_' : '';
        const abilityScore = ability.characterAbilityScore.ability_score;
        const abilityScoreBuffer = abilityScore<10 ? '\\_' : '';
        const abilityModifier = abilityModifierMap[ability.ability_description];
        abilityScores += `${ability.ability_description}${abilityBuffer} | ${abilityScore}${abilityScoreBuffer} | ${abilityModifier<0 ? '' : '+'}${abilityModifier}\n`;
        //data.push(`${ability.ability_description}: ${abilityScore}; ${abilityModifier<0 ? '' : '+'}${abilityModifier}; Saving Throw: ${ability.characterAbilityScore.saving_throw ? 'yes' : 'no'}`);
    }
    embed.addField('Ability Scores', abilityScores, true);

    let savingThrows = '';
    for(var i=0; i<abilities.length; i++) {
        const ability = abilities[i];
        const abilityBuffer = ability.ability_description === 'Str' ? '\\_' : ability.ability_description === 'Int' ? '\\_' : '';
        const abilityModifier = abilityModifierMap[ability.ability_description] + (ability.characterAbilityScore.saving_throw ? 2 : 0);
        const abilityModifierBuffer = abilityModifier<0 ? '\\_' : '';
        savingThrows += `${ability.ability_description}${abilityBuffer} | ${abilityModifier<0 ? '' : '+'}${abilityModifier}${abilityModifierBuffer} | ${ability.characterAbilityScore.saving_throw ? 'x' : ''}\n`;
    }
    embed.addField('Saving Throws', savingThrows, true)
        .addBlankField()

    let className = character.class;
    let lvl = `${character.level}`;
    let hitDice = `${character.level}d${character.hit_dice}`;
    let hp = `${character.base_hit_points}`;
    let con = `${character.level*abilityModifierMap['Con']}`;
    let classHeader = '';
    makeClassChart('Name', classHeader, className);
    makeClassChart('Lvl', classHeader, lvl);
    //`**Name**: ${character.class} | **Lvl**: ${character.level}; **Hit Dice**: ${character.level}d${character.hit_dice}; **HP**:${character.base_hit_points}; **Con**: ${character.level*abilityModifierMap['Con']}`
    const classData = `${className}|${lvl}|${hitDice}|${hp}|${con}`;
    const classTable = `${classHeader}\n${classData}`;
    embed.addField('Class', classTable);
    //TODO classes and init

    embed.addBlankField()
    embed.setFooter('Araya LLC')
        ;
    return embed;

    
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

function makeClassChart(headerText, classHeader, actualText) {
    let buffer = (actualText.length-headerText.length)/2;
    if(buffer>0) {
        classHeader += '\\_'.repeat(buffer) + `**${headerText}**` + '\\_'.repeat(buffer) +'|';
    } else if(buffer<0) {
        classHeader += `**${headerText}**|`;
        buffer *= -1;
        actualText = '\\_'.repeat(buffer) + actualText + '\\_'.repeat(buffer);
    }
}

module.exports = {
    characterPrinter: {
        plainPrint,
        prettyPrint
    }
}

data = [];
data.push('Name:\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_  \\_\\_\\_\\_\\_\\_\\_\\_     \\_\\_\\_\\_   \\_\\_\\_\\_\\_\\_\\_\\_   ');
data.push('Race:\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_  \\\\_\\_\\_\\_\\_\\_ \\   /  \\_ \\  \\\\_\\_\\_\\_\\_\\_ \\  ');
data.push('Class:\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_   |    |  \\  >  \\_ </\\ |    |  \\ ');
data.push('Alignment:\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_   |    `   \\/  <\\_\\ \\/ |    `   \\');
data.push('Background:\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_  /\\_\\_\\_\\_\\_\\_\\_  /\\\\_\\_\\_\\_\\_\\ \\/\\_\\_\\_\\_\\_\\_\\_  /');
data.push('Level:\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_          \\/        \\/        \\/ ');
data.push('+-------------------------------------+  +-AC-------+ +-Ini------+ +-Speed-----+');
data.push('| Inspiration                    [  ] |  |          | |          | |           |');
data.push('| Proficiency Bonus              [  ] |  +----------+ +----------+ +-----------+');
data.push('| Passive Wisdom (Perception)    [  ] |  +-Hit Points--------------------------+');
data.push('+-------------------------------------+  | Maximum:                            |');
data.push('| STRENGTH                  [  ] [  ] |  | Modifier:                           |');
data.push('| Saving Throws              [ ] [  ] |  | Current:                            |');
data.push('| Athlethic                  [ ] [  ] |  | Hit Dice:                           |');
data.push('+-------------------------------------+  +-Death Saves-------------------------+');
data.push('| DEXTERITY                 [  ] [  ] |  | Successes               [ ] [ ] [ ] |');
data.push('| Saving Throws              [ ] [  ] |  | Failures                [ ] [ ] [ ] |');
data.push('| Acrobatics                 [ ] [  ] |  +-------------------------------------+');
data.push('| Sleight of Hand            [ ] [  ] |  +-Other Proficiencies & Languages-----+');
data.push('| Stealth                    [ ] [  ] |  |                                     |');
data.push('+-------------------------------------+  |                                     |');
data.push('| CONSTITUTION              [  ] [  ] |  |                                     |');
data.push('| Saving Throws              [ ] [  ] |  |                                     |');
data.push('+-------------------------------------+  |                                     |');
data.push('| INTELLIGENCE              [  ] [  ] |  |                                     |');
data.push('| Saving Throws              [ ] [  ] |  |                                     |');
data.push('| Arcana                     [ ] [  ] |  |                                     |');
data.push('| History                    [ ] [  ] |  |                                     |');
data.push('| Investigation              [ ] [  ] |  |                                     |');
data.push('| Nature                     [ ] [  ] |  |                                     |');
data.push('| Religion                   [ ] [  ] |  |                                     |');
data.push('+-------------------------------------+  |                                     |');
data.push('| WISDOM                    [  ] [  ] |  |                                     |');
data.push('| Saving Throws              [ ] [  ] |  |                                     |');
data.push('| Animal Handling            [ ] [  ] |  |                                     |');
data.push('| Insight                    [ ] [  ] |  |                                     |');
data.push('| Medicine                   [ ] [  ] |  |                                     |');
data.push('| Perception                 [ ] [  ] |  |                                     |');
data.push('| Survival                   [ ] [  ] |  |                                     |');
data.push('+-------------------------------------+  |                                     |');
data.push('| CHARISMA                  [  ] [  ] |  |                                     |');
data.push('| Saving Throws              [ ] [  ] |  |                                     |');
data.push('| Deception                  [ ] [  ] |  |                                     |');
data.push('| Intimidation               [ ] [  ] |  |                                     |');
data.push('| Performance                [ ] [  ] |  |                                     |');
data.push('| Persuation                 [ ] [  ] |  |                                     |');
data.push('+-------------------------------------+  +-------------------------------------+');
data.push('+-Weapon--------+-ATK B.-+-Damage/Typ-+-Properties--------------------+-Weight-+');
data.push('|               |        |            |                               |        |');
data.push('|               |        |            |                               |        |');
data.push('|               |        |            |                               |        |');
data.push('|               |        |            |                               |        |');
data.push('|               |        |            |                               |        |');
data.push('|               |        |            |                               |        |');
data.push('+-Armor/Shild---+-AC B.--+-Properties-+-------------------------------+-Weight-+');
data.push('|               |        |                                            |        |');
data.push('|               |        |                                            |        |');
data.push('|               |        |                                            |        |');
data.push('|               |        |                                            |        |');
data.push('+---------------+--------+--------------------------------------------+--------+');
data.push('+-------------+ +-------------+ +--------------+ +-------------+ +-------------+');
data.push('| PP [      ] | | GP [      ] | | EP [       ] | | SP [      ] | | CP [      ] |');
data.push('+-------------+ +-------------+ +--------------+ +-------------+ +-------------+');
data.push('+-Equipment-----------------------------------------------------------+-Weight-+');
data.push('|                                                                              |');
data.push('|                                                                              |');
data.push('|                                                                              |');
data.push('|                                                                              |');
data.push('|                                                                              |');
data.push('|                                                                              |');
data.push('|                                                                              |');
data.push('|                                                                              |');
data.push('|                                                                              |');
data.push('|                                                                              |');
data.push('|                                                                              |');
data.push('|                                                                              |');
data.push('|                                                                              |');
data.push('|                                                                              |');
data.push('|                                                                              |');
data.push('|                                                                              |');
data.push('|                                                                              |');
data.push('|                                                                              |');
data.push('|                                                                              |');
data.push('|                                                                              |');
data.push('|                                                                              |');
data.push('|                                                                              |');
data.push('|                                                                              |');
data.push('|                                                                              |');
data.push('|                                                                              |');
data.push('|                                                                              |');
data.push('|                                                                              |');
data.push('|                                                                              |');
data.push('|                                                                              |');
data.push('|                                                                              |');
data.push('|                                                                              |');
data.push('|                                                                              |');
data.push('|                                                                              |');
data.push('|                                                                              |');
data.push('|                                                                              |');
data.push('|                                                                              |');
data.push('|                                                                              |');
data.push('|                                                                              |');
data.push('|                                                                              |');
data.push('|                                                                              |');
data.push('|                                                                              |');
data.push('|                                                                              |');
data.push('|                                                                              |');
data.push('|                                                                              |');
data.push('|                                                                              |');
data.push('|                                                                              |');
data.push('|                                                                              |');
data.push('|                                                                              |');
data.push('|                                                                              |');
data.push('|                                                                              |');
data.push('|                                                                              |');
data.push('|                                                                              |');
data.push('|                                                                              |');
data.push('|                                                                              |');
data.push('| Max. Bearing Capacity:                                      Weight:          |');
data.push('+------------------------------------------------------------------------------+');
data.push('+-Racial Features--------------------------------------------------------------+');
data.push('|                                                                              |');
data.push('|                                                                              |');
data.push('+-Background Feature-----------------------------------------------------------+');
data.push('|                                                                              |');
data.push('|                                                                              |');
data.push('+-Class Features---------------------------------------------------------------+');
data.push('|                                                                              |');
data.push('|                                                                              |');
data.push('+-Domain Features--------------------------------------------------------------+');
data.push('|                                                                              |');
data.push('|                                                                              |');
data.push('+-Level 2----------------------------------------------------------------------+');
data.push('|                                                                              |');
data.push('|                                                                              |');
data.push('+-Level 3----------------------------------------------------------------------+');
data.push('|                                                                              |');
data.push('|                                                                              |');
data.push('+-Level 4----------------------------------------------------------------------+');
data.push('|                                                                              |');
data.push('|                                                                              |');
data.push('+-Level 5----------------------------------------------------------------------+');
data.push('|                                                                              |');
data.push('|                                                                              |');
data.push('+-Level 6----------------------------------------------------------------------+');
data.push('|                                                                              |');
data.push('|                                                                              |');
data.push('+-Level 7----------------------------------------------------------------------+');
data.push('|                                                                              |');
data.push('|                                                                              |');
data.push('+-Level 8----------------------------------------------------------------------+');
data.push('|                                                                              |');
data.push('|                                                                              |');
data.push('+-Level 9----------------------------------------------------------------------+');
data.push('|                                                                              |');
data.push('|                                                                              |');
data.push('+-Level 10---------------------------------------------------------------------+');
data.push('|                                                                              |');
data.push('|                                                                              |');
data.push('+-Level 11---------------------------------------------------------------------+');
data.push('|                                                                              |');
data.push('|                                                                              |');
data.push('+-Level 12---------------------------------------------------------------------+');
data.push('|                                                                              |');
data.push('|                                                                              |');
data.push('+-Level 13---------------------------------------------------------------------+');
data.push('|                                                                              |');
data.push('|                                                                              |');
data.push('+-Level 14---------------------------------------------------------------------+');
data.push('|                                                                              |');
data.push('|                                                                              |');
data.push('+-Level 15---------------------------------------------------------------------+');
data.push('|                                                                              |');
data.push('|                                                                              |');
data.push('+-Level 16---------------------------------------------------------------------+');
data.push('|                                                                              |');
data.push('|                                                                              |');
data.push('|                                                                              |');
data.push('|                                                                              |');
data.push('+------------------------------------------------------------------------------+');
data.push('+-Age--------+-Height-----+-Weight-----+-Eyes-------+-Skin-------+-Hair--------+');
data.push('|            |            |            |            |            |             |');
data.push('+-Appearance-+------------+------------+------------+------------+-------------+');
data.push('|                                                                              |');
data.push('|                                                                              |');
data.push('+-Backstory--------------------------------------------------------------------+');
data.push('|                                                                              |');
data.push('|                                                                              |');
data.push('+-Personality Traits-----------------------------------------------------------+');
data.push('|                                                                              |');
data.push('|                                                                              |');
data.push('+-Ideals-----------------------------------------------------------------------+');
data.push('|                                                                              |');
data.push('|                                                                              |');
data.push('+-Bonds------------------------------------------------------------------------+');
data.push('|                                                                              |');
data.push('|                                                                              |');
data.push('+-Flaws------------------------------------------------------------------------+');
data.push('|                                                                              |');
data.push('|                                                                              |');
data.push('+-Allies & Organizations-------------------------------------------------------+');
data.push('|                                                                              |');
data.push('|                                                                              |');
data.push('+-Notes------------------------------------------------------------------------+');
data.push('|                                                                              |');
data.push('|                                                                              |');
data.push('|                                                                              |');
data.push('|                                                                              |');
data.push('|                                                                              |');
data.push('|                                                                              |');
data.push('|                                                                              |');
data.push('|                                                                              |');
data.push('|                                                                              |');
data.push('|                                                                              |');
data.push('|                                                                              |');
data.push('|                                                                              |');
data.push('|                                                                              |');
data.push('|                                                                              |');
data.push('|                                                                              |');
data.push('|                                                                              |');
data.push('|                                                                              |');
data.push('|                                                                              |');
data.push('|                                                                              |');
data.push('|                                                                              |');
data.push('|                                                                              |');
data.push('|                                                                              |');
data.push('|                                                                              |');
data.push('|                                                                              |');
data.push('|                                                                              |');
data.push('|                                                                              |');
data.push('|                                                                              |');
data.push('|                                                                              |');
data.push('|                                                                              |');
data.push('|                                                                              |');
data.push('|                                                                              |');
data.push('+-Known Players----+-Character--------------+-Race----------+-Class------------+');
data.push('|                  |                        |               |                  |');
data.push('|                  |                        |               |                  |');
data.push('|                  |                        |               |                  |');
data.push('+------------------+------------------------+---------------+------------------+');