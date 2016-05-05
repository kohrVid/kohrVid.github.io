$(document).ready(function(){
  $.ajax({
	 async: false,
	 type: "GET",
	 url: "http://jsonip.com",
	 dataType: "jsonp",
	 success: function(data) {
		var geoUrl = "http://www.geoplugin.net/json.gp?ip=" + data.ip + "&jsoncallback=?";
		$.ajax({
		  async: false,
		  type: "GET",
		  jsonp: 'callback',
		  url: geoUrl,
		  dataType: "jsonp",
		  success: function(geo){
			 var openWeatherUrl = "http://api.openweathermap.org/data/2.5/weather?lat=" + geo.geoplugin_latitude +"&lon=" + geo.geoplugin_longitude + "&APPID=45528d7d6d4b3e8c0a902ba9a0893531&units=metric";
			 $.ajax({
				async: false,
				type: "GET",
				url: openWeatherUrl,
				dataType: "jsonp",
				success: function(a){
				  getBackground(a);
			     getLocation(a);
				  getTemperature(a);
				  getIcon(a);
				}
			 });
		  },
		  error: function(){
			 location.reload(true);
		  }
		});
    }
  });
  var getBackground = function(api){
	 var weatherImage = {
		"clear sky": "https://kohrvid.github.io/FreeCodeCamp/local-weather/images/clear-sky.jpg",
		"few clouds": "https://kohrvid.github.io/FreeCodeCamp/local-weather/images/few-clouds.jpg",
		"scattered clouds": "https://kohrvid.github.io/FreeCodeCamp/local-weather/images/scattered-clouds.png",
	  "broken clouds": "https://kohrvid.github.io/FreeCodeCamp/local-weather/images/broken-clouds.jpg",
		"shower rain": "https://kohrvid.github.io/FreeCodeCamp/local-weather/images/shower-rain.jpg",
		"rain": "https://kohrvid.github.io/FreeCodeCamp/local-weather/images/rain.jpg",
		"light rain": "https://kohrvid.github.io/FreeCodeCamp/local-weather/images/light-rain.jpg",
		"thunderstorm": "https://kohrvid.github.io/FreeCodeCamp/local-weather/images/thunderstorm.jpg",
		"snow": "https://kohrvid.github.io/FreeCodeCamp/local-weather/images/snow.jpg",
		"mist": "https://kohrvid.github.io/FreeCodeCamp/local-weather/images/mist.jpg"
	 }
	 for(var i in weatherImage){
      if (i === api.weather[0].description){
        $("body").css("background", "url(" +weatherImage[i]+") no-repeat");
        $("body").css("background-size", "100%");
	   }
	 };
  }
  var getLocation = function(api){
	 var region = api.name;
	 $("#location").html("<h1>" + region + "</h1>");
  }
  var getIcon = function(api){
	 var icon = "http://openweathermap.org/img/w/" + api.weather[0].icon + ".png";
	 $("#icon").html("<img width = '75' height = '75' src = '" + icon + "' />");
  }
  var getTemperature = function(api){
	 var cTemp = api.main.temp.toFixed(1);
	 var fTemp = ((api.main.temp * 1.8) + 32).toFixed(1);
	 var celsius = true;
	 $("#temperature").html("<h3>" + api.weather[0].description +" <a id = 'switchUnit' href = '#'>"+ cTemp + "°C</a></h3>");
	 
	 $("#switchUnit").click(function(){
		if (celsius === true){
		  $("#switchUnit").html(fTemp + "°F");
		  celsius = false;
		} else {
		  $("#switchUnit").html(cTemp + "°C");
		  celsius = true;
		}
	 });
  }
});
