const app = require('./app')
const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const logger = require('./utils/logger')
const config = require('./utils/config')

const server = http.createServer(app)

const mongoUrl = config.MONGODB_URI
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
	.then(
		logger.info('connected to MongoDB')
	)
	.catch((error) => {
		logger.error('error connecting to MongoDB', error.message)
	})


server.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})