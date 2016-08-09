var outout = require('./outout');
var speech_out = require('./speech_out');
var sessionRequests = [];

exports.handler = function( event, context ) {
    sessionRequests.push(event);
    var current = 'help'
    if ( event.request.intent ) {
        current = event.request.intent.slots.Reddit.value.toLowerCase();
    }
    var speechTxt = "Was that? "
    var speech_return = speech_out.speech(current);
    var final = speech_return[0];
    var category = speech_return[1];
    current = speech_return[2];
    speechTxt += current;

    if(final){
        event = sessionRequests[sessionRequests.length - 2];
        getReddit(event, context, category);
    }else if(current==="help"){
        var helpTxt = 'Hello, this skill was made to help you navigate reddit. First state a sub, alexa will respond with what she heard. If it is an incorrect sub, restate the desired sub. If it is the correct sub, you may proceed by saying; yes, rising, recent, hot, top, gilded, or controversial. Alexa will then rattle off the top five stories. Please state a sub.'
        outout.output(helpTxt, context, false);
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
    var request = https.get( url, function( response ) {
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
    request.setTimeout( 10000, function( ) {
        outout.output('sorry there was an issue with this skill', context, true);
    });
};