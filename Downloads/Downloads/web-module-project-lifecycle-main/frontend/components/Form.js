import React from 'react';
import axios from 'axios';
import Form from './Form'; // Import the Form component

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
        {/* Render the list of todos */}
        <div>
          {this.state.todos.map(todo => (
            <div key={todo.id}>
              {todo.name} {todo.completed ? '✓' : ''}
            </div>
          ))}
        </div>
      </div>
    );
  }
}
