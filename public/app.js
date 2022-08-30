const root = document.querySelector('#root');

function App() {
  const [activity, setActivity] = React.useState('');
  const [edit, setEdit] = React.useState({});
  const [todos, setTodos] = React.useState([]);
  const [message, setMessage] = React.useState('');

  function generateId() {
    return Date.now();
  }

  function saveTodoHandler(event) {
    event.preventDefault();

    if (!activity) {
      return setMessage('Fill the form!');
    }

    setMessage('');

    if (edit.id) {
      const updatedTodo = { ...edit,
        activity
      };
      const editTodoIndex = todos.findIndex(function (todo) {
        return todo.id == edit.id;
      });
      const updatedTodos = [...todos];
      updatedTodos[editTodoIndex] = updatedTodo;
      setTodos(updatedTodos);
      return cancelEditHandler();
    }

    ;
    setTodos([...todos, {
      id: generateId(),
      activity,
      done: false
    }]);
    setActivity('');
  }

  function removeTodoHandler(todoId) {
    const filteredTodos = todos.filter(function (todo) {
      return todo.id !== todoId;
    });
    setTodos(filteredTodos);
    if (edit.id) cancelEditHandler();
  }

  function editTodoHandler(todo) {
    setActivity(todo.activity);
    setEdit(todo);
  }

  function cancelEditHandler() {
    // console.log('cancel edit');
    setEdit({});
    setActivity('');
  }

  function doneTodoHandler(todo) {
    const updatedTodo = { ...todo,
      done: todo.done ? false : true
    };
    const editTodoIndex = todos.findIndex(function (currentTodo) {
      return currentTodo.id == todo.id;
    });
    const updatedTodos = [...todos];
    updatedTodos[editTodoIndex] = updatedTodo;
    setTodos(updatedTodos);
  }

  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("h1", null, "Simple Todo List"), message && /*#__PURE__*/React.createElement("span", {
    className: "alert"
  }, message), /*#__PURE__*/React.createElement("form", {
    onSubmit: saveTodoHandler
  }, /*#__PURE__*/React.createElement("input", {
    type: "text",
    placeholder: "new activity",
    value: activity,
    onChange: function (event) {
      setActivity(event.target.value);
    }
  }), /*#__PURE__*/React.createElement("button", {
    type: "submit"
  }, edit.id ? 'Save Change' : 'Add'), edit.id && /*#__PURE__*/React.createElement("button", {
    onClick: cancelEditHandler
  }, "Cancel Edit")), todos.length > 0 ? /*#__PURE__*/React.createElement("ul", null, todos.map(function (todo) {
    return /*#__PURE__*/React.createElement("li", {
      key: todo.id
    }, /*#__PURE__*/React.createElement("input", {
      type: "checkbox",
      checked: todo.done,
      onChange: doneTodoHandler.bind(this, todo)
    }), todo.activity, "(", todo.done ? 'Finished' : 'Not Finished', ")", /*#__PURE__*/React.createElement("button", {
      onClick: editTodoHandler.bind(this, todo)
    }, "Edit?"), /*#__PURE__*/React.createElement("button", {
      onClick: removeTodoHandler.bind(this, todo.id)
    }, "Delete?"));
  })) : /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("i", null, "Nothing Todo")));
}

ReactDOM.render( /*#__PURE__*/React.createElement(App, null), root);