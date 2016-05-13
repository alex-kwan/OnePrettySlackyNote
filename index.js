var express = require('express');
var app = express();
var rquest = require('request');
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

var pageNameRegex = /(%7C[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}%2F)(.*)(%7C[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}%2F)/;
var pageName = encodedUrl.match(pageNameRegex)[2];

var sectionNameRegex = /%28(.*).one/;
var sectionName = encodedUrl.match(sectionNameRegex)[1];

var actualName = decodeURIComponent(pageName);

var actualSection = decodeURIComponent(sectionName);

var name = actualName;
      var returnVal = {
    "response_type": "in_channel",
    "attachments": [
        {
            "title": name+" ("+actualSection+")",
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


