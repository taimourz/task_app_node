import mongoose from "mongoose"


const taskSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    }
})

taskSchema.pre('save', function (next) {

    const task = this
    console.log("run this for task before saving")
    next()

})

export const Task = mongoose.model('Task', taskSchema)