const Discord = require('discord.js');
const Canvas = require('canvas');

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
      drawMeme(canvas, ctx, spongeText, '', spongebob);
      
      const attachment = new Discord.Attachment(canvas.toBuffer(), 'roast.png');
      message.mentions.users.first().send('', attachment);
      message.channel.send('', attachment);
    }
    catch(e) {
      console.log('Error drawing SpongeBob',e);
      throw(e);
    }
  });
}

function drawMeme(canvas, ctx, topText, bottomText, img) {
  ctx.clearRect(0,0, canvas.width, canvas.height);
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  ctx.lineWidth  = 8;
  ctx.font = 'bold 50pt Impact';
  ctx.strokeStyle = 'black';
  ctx.mutterLine = 2;
  ctx.fillStyle = 'white';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';
  
  let x = canvas.width / 2;
  let y = 0;
  wrapText(ctx, topText, x, y, canvas.width, canvas.height, 1.6, false, 50);

  ctx.textBaselin = 'bottom';
  y = canvas.height;
  wrapText(ctx, bottomText, x, y, canvas.width, canvas.height, 1.6, true, 50);
}



function wrapText(ctx, text, x, y, maxWidth, maxHeight, lineHeightRatio, fromBottom, fontSize) {
  ctx.font = 'bold' + fontSize + 'pt Impact';
  // If from the bottom, use unshift so the lines can be added to the top of the array.
  // Required since the lines at the bottom are laid out from bottom up.
  const pushMethod = (fromBottom)?'unshift':'push';

  _lineHeightRatio = (fromBottom)?-lineHeightRatio:lineHeightRatio;
  const lineHeight = _lineHeightRatio * fontSize;
  console.log(`from bottom: ${fromBottom}, line height: ${lineHeight}, lineHeightRation: ${lineHeightRatio}, font size: ${fontSize}`);
  const lines = [];
  let line = '';
  const words = text.split(' ');
  
  for (var n = 0; n < words.length; n++) {
    const testLine = line + ' ' + words[n];
    const metrics = ctx.measureText(testLine);
    const testWidth = metrics.width;

    if (testWidth > maxWidth) {
      lines[pushMethod](line);
      line = words[n] + ' ';
    } else {
      line = testLine;
    }
  }
  lines[pushMethod](line);

  if(lines.length > 2){
    console.log('Too big.', fontSize);
    wrapText(ctx, text, x, y, maxWidth, maxHeight, lineHeightRatio, fromBottom, fontSize - 10);
  }
  else{
    for (var k in lines) {
      ctx.strokeText(lines[k], x, y + lineHeight * k);
      ctx.fillText(lines[k], x, y + lineHeight * k);
    }
  }
}