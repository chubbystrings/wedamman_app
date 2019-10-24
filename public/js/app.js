

//DOM selection
const root = document.getElementById(':root');
const autoWeather = document.querySelector('#autoWeather');
const messageOne = document.getElementById('messageOne');
const messageTwo = document.getElementById('messageTwo');
const IdsRoller = document.getElementById('Ids-roller');
const home = document.getElementById('home');
const header = document.getElementById('header');
const intro = document.getElementById('intro');
const errorMsg = document.getElementById('errorMsg');
const searchDiv = document.getElementById('searchDiv');
const searchLocation = document.getElementById('searchLocation');
const btnSearch = document.getElementById('btnSearch');
const inputError = document.getElementById('inputError');
const clock = document.getElementById('clock');
const formatedDate = document.getElementById('formatedDate');

//months of the year object
const MonthOfTheYear = {
    01: "Jan",
    02: "Feb",
    03: "Mar",
    04: "Apr",
    05: "May",
    06: "Jun",
    07: "Jul",
    08: "Aug",
    09: "Sep",
    10: "Oct",
    11: "Nov",
    12: "Dec"

}

//function for digital clock ticking with setIterval
let amPm
const ticking = () => { 
    let newTime = new Date().toTimeString()
    newTime = newTime.split(' ')[0]
    amPm = newTime.split(':')[0];
    amPm = amPm < 12 ? "AM" : "PM"
    return `${newTime} ${amPm}`
}

//function to get easy readable date 
const convertDate = () => {
    let dayOfTheWeek = new Date().toString();
    // console.log(dayOfTheWeek)
    let day = dayOfTheWeek.split(' ')[0]
    let month = dayOfTheWeek.split(' ')[1]
    let dayDate = dayOfTheWeek.split(' ')[2]
    let year = dayOfTheWeek.split(' ')[3]

    return `${day} ${month} ${dayDate}, ${year}`

}

//render date and  time on the dom
clock.textContent = ticking()
formatedDate.textContent = convertDate()

//make digital clock tick every Second
setInterval(()=> {
  clock.textContent =  ticking()
}, 1000)

//  variable initialization for received data from http request
let coords;
let latitude;
let longitude;
let date;




//Event Listener for forecast button
autoWeather.addEventListener('click', e => {
    e.preventDefault();
    if(!navigator.geolocation){
        return alert('Geolocation is not supported by your browser')
    }
    hideElements()
    navigator.geolocation.getCurrentPosition((position) =>{

      
        ( { coords } = position );
        latitude = coords.latitude 
        longitude = coords.longitude
        

        fetch('/autoweather?lat='+ latitude + '&long='+ longitude)
        .then((res) => {
            return res.json();
        })
        .then((weather) => {
            // console.log(weather)    
            displayForecast(weather)
        })
        .catch((err) => {
           if(err) {
            console.log(err)
            errorMsg.innerText = "Oops something went Wrong..... Please refresh page or try again later"};
            messageOne.innerText =''
        })
    })
})

const char = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
//event listener for search button
btnSearch.addEventListener('click', (e) =>{
    
    e.preventDefault()
    const location = searchLocation.value
    if(!location){
        inputError.textContent = "please enter a valid Location!!!";
        return false
    }
    if(char.test(location) === true){ inputError.textContent = "We don't do that here, remove CHARACTERS"; return false}

    hideElements()

    fetch('/weather?address='+ location).then((response)=>{

        response.json().then((weather) =>{
            if(weather.error){

                errorMsg.textContent = weather.error
                
            }else{
               displayForecast(weather)
                
            }  
            
        })
    })
    
})



//function to hide elements when displaying info

const hideElements = () => {
    inputError.textContent = "";
    searchDiv.style.display = "none"
    autoWeather.style.display = "none"
    home.style.display = 'none'
    IdsRoller.style.removeProperty('display')
    messageOne.innerText = "Hold On a Sec, Gathering Location Information..........."

}

//function to display forecast data on DOM element
const displayForecast = (weather) => {
    
    // console.log(weather)
    header.style.display = "none"
    intro.style.display = "none"
    IdsRoller.style.display = 'none'
    messageOne.innerText = ''
    weather.location? messageTwo.innerText =` In ${weather.location} ${weather.forecast}` : messageTwo.innerText = weather.forecast;
    home.style.display = "inline"
    const icon = weather.forecast.split(' ')[0];
    // console.log(icon)
    if(icon){
        if(icon === 'cloudy' || icon === 'partly-cloudy-day'){
            document.body.style.backgroundSize = 'cover'
            document.body.style.backgroundPosition = 'top'
            document.body.style.backgroundRepeat = 'repeat-y'
            document.body.style.background = "url('/img/cloudy.jpg')"
        }
        if(icon === 'rain'){
            document.body.style.background = "url('/img/rainy.jpg')"
            document.body.style.backgroundSize = 'cover'
            document.body.style.backgroundPosition = 'bottom'
            document.body.style.backgroundRepeat = 'repeat-y'
        }
        if(icon === 'clear-day'){
            
            document.body.style.background = "url('/img/sunshine2.jpeg')"
            messageOne.style.color = 'black'
            messageTwo.style.color = "black"
            document.body.style.backgroundSize = 'cover'
            document.body.style.backgroundPosition = 'top'
            document.body.style.backgroundRepeat = 'repeat-y'
        }
        if(icon === 'partly-cloudy-night' || icon === "clear-night"){
            clock.style.color = 'white'
            formatedDate.style.color = 'white'
            document.body.style.background = "url('/img/cloudy-night.jpg')"
            document.body.style.backgroundSize = 'cover'
            document.body.style.backgroundPosition = 'top'
            document.body.style.backgroundRepeat = 'repeat-y'
        }
    }
}


