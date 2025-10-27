import express from 'express'
import './db/mongoose.js'
import {User} from './db/models/user.js'
import {Task} from './db/models/task.js'

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.get('/users', async (req, res) => {

    try{
        const users = await User.find({})
        res.send(users)
    }catch(e){
        res.status(404).send(e)
    }
})

app.get('/users/:id', async (req, res) => {
    
    try{
        const _id = req.params.id
        const user = await User.findById(_id)
        if(!user){
            return res.status(404).send()
        }        
        return res.status(200).send(user)
    }catch(e){
        res.status(404).send(error)
    }
})

app.get('/tasks', async (req, res) => {

    try{
        const tasks = await Task.find({})
        res.send(tasks)
    }catch(e){
        res.status(404).send()
    }
})

app.get('/tasks/:id', async (req, res) => {
    try{
        const _id = req.params.id
        const task = await Task.findById(_id)
        if(!task){
            return res.status(404).send()
        }
        res.status(201).send(task)
    }catch(e){
        res.status(404).send(error)
    }
})

app.post('/tasks', async (req, res) =>{

    try{
        const task = await Task(req.body)
        res.status(201).send("Task created sucessfully")
    }catch(e){
        res.status(400).send("Error occured: " + error)
    }
})

app.post('/users', async (req, res) => {
    try{
        const me = new User(req.body)
        res.status(201).send(me)
    }catch(e){
        res.status(400).send("Error", error)
    }
})

app.listen(port, () => {
    console.log("Listening on port 3000: ")    
})