const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response, next) => {
	
	const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
	response.json(blogs)

})

blogsRouter.post('/', async (request, response, next) => {
  const body = request.body

  const user = await User.findById(body.userId)

  if(body.title === undefined || body.url === undefined) {
  	return response.status(400).json({ error: 'title or url missing' })
  }

  const blog = new Blog({
  	title: body.title,
  	author: body.author,
  	url: body.url,
  	likes: body.likes === undefined ? 0 : body.likes,
  	user: user._id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.json(savedBlog.toJSON())

})

blogsRouter.put('/:id', async (request, response, next) => {

	const body = request.body
	const id = request.params.id

	const blog = {
		likes: body.likes
	}

	const updatedBlog = await Blog.findByIdAndUpdate(id, blog, {
		new: true,
	})

	response.json(updatedBlog)
})

blogsRouter.delete('/:id', async (request, response, next) => {

	const id = request.params.id
	
	await Blog.findByIdAndRemove(id)
	response.status(204).end()

})

module.exports = blogsRouter