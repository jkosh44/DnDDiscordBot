const { dao } = require('./dao.js');

async function getItemById(item_id) {
    return await dao.getItemTable().findById(item_id);
}

async function getItemByName(item_name) {
    return await dao.getItemTable().findOne({where: {item_name: item_name}});
}

async function addItem(item_name, item_description) {
    dao.getItemTable().create({
        item_name: item_name,
        item_description: item_description
    });
}

module.exports = {
    itemDb: {
        getItemById,
        getItemByName,
        getItemTable
    }
}