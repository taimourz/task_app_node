import mongoose from "mongoose"
import validator from 'validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import {Task} from '../models/task.js'

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is invalid')
            }
        },
        unique: true,

    },
    age: {
        type: Number,
        default: 0,
        validate(value){
            if(value < 0){
                throw new Error('Age must be a private number')
            }
        }
    }, 
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value){
            if(value.toLowerCase().includes("password")){
                throw new Error('P assword can not be set as `passweord`')
            }
        }
    },
    tokens: {
    type: [{
        token: {
        type: String,
        required: true
        }
    }],
    default: []
    }
}, {
    timestamps: true
})



userSchema.virtual('tasks', {
    ref: 'Task',
    localField: '_id',
    foreignField: 'owner'
})

userSchema.methods.toJSON  = function() {
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens

    return userObject
}

userSchema.methods.generateToken = function() {
    const user = this

    const token = jwt.sign({_id: user.id.toString()}, 'randomsecret', {expiresIn: '7 days'})
    user.tokens = user.tokens.concat({token: token})

    return token
    
}

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({email})
    
    if(!user){
        throw new Error('Unable to login')
    }
    
    const isMatch = await bcrypt.compare(password, user.password)
    
    if(!isMatch){
        throw new Error('Unable to login')
    }

    return user
}

userSchema.pre('save', async  function(next) {
    const user = this
    
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    console.log("This is done before saving")
    next()
})

userSchema.pre('deleteOne', { document: true, query: false }, async function(next) {
    const user = this
    await Task.deleteMany({owner: user._id})
    next()    
})


export const User = mongoose.model('User', userSchema)