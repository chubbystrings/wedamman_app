

//DOM selection
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

// const IdsRollerTwo = document.getElementById('Ids-rollerTwo');
// const container = document.getElementById('container');

//variable initialization
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


btnSearch.addEventListener('click', (e) =>{
    
    e.preventDefault()
    const location = searchLocation.value
    if(!location){
        inputError.textContent = "please enter a valid Location!!!";
        return false
    }

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





const hideElements = () => {
    inputError.textContent = "";
    searchDiv.style.display = "none"
    autoWeather.style.display = "none"
    home.style.visibility = 'hidden'
    IdsRoller.style.removeProperty('display')
    messageOne.innerText = "Hold On a Sec, Gathering Location Information..........."

}


const displayForecast = (weather) => {
    
    console.log(weather)
    header.style.display = "none"
    intro.style.display = "none"
    IdsRoller.style.display = 'none'
    messageOne.innerText = ''
    weather.location? messageTwo.innerText =` In ${weather.location} ${weather.forecast}` : messageTwo.innerText = weather.forecast;
    home.style.removeProperty('visibility')
}