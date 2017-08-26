const ObjectID = require('mongodb').ObjectID
const MongoDB = require('../db/mongodb')
const db = MongoDB.getDB()
const users = db.collection('users')

const createUser = async (user) => {
    try {
        const results = await users.insertOne(user)
        return results.ops[0]
    } catch (error) {
        throw error
    }
}

const getUsers = async () => {
    try {
        const results = await users.find().toArray()
        return results
    } catch (error) {
        throw error
    }
}

const findUserById = async (id) => {
    try {
        const results = await users.find(ObjectID(id)).toArray()
        if (results[1]) throw 'MongoDB problem: More than one user found.'
        return results[0]
    } catch (error) {
        throw error
    }
}

module.exports = Object.assign({}, { createUser, getUsers, findUserById })