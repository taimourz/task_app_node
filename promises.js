const doWorkPromise = new Promise((resolve, reject) =>{
    setTimeout(() => {
        resolve([1,2,3])
        // reject()
    }, 2000)
})

doWorkPromise.then((result) => {
    console.log("success")
}).catch((error) => {
    console.log("There was an error")
})