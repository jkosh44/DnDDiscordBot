const { prefix } = require('../config.json');
const { ManDb } = require('../db/man-db.js');
const { dungeon_master } = require('../config.json');

class Manual {
    
    constructor(manName, commandName, entry_type) {
        this.manName = manName;
        this.commandName = commandName;
        this.entry_type = entry_type;
    }

    async add(message, args) {
        if(this.isAuthorized(message)){
            if(args.length < 3) {
                return message.reply('Not enough arguments provide. Use the help command to see proper usages of this command');
            }
            const newEntry = await ManDb.addManEntry(args[1], args.slice(2).join(' '), this.entry_type);
            if(newEntry === null) {
                return message.reply('There was an issue creating that entry. Please make sure there isn\'t an existing entry with the same name');
            } else {
                message.reply(`Created ${this.manName} entry **${newEntry.entry_name}**`)
            }
        }
    }
    
    async getEntry(message, args) {
        if(this.entry_type === 'Manual' || this.isAuthorized(message, this.entry_type)) {
            const data = [];
            const entry = await ManDb.getManEntry(args[0], this.entry_type);
            if(entry !== null) {
                data.push(`**${entry.entry_name}:**`);
                data.push(`${entry.entry_description}`);
                if(this.entry_type === 'Master') {
                    message.author.send(data, {split: true});
                } else {
                    message.channel.send(data, {split: true});
                }
            }
            else {
                return message.reply(`There was a problem getting that ${this.manName} entry, are you sure it exists?\nUse ${prefix}${this.commandName} to see all entries`);
            }
        }
    }
    
    async getAllEntries(message, args) {
        if(this.entry_type === 'Manual' || this.isAuthorized(message, this.entry_type)) {
            const data = [];
            const entries = await ManDb.getAllManEntries(this.entry_type);
            data.push(`Here's a list of all the ${this.manName} entries:`);
            for(var i = 0; i < entries.length; i++) {
                data.push(`**${entries[i].entry_name}**`);
            }
            data.push(`\nYou can send '${prefix}${this.commandName} <entry-name>' to get the contents of a specific entry`);
            try {
                message.author.send(data, {split: true});
                if(message.channel.type == 'dm') {
                    return;
                }
                message.reply(`I've sent you a DM with all the ${this.manName} entries`);
            }
            catch(error) {
                console.error(`Could not send dm DM to ${message.author.tag}.\n`, error);
                message.reply('It seems like I can\'t DM you! Do you have DMs disabled?');
            }
        }
    }
    
    async updateEntry(message, args) {
        if(this.isAuthorized(message)) {
            if(args.length < 3) {
                return message.reply('Not enough arguments provide. Use the help command to see proper usages of this command');
            }
            const updateSuccess = await ManDb.updateManEntry(args[1], args.slice(2).join(' '), this.entry_type);
            if(updateSuccess) {
                return message.reply(`Updated ${this.manName} entry **${args[1]}**`)
            } else {
                return message.reply(`There was an issue updating that entry, are you sure it exists?\nUse ${prefix}${this.commandName} to see all entries`);
            }
        }
    }
    
    async delEntry(message, args) {
        if(this.isAuthorized(message)) {
            if(args.length < 2) {
                return message.reply('Not enough arguments provide. Use the help command to see proper usages of this command');
            }
            const delSuccess = await ManDb.deleteManEntry(args[1], this.entry_type);
            if(delSuccess) {
                return message.reply(`Deleted ${this.manName} entry **${args[1]}**`);
            }
            return message.reply(`There was an issue deleting that entry, are you sure it exists?\nUse ${prefix}${this.commandName} to see all entries`);
        }
    }
    
    isAuthorized(message) {
        if(this.entry_type === 'Notes' || message.author.id === dungeon_master) {
            return true;
        } else {
            message.reply('You are not authorized to do that');
            return false;
        }
    }
}

module.exports = {
    Manual
}