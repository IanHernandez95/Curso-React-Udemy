export const initialState = {
    status: 'checking', //'cheking', 'not-authenticated', 'authenticated'
    uid: null,
    email: null,
    displayName: null,
    photoURL: null,
    errorMessage: null
}

export const authenticatedState = {
    status: 'authenticated', //'cheking', 'not-authenticated', 'authenticated'
    uid: '123ABC',
    email:'test@testing.com',
    displayName: 'test',
    photoURL: 'https://test-foto.jpg',
    errorMessage: null
}

export const notAuthenticatedState = {
    status: 'not-authenticated', //'cheking', 'not-authenticated', 'authenticated'
    uid: null,
    email: null,
    displayName: null,
    photoURL: null,
    errorMessage: null
}

export const testUser = {
    uid: 'abc123',
    email: 'test@testing.com',
    displayName: 'Test user',
    photoURL: 'https://test-foto.jpg'
}