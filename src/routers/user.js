import express from 'express'
const router = new express.Router()
import {User} from '../db/models/user.js'
import {auth} from '../middleware/auth.js'
import multer from 'multer'
import sharp from 'sharp'
import { sendWelcomeEmail, sendCancellationEmail } from '../emails/account.js'

const upload = multer({
    limits: {
        fileSize: 1000000,
    },
    fileFilter(req, file, cb){
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
            return cb(new Error('Please upload a file type jpg, jpeg, png'))
        }
        cb(undefined, true) // everything went fine, so no need to send any error and accept the file
    }    

})

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

router.get('/users/me', auth, async (req, res) => {
    res.send(req.user)
})


router.get('/users/logout', auth, async (req, res) => {
    try{
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()
        res.send()

    }catch(e){
        res.status(500).send()
    }
})


router.get('/users/logoutAll', auth, async (req, res) => {
    try{
        req.user.tokens = []
        await req.user.save()
        res.send()

    }catch(e){
        res.status(500).send()
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
        res.status(404).send(e)
    }
})

router.patch('/users/me', auth, async (req, res) => {
    try{
        
        const updates = Object.keys(req.body)
        const allowedUpdates = ['name', 'email', 'password', 'age']
        const isValidOperation = updates.every((update) => { return allowedUpdates.includes(update)})

        if(!isValidOperation){
            return res.status(400).send({error: 'Invalid Parameters'})
        }
        
        const user = await User.findById(req.user.id)
        updates.forEach((update) => {
            user[update] = req.body[update]
        })        
        await user.save()

        res.send(user)
    }catch(e){
        res.status(401).send(e)
    }
})

router.delete('/users/me', auth, async (req, res) => {
    try{
        await req.user.deleteOne() 
        sendCancellationEmail(req.user.email, req.user.name)
        res.send(req.user)

    }catch(e){

        res.status(500).send(e.message)

    }
})

router.post('/users/login', async (req, res) => {
    try{
        const user = await User.findByCredentials( req.body.email, req.body.password )
        
        if(!user){
            throw new Error('Unable to find the user')
        }
        
        const token = await user.generateToken()
        user.save()
        res.status(200).send({user, token})

    }catch(e){
        res.status(400).send(e.message)

    }
})

router.post('/users', async (req, res) => {
    try{
        const me = new User(req.body)
        const token = await me.generateToken()
        await me.save()
        debugger
        sendWelcomeEmail(me.email, me.name)
        res.status(201).send({me, token})
    }catch(e){
        res.status(400).send(e.message)
    }
})

router.post('/users/me/avatar', auth, upload.single('avatar'), async (req, res) => {
    const buffer = await sharp(req.file.buffer).resize({width: 250, height: 250}).png().toBuffer()
    req.user.avatar = buffer
    
    await req.user.save()
    res.send()
}, (error, req, res, next) => {
    res.status(400).send({error: error.message})
})

router.delete('/users/me/avatar', auth, async (req, res) => {
    req.user.avatar = undefined
    await req.user.save()
    res.send()
}, (error, req, res, next) => {
    res.status(400).send({error: error.message})
})

router.get('/users/:id/avatar', async(req,res)=>{
    try{

        const user = await User.findById(req.params.id)

        if(!user || !user.avatar){
            throw new Error()
        }
        debugger
        res.set('Content-Type', 'image/png')
        res.send(user.avatar)

    }catch{
        res.status(400).send()

    }
})

export default router