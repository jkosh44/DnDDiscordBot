const { prefix } = require('../config.json');
const { ManDb } = require('../db/man-db.js');
const { dungeon_master } = require('../config.json');

class Manual {
    //TODO: authorize add, update, and del
    constructor(manName, commandName, master) {
        this.manName = manName;
        this.commandName = commandName;
        this.master = master;
    }

    async add(message, args) {
        if(args.length < 3) {
            return message.reply('Not enough arguments provide. Use the help command to see proper usages of this command');
        }
        const newEntry = await ManDb.addManEntry(args[1], args.slice(2).join(' '), this.master);
        if(newEntry === null) {
            return message.reply('There was an issue creating that entry. Please make sure there isn\'t an existing entry with the same name');
        }
    }
    
    async getEntry(message, args) {
        const data = [];
        const entry = await ManDb.getManEntry(args[0], this.master);
        if(entry !== null) {
            data.push(`**${entry.entry_name}:**`);
            data.push(`${entry.entry_description}`);
            message.author.send(data, {split: true});
            try{
                if(message.channel.type === 'dm') {
                    return;
                }
                return message.reply(`I've sent you a DM with the contents of that ${this.manName} entry.`);
            }
            catch(error) {
                console.error(`Could not send dm DM to ${message.author.tag}.\n`, error);
                return message.reply('It seems like I can\'t DM you! Do you have DMs disabled?');
            }
        }
        else {
            return message.reply(`There was a problem getting that ${this.manName} entry, are you sure it exists?\nUse ${prefix}${this.commandName} to see all entries`);
        }
    }
    
    async getAllEntries(message, args) {
        const data = [];
        const entries = await ManDb.getAllManEntries(this.master);
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
    
    async updateEntry(message, args) {
        if(args.length < 3) {
            return message.reply('Not enough arguments provide. Use the help command to see proper usages of this command');
        }
        if(ManDb.updateManEntry(args[1], args.slice(2).join(' '), this.master)) {
            return message.reply(`Updated ${this.manName} entry **${args[1]}**`)
        } else {
            return message.reply(`There was an issue updating that entry, are you sure it exists?\nUse ${prefix}${this.commandName} to see all entries`);
        }
    }
    
    async delEntry(message, args) {
        if(args.length < 2) {
            return message.reply('Not enough arguments provide. Use the help command to see proper usages of this command');
        }
        if(ManDb.deleteManEntry(args[1], this.master)) {
            return message.reply(`Deleted ${this.manName} entry **${args[1]}**`);
        }
        return message.reply(`There was an issue deleting that entry, are you sure it exists?\nUse ${prefix}${this.commandName} to see all entries`);
    }
}

module.exports = {
    Manual
}