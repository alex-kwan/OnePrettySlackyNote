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
var second = decodedUrl.indexOf("/", first);
console.log(" second = " + second);
var third = decodedUrl.lastIndexOf("|");
console.log(" third = " + third);
var actualName = decodedUrl.substr(second, third-second);

var name = actualName+" (Webview)";
      var responseUrl = request.body['response_url'];
      var returnVal = {
    "response_type": "in_channel",
    "text": "A OneNote link to page was pasted",
    "attachments": [
        {
            "title": name + "<@"+request.body['channel_id']+">",
            "title_link": url
        }
    ]
};
//       response.send(returnVal);
      
//   rquest({
//       url: request.body.response_url,
//       method: 'POST',
//       body: returnVal,
//       json: true
//     }, function () {
//       //response.end();
//     });
//    rquest({
//     uri: responseUrl,
//     headers: { //We can define headers too
//         'Content-Type': 'application/json'
//     },
//     method: 'POST',
//     body: returnVal
//   }, function (error, response, body) {
//     if (error) {
//      // return callback(error);
//     }

   // callback(null, response.statusCode, body);
  });
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


