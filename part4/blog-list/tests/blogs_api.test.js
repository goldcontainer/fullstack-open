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

	const blogsAtEnd = await helper.blogsInDb()
	expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

	const contents = blogsAtEnd.map(b => b.title)
	expect(contents).toContain('This is a test')

}, 1000000)

test('set likes to 0 if missing in response', async () => {

	const testBlog = {
		title: 'No likes',
		author: 'Mik Hsoj',
		url: 'https://wehavenolikes.com'
	}

	const response = await api
		.post('/api/blogs')
		.send(testBlog)
		.expect(200)
		.expect('Content-Type', /application\/json/)

	expect(response.body.likes).toBe(0)
})

test('missing title and url properties return 400 error', async () => {

	const testBlog = {
		author: 'Mik Hsoj',
		likes: 10
	}

	const response = await api
		.post('/api/blogs')
		.send(testBlog)
		.expect(400)
})


