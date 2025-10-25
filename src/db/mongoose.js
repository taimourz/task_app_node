import mongoose from "mongoose";
import validator from 'validator'

mongoose.connect('mongodb://127.0.0.1:27017/task-app-api', {
    useNewUrlParser: true,
})

const User = mongoose.model('User', {
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

    }
})

const me = new User({
    name: "Taimour Afzal Khan     .      ",
    email: "taimour@gmail.com",
    age: 26
})


me.save().then(() => {
    console.log(me)
}).catch((error) => {
    console.log("Error", error)
})


const Task = mongoose.model('Task', {
    description: {
        type: String
    },
    completed: {
        type: Boolean
    }
})


const task = new Task({
    description: "Buy Milk",
    completed: false
})

task.save().then(() => {
    console.log(task)
}).catch((error) => {
    console.log("Error occured: " + error)
})