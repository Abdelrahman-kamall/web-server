const request = require("request")
const geo_code = (address,res,call_back_fnc)=>{
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURIComponent(address)+
    ".json?access_token=pk.eyJ1Ijoia2FtYWw5OCIsImEiOiJjazl6Nzd3bXAwYnRsM2RudnE5aXg0aHY0In0.F1pd05rqzkfrd3EUj27msQ&limit=1"
    request({
        url,
        json:true
    },(error,{body})=>{
           call_back_fnc(error,body,res,address)
    })
}

module.exports={
    geo_code:geo_code
}