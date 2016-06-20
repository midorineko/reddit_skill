'use strict';
var outout = (function () {
    return {
        output: function (text, context, end) {
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
                shouldEndSession: end
            };
            context.succeed( { response: response } );
        },
    };
})();
module.exports = outout;