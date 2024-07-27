import {TodoProvider} from './contexts/TodoContext'
import { useEffect, useState } from 'react'
import './App.css'
import TodoItem from './components/TodoItem';
import TodoForm from './components/TodoForm';

function App() {
  const [todos, setTodos] = useState([]);

  const addTodo = (todo) => {
    return setTodos((prevTodos) => {
      return [{id: Date.now(), ...todo}, ...prevTodos]
    })
  }

  const updateTodo = (id, todo) => { 
    setTodos((prevTodos) => { // take the prevoies todos array
      return prevTodos.map((prevTodo) => { // loop through it
        return prevTodo.id === id ? todo : prevTodo; // cheake the condition & modify
      })
    })
  }

  const deleteTodo = (id) => {
    return setTodos((prevTodos) => { // take the previous todos array
      return prevTodos.filter((todo) => {  // loop through it
        return todo.id !== id // filter just includes the right coundition
      })
    })
  }

  const toggleComplete = (id) => {
    return setTodos((prevTodos) => { // take the previous todos array
      return prevTodos.map((todo) => { // loop thuough it 
        return todo.id == id ? {...todo, completed: !todo.completed} : todo ;// if found then 'take todo obj and spread it, just not completed' 
      })
    })
  } 

  //getItems from localstorage
  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"));
  
    if(todos && todos.length > 0) {
      setTodos(todos);
    }
  }, [])

  //setItems to localstorage
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])

  return (
    <TodoProvider value={ {todos, addTodo, updateTodo, deleteTodo, toggleComplete} }>
      <div className="bg-[#312816] min-h-screen py-8 rounded-lg">
                <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
                    <h1 className="text-2xl font-bold text-center mb-8 mt-2">Time cannot be earned. Just DO it NOW</h1>
                    <div className="mb-4">
                        {/* Todo form goes here */} 
                        <TodoForm />
                    </div>
                    <div className="flex flex-wrap gap-y-3">
                        {/*Loop and Add TodoItem here */}
                        {
                          todos.map((todo) => {
                            return <div 
                            key={todo.id}
                            className='w-full'
                            >
                              <TodoItem todo={todo}/>
                            </div>
                          })
                        }
                    </div>
                </div>
            </div>
    </TodoProvider>
  )
}

export default App
