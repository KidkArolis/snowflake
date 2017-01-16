const path = require('path')
const express = require('express')

const dev = (process.env.NODE_ENV || 'development') === 'development'
const PORT = process.env.PORT || 8070

const app = express()

if (dev) require('./webpack')(app)
app.use(express.static(path.join(__dirname, 'public')))

app.listen(PORT, () => {
  console.log('Snowflake running on http://localhost:' + PORT)
})
