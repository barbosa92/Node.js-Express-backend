const { server } = require('../index')
const mongoose = require('mongoose')
const Note = require('../models/Note')
const { initialNotes, api, getAllContentFromNotes } = require('./helpers')

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

test('first note is about jest', async () => {
  const response = await api.get('/api/notes')

  const contents = response.body.map(note => note.content)

  expect(contents).toContain('Aprendiendo Jest')
})

test('A valid note can be added', async () => {
  const newNote = {
    content: 'Valid note',
    important: true,
    date: new Date()
  }

  await api
    .post('/api/notes')
    .send(newNote)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const { contents, response } = await getAllContentFromNotes()
  expect(response.body).toHaveLength(initialNotes.length + 1)
  expect(contents).toContain(newNote.content)
})
