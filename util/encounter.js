function encounter(weightedDist, totalWeight) {
    const randomNum = Math.random()*totalWeight;
    console.log(`random num = ${randomNum}`)
    for(var i=0; i<weightedDist.length; i++) {
        const weightedRange = weightedDist[i].weightedRange;
        if(weightedRange > randomNum) {
            const content = weightedDist[i].content;
            return content;
        }
    }
}

module.exports = {
    encounter
};