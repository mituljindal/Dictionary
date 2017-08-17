function search() {

  document.getElementById('jumbo').hidden = 'hidden';
  document.getElementById('spinner').hidden = '';
  var x = document.getElementById('word')
  var word = x.value;

  var app_key = "WYk3QabfhhjeYrFLvB27Gl1CuS1vDalJ";

  let url = 'https://api.pearson.com/v2/dictionaries/ldoce5/entries?headword=' + word + '&' + app_key + '=YOUR_CONSUMER_KEY';

  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var obj=this.responseText;
      var jsonFile = JSON.parse(obj);
      jsonParsing(jsonFile);
    }
  };
  xhr.open("GET", url, true);
  xhr.send();
}

function jsonParsing(jsonObject) {

  if (jsonObject.hasOwnProperty('results')) {
    var results = jsonObject.results;
  }

  var senses = new Array();
  for(var i =0; i < results.length; i++) {
    if (results[i].hasOwnProperty('senses')) {
      senses.push(results[i].senses);
    }
  }

  var definition = new Array();
  for (var i = 0; i < senses.length; i++) {
    for(var j = 0; j < senses[i].length; j++) {
      if(senses[i][j].hasOwnProperty('definition')) {
        definition.push(senses[i][j].definition);
      }
    }
  }

  let defString = '';
  for(var i = 0; i < definition.length; i++) {
      defString += definition[i] + '<br /><br/>';
  }
  document.getElementById('spinner').hidden = 'hidden';
  document.getElementById('jumbo').hidden = '';
  var textSpace = document.getElementById("textSpace");
  textSpace.innerHTML = defString;
}

var word = document.getElementById('word');
word.addEventListener("keydown", function(e) {

  if (e.keyCode == 13) {
    e.preventDefault();
    search();
  }
});
