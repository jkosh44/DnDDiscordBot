const Sequelize = require('sequelize');
const {sequelize} = require('./db.js');

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