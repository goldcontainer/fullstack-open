const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')

const api = supertest(app)

test('blogs are returned as json', async () => {
	await api
		.get('/api/blogs')
		.expect(200)
		.expect('Content-Type', /application\/json/)

}, 1000000)

afterAll(() => {
	mongoose.connection.close()
})

test('blog post has id property', async () => {
	const blogs = await helper.blogsInDb()

	expect(blogs[0].id).toBeDefined()
	expect(blogs[0]._id).toBeUndefined()
})

test('blog post is successfully posted', async () => {

	const testBlog = {
		title: 'This is a test',
		author: 'Mik Hsoj',
		url: 'https://thisisatest.com',
		likes: 4
	}

	await api
		.post('/api/blogs')
		.send(testBlog)
		.expect(200)
		.expect('Content-Type', /application\/json/)
}, 1000000)

