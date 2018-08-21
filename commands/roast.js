const Discord = require('discord.js');
const Canvas = require('canvas');
const { drawMemeOnCanvas } = require('../util/drawMeme.js');

module.exports = {
  name: 'roast',
  description: 'Roast someone',
  args: true,
  usage: ['@<user-name>'],
  execute(message, args) {
    drawSpongebob(message);
  }
}

function drawSpongebob(message) {
  const id = message.mentions.users.first().id;
  const reactFilter = m => id === m.author.id;
  let spongeText = '';
        
  const collector = message.channel.createMessageCollector(reactFilter, {max: 1});
  collector.on('collect', async m => {
    try {
      for(var i = 0; i < m.content.length; i++) {
        var c = m.content.charAt(i);
        if(i % 2 === 0) {
          spongeText += c.toLowerCase();
        } else {
          spongeText += c.toUpperCase();
        }
      }
      
      const spongebob = await Canvas.loadImage('/home/joe/GitHubProjects/DnDDiscordBot/resources/imgs/spongebob.png');
      const canvas = Canvas.createCanvas(spongebob.width, spongebob.height);
      const ctx = canvas.getContext('2d');
      drawMemeOnCanvas(canvas, ctx, spongeText, '', spongebob);
      
      const attachment = new Discord.Attachment(canvas.toBuffer(), 'roast.png');
      //message.mentions.users.first().send('', attachment);
      message.channel.send('', attachment);
    }
    catch(e) {
      console.log('Error drawing SpongeBob',e);
      throw(e);
    }
  });
}