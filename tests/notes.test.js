const supertest = require('supertest')
const { app, server } = require('../index')
const mongoose = require('mongoose')
const Note = require('../models/Note')
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

beforeEach(async () => {
  await Note.deleteMany({})

  const note1 = new Note(initialNotes[0])
  await note1.save()

  const note2 = new Note(initialNotes[1])
  await note2.save()
})

test('notes are returned as json', async () => {
  await api
    .get('/api/notes')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are two notes', async () => {
  const response = await api.get('/api/notes')
  expect(response.body).toHaveLength(initialNotes.length)
})
afterAll(() => {
  mongoose.connection.close()
  server.close()
})
