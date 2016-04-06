var express = require('express');
var app = express();

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
  if(request.body['command'] == "/onenoteurl") {
      var encodedUrl = request.body['text'];
  
      var url = decodeURIComponent(encodedUrl);
      console.log(url);

      var first = url.indexOf(".one|") + 5;
      console.log(" first = " + first);

      var second = url.indexOf("/", first) + 1;
      console.log(" second = " + second);
  
      var third = url.lastIndexOf("|");
      console.log(" third = " + third);

      var actualName = url.substr(second, third - second);
      var name = actualName + " (Webview)";

      var returnVal = {
        "response_type": "in_channel",
        "text": "A OneNote link to page was pasted",
        "attachments": [{
          "title": name,
          "title_link": encodedUrl
        }]
      };

      response.send(returnVal);
  }
  else {
      response.send("fail");
  }
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


