const { Manual } = require('../util/manual.js');
const { dungeon_master } = require('../config.json');

module.exports = {
    name: 'master',
    description: 'Allows creating, editing, viewing, and deletion of private info about the game',
    usage: ['', '<entry-name>', 'add <entry-name> <description>', 'update <entry-name> <new-description>', 'del <entry-name>'],
    authorizedUsers: [dungeon_master],
	execute(message, args) {
        const manual = new Manual('Master Manual', 'master', 'Master');
        if(args.length) {
            switch(args[0]) {
                case 'add':
                    manual.add(message, args);
                    break;
                case 'update':
                    manual.updateEntry(message, args);
                    break;
                case 'del':
                    manual.delEntry(message, args);
                    break;
                default:
                    manual.getEntry(message, args);
                    break;
            }
        } else {
            manual.getAllEntries(message, args);
        }
    },
};