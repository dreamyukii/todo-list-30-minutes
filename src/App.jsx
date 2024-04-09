import TodoList from './TodoList';
import { useState, useRef, useEffect } from 'react';
const LOCAL_STORAGE_KEY = 'todoApp.todos';
function App() {
  const [todos, setTodos] = useState([]);
  const nameRef = useRef();
  let uuid = self.crypto.randomUUID();
  useEffect(()=>{
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTodos) setTodos(prevTodos => [...prevTodos,...storedTodos])
  },[])

  useEffect(()=>{
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  },[todos])
  function clearTodo(){
    setTodos([]);
  }
  function toggleTodo(id){
    const newTodos = [...todos];
    const todo = newTodos.find(todo =>todo.id ===id);
    todo.complete =!todo.complete;
    setTodos(newTodos);
  }
  function addTodo(e) {
    const name = nameRef.current.value
    if (name === '') return
    setTodos(prevTodos => {
      return [...prevTodos, { id: uuid, name: name, complete: false }]
    })
    nameRef.current.value = null;
  }
  return (
    <>
      <TodoList todos={todos} toggleTodo={toggleTodo} />
      <input ref={nameRef} type="text" />
      <button onClick={addTodo}>add todo</button>
      <button onClick={clearTodo}>clear todo</button>
      <div>Number of todo: {todos.filter(todo => !todo.complete).length} </div>
    </>
  )
}

export default App
