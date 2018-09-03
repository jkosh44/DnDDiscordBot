const {Item} = require('./Schema.js');

async function getItemById(item_id) {
    return await Item.findById(item_id);
}

async function getItemByName(item_name) {
    return await Item.findOne({where: {item_name: item_name}});
}

async function addItem(item_name, item_description) {
    Item.create({
        item_name: item_name,
        item_description: item_description
    });
}