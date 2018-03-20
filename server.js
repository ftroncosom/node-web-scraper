var express = require('express');
var fs      = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();
var list = new Array();

app.get('/scrape', function(req, res){
  // Let's scrape Anchorman 2
  url = 'https://si3.bcentral.cl/indicadoressiete/secure/indicadoresdiarios.aspx';

  request(url, function(error, response, html){
    if(!error){
      var $ = cheerio.load(html);

      var title, release, rating;
      

      $("tr.filas_indicadores").filter(function(){
        var data = $(this);
        var json = { name : "", value : ""};  

        name = data.children().first().text();
        value = data.children().first().next().text();
        json.name = name;
        json.value = value;
        list.push(json);

        console.log('json => ' + JSON.stringify(json, null, 4));  
      });
      /*$('.title_wrapper').filter(function(){
        var data = $(this);
        title = data.children().first().text().trim();
        release = data.children().last().children().last().text().trim();

        json.title = title;
        json.release = release;
      })

      $('.ratingValue').filter(function(){
        var data = $(this);
        rating = data.text().trim();

        json.rating = rating;
      })*/

      console.log('json => ' + JSON.stringify(list, null, 4));  
    }
    
    

    fs.writeFile('output.json', JSON.stringify(list, null, 4), function(err){
      console.log('File successfully written! - Check your project directory for the output.json file');
    })

    res.send('Check your console!')
  })
})

app.listen('8081')
console.log('Magic happens on port 8081');
exports = module.exports = app;
