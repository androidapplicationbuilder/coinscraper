var express = require('express');
var fs      = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();
const port = process.env.PORT || 3000;

var scraper = require('table-scraper');

app.get('/scrape/:id', function(req, res){
 
  var id = req.params.id;
  url = 'https://www.appbrain.com/app/block-puzzle-conquer/'+id;

  request(url, function(error, response, html){
    if(!error){
		
	
      var $ = cheerio.load(html);

	  var ranking="None";
      
      var json = { ranking : "None"};

	  $("[tooltip='Ranking of the app on Google Play.']").filter(function(){
        var data = $(this);
        ranking = data.text().trim();
	    ranking=ranking.substr(0, ranking.indexOf('\n')); 
        json.ranking = ranking;
      })
	  
    
    }

    res.send(json)
  })
})



app.get('/scrape2', function(req, res){
 
 
  
 scraper
  .get('https://finance.yahoo.com/gainers/')
  .then(function(tableData) {
    /*
       tableData === 
        [ 
          [ 
            { State: 'Minnesota', 'Capitol City': 'Saint Paul', 'Pop.': '3' },
            { State: 'New York', 'Capitol City': 'Albany', 'Pop.': 'Eight Million' } 
          ] 
        ]
    */
	    res.send(tableData[0]);
  });
  
})

app.listen(port)
  console.log('Server started on port', port);
exports = module.exports = app;
