import express from 'express'
const router = new express.Router()
import {Task} from '../db/models/task.js'
import {auth} from '../middleware/auth.js'

router.get('/tasks', auth, async (req, res) => {

    try{
        const _id = req.user._id
        const tasks = await Task.find({owner: req.user._id})
        res.send(tasks)
    }catch(e){
        res.status(404).send()
    }
})

router.get('/tasks/:id', auth, async (req, res) => {
    try{
        const _id = req.params.id
        const task = await Task.findOne({_id, owner: req.user._id})
        if(!task){
            return res.status(404).send()
        }
        res.status(201).send(task)
    }catch(e){
        res.status(404).send(error)
    }
})

router.post('/tasks', auth, async (req, res) =>{

    try{
        const task = new Task({
            ...req.body,
            owner: req.user._id
            }
        )

        await task.save()
        res.status(201).send("Task created sucessfully")
    }catch(e){
        res.status(400).send("Error occured: " + e)
    }
})


router.patch('/tasks/:id', auth, async (req, res) => {

    try{

        const updates = Object.keys(req.body)
        const allowedUpdates = ['description', 'completed']
        const isValidOperation = updates.every((update) => {return allowedUpdates.includes(update)})

        if(!isValidOperation){
            return res.status(400).send({error: "INvalid params"} )
        }


        const task = await Task.findOne({_id: req.params.id, owner: req.user.id})

        if(!task){
            return res.status(401).send("There was an error updating the task")
        }

        updates.forEach((update) => {task[update] = req.body[update]})
        await task.save()

        res.send(task)

    }catch(e){
        res.status(401).send(e)
    }
})


router.delete('/tasks/:id', auth, async (req, res) => {
    try{
        const task = await Task.findOneAndDelete({_id: req.params.id, owner: req.user._id})

        if(!task){
            res.status(400).send("There was an error deleting the user")
        }

        res.send(task)

    }catch(e){

        res.status(500).send(e)

    }
})

export default router