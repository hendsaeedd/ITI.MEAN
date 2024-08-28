const express = require('express')
const app = express()
const PORT = 3000

let users = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
]

app.use(express.json())

//get
app.get('/users', (req, res) => {
  res.json(users)
})

//get by id
app.get('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id)
  const user = users.find((u) => u.id === userId)

  if (!user) {
    return res.json({ message: 'user not found' })
  }

  res.json(user)
})

//post
app.post('/users', (req, res) => {
  const { name, email } = req.body

  const newUser = {
    id: users.length + 1,
    name,
    email,
  }

  users.push(newUser)
  res.json(newUser)
})

//put
app.put('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id)
  const { name, email } = req.body
  const userIndex = users.findIndex((u) => u.id === userId)

  if (userIndex === -1) {
    return res.status(404).json({ message: 'user not found' })
  }

  if (name) users[userIndex].name = name
  if (email) users[userIndex].email = email

  res.json(users[userIndex])
})

//del
app.delete('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id)
  const userIndex = users.findIndex((u) => u.id === userId)

  if (userIndex === -1) {
    return res.json({ message: 'user not found' })
  }

  users.splice(userIndex, 1)
  res.send('user deleted sucss')
})

//server
app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`)
})
