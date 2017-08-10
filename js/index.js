function getLocalWeather() {
  var lat, long;
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error, geoOptions);
  } else {
    alert("Geolocation services are not supported by your web browser.");
  }

  function success(position) {
    lat = position.coords.latitude.toFixed(5);
    long = position.coords.longitude.toFixed(5);
    getWeather(lat, long);
    $("#latLong").append(lat + "°, " + long + "°");
  }

  function error(error) {
    alert("This app only works over a secure connection. Please add 'https://' to the beginning of the URL (i.e. 'https://codepen.io/AbdiViklas/pen/NrRxqx'). Error code and message: " + error.code + ": " + error.message);
  }

  var geoOptions = {
    enableHighAccuracy: true,
    maximumAge: 30000,
    timeout: 27000
  };
}

function getWeather(latitude, longitude) {
  $.getJSON("https://api.forecast.io/forecast/25dafa45c7e7aacbe25bdfd1dfbdc89e/" + latitude + "," + longitude + "?callback=?", function (data) {
    var conditions = data.currently.summary;
    var tempF = data.currently.temperature;
    var tempC = (tempF - 32) / 1.8
    var icon = data.currently.icon;
    $("#currentWeather").append(conditions);
    var skycons = new Skycons({ "color": "#f3e5f5" }); //this line generates the set of Skycons, and also changes the default color to a hint of purple
    skycons.set("icon1", icon); //this first points to the <canvas> element with ID "icon1," and the sets the var icon above to it
    skycons.play(); //and the animation starts!
    $("#tempText").text("TEMP: " + Math.round(tempF) + "°");
    $("#tempUnits").text("F");
    $("#FCButton").click(function () {
      if ($("#tempUnits").text() === "F") {
        $("#tempText").text("TEMP: " + Math.round(tempC) + "°");
        $("#tempUnits").text("C");
      } else {
        $("#tempText").text("TEMP: " + Math.round(tempF) + "°");
        $("#tempUnits").text("F");
      }
    });
  })
}

$(document).ready(getLocalWeather());