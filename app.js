const express = require("express")
const https = require("https")

const app = express()
app.use(express.urlencoded({extended:true}))
app.use(express.static(__dirname))

app.get("/", function(req, res) {
    res.sendFile(__dirname+"/signup.html")
})

app.post("/", function(req, res) {
    const data = {
        members: [
            {
                email_address: req.body.eMail,
                status: "subscribed",
                merge_fields: {
                    FNAME: req.body.fName,
                    LNAME: req.body.lName
                }
            }
        ]
    }
    jsonData = JSON.stringify(data)
    const url = "https://us6.api.mailchimp.com/3.0/lists/e8afc7efe4"
    const options = {
        method: "POST",
        auth: "ritam_z:4abb1dfe4714612b218989690aed255b-us6"
    }
    const request = https.request(url, options, function(response) {
        if(response.statusCode == 200){
            res.sendFile(__dirname+"/success.html")
        } else{
            res.sendFile(__dirname+"/failure.html")
        }
    })

    request.write(jsonData)
    request.end()
})

app.post("/failure", function(req, res) {
    res.redirect("/")
})

app.listen(process.env.PORT || 3000, function() {
    console.log("Server set up at port "+process.env.PORT)
})

//Api-key 4abb1dfe4714612b218989690aed255b-us6
//list id e8afc7efe4