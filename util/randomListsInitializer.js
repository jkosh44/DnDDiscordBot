function randomListsInit(source) {
    const jsonSource = require(`../resources/${source}`);
    let weightedDist = [];
    let totalWeight = 0;
    for (var name in jsonSource) {
        const tier = jsonSource[name];
        const weight = tier['weight'];
        const contents = tier['contents'];
        for(var i = 0; i < contents.length; i++) {
            totalWeight += weight;
            weightedDist.push({
                name: contents[i], 
                weightedRange: totalWeight
            });   
        }
    }
    return {
        weightedDist,
        totalWeight
    }
}

module.exports = {
    weightedItems: randomListsInit('items.json'),
    weightedEnemies: randomListsInit('enemies.json')
}