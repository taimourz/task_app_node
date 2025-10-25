const doWorkCallback = (callback) => {
    setTimeout(() => {
        callback(undefined, [1,3,5])
    }, 2000)
}


doWorkCallback((error, result) => {
    if(error){
        return console.log("There was an error")
    }

    console.log(result)
})