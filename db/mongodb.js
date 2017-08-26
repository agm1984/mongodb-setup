const MongoClient = require('mongodb').MongoClient
const uri = 'mongodb://mongodb:E1atHome@localhost:27017/PAC'
let _db

const connectDB = async (callback) => {
    try {
        console.log('here')
        MongoClient.connect(uri, (err, db) => {
            _db = db
            return callback(err)
        })
    } catch (e) {
        console.log('rere')
        throw e
    }
}

const getDB = () => {
    return _db
}

module.exports = Object.assign({}, { connectDB, getDB })