import express from 'express'
import './db/mongoose.js'

import userRouter from './routers/user.js'
import taskRouter from './routers/task.js'


const app = express()
const port = process.env.PORT || 3000


// app.use((req, res, next) => {
//     // console.log(req, res)
//     if(req.method == 'GET'){
//         res.send('GET requests are disabled')
//     }else{
//         next()
//     }
// })

// app.use((req, res, next) => {
//     res.status(503).send('Site is under maintaince')
// })

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)


app.listen(port, () => {
    console.log("Listening on port 3000: ")    
})


// import {Task} from './db/models/task.js'
// import {User} from './db/models/user.js'

// const main = async () => {

//     const task = await Task.findById('690e7b5905541f853b5015c9')
//     await task.populate('owner')
//     console.log(task.owner)

//     const user = await User.findById('690e7b292dcb9d7ebf618209')
//     await user.populate('tasks')
//     console.log(user.tasks)

// }

// main()