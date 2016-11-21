// 1. Set up array that will store weather items (objects) from the API
var Weather = [];

// 2. Function that adds items (objects) to the array
var addToArray = function (data){

  //create custom object template
  var weatherObj = {
    location: data.name,
    tempCel: data.main.temp,
    clouds: data.clouds.all,
    humidity: data.main.humidity
  };

  //push the object to the array
  //sdfasdf
  Weather.push(weatherObj);

  //empty input values
  $('.cityInput').val('');

//invoke addToHTML
addToHtml();
};

// 4. Function that GETs the API data in real time
var fetch = function(){
  var location = $('.cityInput').val();

  var url = 'http://api.openweathermap.org/data/2.5/weather?q='+location+'&appid=d703871f861842b79c60988ccf3b17ec&units=imperial';

  $.ajax({
    method: "GET",
    url: url,
    dataType: "json",
    success: function(data){
      console.log(data);
      addToArray(data);
      },
    error: function() {
      console.log("error");
    }  
  });
};

// 3. Function that calibrates and then injects the 
// new object data from the Library array into infos div
var addToHtml = function(){
  $('.appendedWeather').empty();

  // What is the element that holds the source of the template?
  var source = $('#weather-template').html();

  // compile the source and assign the compiled to variable
  var template = Handlebars.compile(source);

  // loop through array and choose array item to compile, assign it to newHTML
  for(var i = 0; i < Weather.length; i++){
    var newHTML = template(Weather[i]);
    // append newHTML 
    $('.appendedWeather').append(newHTML);
  }

};

// 5. fetch() (GET API data) upon click
$('.btn-primary').on("click", function(e){
  e.preventDefault();

  //api request
  fetch();
});