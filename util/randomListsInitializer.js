function tieredRandomListInit(source) {
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
                content: contents[i], 
                weightedRange: totalWeight
            });   
        }
    }
    return {
        weightedDist,
        totalWeight
    }
}

function randomListInit(source) {
    const jsonSource = require(`../resources/${source}`);
    let weightedDist = [];
    let totalWeight = 0;
    for (var name in jsonSource) {
        const enemy = jsonSource[name];
        enemy['Name'] = name;
        const weight = enemy['Weight'];
        totalWeight += weight;
        weightedDist.push({
            content: enemy,
            weightedRange: totalWeight
        });
    }
    return {
        weightedDist,
        totalWeight
    }
}

module.exports = {
    weightedItems: tieredRandomListInit('items.json'),
    weightedEnemiesByArea: {
        "gen": randomListInit('gen-enemy-info.json')
    }
}