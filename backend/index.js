require('dotenv').config()
const express = require('express')
const port = process.env.PORT
const mongoose = require('mongoose')
const cors = require('cors')
const defineCurrentUser = require('./middleware/defineCurrentUser')

const app = express()


// MIDDLE WARE
app.use(cors());
app.use(express.json()); // to parse request body json
app.use(defineCurrentUser) // for web token authentication - get the current user
app.use(express.urlencoded({ extended: true }))

// Mongoose
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true}, 
    (e) => { console.log(e) }
  )

console.log('[Mongoose] running at ' + process.env.MONGO_URI)


app.get('/', (req, res) => {
    res.json('Server is working')
})

app.use('/api/users', require('./controllers/users'))
app.use('/api/exhibits', require('./controllers/exhibits'))
app.use('/api/userAuthTest', require('./controllers/user-auth-test'))

app.listen(port, ()=>{
    console.log('[Express] The Server is live on ' + port)
})