import {MongoClient, ObjectId} from 'mongodb'


const id = new ObjectId
console.log(id)
console.log(id.getTimestamp())



// const connectionURL = 'mongodb://127.0.0.1:27017'

// const databaseName = 'task-manager'

// MongoClient.connect(connectionURL)
//     .then(client => {
//         console.log("successful")

//         const db = client.db(databaseName)

//         db.collection('users').insertOne({
//             name: "Taimour AFzal",
//             age: 14
//         }, (error, result) => {
//             if(error){
//                 return console.log(error)
//             }

//                 return console.log(result.acknowledged)

//         })

        

//     })
//     .catch((error) => {
//         console.log("error")
//     })


const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

const client = await MongoClient.connect(connectionURL)
const db = client.db(databaseName)


const result = await db.collection('users').insertOne({
    name: "Taimour Afzal",
    age: 26
})


// const resultMany = await db.collection('users').insertMany([
//     {
//         name: "afzal"
//     },
//     {
//         name: "khan"
//     }
// ])


async function insertManyUsers() {
    try{
        const resultMany = await db.collection('tasks').insertMany([
            {
                description: "Clena the house",
                completed: false

            },
            {
                description: "Bike Wash",
                completed: false

            },
            {
                description: "Renew inspection",
                completed: true
            }
        ]) 

        const inccomppleteTasks = await db
            .collection('tasks')
            .find({completed: false})
            .toArray()
        console.log(inccomppleteTasks)
        await client.close() 
    }catch(err){
        console.log(err)
    }
}

// insertManyUsers()
console.log(result)




const foundUser = await db.collection('users').findOne(
    {
        // name: "Taimour Afzal"
        _id: new ObjectId("68fc9793b429c9314a218dc3")
    }
)
// console.log(foundUser)

const foundMultipleUsers = await db.collection('users').find(
    {
        age: 12
    }
).toArray()

console.log(foundMultipleUsers)


const foundMultipleUsersCount = await db.collection('users').countDocuments(
    {
        age: 12
    }
)

console.log(foundMultipleUsersCount)




const lastTask = await db.collection('users').findOne({},
    {
        sort: {_id: -1}
    }
)

console.log(lastTask)




const inccomppleteTasks = await db.collection('tasks').find(
    {
        completed: false
    }
).toArray()

console.log(inccomppleteTasks)



// const updatePromise = db.collection('tasks').updateOne({
//     _id: new ObjectId("68fca578275aedf191ba5acd")
//     },{
//         $set: {
//             description: "Updatdd Now"
//         }
//     }
// )

// updatePromise.then((result) => {
//     console.log(result)
// }).catch((error) => {
//     console.log("something went wrong")
// })



// db.collection('tasks').updateOne({
//     _id: new ObjectId("68fca578275aedf191ba5acd")
//     },{
//         $set: {
//             description: "Updatdd with chaining"
//         }
//     }
// ).then((result) => {
//     console.log(result)
// }).catch((error) => {
//     console.log("something went wrong")
// })




// db.collection('users').updateOne({
//     _id: new ObjectId("68fcb3d78e72ab6df1c9fb91")
//     },{
//         $inc: {
//             age: 20
//         }
//     }
// ).then((result) => {
//     console.log(result)
// }).catch((error) => {
//     console.log("something went wrong")
// })



// db.collection('tasks').updateMany({
//     completed: false
// }, {
//     $set: {
//         completed: true
//     }
// }).then((result) => {
//     console.log(result)
// }).catch((error) => {
//     console.log("there was an error " + error)
// })


db.collection('users').deleteMany({
    age: 26
}).then((result) => {
    console.log(result)
}).catch((error) => {
    console.log("unable to delete : " + error)
})


db.collection('tasks').deleteOne({
    _id: new ObjectId("68fcb4ffce0c8fa98b0536ec")
}).then((result) => {
    console.log(result)
})