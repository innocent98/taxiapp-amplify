export const deleteOneUser = /* GraphQL */ `
mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
      id
      username
      email
      firstName
      lastName
      userRole
      country
      wallet
      orders {
        nextToken
        __typename
      }
      car {
        id
        type
        latitude
        longitude
        heading
        isActive
        status
        arrivalDuration
        arrivalDistance
        userId
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;