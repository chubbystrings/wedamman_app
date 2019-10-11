
const displayForecast = (weather) => {
    header.style.display = "none"
    intro.style.display = "none"
    IdsRoller.style.display = 'none'
    messageOne.innerText = ''
    messageTwo.innerText = ` Your current time is ${new Date().toLocaleTimeString().toLocaleLowerCase()}, In summary for this week  ${weather.forecast.daily.summary}, while 
    ${weather.forecast.hourly.summary} The current temperature is ${weather.forecast.currently.temperature}C` 
    home.style.removeProperty('visibility')
}

module.exports = displayForecast;