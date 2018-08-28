const Sequelize = require('sequelize');
const {sequelize} = require('./db.js');

const Alignment = sequelize.define('alignment', {
    alignment_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    alignment_description: {
        type: Sequelize.STRING
    },
});

//TODO: may not need this
async function addAlignment(description) {
    try {
        const alignment = await Alignment.create({
            alignment_description: description
        });
        console.log(`created new alignment" ${alignment.ability_description}`);
        return alignment;
    }
    catch(e) {
        console.log(e);
        return null;
    }
}

async function getAlignmentById(alignment_id) {
    return await Alignment.findById(alignment_id);
}

async function getAlignmentByDesc(alignment_description) {
    return await Alignment.findOne({where: {alignment_description: alignment_description}});
}