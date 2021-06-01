const express = require('express')
const app = express()
const {addLink} = require('./handler/addLink')
const {generateRoute} = require('./handler/generateRoute')
let links = require('./links.json')
const port = process.env.PORT || 3333

app.use(express.urlencoded({extended:true}))
app.use('/', express.static(__dirname+"/public"))

app.get('/short', (req, res) => {
    if(req.query.custom) {
        if(links[req.query.custom]) {
            res.send({taken:true,message:"Already acquired!!!!"})
        }
        else {
            addLink(req.query.add, req.query.custom)
            res.send(`
                <h4>Shortened link : </h4>
                <a href="https://linksmall.herokuapp.com/${req.query.custom}"> https://linksmall.herokuapp.com/${req.query.custom}</a>
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
            <h4>Shortened link : </h4>
            <a href="https://linksmall.herokuapp.com/${route}">https://linksmall.herokuapp.com/${route}</a>
        `)
    }
})

app.get('/:route', (req, res) => {
    if(links[req.params.route]) {
        res.redirect(links[req.params.route])
    }
    else {
        res.status(404).send(`
            <h4>No link found on this path</h4>
            Goto <a href="https://linksmall.herokuapp.com">linksmall</a> to create one.
        `)
    }
})

app.listen(port, () => {
    console.log("Server started on ",port)
})
