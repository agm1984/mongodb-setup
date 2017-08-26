const MongoDB = require('./db/mongodb')

const seedUser = {
    name: 'Adam Testing',
    email: 'test@dev.null',
    bonusSetting: true
}

MongoDB.connectDB(async (err) => {
    if (err) throw err

    // Load queries & mutations
    const Users = require('./users')

    try {
        const newUser = await Users.createUser(seedUser)
        const listUsers = await Users.getUsers()
        const findUser = await Users.findUserById('59a0e8d73fd732485824db2d')

        console.log('CREATE USER')
        console.log(newUser)
        console.log('GET ALL USERS')
        console.log(listUsers)
        console.log('FIND USER')
        console.log(findUser)
    } catch (e) {
        throw e
    }

    //app.listen(3000, () => {
    //    console.log('Server started, etc.')
    //})
    MongoDB.disconnectDB()
})