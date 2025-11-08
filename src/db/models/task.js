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
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
})

taskSchema.pre('save', function (next) {

    const task = this
    console.log("run this for task before saving")
    next()

})

export const Task = mongoose.model('Task', taskSchema)