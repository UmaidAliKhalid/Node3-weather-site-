const request = require('postman-request');

const geocode = (address, callback) => {
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address)+ '.json?access_token=pk.eyJ1IjoidW1haWQiLCJhIjoiY2tzYnhkbnRiMGI4dDJwbXNyYjR0azl2OSJ9.YB2IuGRIeWY6H7w0Ug8XsA&limit=1'
    request({url, json: true}, (error, response, body) => {
    if (error) {
        callback('unable to connect to location services!')
    }
    else if (body.features.length ===0){
        callback('Unable to find location. Try another search', undefined)
    }
    
    else  {
        callback(undefined,{
            lat: body.features[0].center[1],
            log: body.features[0].center[0],
            location: body.features[0].place_name
    
        })
    }
    
    })
    }

    module.exports =geocode