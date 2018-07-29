module.exports = {
    name: 'user-id',
    description: 'gives you the user id of the person you mention',
    args: true,
    usage: ['<user-name-mention>'],
	execute(message, args) {
        const id = message.mentions.users.first().id;
        const name = message.mentions.users.first().username;
        message.channel.send(`${name}'s user id is ${id}`);  
    },
};