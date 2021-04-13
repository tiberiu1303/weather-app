const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
 
// Setup handlebards engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirPath))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Tiberiu Stancu'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Tiberiu Stancu'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Tiberiu Stancu',
    })
});

app.get('/weather', (req, res) => {
    const {address} = req.query;

    if (!address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(address, (error, {longitude, latitude, location} = {}) => {
        if (error) {
            return res.send({
                error
            })
        }

        forecast(longitude, latitude, (error, message) => {
            if (error) {
                return res.send({
                    error
                })
            }

            res.send({
                location: location,
                forecast: message,
                address: address
            })
        })
    })
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 page',
        message: 'Help article not found',
        name: 'Tiberiu Stancu'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404 page',
        message: 'Page not found',
        name: 'Tiberiu Stancu'
    })
})

app.listen(port, () => {
    console.log('Server started on port 3000!')
});