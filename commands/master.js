const { Manual } = require('../util/manual.js');
const { dungeon_master } = require('../config.json');

module.exports = {
    name: 'master',
    description: 'Direct messages the Dungeon Master some private info about the campaign',
    usage: ['<entry-name>', ''],
    authorizedUsers: [dungeon_master],
	execute(message, args) {
        const manual = new Manual('Master Manual', 'master', true);
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