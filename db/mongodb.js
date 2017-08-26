const MongoClient = require('mongodb').MongoClient
const uri = 'mongodb://user:password@localhost:27017/PAC'
let _db

const connectDB = async (callback) => {
    try {
        MongoClient.connect(uri, (err, db) => {
            _db = db
            return callback(err)
        })
    } catch (e) {
        throw e
    }
}

const getDB = () => {
    return _db
}

module.exports = Object.assign({}, { connectDB, getDB })