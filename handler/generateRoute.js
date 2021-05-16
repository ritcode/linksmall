function generateRoute() {
    let route =''+ Math.floor(Math.random()*2**18).toString(36).padStart(4, 0)
    return route
}
// console.log(typeof(generateRoute()))

module.exports = {
    generateRoute
}