// Load MongoDB utils
const MongoDB = require('./db/mongodb')
// Load queries & mutations
const Users = require('./users')

// Improve debugging
process.on('unhandledRejection', (reason, p) => {
    console.log('Unhandled Rejection at:', p, 'reason:', reason)
})

const seedUser = {
    name: 'Bob Alice',
    email: 'test@dev.null',
    bonusSetting: true,
    comments: [
        { comment_id: 0, timestamp: Date.now(), content: "testing 123" },
        { comment_id: 1, timestamp: Date.now(), content: "testing 456" },
        { comment_id: 2, timestamp: Date.now(), content: "testing 789" },
    ]
}

// Connect to MongoDB and put server instantiation code inside
// because we start the connection first
MongoDB.connectDB(async (err) => {
    if (err) throw err
    // Load db & collections
    const db = MongoDB.getDB()
    const users = db.collection('users')

    try {
        // Run some sample operations
        // and pass users collection into models
        const newUser = await Users.createUser(users, seedUser)
        const listUsers = await Users.getUsers(users)
        const findUser = await Users.findUserById(users, newUser._id)
        const getComment = await Users.findCommentById(users, newUser._id, seedUser.comments[0].comment_id)

        console.log('CREATE USER')
        console.log(newUser)
        console.log('GET ALL USERS')
        console.log(listUsers)
        console.log('FIND USER')
        console.log(findUser)
        console.log('GET COMMENT BY ID')
        console.log(getComment)
    } catch (e) {
        // Use disconnectDB for clean meltdowns
        MongoDB.disconnectDB()
        throw e
    }

    const desired = true
    if (desired) {
        MongoDB.disconnectDB()
        process.exit(0)
    }
    // Server code anywhere above here inside connectDB()
})