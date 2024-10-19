import React from 'react';
import axios from 'axios';

const URL = 'http://localhost:9000/api/todos';

export default class App extends React.Component {
  state = {
    todos: [],
    error: '',
    todoNameInput: '',
  };

  // Handles input changes and updates state
  onTodoNameInputChange = (evt) => {
    const { value } = evt.target;
    this.setState({ ...this.state, todoNameInput: value });
  };

  // Fetches all todos from the API when the component mounts
  fetchAllTodos = () => {
    axios
      .get(URL)
      .then((res) => {
        this.setState({ ...this.state, todos: res.data.data });
      })
      .catch((err) => {
        this.setState({ ...this.state, error: err.response.data.message });
      });
  };

  // Trigger fetching todos when the component mounts
  componentDidMount() {
    this.fetchAllTodos();
  }

  // Handles form submission to add a new todo
  onFormSubmit = (evt) => {
    evt.preventDefault(); // Prevents the form from refreshing the page
    const newTodo = { name: this.state.todoNameInput.trim() };

    if (newTodo.name) { // Only add a todo if there's a non-empty name
      axios
        .post(URL, newTodo)
        .then((res) => {
          this.setState({
            todos: [...this.state.todos, res.data.data], // Add new todo to state
            todoNameInput: '', // Clear the input field
            error: '', // Clear any previous error
          });
        })
        .catch((err) => {
          this.setState({ ...this.state, error: err.response.data.message });
        });
    }
  };

  // Handles toggling the completed status of a todo
  toggleTodoCompleted = (id) => {
    axios
      .patch(`${URL}/${id}`)
      .then((res) => {
        this.setState({
          todos: this.state.todos.map((todo) =>
            todo.id === id ? res.data.data : todo
          ),
        });
      })
      .catch((err) => {
        this.setState({ ...this.state, error: err.response.data.message });
      });
  };

  // Clears completed todos from the list
  clearCompletedTodos = () => {
    this.setState({
      todos: this.state.todos.filter((todo) => !todo.completed),
    });
  };

  render() {
    return (
      <div>
        {/* Display dynamic error message if one exists */}
        <div id="error">{this.state.error ? `Error: ${this.state.error}` : ''}</div>

        {/* List of todos */}
        <div id="todos">
          <h2>Todos:</h2>
          {this.state.todos.map((td) => {
            return (
              <div key={td.id} onClick={() => this.toggleTodoCompleted(td.id)}>
                {td.name} {td.completed ? '✓' : ''}
              </div>
            );
          })}
        </div>

        {/* Form for adding new todos */}
        <form id="todoForm" onSubmit={this.onFormSubmit}>
          <input
            value={this.state.todoNameInput}
            onChange={this.onTodoNameInputChange}
            type="text"
            placeholder="Type todo"
          />
          <input type="submit" value="Add Todo" />
          <button type="button" onClick={this.clearCompletedTodos}>
            Clear Completed
          </button>
        </form>
      </div>
    );
  }
}
