function randomListsInit(source) {
    const jsonSource = require(`../resources/${source}`);
    let weightedDist = [];
    let totalWeight = 0;
    for (var name in jsonSource) {
        const weight = jsonSource[name];
        totalWeight += weight;
        weightedDist.push({
            name, 
            totalWeight
        });   
    }
    return {
        weightedDist,
        totalWeight
    }
}

module.exports = {
    weightedItems: randomListsInit('items.json')
}