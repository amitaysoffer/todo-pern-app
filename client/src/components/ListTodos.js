import React, { useEffect, useState } from 'react'
import axios from 'axios'
import EditTodo from './EditTodo'

function ListTodos() {
  const [todos, setTodos] = useState([]);

  const deleteTodo = async (id) => {
    try {
      const deleteTodo = await axios.delete(`/todos/${id}`)
      setTodos(todos.filter(todo => todo.todo_id !== id));
    } catch (error) {
      console.error(error.message);
    }
  }

  const getTodos = async () => {
    try {
      const response = await axios.get('/todos');
      setTodos(response.data);
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    getTodos();
  }, [todos])

  return (
    <table className="table mt-5 text-center">
      <thead>
        <tr>
          <th>Description</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {todos.map(todo => (
          <tr key={todo.todo_id}>
            <td>{todo.description}</td>
            <td><EditTodo todo={todo} /></td>
            <td>
              <button
                className="btn btn-danger"
                onClick={() => deleteTodo(todo.todo_id)}
              >Delete</button></td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default ListTodos
