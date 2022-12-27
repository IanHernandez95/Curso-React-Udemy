import { authSlice, clearErrorMessage, onLogin, onLogout } from "../../../src/store/auth/authSlice"
import { authenticatedState, initialState } from "../../fixtures/authStates"
import { testUserCredential } from "../../fixtures/testUser";


describe('Pruebas en authSlice', () => {

    test('debe de regresar el estado inicial', () => {

        expect( authSlice.getInitialState() ).toEqual( initialState )

    });

    test('debe de realizar un Login', () => {

        const state = authSlice.reducer( initialState, onLogin( testUserCredential ) )
        expect( state ).toEqual({
            status: 'authenticated',
            user: testUserCredential,
            errorMessage: undefined
        })

    });

    test('debe de realizar el logout', () => {

        const state = authSlice.reducer( authenticatedState, onLogout())
        expect( state ).toEqual({
            status: 'not-authenticated',
            user: {},
            errorMessage: undefined
        })

    })

    test('debe de realizar el logout con mensaje', () => {

        const errorMessage = 'Credenciales no Validad'
        const state = authSlice.reducer( authenticatedState, onLogout(errorMessage))
        expect( state ).toEqual({
            status: 'not-authenticated',
            user: {},
            errorMessage: errorMessage
        })

    })

    test('debe limpiar el mensaje de error', () => {

        const errorMessage = 'Credenciales no Validad'
        const state = authSlice.reducer( authenticatedState, onLogout(errorMessage))
        const newState = authSlice.reducer( state, clearErrorMessage() )

        expect( newState.errorMessage ).toBe(undefined)



    })


})