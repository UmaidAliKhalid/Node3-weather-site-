const express = require ('express')
const path = require('path')

const app = express()
const port = process.env.PORT || 3000

const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')
// Define paths for Express config
const publicSDir = path.join(__dirname,'../public')
const viewPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')
//Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialsPath)

// Setup Static directory to serve
app.use(express.static(publicSDir))


//Home page
app.get('', (req,res) =>{
    res.render('index', {
        title: 'Weather App', 
        name: 'Ali'
    })
})

//About page
app.get('/about', (req,res) =>{
    res.render('about', {
        title:'About me',
        name: 'Ali'
    })
})

//Help page
app.get('/help', (req,res) =>{
    res.render('help', {
        helpText: 'Some helpful text',
        title:'Help me',
        name: 'Ali'
    })
})

//Weather page
app.get('/weather', (req, res)  =>{
    if (!req.query.address){
        return res.send({
            error: 'Address must be provided'
        })
    }
    geocode(req.query.address, (error, {lat, log, location}={}) =>{
        if (error){
            return res.send({ error })
        }
        forecast(lat, log, (error, forecastdata) => {
            if (error){
                return res.send({error})
            }
            res.send({
                forecast: forecastdata,
                location,
                address: req.query.address
          })
    })
    })
})

app.get('/products', (req, res)  =>{
        if (!req.query.search){
            return res.send({
                error: 'You must provide search here'
            })
        }
        console.log(req.query.search)
        res.send({
                products: []
        })
        })

app.get ('/help/*',(req,res) =>{
    res.render('404', {
        title: '404 Help',
        name: 'Ali',
        errorMsg: 'Help article not found'
    })
})

//Error
app.get('*', (req, res) =>{
    res.render('404', {
        title: '404',
        name: 'Ali',
        errorMsg: 'Page not found'
    })
})

app.listen(port, () =>{
    console.log('Server is up on port ' + port)
})