/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getTodo = /* GraphQL */ `
  query GetTodo($id: ID!) {
    getTodo(id: $id) {
      id
      username
      password
      startBrowserTime
      registrationTime
      crn1
      crn2
      crn3
      crn4
      crn5
      crn6
      createdAt
      updatedAt
    }
  }
`;
export const listTodos = /* GraphQL */ `
  query ListTodos(
    $filter: ModelTodoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTodos(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        username
        password
        startBrowserTime
        registrationTime
        crn1
        crn2
        crn3
        crn4
        crn5
        crn6
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
