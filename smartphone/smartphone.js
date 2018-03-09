const guwaa = function(msg) {
    const max = 140;
    const prefix = "やっぱ" + msg + "は最高っすねぇ～～～～！！！！！！（時速100キロ おいどけ";
    const suffix = "ぐわーーー私が" + msg + "になってしまった（超常現象";
    let result = prefix;
    while(result.length + suffix.length < max) {
        result += msg;
    }
    result += suffix;
    return result;
}