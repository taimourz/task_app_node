import  bcrypt from 'bcrypt'

const myFunc = async () => {
    const password = "Red12345!"
    const hashPass = await bcrypt.hash(password, 8)



    console.log(password)
    console.log(hashPass)



    const isMatch = await bcrypt.compare("Red12345i!", hashPass)
    console.log(isMatch)

}

myFunc()