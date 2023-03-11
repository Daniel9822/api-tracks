const jwt = require('jsonwebtoken');
const SECRET_WORD = process.env.SECRET_WORD

const sing = (user) => {
    try {
        const { _id, name } = user
        return jwt.sign({_id, name}, SECRET_WORD, {
            expiresIn: '1d'
        })
    } catch (error) {
        throw new Error('opps something went wrong')        
    }
}


const verify = (token) => {
    try {
        return jwt.verify(token, SECRET_WORD)
    } catch (error) {
        throw new Error('opps something went wrong')
    }
}

module.exports = { sing, verify }