/* ライブラリ定義 */
    const Request = require("then-request");
    const Twitter = require("twitter");
    const VoezScore = require("./voezscore.js");
    const Token = require("./token.js");
    const Client = new Twitter(Token.twitter);

/* 処理定義 */

const voezscore = function(msg) {
    const regexScore = /.*\\n([0-9]+)\\n0?再プレイ/;
    let result;
    const scoreData = msg.replace(/\n/g, "\\n");
    if(!regexScore.test(scoreData)) return 0;
    result = parseInt(scoreData.match(regexScore)[1]);

    return result;
}

const tweetPost = function(msg) {
    Client.post("statuses/update", {
            status: msg
        }, function(error, tweet, response) {
            console.log(error);
        }
    );
}

Client.stream("statuses/filter", {track: "#VOEZ"}, function(stream) {
    console.log("[Twitter]<準備完了> : Streaming API に接続しました。");
          stream.on("data", function(tweet) {
              //console.log(tweet.user.name + " : " + tweet.text);
              if(tweet.entities.media) {
                console.log(tweet.user.name + " : " + tweet.entities.media[0].media_url_https);
                const imageURL = tweet.entities.media[0].media_url_https;
                console.log("解析中です");
                Request("POST", "https://vision.googleapis.com/v1/images:annotate?key=" + Token.GCPVisionAPI, 
                    {
                        json: {
                            requests: [
                                [
                                    {
                                        image: {
                                            source:{
                                                imageUri: imageURL
                                            }
                                        },
                                        features: [
                                            {
                                              type: "TEXT_DETECTION"
                                            }
                                        ]
                                    }
                                ]
                            ]
                        }
                    }).getBody("utf8").then(JSON.parse).done(function(res) {
                        const resJson = res;
                        let scoreData;
                        if(scoreData = res.responses[0].fullTextAnnotation.text) {
                            const score = VoezScore.voezscore(scoreData);
                            console.log(tweet.user.name + " : " + score);
                            const tweetURL = "https://twitter.com/" + tweet.user.screen_name + "/status/" + tweet.id_str;
                            tweetPost(tweet.user.name + "さんのスコア : " + score + "\n" + tweetURL);
                        }
                    });
              } else {
                console.log("無視");
              }
          });

          stream.on("error", function(error) {
              console.log(error);
          });
        }
);