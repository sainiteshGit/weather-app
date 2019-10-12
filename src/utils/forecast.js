const request=require('request')

const forecast=(latitude,longitude,callback)=>{
    //const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?proximity=-74.70850,40.78375&access_token=pk.eyJ1Ijoic2Fpbml0ZXNoIiwiYSI6ImNrMDJ4Z3J6bTF6MW8zb3FkYTN4a2tmb2sifQ.GpkXluMy_Q4MInJO5qf_BA'
    const url='https://api.darksky.net/forecast/3f8c4b3d4560fd96a4b2b3c6abe16237/'+encodeURIComponent(latitude+','+longitude)+'?units=si&lang=en'
    
    request({url,json:true},(error,{body})=>{
        if(error){
            callback('Unable to connect to weather services!',undefined)
        }else if(body.error){
            callback('Unable to find the location. Try another search',undefined)
        } else{
            callback(undefined,{
                status: body.daily.data[0].summary+'It is currently '+ body.currently.temperature+' degrees out.'+' There is a '+body.currently.precipProbability+'% chance of rain'

                // latitude:response.body.features[0].center[1],
                // longitude:response.body.features[0].center[0],
                // location: response.body.features[0].place_name

            })
        }

    })
} 

module.exports=forecast
