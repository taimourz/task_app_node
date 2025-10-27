import express from 'express'
import './db/mongoose.js'
import {User} from './db/models/user.js'
import {Task} from './db/models/task.js'

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.post('/tasks', (req, res) =>{

    const task = new Task(req.body)

    task.save().then(() => {
        res.status(201).send("Task created sucessfully")
    }).catch((error) => {
        res.status(400).send("Error occured: " + error)
    })    
})

app.post('/users', (req, res) => {
    const me = new User(req.body)

    me.save().then(() => {
        res.status(201).send(me)
    }).catch((error) => {
        res.status(400).send("Error", error)
    })        


})

app.listen(port, () => {
    console.log("Listening on port 3000: ")    
})