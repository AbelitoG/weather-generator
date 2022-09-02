var key = "05cf0fe65e96d4d3fbbf40e8a17bac02"


function searchHandler(){
    var userInput = $(this).siblings('input').val()
    var urlGeo = `http://api.openweathermap.org/geo/1.0/direct?q=${userInput}&appid=${key}`
    fetch(urlGeo).then(function(response){
        return response.json()
    }).then(function(data){
        getWeather(data)
        weekWeather(data)
    })
};
function getWeather(geo){
    var urlWeather = `https://api.openweathermap.org/data/2.5/weather?lat=${geo[0].lat}&lon=${geo[0].lon}&appid=${key}`
    fetch(urlWeather).then(function(response){
        return response.json()
    }).then(function(data){
        console.log(data)
    })
};
function weekWeather(geo){
    var urlWeek = `https://api.openweathermap.org/data/2.5/forecast?lat=${geo[0].lat}&lon=${geo[0].lon}&appid=${key}`
    fetch(urlWeek).then(function(response){
        return response.json()
    }).then(function(data){
        console.log(data)
    })
}













$( ".btn" ).click(searchHandler);