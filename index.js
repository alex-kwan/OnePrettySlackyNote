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
      var url = request.body['text'];
      

var decodedUrl = decodeURIComponent(url);
console.log(decodedUrl);
var first = decodedUrl.indexOf(".one|")+ 5
;
console.log(" first = " + first);
var second = decodedUrl.indexOf("/", first) + 1;
console.log(" second = " + second);
var third = decodedUrl.lastIndexOf("|");
console.log(" third = " + third);
var actualName = decodedUrl.substr(second, third-second);

var name = actualName;
      var responseUrl = request.body['response_url'];
      var returnVal = {
    "response_type": "in_channel",
    "attachments": [
        {
            "title": name,
            "title_link": url,
            "color": "#7D26CD",
            "author_name": "OneNote Online",
            "author_icon": "https://c1.staticflickr.com/9/8595/16243851041_5638c638a9_s_d.jpg",
        }
    ]
};
}
    response.send({"response_type": "ephemeral",
        "text": "Going to minimize the url for easy reading :D",
   
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


