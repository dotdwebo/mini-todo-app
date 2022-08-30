        const root = document.querySelector('#root');
        function App(){

           const [activity, setActivity] = React.useState('');
           const [edit, setEdit] = React.useState({});
           const [todos, setTodos] = React.useState([]);
           const [message, setMessage] = React.useState('');

           function generateId(){
            return Date.now();
           }
           function saveTodoHandler(event){
                event.preventDefault();

                if(!activity){
                    return setMessage('Fill the form!');
                }
                setMessage('');
                
                if(edit.id){
                    const updatedTodo = {
                        ...edit,
                        activity,
                    };

                    const editTodoIndex = todos.findIndex(function (todo){
                        return todo.id == edit.id;
                    });

                    
                   const updatedTodos = [...todos];
                   updatedTodos[editTodoIndex] = updatedTodo;

                   setTodos(updatedTodos);
                   return cancelEditHandler();
                };


                setTodos([
                    ...todos,
                    {
                    id: generateId(),
                    activity,
                    done:false,
                    },
                ]);
               
                setActivity('');
           }

           

           function removeTodoHandler(todoId){
            const filteredTodos = todos.filter(function (todo) {
                return todo.id !== todoId;
            });

            setTodos(filteredTodos);

            if (edit.id) cancelEditHandler();

           }

           function editTodoHandler(todo){
            setActivity(todo.activity);
            setEdit(todo);
           }

           function cancelEditHandler(){
            // console.log('cancel edit');
            setEdit({});
            setActivity('');
           }

           function doneTodoHandler(todo){
            const updatedTodo = {
                ...todo,
                done: todo.done ? false : true,
            }
            const editTodoIndex = todos.findIndex(function (currentTodo){
                return currentTodo.id == todo.id;
            });

            
           const updatedTodos = [...todos];
           updatedTodos[editTodoIndex] = updatedTodo;
            
            setTodos(updatedTodos);
           }

           return (
            <>
                <h1>Simple Todo List</h1>
               {message && <span className='alert'>{message}</span> }
                <form onSubmit={saveTodoHandler}>
                    <input 
                        type='text'
                        placeholder='new activity'
                        value={activity}
                        onChange={function(event){
                            setActivity(event.target.value);
                        }}
                     />
                     <button type="submit">{edit.id ? 'Save Change':'Add'}</button>
                     {edit.id && <button onClick={cancelEditHandler}>Cancel Edit</button>}
                </form>
                {todos.length > 0 ? (
                <ul>
                    {todos.map(function(todo){
                        return <li key={todo.id}>
                            <input 
                            type="checkbox" 
                            checked={todo.done}
                            onChange={doneTodoHandler.bind(this, todo)}/>
                            {todo.activity}
                            ({todo.done ? 'Finished' : 'Not Finished'})
                            <button onClick={editTodoHandler.bind(this, todo)}>Edit?</button>
                            <button onClick={removeTodoHandler.bind(this, todo.id)}>
                                Delete?
                            </button>
                            </li>
                    })}
                </ul>):(
                   <p><i>Nothing Todo</i></p>
                )}
                
            </>
           )

        }

        ReactDOM.render(<App/>, root);
        
 


