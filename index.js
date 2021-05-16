const express = require('express')
const app = express()
let links = require('./links.json')
const {addLink} = require('./handler/addLink')
const {generateRoute} = require('./handler/generateRoute')


app.use(express.urlencoded({extended:true}))
app.use('/', express.static(__dirname+"/public"))

app.get('/short', (req, res) => {
    // console.log(typeof(req.query.add), typeof(req.query.custom))
    if(req.query.custom) {
        if(links[req.query.custom]) {
            res.send("Already aquired!!!!")
        }
        else {
            addLink(req.query.add, req.query.custom)
            res.send(`
            <a href="https:ritweb.ml/${req.query.custom}"> https:ritweb.ml/${req.query.custom}</a>
        `)
        }
        
    }
    else {
        let route = generateRoute()
        while(links[route]){
            route = generateRoute()
        }
        addLink(req.query.add, route)
        res.send(`
            <a href="https:ritweb.ml/${route}"> https:ritweb.ml/${route}</a>
        `)
    }
})

app.get('/:route', (req, res) => {
    if(links[req.params.route]) {
        res.redirect(links[req.params.route])
    }
    else {
        res.send("ERROR 404: No such url find")
    }
})

app.listen(process.env.PORT || 3333, () => {
    console.log("Server started on port 3333")
})
