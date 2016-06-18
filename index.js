first = [];

exports.handler = function( event, context ) {
    var final = false;

    var current = event.request.intent.slots.Reddit.value.toLowerCase();

    if(current === 'yes'){
        final = true;
    }

    first.push(event.request.intent.slots.Reddit.value.toLowerCase());

    var reddit = "Is this the subreddit you are looking for? "

    reddit += event.request.intent.slots.Reddit.value;

    if(final){
        event = first[first.length - 2];
        getReddit(event, context);
    }else{
        firstOutput( reddit, context );
    };
};

function getReddit(event, context){
    first = [];
    var reddit = event;

    var reddit_url = reddit.replace(/\s/g, '');

    var http = require( 'http' );
 
    var url = "http://www.reddit.com/r/" + reddit_url + ".json";

    http.get( url, function( response ) {
        
        var data = '';
        
        response.on( 'data', function( x ) { data += x; } );

        response.on( 'end', function() {

            var json = JSON.parse( data );

            var text = "Here are the top 5 articles! ";

            for ( var i=0 ; i < 5 ; i++ ) {
                var title = json.data.children[i].data.title;
                if ( title ) {
                    b = i + 1
                    text += b + ", " + title + ". ";
                }
            }
        
            output( text, context );
        
        } );
        
    } );
};

function output( text, context ) {

    var response = {
        outputSpeech: {
            type: "PlainText",
            text: text
        },
        card: {
            type: "Simple",
            title: "Reddit",
            content: text
        },
        shouldEndSession: true
    };
    
    context.succeed( { response: response } );
    
}

function firstOutput( text, context ) {

    var response = {
        outputSpeech: {
            type: "PlainText",
            text: text
        },
        card: {
            type: "Simple",
            title: "Reddit",
            content: text
        },
        shouldEndSession: false
    };
    
    context.succeed( { response: response } );
    
}