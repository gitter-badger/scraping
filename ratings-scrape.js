if (Meteor.isClient) {

  Meteor.call('getTweets', function (error, result) {
    if (error) {
      console.log("error", error);
    };

    console.log(result);

    Session.set("tweets", result);
  });

  Template.tweets.helpers({
    rant: function () {
      return Session.get("tweets");
    }
  });

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    var cheerio = Meteor.npmRequire('cheerio');

    Meteor.methods({
      getTweets: function () {
        result = Meteor.http.get("http://www.amazon.com/Charlottes-Web-Trophy-Newbery-White/dp/0064400557/ref=sr_1_1?s=books&ie=UTF8&qid=1427632537&sr=1-1&keywords=charlotte%27s+web");
        $ = cheerio.load(result.content);
        // var open = $('div.permalink-inner.permalink-tweet-container > div > div > p').text();
        var body = $("#avgRating > span").text();
        console.log("typeof:" + typeof(body));
        console.log("value of line 30 (empty string?): " + body);
        console.log("avgRating > span, below: ");
        console.log($("#avgRating > span"));
        return body;
      },

    })

  });
}
