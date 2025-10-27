const add = (a,b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(a + b)
        }, 2000)
    })
}

// To much repeatation and clutter
// add(1,2).then((sum) => {
//     console.log(sum)

//     add(sum, 3).then((sum2) =>{
//         console.log(sum2)
//     }).catch((error) => {
//         console.log(error)
//     })

// }).catch((error) => {
//     console.log(error)
// })



// much better way
add(1,2).then((sum) => {
    console.log(sum)
    return add(sum, 4)
}).then((sum2) => {
    console.log(sum2)
}).catch((error) => {
    console.log(error)
})