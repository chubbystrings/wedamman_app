const forecast = require('../src/utils/forecast')
const geocode = require('../src/utils/geocode')

exports.searchController = (req, res) => {
    if(!req.query.address){
        return res.send({
            error: "Please enter address"
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error){
           return res.send({
                error
            })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if(error){ 
                return res.send({error})
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
   
};


exports.autoController = (req, res) =>{
    if(!req.query.lat || !req.query.long){
        return res.send({
            error: 'please provide provide longitude or latitude'
        })

    }

    forecast(req.query.lat, req.query.long, (error, forecastData) =>{
        if(error){
            return res.send({
                error: error
            })
        }

        res.send({
            forecast: forecastData
           
        })
    })

};

exports.indexController = (req, res) => {
    res.render('index', {
        title: 'Wedamann App',
        name: 'chubbystrings'
    })
};