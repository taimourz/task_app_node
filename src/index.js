import express from 'express'
import './db/mongoose.js'
import {User} from './db/models/user.js'
import {Task} from './db/models/task.js'

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.get('/users', (req, res) => {
    User.find({}).then((users) => {
        res.send(users)
    }).catch((error) => {
        res.status(404).send()
    })
})

app.get('/users/:id', (req, res) => {
    const _id = req.params.id

    User.findById(_id).then((user) => {
        
        if(!user){
            return res.status(404).send()
        }

        res.status(201).send(user)

    }).catch(error => {
        res.status(404).send(error)
    })
})

app.get('/tasks', (req, res) => {
    Task.find({}).then((tasks) => {
        res.send(tasks)
    }).catch((error) => {
        res.status(404).send()
    })
})

app.get('/tasks/:id', (req, res) => {
    const _id = req.params.id

    Task.findById(_id).then((task) => {
        
        if(!task){
            return res.status(404).send()
        }

        res.status(201).send(task)

    }).catch(error => {
        res.status(404).send(error)
    })
})

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