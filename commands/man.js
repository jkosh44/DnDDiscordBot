const { manualLookUp } = require('../util/manual.js');

module.exports = {
    name: 'man',
    description: 'Direct messages info about the campaign',
    usage: ['<entry-name>', ''],
    execute(message, args) {
        manualLookUp(message, args, 'Manual', 'manual.json', 'man');
    },
};