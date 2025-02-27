import './App.css'
import TodoList from './components/TodoList';
import NewTodoForm from './components/NewTodoForm'
import { Routes, Route,} from 'react-router'
import ChangeTodoForm from './components/ChangeTodoForm'

const App = () => {
	return (
		<Routes>
			<Route path='/' element={<TodoList />}></Route>
			<Route path='/createTodo' element={<NewTodoForm />}></Route>
			<Route path='/updateTodo/:todoId' element={<ChangeTodoForm />}></Route>
		</Routes>
	)
}

export default App
