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
      var encodedUrl = request.body['text'];

var obj = parser(request.body['text']);

      var returnVal = {
    "response_type": "in_channel",
    "attachments": [
        {
            "title": obj.pageName+" ("+obj.sectionName+")",
            "title_link": encodedUrl,
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


