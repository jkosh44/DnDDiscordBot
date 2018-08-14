function drawMemeOnCanvas(canvas, ctx, topText, bottomText, img) {
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
  
    _lineHeightRatio = (fromBottom)?-lineHeightRatio:lineHeightRatio;
    const lineHeight = _lineHeightRatio * fontSize;
    const lines = [];
    let line = '';
    const words = text.split(' ');
    
    for (var n = 0; n < words.length; n++) {
        const testLine = line + ' ' + words[n];
        const metrics = ctx.measureText(testLine);
        const testWidth = metrics.width;
  
        if (testWidth > maxWidth) {
            addElemToArray(lines, line, fromBottom);
            line = words[n] + ' ';
        } else {
            line = testLine;
        }
    }
    addElemToArray(lines, line, fromBottom);
  
    if(lines.length > 2){
        wrapText(ctx, text, x, y, maxWidth, maxHeight, lineHeightRatio, fromBottom, fontSize - 10);
    } else{
        for (var k in lines) {
            ctx.strokeText(lines[k], x, y + lineHeight * k);
            ctx.fillText(lines[k], x, y + lineHeight * k);
        }
    }
}

function addElemToArray(arr, elem, fromBottom) {
    // If from the bottom, use unshift so the lines can be added to the top of the array.
    // Required since the lines at the bottom are laid out from bottom up.
    if(fromBottom) {
        arr.unshift(elem);
    } else {
        arr.push(elem);
    }
}

module.exports = {
    drawMemeOnCanvas
}