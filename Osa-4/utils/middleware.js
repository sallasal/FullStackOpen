const logger = require('./logger')

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

const tokenExtractor = (request, response, next) => {
  const auth = request.get('authorization')
  if (auth && auth.toLowerCase().startsWith('bearer ')) {
    request.token = auth.substring(7)
  } else {
    request.token = null
  }
  next()
}

const unknownEndpoint = (request, response, next) => {
  response.status(404).send({ error: 'unknown endpoint' })
  next()
}

module.exports = {
  errorHandler,
  tokenExtractor,
  unknownEndpoint
}