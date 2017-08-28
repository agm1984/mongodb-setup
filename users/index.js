const ObjectID = require('mongodb').ObjectID

// Notice how the users collection is passed into the models
const createUser = async (users, user) => {
    try {
        const results = await users.insertOne(user)
        return results.ops[0]
    } catch (error) {
        throw error
    }
}

const getUsers = async (users) => {
    try {
        const results = await users.find().toArray()
        return results
    } catch (error) {
        throw error
    }
}

const findUserById = async (users, id) => {
    try {
        if (!ObjectID.isValid(id)) throw 'Invalid MongoDB ID.'
        const results = await users.findOne(ObjectID(id))
        return results
    } catch (error) {
        throw error
    }
}

const findCommentById = async (users, userId, commentId) => {
    try {
        const results = await users.findOne({ _id: ObjectID(userId) }, {
            comments: {
                $elemMatch: { comment_id: commentId }
            }
        })
        return results
    } catch (error) {
        throw error
    }
}

// Export garbage as methods on the User object
module.exports = { createUser, getUsers, findUserById, findCommentById }