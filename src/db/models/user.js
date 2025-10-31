import mongoose from "mongoose"
import validator from 'validator'
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is invalid')
            }
        }

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
    }
})

userSchema.statics.findByCredentials = async function (email, password) {
    const user = await this.findOne({email})
    
    if(!user){
        throw new Error('Unable to login')
    }
    
    debugger
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


export const User = mongoose.model('User', userSchema)