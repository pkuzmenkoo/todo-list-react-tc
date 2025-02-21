import { useEffect, useState } from 'react'

import { useQuery, gql } from '@apollo/client'

const GET_TODO = gql`
	query {
		getAllTodos {
			id
			title
			isDone
		}
	}
`

const TodoList = () => {
	const [todos, setTodos] = useState([])
	const { loading, error, data } = useQuery(GET_TODO)

	useEffect(() => {
		if (!loading) {
			setTodos(data.getAllTodos)
		}
	}, [data])

	if (loading) return <p>Loading...</p>
	if (error) return <p>Error : {error.message}</p>

	return todos.map(({ id, title, isDone }) => (
		<div key={id}>
			<h3>{title}</h3>
		</div>
	))
}

export default TodoList