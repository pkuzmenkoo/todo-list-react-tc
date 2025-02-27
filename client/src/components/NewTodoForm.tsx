import {
	FormControlLabel,
	FormControl,
	InputLabel,
	Input,
	FormHelperText,
	Checkbox,
	Box,
	Button,
} from '@mui/material'
import { useState } from 'react'

import { useMutation } from '@apollo/client'
import { useNavigate } from 'react-router-dom'
import { GET_TODOS, CREATE_TODO } from '../queries-and-mutation'

const NewTodoForm = () => {
	let navigate = useNavigate()
	const [newTodo] = useMutation(CREATE_TODO, {
		update(cache, { data: { createTodo } }) {
			cache.updateQuery({ query: GET_TODOS }, oldData => ({
				getAllTodos: [...(oldData?.getAllTodos || []), createTodo],
			}))
		},
	})

	const [todo, setTodo] = useState({
		title: '',
		isDone: false,
	})

	const addTodo = () => {
		newTodo({
			variables: {
				input: {
					title: todo.title,
					isDone: todo.isDone,
				},
			},
		}).then(() => {
			navigate('/')
		})
	}

	return (
		<form>
			<Box sx={{ display: 'flex', flexDirection: 'column' }}>
				<FormControl sx={{ my: 2 }}>
					<InputLabel htmlFor='name-todo'>Todo</InputLabel>
					<Input
						id='name-todo'
						aria-describedby='todo-helper-text'
						value={todo.title}
						onChange={e =>
							setTodo({
								...todo,
								title: e.target.value,
							})
						}
					/>
					<FormHelperText id='todo-helper-text'>
						What do you want to do?
					</FormHelperText>
				</FormControl>
				<FormControlLabel
					control={
						<Checkbox
							onChange={e => {
								setTodo({
									...todo,
									isDone: e.target.checked,
								})
							}}
						/>
					}
					label='Done?'
				/>
				<Button onClick={() => addTodo()} variant='contained'>
					Create
				</Button>
			</Box>
		</form>
	)
}

export default NewTodoForm
