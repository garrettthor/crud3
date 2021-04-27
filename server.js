const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const PORT = 1984
require('dotenv').config()

let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'database3'

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
    .then(client => {
        console.log(`We connected to the motha truckin ${dbName}!`)
        db = client.db(dbName)
    })
    .catch(err =>{
        console.log(err)
    })

app.set('view engine', 'ejs');
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.get('/', (req, res) => {
    db.collection('characters').find().toArray()
    .then(data => {
        db.collection('characters').countDocuments({activeChar: true})
        .then(activeTeam => {
            res.render('index.ejs', {charArray: data, active: activeTeam})
        })
    })
    .catch(err => {
        console.log(err)
    })
})

app.post('/createChar', (req, res) => {
    console.log(req.body.charName)
    db.collection('characters').insertOne({
        character: req.body.charName, 
        activeChar: false,
        charClass: req.body.charClass
    })
    .then(result => {
        console.log(`The character ${req.body.charName} has been added.`)
        res.redirect('/')
    })
    .catch(err => {
        console.log(err)
    })
})

app.put('/toggleActiveChar', (req, res) => {
    db.collection('characters').updateOne({ character: req.body.targetText }, 
        {$set: {
        activeChar: true,
        }
    })
    .then(result => {
        console.log(`${req.body.targetText} is now ACTIVE.`)
        res.json('Character activity toggled.')
    })
    .catch(err => {
        console.log(err)
    })
})

app.put('/UndoToggleActiveChar', (req, res) => {
    db.collection('characters').updateOne({ character: req.body.targetText }, 
        {$set: {
        activeChar: false,
        }
    })
    .then(result => {
        console.log(`${req.body.targetText} is now INACTIVE.`)
        res.json('Character activity toggled.')
    })
    .catch(err => {
        console.log(err)
    })
})

app.delete('/deleteChar', (req, res) => {
    db.collection('characters').deleteOne({ character: req.body.targetText})
    .then(result => {
        console.log(`Deleted character ${req.body.targetText}`)
        res.json('Deleted it!')
    })
    .catch(err => {
        console.log(err)
    })
})

app.listen(PORT, ()=>{
    console.log(`Server is running @ port ${PORT}`)
})