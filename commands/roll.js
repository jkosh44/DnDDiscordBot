module.exports = {
    name: 'roll',
    description: 'Roll\'s a die',
    args: true,
	execute(message, args) {
        const arg = args[0];
        if (/^[0-9]+d[0-9]+$/.test(arg)){
            rollInfo = arg.split('d');
            dieAmount = parseInt(rollInfo[0]);
            dieSize = parseInt(rollInfo[1]);
            const res = Array.apply(null, {length: dieAmount}).map((_) => {
                return Math.floor(Math.random()*dieSize) + 1;;
            });
            return message.channel.send(res.join(","));
        } else {
            const dieSize = parseInt(args[0]);
            
            if (isNaN(dieSize)) {
                return message.reply('Invalid roll');
            }

            return message.channel.send(Math.floor(Math.random()*dieSize) + 1);
        }
    },
};