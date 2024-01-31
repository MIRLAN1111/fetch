import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const { data } = await axios.get('https://crudcrud.com/api/e14f9b0f7f354144866799bd0d60fe84/todos');
        setTodos(data);
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };

    fetchTodos();
  }, []);

  const addTodo = async () => {
    try {
      const { data } = await axios.post('https://crudcrud.com/api/e14f9b0f7f354144866799bd0d60fe84/todos', { todo: newTodo });
      setTodos([...todos, data]);
      setNewTodo('');
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const removeTodo = async (id) => {
    try {
      await axios.delete(`https://crudcrud.com/api/e14f9b0f7f354144866799bd0d60fe84/todos/${id}`);
      setTodos(todos.filter(todo => todo._id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  return (
    <div>
      <h1>Todo List</h1>
      {todos.map(({ _id, todo }) => (
        <div key={_id}>
          {todo}
          <button onClick={() => removeTodo(_id)}>Delete</button>
        </div>
      ))}
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Поиск"
      />
      <button onClick={addTodo}>Add Todo</button>
    </div>
  );
};

export default TodoApp;
