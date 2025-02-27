import { gql } from '@apollo/client'

export const GET_TODOS = gql`
	query {
		getAllTodos {
			id
			title
			isDone
		}
	}
`

export const GET_TODO = gql`
	query GetTodo($id: ID) {
		getTodo(id: $id) {
			id
			title
            isDone
		}
	}
`

export const DELETE_TODO = gql`
	mutation deleteTodo($id: ID) {
		deleteTodo(id: $id)
	}
`

export const CREATE_TODO = gql`
	mutation createTodo($input: TodoInput) {
		createTodo(input: $input) {
			id
			title
			isDone
		}
	}
`
export const UPDATE_TODO = gql`
	mutation updateTodo($input: TodoChangeInput) {
		updateTodo(input: $input) {
			id
			title
			isDone
		}
	}
`
