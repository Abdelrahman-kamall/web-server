console.log("here from the client side js")

fetch('http://localhost:3000/weather?address=alexandria%20egypt').then(
    response =>{
        response.json().then(data=>{
            console.log(data)
        })
    }
)