// Esta escrito en "Common JS" porque Node.js antes no aceptaba ECMAScript pero
// lo siguiente podría escribirse también de la siguiente manera
// import http from 'http'
require('dotenv').config()
require('./mongo')
const Note = require('./models/Note')

const express = require('express')
const logger = require('./loggerMiddleware')
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(logger)
app.use(cors())

const notes = []

app.get('/', (request, response) => {
  response.send('<h1>Hola Mundo</h1>')
})

app.get('/api/notes', (request, response) => {
  Note.find({})
    .then(notes => {
      response.json(notes)
    })
})

app.get('/api/notes/:id', (request, response, next) => {
  const { id } = request.params

  Note.findById(id).then(note => {
    note ? response.json(note) : response.status(404).end()
  }).catch(err => {
    next(err)
  })
})

app.delete('/api/notes/:id', (request, response, next) => {
  const { id } = request.params
  Note.findByIdAndRemove(id).then(result => {

  }).catch(error => {
    next(error)
  })
  response.status(204).end()
})

app.post('/api/notes', (request, response) => {
  const note = request.body

  if (!note || !note.content) {
    return response.status(400).json({ error: 'note.content is missing' })
  }

  const newNote = new Note({
    content: note.content,
    date: new Date(),
    important: note.important || false
  })

  newNote.save().then((savedNote) => {
    response.json(savedNote)
  })
})

app.use((error, request, response, next) => {
  console.log(error)
  if (error.name === 'CastError') {
    response.status(400).send({ error: 'id used is malformed' })
  } else {
    response.status(500).end()
  }
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
