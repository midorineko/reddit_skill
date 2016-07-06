'use strict';

var speech_out = {
  speech: function(current) {
     var final = false;
     var category = ""
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
    return [final, category, current];
  },       
};

module.exports = speech_out;