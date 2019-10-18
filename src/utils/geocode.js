const request = require('request')

const geocode = (address, callback) => {

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoiY2h1YmJ5Y29kZSIsImEiOiJjandqYmF3aGQwaWJyNGNuNmtrNm16emZkIn0.v_quLf5bUOLj6yfEKx8oOw&limit=1'

    request({url, json: true}, (error, { body }) => {

        if(error){
            callback('unable to connect to server', undefined)
        }else if(body.features.length === 0){
            callback('Cannot find location', undefined)
        }else{
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode