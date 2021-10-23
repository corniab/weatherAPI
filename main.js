// Get the latitude and longitude of IP address
// Fetch the National Weather Service /points/ which returns the correct forecast api for your location
const locationApi = 'https://ipapi.co/json/'
fetch(locationApi).then(response => response.json())
                  .then(coords => {
                      const weatherApi = `https://api.weather.gov/points/${coords["latitude"]},${coords["longitude"]}`
                      return fetch(weatherApi)
                    })
                  .then(response => response.json())
                   .then(locationGrid => {
                       forecastApi = locationGrid["properties"]["forecast"]
                       return fetch(forecastApi)
                   })
                   .then(response => response.json())
                   .then(forecast => output(forecast["properties"]["periods"]));

// Output data to document
function output(forecast) {
  for (let i = 0; i < forecast.length; i++) {
    
    let article = document.createElement("article")
    article.className = "card"  

    let header = document.createElement("header")
    let heading = document.createElement("h2")
    heading.textContent = forecast[i].name

    let img = document.createElement("img")
    img.src = forecast[i].icon
    img.alt = "Weather Forecast"

    let div = document.createElement("div")
    div.className = "content"

    let description = document.createElement("p")
    description.textContent = forecast[i].detailedForecast

    header.append(heading)
    div.append(description)

    article.append(header)
    article.append(img)
    article.append(div)

    let main = document.getElementById("forecast")
    main.append(article)
  }
};


