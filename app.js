const express = require('express')
const app = express()
const port = 3002
const routes = require('./routes/routes')
const layout = require('express-ejs-layouts')

//Static Files
app.use(express.static('public'))

//Set Templating
app.use(layout)
app.set('layout', './layouts/layout')
app.set("view engine", "ejs")


app.use('/', routes)


app.listen(port, () => {
    console.info(`Conectado na porta: ${port}`)
}) 