const { app } = require('../index')
const supertest = require('supertest')
const api = supertest(app)

const initialNotes = [
  {
    content: 'Aprendiendo Jest',
    important: true,
    date: new Date()
  },
  {
    content: 'Introduciendo segunda nota',
    important: true,
    date: new Date()
  }

]

const getAllContentFromNotes = async () => {
  const response = await api.get('/api/notes')
  return {
    contents: response.body.map(note => note.content),
    response
  }
}

module.exports = { api, initialNotes, getAllContentFromNotes }
