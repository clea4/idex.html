import React from 'react';
import axios from 'axios';
import Form from './Form';
import TodoList from './TodoList'; // Import your TodoList component

const URL = 'http://localhost:9000/api/todos';

export default class App extends React.Component {
  state = {
    todos: [],
    error: '',
  };

  fetchAllTodos = () => {
    axios.get(URL)
      .then(res => {
        this.setState({ todos: res.data.data });
      })
      .catch(err => {
        this.setState({ error: err.response.data.message });
      });
  };

  componentDidMount() {
    this.fetchAllTodos();
  }

  // Method to add a new todo
  addTodo = (name) => {
    const newTodo = { name };
    axios.post(URL, newTodo)
      .then(res => {
        this.setState({ todos: [...this.state.todos, res.data.data] });
      })
      .catch(err => {
        this.setState({ error: err.response.data.message });
      });
  };

  // Method to toggle the completed status of a todo
  toggleComplete = (id) => {
    axios.patch(`${URL}/${id}`)
      .then(res => {
        this.setState({
          todos: this.state.todos.map(todo =>
            todo.id === id ? res.data.data : todo
          ),
        });
      })
      .catch(err => {
        this.setState({ error: err.response.data.message });
      });
  };

  // Method to clear completed todos
  clearCompleted = () => {
    this.setState({
      todos: this.state.todos.filter(todo => !todo.completed),
    });
  };

  render() {
    return (
      <div>
        <h1>Todo List</h1>
        <Form addTodo={this.addTodo} clearCompleted={this.clearCompleted} />

        {/* Pass todos and toggleComplete to TodoList */}
        <TodoList
          todos={this.state.todos}
          toggleComplete={this.toggleComplete}
        />
      </div>
    );
  }
}
