// Example express application adding the parse-server module to expose Parse
// compatible API routes.

var express = require('express');
var ParseServer = require('parse-server').ParseServer;

var databaseUri = process.env.DATABASE_URI || process.env.MONGOLAB_URI

if (!databaseUri) {
  console.log('DATABASE_URI not specified, falling back to localhost.');
}

var api = new ParseServer({
  databaseURI: databaseUri || 'mongodb://localhost:27017/dev',
  cloud: process.env.CLOUD_CODE_MAIN || __dirname + '/cloud/main.js',
  appId: process.env.APP_ID || 'HmmflFetTtzyLu6K4TIWCh9JKYGRAa0q0UqhY0Di',
  clientKey: process.env.CLIENT_KEY || '6P2rNmCVisjTV5lhOLLfeO9wXEKgUgzH1TtICC7P',
  restAPIKey: process.env.REST_KEY || 'qzKAArQUeQS9UGI79mrvG9uelF2plBAyjWkj3DJH',
  javascriptKey: process.env.JS_KEY || 'nZOorWfHGUwxfq9GT6X0rtyv3K0gbo44ZDxI62yS',
  masterKey: process.env.MASTER_KEY || 'A78ULyJvqShKZEgznZwAHVm73IVntwFTh1RISV7l' //Add your master key here. Keep it secret!
});
// Client-keys like the javascript key or the .NET key are not necessary with parse-server
// If you wish you require them, you can set them as options in the initialization above:
// javascriptKey, restAPIKey, dotNetKey, clientKey

var app = express();

// Serve the Parse API on the /parse URL prefix
var mountPath = process.env.PARSE_MOUNT || '/parse';
app.use(mountPath, api);

// Parse Server plays nicely with the rest of your web routes
app.get('/', function(req, res) {
  res.status(200).send('I dream of being a web site.');
});

var port = process.env.PORT || 1337;
app.listen(port, function() {
    console.log('parse-server-example running on port ' + port + '.');
});
