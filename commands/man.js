const { Manual } = require('../util/manual.js');

module.exports = {
    name: 'man',
    description: 'Direct messages info about the campaign',
    usage: ['', '<entry-name>', 'add <entry-name> <description>', 'update <entry-name> <new-description>', 'del <entry-name>'],
    async execute(message, args) {
        const manual = new Manual('Manual', 'man', false);
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