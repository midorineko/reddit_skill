var outout = require('./outout');
var speech_out = require('./speech_out');
var sessionRequests = [];

exports.handler = function( event, context ) {
    var final = false;
    var category = "";
    sessionRequests.push(event);
    var current = event.request.intent.slots.Reddit.value.toLowerCase();
    var speechTxt = "Was that? "

    speech_return = speech_out.speech(current);

    final = speech_return[0];
    category = speech_return[1];
    current = speech_return[2];

    speechTxt += current;

    if(final){
        event = sessionRequests[sessionRequests.length - 2];
        getReddit(event, context, category);
    }else{
        outout.output(speechTxt, context, false);
    };
};

function getReddit(event, context, category){
    sessionRequests = [];
    var reddit = event.request.intent.slots.Reddit.value.toLowerCase();
    var reddit_url = reddit.replace(/\s/g, '');
    var url = null;
    var https = require( 'https' );
    url = "https://www.reddit.com/r/" + reddit_url +"/" + category + ".json?limit=5";
    https.get( url, function( response ) {
        var data = '';
        response.on( 'data', function( x ) { data += x; } );
        response.on( 'end', function() {
            var json = JSON.parse( data );
            var text = "Here are the first 5 " + category + " " + reddit +" articles! ";
            for ( var i=0 ; i < 5 ; i++ ) {
                var title = json.data.children[i].data.title;
                if ( title ) {
                    b = i + 1
                    text += b + ", " + title + ". ";
                }
            }
            outout.output(text, context, true);
        } );
        
    } );
};