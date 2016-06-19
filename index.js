sessionRequests = [];

exports.handler = function( event, context ) {
    var final = false;

    var category = "hot";

    var current = event.request.intent.slots.Reddit.value.toLowerCase();
    sessionRequests.push(current);

    if(current === 'yes' || current==='hot'){
        final = true;
    }else if(current==='top'){
        final = true;
        category = 'top';
    }else if(current==='rising'){
        final = true;
        category = 'rising';
    }else if(current==='new' || current==='recent'){
        final = true;
        category = 'new';
    }else if(current==='controversial'){
        final = true;
        category = 'controversial';
    }else if(current==='gilded'){
        final = true;
        category = 'gilded';
    }

    if(final){
        event = sessionRequests[sessionRequests.length - 2];
        getReddit(event, context, category);
    }else{
        var reddit = "Was that? "
        reddit += current;
        sessionRequestsOutput( reddit, context );
    };
};

function getReddit(event, context, category){

var outout = require('./outout');

    sessionRequests = [];
    var reddit = event;
    var reddit_url = reddit.replace(/\s/g, '');
    var url = null;
    var http = require( 'http' );
    url = "http://www.reddit.com/r/" + reddit_url + "/" + category + ".json";
    http.get( url, function( response ) {
        var data = '';
        response.on( 'data', function( x ) { data += x; } );
        response.on( 'end', function() {
            var json = JSON.parse( data );
            var text = "Here are the first 5 "+ category +" articles! ";
            for ( var i=0 ; i < 5 ; i++ ) {
                var title = json.data.children[i].data.title;
                if ( title ) {
                    b = i + 1
                    text += b + ", " + title + ". ";
                }
            }
            output( outout.valz(), context );
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
};

function sessionRequestsOutput( text, context ) {
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
};