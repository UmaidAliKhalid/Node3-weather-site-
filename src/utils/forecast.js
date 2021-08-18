const request = require('postman-request');

const forecast = (lat,long, callback) => {
const url = 'http://api.weatherstack.com/current?access_key=6c30feddcb312e19b788285f8974f754&query='+lat+','+long+'&units=f'
request({url, json: true}, (error, response,body) => {
    if (error) {
    callback('Unable to  connect to weather service', undefined)
    }
    else if (body.error){
        callback('Unable to  connect to find location', undefined)
    }
    else {
    const current= body.current
    callback(undefined,current.weather_descriptions[0]+ '. It is currently ' + current.temperature +' degrees out. It feels like ' +current.feelslike +' degrees out')
    }
    } )

    
}

module.exports =forecast