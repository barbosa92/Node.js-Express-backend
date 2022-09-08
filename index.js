//Esta escrito en "Common JS" porque Node.js antes no aceptaba ECMAScript pero
//lo siguiente podría escribirse también de la siguiente manera
//import http from 'http'
const express = require("express")
const app = express()

let notes = [
    {
        "id":1,
        "content": "Fregar y recoger",
        "date": "2022-09-09",
        "important": false
    },
    {
        "id":2,
        "content": "Estudiar",
        "date": "2022-09-08",
        "important": true
    },
    {
        "id":3,
        "content": "Comer",
        "date": "2022-09-08",
        "important": true
    },
    ]

// const app = http.createServer((request, response) => {
//   response.writeHead(200, { 'Content-Type': 'application/json' })
//   response.end(JSON.stringify(notes))
// })
app.get('/', (request, response) => {
    response.send("<h1>Hola Mundo</h1>")
}
)

app.get('/api/notes', (request, response) => {
    response.json(notes)
})

app.get('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    console.log({id})
    
    const note = notes.find(notes => notes.id == id)
    console.log({note})
    response.json(note)
})
const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)
