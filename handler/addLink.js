

function addLink(address, route) {
    let links = require('../links.json')
    const fs = require('fs')
    // links = JSON.parse(links)

    links[route] = address
    links = JSON.stringify(links)
    fs.writeFileSync('./links.json', links)
    
}

// addLink("github.com", "hub")

module.exports = {
    addLink
}