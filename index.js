var express = require('express');
var app = express();
var rquest = require('request');
var parser = require('onenote-deeplink-parser');
app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.post('/', function(request, response) {
  if(request.body['command'] == "/onenoteurl"){
    console.log('before decoded :' + request.body['text']);
    var decodedUrl = decodeURIComponent(request.body['text']);
     console.log('after decoded :' + decodedUrl);
    var delimiter = decodedUrl.indexOf('\n');

    if (delimiter !== -1){
      decodedUrl = decodedUrl.substring(0, delimiter);
    }

    var obj = parser(decodedUrl);

    var returnVal = {
      "response_type": "in_channel",
      "attachments": [
          {
              "title": obj.pageName+" ("+obj.sectionName+")",
              "title_link": request.body['text'],
              "color": "#7D26CD",
              "author_name": "OneNote Online",
              "author_icon": "https://c1.staticflickr.com/9/8595/16243851041_5638c638a9_s_d.jpg",
          }
      ]
  };
}
    response.send({"response_type": "ephemeral",
        "text": "Going to minimize the url for easy reading :D, don't worry if it says the request timed out.",
   
    });
    
    rquest({
      url: request.body['response_url'],
      method: 'POST',
      body: returnVal,
      json: true
    }, function () {
      response.end();
    });
}
 
);

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


