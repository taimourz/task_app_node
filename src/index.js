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

// import multer from 'multer'

// const upload = multer({
//     dest: 'images',
//     limits: {
//         fileSize: 1000000,
//     },
//     fileFilter(req, file, cb){
//         if(!file.originalname.match(/\.(doc|docx)$/)){
//             return cb(new Error('Please upload a word document'))
//         }
//         cb(undefined, true) // everything went fine, so no need to send any error and accept the file
//     }
// })


// app.post('/upload', upload.single('upload'), (req, res) => {
//     res.send()
// }, (error, req, res, next) => {
//     res.status(400).send({error: error.message})
// })

app.listen(port, () => {
    console.log("Listening on port 3000: ")
})



