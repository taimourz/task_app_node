import express from 'express'
const router = new express.Router()
import {Task} from '../db/models/task.js'

router.get('/tasks', async (req, res) => {

    try{
        const tasks = await Task.find({})
        res.send(tasks)
    }catch(e){
        res.status(404).send()
    }
})

router.get('/tasks/:id', async (req, res) => {
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

router.post('/tasks', async (req, res) =>{

    try{
        const task = new Task(req.body)
        await task.save()
        res.status(201).send("Task created sucessfully")
    }catch(e){
        res.status(400).send("Error occured: " + error)
    }
})


router.patch('/tasks/:id', async (req, res) => {

    try{

        const updates = Object.keys(req.body)
        const allowedUpdates = ['description', 'completed']
        const isValidOperation = updates.every((update) => {return allowedUpdates.includes(update)})

        if(!isValidOperation){
            return res.status(400).send({error: "INvalid params"} )
        }

        const _id = req.params.id
        const task = await Task.findById(_id)
        updates.forEach((update) => {task[update] = req.body[update]})
        await task.save()

        if(!task){
            return res.status(401).send("There was an error updating the task")
        }
        res.send(task)

    }catch(e){
        res.status(401).send(e)
    }
})


router.delete('/tasks/:id', async (req, res) => {
    try{
        const _id = req.params.id
        const task = await Task.findByIdAndDelete(_id)

        if(!task){
            res.status(400).send("There was an error deleting the user")
        }

        res.send(task)

    }catch(e){

        res.status(500).send(e)

    }
})

export default router