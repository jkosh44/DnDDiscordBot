const Sequelize = require('sequelize');

const sequelize = new Sequelize('database', 'user', 'password', {
    host: 'localhost',
    dialect: 'sqlite',
    logging: false,
    operatorsAliases: false,
    // SQLite only
    storage: 'database.sqlite',
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

async function addManEntry(name, desc, master) {
    try{
        const manEntry = await Manual.create({
            entry_name: name,
            entry_description: desc,
            master: master,
        });
        console.log(`created new man entry: ${manEntry.entry_name}`);
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

async function getManEntry(name, master) {
    const entry = await Manual.findOne({ where: {entry_name: name, master: master}});
    if(entry){
        console.log(`found entry ${name}`);
        return entry;
    }
    return null;
}

async function getAllManEntries(master) {
    return await Manual.findAll({where: {master: master}},{attributes:['entry_name']});
}

async function updateManEntry(name, desc, master) {
    const affectedRows = await Manual.update({entry_description: desc}, {where: {entry_name: name, master: master}});
    if(affectedRows > 0) {
        return true;
    }
    return false;
}

async function deleteManEntry(name, master) {
    const rowCount = await Manual.destroy({where: {entry_name: name, master: master}});
    if(!rowCount) {
        return false;
    }
    return true;
}

module.exports = {
    Manual,
    ManDb: {
        addManEntry,
        getManEntry,
        getAllManEntries,
        updateManEntry,
        deleteManEntry
    }
} 