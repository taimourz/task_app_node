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