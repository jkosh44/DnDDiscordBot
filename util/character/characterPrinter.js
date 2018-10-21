const Discord = require('discord.js');
const { characterDb } = require('../../db/character-db.js');
const { skillDb } = require('../../db/skill-db.js');
const { CharacterWrapper } = require('../../wrappers/characterWrapper.js');

async function plainPrint(characterId) {
    const [characterModel, allSkills] = await Promise.all([characterDb.getCharacterById(characterId), skillDb.getAllSkills()]);
    const character = new CharacterWrapper(characterModel, allSkills);
    data = [];
    data.push(`Name: ${character.name}`);
    data.push(`Level: ${character.level}`);
    data.push(`Race: ${character.race}`);
    data.push(`Gender: ${character.gender}`);
    data.push(`Alignment: ${character.alignment}`);
    data.push(`Diety: ${character.diety}`);
    data.push(`Size: ${character.size}`);
    data.push(`Hair: ${character.hair}`);
    data.push(`Eyes: ${character.eyes}`);
    data.push(`Height: ${character.height}`);
    data.push(`Weight: ${character.weight}`);
    data.push(`Background: ${character.background}`);
    const abilities = character.abilities;
    data.push(`**Ability Scores and Saving Throws**`);
    for(var i=0; i<character.abilities.length; i++) {
        const ability = abilities[i];
        data.push(`${ability.description}: ${ability.score}; ${ability.modifier<0 ? '' : '+'}${ability.modifier}; Saving Throw: ${ability.savingThrow ? 'yes' : 'no'}`);
    }
    data.push(`**Class**`);
    data.push(`name: ${character.class}; Lvl: ${character.level}; Hit Dice: ${character.currentHitDice}; HP: ${character.baseHp};Con: ${character.con};`);
    data.push(`Init: ${character.init}`);
    data.push(`**Skills**`);
    for(var i=0; i<character.skills.length; i++) {
        const skill = character.skills[i];
        data.push(`Roll: ${(skill.roll<0 ? '' : '+')}${skill.roll}; Skill: desc ${skill.description} (${skill.ability.description}); Prof: ${skill.proficiency ? 'yes' : 'no'}`);
    }
    data.push(`AC: ${character.armorClass}`);
    data.push(`**Armor**`);
    for(var i=0; i<character.armorsWorn.length; i++) {
        const armor = character.armorsWorn[i];
        data.push(`Armor Worn: ${armor.name}; Type: ${armor.type}; AC: ${armor.armorClass}; Dex: ${armor.armorDexMod}`);
    }
    return data;
}

async function prettyPrint(characterId) {
    const [characterModel, allSkills] = await Promise.all([characterDb.getCharacterById(characterId), skillDb.getAllSkills()]);
    const character = new CharacterWrapper(characterModel, allSkills);

    const embed = new Discord.RichEmbed()
        .attachFiles(['./resources/imgs/logo.png','./resources/imgs/thumbnail.png'])
        .setColor('#0099ff')
        .setTitle('Character Name')
        .setAuthor('Character Sheet', 'attachment://logo.png')
        .setDescription(character.name)
        .setThumbnail('attachment://thumbnail.png')
        .addField('Level', character.level, true)
        .addField('Race', character.race, true)
        .addField('Gender', character.gender, true)
        .addField('Alignment', `${character.alignment}`, true)
        .addField('Diety', character.diety, true)
        .addBlankField()
        .addField('Size', character.size, true)
        .addField('Hair', character.hair, true)
        .addField('Eyes', character.eyes, true)
        .addField('Height', character.height, true)
        .addField('Weight', character.weight, true)
        .addField('Background', character.background, true)
        .addBlankField();

    const abilityScoreTable = makeAbilityScoreTable(character);
    const savingThrowTable = makeSavingThrowTable(character);
    embed.addField('Ability Scores', abilityScoreTable, true)
        .addField('Saving Throws', savingThrowTable, true)
        .addBlankField();

    const classTable = makeClassTable(character);
    embed.addField('Class', classTable, true)
        .addField('Init', `+${character.init}`, true)
        .addBlankField();
    
    const skillTable = makeSkillTable(character);    
    embed.addField('Skills', skillTable, true);

    const armorWornTable = makeArmorWornTable(character);
    embed.addField('Armor Worn', armorWornTable, true)
        .addBlankField()
        .addField('Hit Points', character.hp, true)
        .addField('AC', character.armorClass, true)
        .addBlankField()
        .setFooter('Araya LLC');
    return embed;
} 

function makeAbilityScoreTable(character) {
    let abilityScores = '```';
    for(var i=0; i<character.abilities.length; i++) {
        const ability = character.abilities[i];
        const abilityScoreBuffer = ability.score<10 ? ' ' : '';
        abilityScores += `${ability.description} | ${abilityScoreBuffer}${ability.score} | ${ability.modifier<0 ? '' : '+'}${ability.modifier}\n`;
    }
    return abilityScores+'```';
}

function makeSavingThrowTable(character) {
    let savingThrows = '```Abl | Mod | Prof\n';
    savingThrows += '----------------\n'
    for(var i=0; i<character.abilities.length; i++) {
        const ability = character.abilities[i];
        savingThrows += `${ability.description} | ${ability.savingModifier<0 ? '' : '+'}${ability.savingModifier}  |  ${ability.savingThrow ? 'X' : ''}\n`;
    }
    return savingThrows + '```';
}

function makeClassTable(character) {
    const {header:classHeader, value:classValue} = makeClassTablePart('Name', character.class);
    const {header:levelHeader, value:levelValue} = makeClassTablePart('Level', character.level.toString());
    const {header:hitDiceHeader, value:hitDiceValue} = makeClassTablePart('Hit Dice', character.currentHitDice);
    const {header:hpHeader, value:hpValue} = makeClassTablePart('HP', character.baseHp);
    const {header:conHeader, value:conValue} = makeClassTablePart('Con', character.con);
    const classTableHeader = `${classHeader} | ${levelHeader} | ${hitDiceHeader} | ${hpHeader} | ${conHeader}`;
    const classTableValue = `${classValue} | ${levelValue} | ${hitDiceValue} | ${hpValue} | ${conValue}`;
    return `\`\`\`${classTableHeader}\n${'-'.repeat(classTableHeader.length)}\n${classTableValue}\`\`\``;
}

function makeClassTablePart(headerText, valueText) {
    if(headerText.length > valueText.length) {
        const diff = (headerText.length-valueText.length)/2;
        const oddBuffer = (headerText.length-valueText.length)%2==0 ? 0 : 1;
        const bufferedValueText = ' '.repeat(diff)+valueText+' '.repeat(diff+oddBuffer);
        return {header: headerText, value: bufferedValueText};
    } else {
        const diff = (valueText.length-headerText.length)/2;
        const oddBuffer = (valueText.length-headerText.length)%2==0 ? 0 : 1;
        const bufferedHeaderText = ' '.repeat(diff)+headerText+' '.repeat(diff+oddBuffer);
        return {header: bufferedHeaderText, value: valueText};
    }
}

function makeSkillTable(character) {
    const skills = character.skills;
    
    const rolls = skills.map(skill => (skill.ability.modifier>=0 ? '+' : '') + skill.roll.toString());
    const rollColumn = makeTableColumn(['Roll ', ...rolls]);
    const skillNames = skills.map(skill => skill.descriptionWithAbility);
    const skillColumn = makeTableColumn(['Skill ', ...skillNames]);
    const profs = skills.map(skill => skill.proficiency ? 'X' : '');
    const profColumn = makeTableColumn(['Prof ', ...profs]);
    const headerSeparator = '-'.repeat(rollColumn[0].length+skillColumn[0].length+profColumn[0].length);

    let table = '```';
    for(var i =0; i<rollColumn.length; i++) {
        table+= `${rollColumn[i]}|${skillColumn[i]}|${profColumn[i]}\n`;
        if(i===0) {
            table += headerSeparator+'\n';
        }
    }
    return table+'```';
}

function makeTableColumn(rows) {
    const maxLength = rows.reduce((max,curRow) => Math.max(max, curRow.length),0);
    res = [];
    for(var i=0; i<rows.length; i++) {
        const row = rows[i];
        if(row.length < maxLength) {
            const diff = (maxLength-row.length)/2;
            const oddBuffer = (maxLength-row.length)%2==0 ? 0 : 1;
            const bufferedRow = `${' '.repeat(diff)}${row}${' '.repeat(diff+oddBuffer)}`;
            res.push(bufferedRow);
        } else {
            res.push(row);
        }
    }
    return res;
}

function makeArmorWornTable(character) {
    const armorsWorn = character.armorsWorn;
    const armorNames = armorsWorn.map(armor => armor.name);
    const armorNameColumn = makeTableColumn(['Armor Worn', ...armorNames]);
    const armorTypes = armorsWorn.map(armor => armor.type);
    const armorTypesColumn = makeTableColumn(['Type', ...armorTypes]);
    const armorClasses = armorsWorn.map(armor => armor.armorClass);
    const totAC = character.armorsWorn.reduce((sum, armor) => sum+armor.armorClass, 0);
    const armorClassesColumn = makeTableColumn(['AC', ...armorClasses, totAC]);
    const armorDexes = armorsWorn.map(armor => armor.armorDexMod);
    const totDex = character.armorsWorn.reduce((sum, armor) => sum+armor.armorDexMod, 0);
    const armorDexColumn = makeTableColumn(['Dex', ...armorDexes, totDex]);
    const rowLength = armorNameColumn[0].length + armorTypesColumn[0].length + armorClassesColumn[0].length + armorDexColumn[0].length;
    const spaces = 6;
    const colSeparators = 3;
    const rowSeparator = '-'.repeat(rowLength+spaces+colSeparators);

    let armorTable = '```';
    for(var i=0; i<armorNameColumn.length; i++) {
        armorTable += `${armorNameColumn[i]} | ${armorTypesColumn[i]} | ${armorClassesColumn[i]} | ${armorDexColumn[i]}\n`;
        if(i===0) {
            armorTable += `${rowSeparator}\n`;
        }
    }
    armorTable += rowSeparator + '\n';
    const spacesToTotal = 4;
    const colSeparatorsToTotal = 2;
    const lengthToTotals = armorNameColumn[0].length + armorTypesColumn[0].length + spacesToTotal + colSeparatorsToTotal;
    const totalRow = `${' '.repeat(lengthToTotals-'Total: '.length)}Total: ${armorClassesColumn[armorClassesColumn.length-1]} | ${armorDexColumn[armorDexColumn.length-1]}\n`;
    return armorTable + totalRow + '```';
}


module.exports = {
    characterPrinter: {
        plainPrint,
        prettyPrint
    }
}