const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const cors = require('cors')
const schema = require('./schema')

let todos = [
	{ id: '1', title: 'todo1', isDone: false },
	{ id: '2', title: 'todo2', isDone: true },
	{ id: '3', title: 'todo3', isDone: false },
	{ id: '4', title: 'todo4', isDone: true },
	{ id: '5', title: 'todo5', isDone: false },
]

const app = express()
app.use(cors())

const newTodo = input => {
	const id = Date.now().toLocaleString()
	return {
		id,
		...input,
	}
}

const root = {
	getAllTodos: () => {
		return todos
	},

	getTodo: ({ id }) => {
		return todos.find(todo => todo.id == id)
	},

	createTodo: ({ input }) => {
		const todo = newTodo(input)
		todos.push(todo)
		return todo
	},

	deleteTodo: ({ id }) => {
		todos = todos.filter(el => {
			return el.id !== id
		})

		return 'Success'
	},

	updateTodo: ({ input }) => {
		const todoIndex = todos.findIndex(todo => todo.id === input.id)

		if (todoIndex === -1) {
			throw new Error('Todo not found')
		}

		const updatedTodo = {
			...todos[todoIndex],
			title: input.title,
			isDone: input.isDone,
		}

		todos[todoIndex] = updatedTodo

		return updatedTodo
	},
}

app.use(
	'/graphql',
	graphqlHTTP({
		graphiql: true,
		schema,
		rootValue: root,
	})
)

app.listen(5000, () => console.log('server started on port 5000'))
