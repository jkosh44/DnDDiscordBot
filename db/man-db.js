const { dao } = require('../util/dao.js');

async function addManEntry(name, desc, entry_type) {
    try{
        const manTable = dao.getManualTable();
        const manEntry = await manTable.create({
            entry_name: name,
            entry_description: desc,
            entry_type: entry_type,
        });
        console.log(`created new ${entry_type} entry: ${manEntry.entry_name}`);
        return manEntry;
    }
    catch(e) {
        if (e.name === 'SequelizeUniqueConstraintError') {
            console.log('That entry name already exists')
        }
        console.log(e);
        return null;
    }
}

async function getManEntry(name, entry_type) {
    const manTable = dao.getManualTable();
    const entry = await manTable.findOne({ where: {entry_name: name, entry_type: entry_type}});
    if(entry){
        console.log(`found entry ${name}`);
        return entry;
    }
    return null;
}

async function getAllManEntries(entry_type) {
    const manTable = dao.getManualTable();
    return await manTable.findAll({where: {entry_type: entry_type}},{attributes:['entry_name']});
}

async function updateManEntry(name, desc, entry_type) {
    const manTable = dao.getManualTable();
    const affectedRows = await manTable.update({entry_description: desc}, {where: {entry_name: name, entry_type: entry_type}});
    if(affectedRows > 0) {
        return true;
    }
    return false;
}

async function deleteManEntry(name, entry_type) {
    const manTable = dao.getManualTable();
    const rowCount = await manTable.destroy({where: {entry_name: name, entry_type: entry_type}});
    if(!rowCount) {
        return false;
    }
    return true;
}

module.exports = {
    ManDb: {
        addManEntry,
        getManEntry,
        getAllManEntries,
        updateManEntry,
        deleteManEntry
    }
} 