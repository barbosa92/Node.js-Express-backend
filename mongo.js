const mongoose = require('mongoose')

const connectionString = 'mongodb+srv://Barbosa92:92$nbd7Alejandr0@cluster0.5tfuqev.mongodb.net/app?retryWrites=true&w=majority'

// conexión a MongoDB
mongoose.connect(connectionString)
  .then(() => {
    console.log('Database connected')
  }).catch(err => {
    console.log(err)
  })

// Note.find({})
//   .then(result => {
//     console.log(result)
//     mongoose.connection.close()
//   })

// const note = new Note({
//   content: 'Probando Mongoose',
//   date: Date(),
//   important: true
// })

// note.save()
//   .then(result => {
//     console.log(result)
//     mongoose.connection.close()
//   })
//   .catch(err =>
//     console.error(err))
