import express from 'express'
const router = new express.Router()
import {User} from '../db/models/user.js'

router.get('/test', (req, res) => {
    res.send("This should work")
})


router.get('/users', async (req, res) => {

    try{
        const users = await User.find({})
        res.send(users)
    }catch(e){
        res.status(404).send(e)
    }
})

router.get('/users/:id', async (req, res) => {
    
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

router.patch('/users/:id', async (req, res) => {
    try{

        const updates = Object.keys(req.body)
        const allowedUpdates = ['name', 'email', 'password', 'age']
        const isValidOperation = updates.every((update) => { return allowedUpdates.includes(update)})

        if(!isValidOperation){
            return res.status(400).send({error: 'Invalid Parameters'})
        }

        const _id = req.params.id

        const user = await User.findById(_id)
        updates.forEach((update) => {
            user[update] = req.body[update]
        })        
        await user.save()

        if(!user){
            res.status(401).send("There was an error while updating")
        }
        res.send(user)
    }catch(e){
        res.status(401).send(e)
    }
})

router.delete('/users/:id', async (req, res) => {
    try{
        const _id = req.params.id
        const user = await User.findByIdAndDelete(_id)

        if(!user){
            res.status(400).send("There was an error deleting the user")
        }

        res.send(user)

    }catch(e){

        res.status(500).send(e)

    }
})

router.post('/users/login', async (req, res) => {
    try{
        const user = await User.findByCredentials( req.body.email, req.body.password )
        
        if(!user){
            throw new Error('Unable to find the user')
        }
        
        const token = await user.generateToken()

        res.status(200).send({user, token})

    }catch(e){
        res.status(400).send(e)

    }
})

router.post('/users', async (req, res) => {
    try{
        const me = new User(req.body)
        await me.save()
        const token = await me.generateToken()
        res.status(201).send(me)
    }catch(e){
        res.status(400).send("Error", e)
    }
})


export default router