const express = require('express')
const knex = require('knex');
const bodyParser = require('body-parser')
const cors = require('cors')

const db = knex({
    client: 'pg',
    connection: {
      connectionString: process.env.DATABASE_URL,
      ssl: true,
    }
  });
  
const app = express();

app.use(bodyParser.json())
app.use(cors())


app.get('/', (req, res) => {
 db.select('*').from('data').then(data => {
  res.send(data)
})
})


app.post('/', (req,res) => {
 const {name, temp, feellike, visibility, windspeed, status, date} = req.body
 db('data').returning('*').insert({
     name: name,
     temp: temp,
     feellike: feellike,
     visibility: visibility,
     windspeed: windspeed,
     status: status,
     date: date
 }).then(response => {
   res.json(response)
 })
 
})

app.listen(process.env.PORT || 3000)