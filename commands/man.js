const { Manual } = require('../util/manual.js');

module.exports = {
    name: 'man',
    description: 'Allows creating, editing, viewing, and deletion of info about the game',
    usage: ['', '<entry-name>', 'add <entry-name> <description>', 'update <entry-name> <new-description>', 'del <entry-name>'],
    async execute(message, args) {
        const manual = new Manual('Manual', 'man', 'Manual');
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