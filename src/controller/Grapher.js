module.exports = {
    // Performs graphing and save to a PNG.
    graph: async function(nums, filename) {
        var coor = getCoorPair(nums);
        // TODO need graphing library here
    }
}

// Generates coordinates, saved in pairs. 
function getCoorPair(nums, xstart = 1) {
    var ret = [];
    for (var i = 0; i < nums.length; i++)
        ret.push([xstart++, nums[i]])
    return ret;
}

// Generates coordinates, saved in two arrays. 
function getCoorArr(nums, xstart = 1) {
    var ret = [[], []];
    for (var i = 0; i < nums.length; i++) {
        ret[0].push(xstart++);
        ret[1].push(nums[i]);
    }
    return ret;
}

function savePNG(filename) {
    // TODO finish me
}

