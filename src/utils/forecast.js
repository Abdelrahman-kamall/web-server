const request = require("request")

const forecast =(latitude,longitude,res,addr,location,call_back_fnc) =>{
    const url = 'https://api.darksky.net/forecast/a2958fd4b083d496f479d49678e68a27/'+latitude + ',' + longitude+'?units=si&lang=en'
request({
    url,
    json:true
},(error,{body})=>{
    call_back_fnc(error,body,res,addr,location)
})
}

module.exports = forecast