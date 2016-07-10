
/**
 * Module dependencies.
 */

var express = require('express')

    , routes = require('./routes')
    , index = require('./routes/index')
    , search = require('./routes/search')
    , http = require('http')
    , jsforce = require('jsforce')
    , path = require('path');


var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', index.index);

app.get('/search', search.search);

app.get('/countriesList', search.countriesList);

app.get('/memberTypeList', search.memberTypeList);



app.post('/search', search.stageData);

app.get('/countriesList', search.countriesList);

app.get('/memberTypeList', search.memberTypeList);



http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});