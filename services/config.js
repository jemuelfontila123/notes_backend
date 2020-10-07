require('dotenv').config()

const PORT= process.env.PORT
let uri = process.env.uri

if(process.env.NODE_ENV === 'test'){
    uri = process.env.test_uri
}
module.exports ={
    PORT,
    uri
}
