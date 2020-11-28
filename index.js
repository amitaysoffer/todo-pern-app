const express = require('express');
const app = express();
const path = require('path');
// const cors = require('cors');
const PORT = process.env.PORT || 3000;
const pool = require('./db')

app.use('/', express.static(path.join(__dirname, 'client/build')));

// middleware
// app.use(cors());
// app.use(express.static('/client/public'));
app.use(express.json()) // to get data from the client side we need to use req.body and this allows us to access the req.body and get json data.

// ROUTES \\\
// create a todo
app.post('/todos', async (req, res) => {
  try {
    const { description } = req.body
    const newTodo = await pool.query('INSERT INTO todo (description) VALUES ($1) RETURNING *', [description]);
    res.json(newTodo.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
})

// get all todos
app.get('/todos', async (req, res) => {
  try {
    const allTodos = await pool.query('SELECT * FROM todo');
    res.json(allTodos.rows);
  } catch (error) {
    console.error(error.message)
  }
})

// get a todo
app.get('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await pool.query('SELECT * FROM todo WHERE todo_id = $1', [id]);
    res.json(todo.rows[0]);
  } catch (error) {
    console.error(error.message)
  }
})

// update a todo
app.put('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body
    const updateTodo = await pool.query('UPDATE todo SET description = $1 WHERE todo_id = $2', [description, id]);
    res.json('Todo was updated')
  } catch (error) {
    console.error(error.message);
  }
})

// delete a todo
app.delete('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await pool.query('DELETE FROM todo WHERE todo_id = $1', [id]);
    res.json('Todo was deleted!')
  } catch (error) {
    console.error(error.message)
  }
})

app.get("/*", (req, res) => { res.sendFile(path.join(__dirname, "client", "build", "index.html")); });


app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));