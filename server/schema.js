const { buildSchema } = require('graphql');


const schema = buildSchema(`
    
    type Todo {
        id: ID
        title: String
        isDone: Boolean
    }

    input TodoInput {
        id: ID
        title: String!
        isDone: Boolean!
    }

    type Query {
        getAllTodos: [Todo]
        getTodo(id: ID): Todo
    }

    type Mutation {
        createTodo(input: TodoInput): Todo
    }

    `)


module.exports =  schema;