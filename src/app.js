const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const controllers = require('../controllers/controllers')
const port = process.env.PORT || 3000

const app = express();

//define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', controllers.indexController)

//api for query search
app.get('/weather', controllers.searchController)

//api for auto geolocation
app.get('/autoweather', controllers.autoController)


app.listen(port, () => {

    console.log('Server is up on port '+ port)
})