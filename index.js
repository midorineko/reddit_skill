var outout = require('./outout');
var sessionRequests = [];

exports.handler = function( event, context ) {
    var final = false;
    var category = "";
    sessionRequests.push(event);
    var current = event.request.intent.slots.Reddit.value.toLowerCase();
    var speechTxt = "Was that? "
    speechTxt += current;

    if(current === 'yes' || current==='hot'){
        final = true;
        category = "hot";
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