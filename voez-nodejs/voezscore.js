exports.voezscore = function(msg) {
    const regexScore = /.*\\n([0-9]+)\\n0?再プレイ/;
    let result;

    if(!regexScore.test(msg)) return 0;
    result = parseInt(msg.match(regexScore)[1]);

    return result;
}
