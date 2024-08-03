export const getCarId = /* GraphQL */ `
  query GetCar($id: ID!) {
    getCar(id: $id) {
      id
    }
  }
`;

export const getCar = /* GraphQL */ `
  query GetCar($id: ID!) {
    getCar(id: $id) {
      id
      type
      latitude
      longitude
      heading
      isActive
      status
      arrivalDuration
      arrivalDistance
      orderId
      orders {
        nextToken
        __typename
      }
      userId
      user {
        id
        username
        email
        firstName
        lastName
        userRole
        country
        wallet
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

export const listOrders = /* GraphQL */ `
  query ListOrders(
    $id: ID
    $filter: ModelOrderFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listOrders(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        type
        status
        amount
        originLatitude
        originLongitude
        destinationLatitude
        destinationLongitude
        userId
        carId
        driverId
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;

export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      username
      email
      firstName
      lastName
      userRole
      country
      wallet
      createdAt
      updatedAt
      __typename
    }
  }
`;

export const getOrder = /* GraphQL */ `
  query GetOrder($id: ID!) {
    getOrder(id: $id) {
      id
      type
      status
      amount
      originLatitude
      originLongitude
      destinationLatitude
      destinationLongitude
      userId
      user {
        id
        username
        email
        firstName
        lastName
        userRole
        country
        wallet
        createdAt
        updatedAt
        __typename
      }
      carId
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
      driverId
      driver {
        id
        username
        email
        firstName
        lastName
        userRole
        country
        wallet
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
