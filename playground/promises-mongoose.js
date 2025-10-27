import mongoose from "mongoose";
mongoose.connect('mongodb://127.0.0.1:27017/task-app-api', {
    useNewUrlParser: true,
})
import {User} from '../src/db/models/user.js'
import {Task} from '../src/db/models/task.js'



// User.findByIdAndUpdate('68ff6afafbfc02208f1d3617', {age: 1}).then((user) => {
//     console.log(user)
//     return User.countDocuments({age: 26})
// }).then((count) => {
//     console.log(count)
// }).catch((error) => {
//     console.log(error)
// })

Task.findByIdAndDelete('68ff7c832e96975354a2aa62').then((result) => {
    console.log(result)
    return Task.countDocuments({completed: false})
}).then((count) => {
    console.log("Total incomplete", count)
}).catch((error) => {
    console.log(error)
})

