console.log("here from the client side js")



const weatherForm = document.querySelector("form")
const locationInput = document.querySelector("input")
const forecastInput = document.querySelector("#forecast")
var address = ""
weatherForm.addEventListener("submit", (event)=>{
    event.preventDefault()
    console.log("location submitted")
    address = locationInput.value
    console.log(address)
    const url = 'http://localhost:3000/weather?address=' + address
fetch(url).then(
    response =>{
        response.json().then(data=>{
            if(data.error){
                forecastInput.textContent = data.error
            }else{
                forecastInput.textContent = "forcast for the location " + data.location +"\n" + data.forcast
            }
            
            console.log(data)
        })
    }
)
})

