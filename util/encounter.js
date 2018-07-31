function encounter(weightedDist, totalWeight) {
    const randomNum = Math.floor(Math.random()*totalWeight)+1;
    for(var item in weightedDist) {
        if(weightedDist[item].totalWeight > randomNum) {
            return weightedDist[item].name;
        }
    }
}

module.exports = {
    encounter
};