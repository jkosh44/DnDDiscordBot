function encounter(weightedDist, totalWeight) {
    const randomNum = Math.floor(Math.random()*totalWeight)+1;
    for(var i=0; i<weightedDist.length; i++) {
        const weightedRange = weightedDist[i].weightedRange;
        const name = weightedDist[i].name;
        if(weightedRange > randomNum) {
            return name;
        }
    }
}

module.exports = {
    encounter
};