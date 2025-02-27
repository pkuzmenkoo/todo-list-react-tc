import { useEffect, useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { Button, Box, Checkbox } from '@mui/material'
import {
	Delete as DeleteIcon,
	ModeEditOutline as ChangeIcon,
} from '@mui/icons-material'
import { Link } from 'react-router-dom'

import { GET_TODOS, DELETE_TODO, UPDATE_TODO } from '../queries-and-mutation'

const TodoList = () => {
	const [todos, setTodos] = useState([])
	const { loading, error, data } = useQuery(GET_TODOS)
	const [deleteTodo] = useMutation(DELETE_TODO)
	const [changeTodo] = useMutation(UPDATE_TODO)

	const removeTodo = (id: String) => {
		deleteTodo({
			variables: {
				id: id,
			},
			refetchQueries: [{ query: GET_TODOS }],
		})
	}

	const switchCheckbox = (id: String, title: String, isDone: Boolean) => {
		changeTodo({
			variables: {
				input: {
					id: id,
					title: title,
					isDone: !isDone,
				},
			},
		})
	}

	useEffect(() => {
		if (!loading) {
			setTodos(data.getAllTodos)
		}
	}, [data])

	if (loading) return <p>Loading...</p>
	if (error) return <p>Error : {error.message}</p>

	return (
		<>
			<Button variant='contained'>
				<Link
					to={'/createTodo'}
					style={{ textDecoration: 'none', color: 'inherit' }}
				>
					Create Todo
				</Link>
			</Button>

			{todos.map(({ id, title, isDone }) => (
				<div
					style={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'space-between',
						gap: '15px',
						marginTop: '15px',
						minWidth: '300px',
					}}
					key={id}
				>
					<Box>
						<Checkbox
							checked={isDone}
							onChange={() => switchCheckbox(id, title, isDone)}
						/>
						<strong>{title}</strong>
					</Box>
					<Box
						sx={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							gap: 2,
						}}
					>
						<Button
							sx={{ minWidth: 'min-content', padding: '10px' }}
							variant='contained'
							color='error'
							onClick={() => removeTodo(id)}
						>
							<DeleteIcon />
						</Button>
						<Button
							variant='contained'
							sx={{ minWidth: 'min-content', padding: '10px' }}
						>
							<Link
								to={`/updateTodo/${id}`}
								style={{
									textDecoration: 'none',
									color: 'inherit',
									display: 'flex',
								}}
							>
								<ChangeIcon />
							</Link>
						</Button>
					</Box>
				</div>
			))}
		</>
	)
}

export default TodoList
