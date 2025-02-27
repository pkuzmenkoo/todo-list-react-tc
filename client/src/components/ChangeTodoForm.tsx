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
import { useState, useEffect } from 'react'

import { useMutation, useQuery } from '@apollo/client'
import { useNavigate, useParams } from 'react-router-dom'
import { GET_TODO, UPDATE_TODO } from '../queries-and-mutation'

const ChangeTodoForm = () => {
	let navigate = useNavigate()
	let { todoId } = useParams()

	const [changeTodo] = useMutation(UPDATE_TODO)

	const [todo, setTodo] = useState({
		title: '',
		isDone: false,
	})

	const saveTodo = () => {
		changeTodo({
			variables: {
				input: {
					id: todoId,
					title: todo.title,
					isDone: todo.isDone,
				},
			},
		}).then(() => {
			navigate('/')
		})
	}

	const { loading, error, data } = useQuery(GET_TODO, {
		variables: { id: todoId },
	})

	useEffect(() => {
		if (!loading) {
			setTodo(data.getTodo)
		}
	}, [data])

	if (loading) return <p>Loading...</p>
	if (error) return <p>Error: {error.message}</p>

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
							checked={todo.isDone}
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
				<Button onClick={() => saveTodo()} variant='contained'>
					Update
				</Button>
			</Box>
		</form>
	)
}

export default ChangeTodoForm
