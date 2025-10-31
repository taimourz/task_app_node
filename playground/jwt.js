import jwt from 'jsonwebtoken'


const myFunc = async () => {
    const token = jwt.sign({_id: 'abc123'}, 'justarandomstringusedasmytoken', {expiresIn: '2 seconds'})
    console.log(token)


    const data = jwt.verify(token, 'justarandomstringusedasmytoken')
    console.log(data)
}
myFunc()