const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const User = require('../models/user')

const api = supertest(app)

beforeEach(async () => {
	await User.deleteMany({})
	
	const saltRounds = 10
	const passwordHash = await bcrypt.hash('password', saltRounds)
	const user = new User({ username: 'root', passwordHash })

	await user.save()
})

test('invalid users are not created and returns proper status code and message', async () => {
	const usersAtStart = await helper.usersInDb()

	const testUser = {
		username: 'Al',
		name: 'John Doe'
	}

	const response = await api
		.post('/api/users')
		.send(testUser)
		.expect(400)

	expect(response.body.error).toContain('username must be at least length 3')
}, 1000000)

afterAll(() => {
	mongoose.connection.close()
})
