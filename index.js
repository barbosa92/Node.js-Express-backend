// Esta escrito en "Common JS" porque Node.js antes no aceptaba ECMAScript pero
// lo siguiente podría escribirse también de la siguiente manera
// import http from 'http'
const express = require('express')
const logger = require('./loggerMiddleware')
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(logger)
app.use(cors())

let notes = [
  {
    id: 1,
    content: 'Fregar y recoger',
    date: '2022-09-09',
    important: false
  },
  {
    id: 2,
    content: 'Estudiar',
    date: '2022-09-08',
    important: true
  },
  {
    id: 3,
    content: 'Comer',
    date: '2022-09-08',
    important: true
  }
]

app.get('/', (request, response) => {
  response.send('<h1>Hola Mundo</h1>')
}
)

app.get('/api/notes', (request, response) => {
  response.json(notes)
})

app.get('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  const note = notes.find(note => note.id === id)
  note ? response.json(note) : response.status(404).end()
})

app.delete('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  notes = notes.filter(note => note.id !== id)
  response.status(204).end()
})

app.post('/api/notes', (request, response) => {
  const note = request.body

  if (!note || !note.content) {
    return response.status(400).json({ error: 'note.content is missing' })
  }

  const ids = notes.map(note => note.id)
  console.log(ids)
  const maxId = Math.max(...ids)
  const newNote = {
    id: maxId + 1,
    content: note.content,
    date: new Date().toISOString(),
    important: typeof note.important !== 'undefined' ? note.important : false
  }
  notes = [...notes, newNote]
  response.json(newNote)
})

app.use((request, response) => {
  response.status(404).json({ error: 'Not found' })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
