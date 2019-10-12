const request=require('request')

const geocode=(address,callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?proximity=-74.70850,40.78375&access_token=pk.eyJ1Ijoic2Fpbml0ZXNoIiwiYSI6ImNrMDJ4Z3J6bTF6MW8zb3FkYTN4a2tmb2sifQ.GpkXluMy_Q4MInJO5qf_BA'
    request({url:url,json:true},(error,{body})=>{
        if(error){
            callback('Unable to connect to location services!',undefined)
        }else if(body.features.length===0){
            callback('Unable to find the location. Try another search',undefined)
        } else{
            callback(undefined,{
                latitude:body.features[0].center[1],
                longitude:body.features[0].center[0],
                location: body.features[0].place_name

            })
        }

    })
} 



module.exports=geocode
