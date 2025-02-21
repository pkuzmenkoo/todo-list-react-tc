import './App.css'
import Todo from './components/TodoList'
import Button from '@mui/material/Button'

const App = () =>  {
	return (
		<div>
			<h2>My first Apollo app 🚀</h2>
			<Todo />
			<Button variant='contained'>Hello world</Button>
		</div>
	)
}

export default App
