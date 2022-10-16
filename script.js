var key = "05cf0fe65e96d4d3fbbf40e8a17bac02";
var todayBoxEl = $('#todayBox');
var fiveDayEl = $('#cardRow');

function searchHandler(){
    var userInput = $(this).siblings('input').val()
    var urlGeo = `https://api.openweathermap.org/geo/1.0/direct?q=${userInput}&appid=${key}`
    fetch(urlGeo).then(function(response){
        return response.json()
    }).then(function(data){
        getWeather(data)
        weekWeather(data)
    })
};
function getWeather(geo){
    var urlWeather = `https://api.openweathermap.org/data/2.5/weather?lat=${geo[0].lat}&lon=${geo[0].lon}&appid=${key}&units=imperial`
    fetch(urlWeather).then(function(response){
        return response.json()
    }).then(function(data){
        console.log(data)
        var pCity = $('<p>')
        pCity.text('City: ' + data.name)
        var pDate = $('<p>')
        pDate.text ('Date: ' + moment.unix(data.dt).format('MM/DD/YYYY'))
        var image = $('<img>')
        image.attr('src', `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`)
        var pTemp = $('<p>')
        pTemp.text('Tempature: ' + data.main.temp)
        var pHumidity = $('<p>')
        pHumidity.text('Humidity: ' + data.main.humidity)
        var pWind = $('<p>')
        pWind.text('Wind: ' + data.wind.speed)
        todayBoxEl.append(pCity, pDate, image, pHumidity, pTemp, pWind)
    })
};
function weekWeather(geo){
    var urlWeek = `https://api.openweathermap.org/data/2.5/forecast?lat=${geo[0].lat}&lon=${geo[0].lon}&appid=${key}&units=imperial`
    fetch(urlWeek).then(function(response){
        return response.json()
    }).then(function(data){
        console.log(data)
    for (var i=5 ; i < data.list.length; i+=8){
        var container = $('<div>')
        container.addClass('col-md-2');
        var pCity = $('<p>')
        pCity.text('City: ' + data.list[i].name)
        var pDate = $('<p>')
        pDate.text ('Date: ' + moment.unix(data.list[i].dt).format('MM/DD/YYYY'))
        var image = $('<img>')
        image.attr('src', `https://openweathermap.org/img/wn/${data.list[i].weather[0].icon}@2x.png`)
        var pTemp = $('<p>')
        pTemp.text('Tempature: ' + data.list[i].main.temp)
        var pHumidity = $('<p>')
        pHumidity.text('Humidity: ' + data.list[i].main.humidity)
        var pWind = $('<p>')
        pWind.text('Wind: ' + data.list[i].wind.speed)
        container.append(pDate, image, pHumidity, pTemp, pWind)
        fiveDayEl.append(container)
    }
    })
}













$( ".btn" ).click(searchHandler);