const request = require('request')
const moment = require('moment-timezone')


const forecast = (latitude, longitude, callback) => {

    const url = 'https://api.darksky.net/forecast/e668afb848121ffd5937b3968f8347f1/'+ latitude + ',' + longitude +'?units=si'


    request({url, json: true}, (error, { body }) =>{

        if(error){

            callback('Unable to connect to server', undefined)

        }else if(body.error){
            callback('unable to find location', undefined)

        }else{
                
                const time = moment().tz(body.timezone).format("hh:mma")
               callback(undefined, ` The current time  is ${time}, In summary for this week  ${body.daily.summary}, while 
               ${body.hourly.summary} The current temperature is ${body.currently.temperature}C` )
        }
    })
}

module.exports = forecast