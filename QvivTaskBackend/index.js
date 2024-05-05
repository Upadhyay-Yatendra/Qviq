const express = require('express')
var cors = require('cors')
const app = express()
const port = 3000
const connect_to_database = require('./database/connect')

// data base connection 
connect_to_database().catch(err => console.log(err))

app.use(express.json());
app.use(cors())
app.use('/static', express.static('static'))

// routes 
app.use('/',require('./routes/basic'))
app.use('/api/auth',require('./routes/auth'))
app.use('/api/linktree',require('./routes/linktree'))


app.listen(port,()=>{
    console.log(`Backend of QvivProject listening at http://localhost:${port}`)
})