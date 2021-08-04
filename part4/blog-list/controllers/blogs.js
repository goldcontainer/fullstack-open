const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
	
	const blogs = await Blog.find({})
	response.json(blogs)

})

blogsRouter.post('/', async (request, response) => {
  const body = request.body

  if(body.title === undefined || body.url === undefined) {
  	return response.status(400).json({ error: 'title or url missing' })
  }

  const blog = new Blog({
  	title: body.title,
  	author: body.author,
  	url: body.url,
  	likes: body.likes === undefined ? 0 : body.likes,
  })

  const savedBlog = await blog.save()
  response.json(savedBlog.toJSON())

})

blogsRouter.put('/:id', async (request, response) => {

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

blogsRouter.delete('/:id', async (request, response) => {

	const id = request.params.id
	
	await Blog.findByIdAndRemove(id)
	response.status(204).end()

})

module.exports = blogsRouter