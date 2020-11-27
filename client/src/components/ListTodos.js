import React, { useEffect, useState } from 'react'

function ListTodos() {
  const [todos, setTodos] = useState([]);

  const getTodos = async () => {
    try {
      const response = await fetch('http://localhost:5000/todos');
      const jsonData = await response.json()
      // console.log(jsonData)
      setTodos(jsonData);
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    getTodos();
  }, [])

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
            <td>Edit</td>
            <td><button className="btn btn-danger">Delete</button></td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default ListTodos
