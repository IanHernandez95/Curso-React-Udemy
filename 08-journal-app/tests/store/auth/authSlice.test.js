import { authSlice, checkingCredentials, login, logout } from "../../../src/store/auth/authSlice"
import { authenticatedState, initialState, notAuthenticatedState, testUser } from "../../fixtures/authFixtures"

describe('Pruebas en authSlice', () => {

    test('debe de regresar el estado inicial y llamarse "auth"', () => {

        expect( authSlice.name ).toBe('auth');
        const state = authSlice.reducer( initialState, {} );
        expect( state ).toEqual(initialState);

    });
    
    test('debe de realizar la Autentificacion', () => {

        
        const state = authSlice.reducer( initialState, login( testUser ) )
        expect( state ).toEqual({
            status: 'authenticated', 
            uid: testUser.uid ,
            email: testUser.email,
            displayName: testUser.displayName ,
            photoURL: testUser.photoURL ,
            errorMessage: null
        })

    });

    test('debe de realizar el logout sin argumentos', () => {


        const state = authSlice.reducer( authenticatedState, logout() )
        expect( state ).toEqual({
            "status": "not-authenticated",
            "uid": null,
            "email": null,
            "displayName": null,
            "photoURL": null,
            "errorMessage": undefined,
        })

    });

    test('debe de realizar el logout con argumentos', () => {

        const errorMessage = 'Credenciales no son correctas'
        const state = authSlice.reducer( authenticatedState, logout({ errorMessage }) )
        expect( state ).toEqual({
            "status": "not-authenticated",
            "uid": null,
            "email": null,
            "displayName": null,
            "photoURL": null,
            "errorMessage": errorMessage,
        })

    });

    test('debe cambiar el estado a Checking', () => {

        const state = authSlice.reducer( authenticatedState, checkingCredentials() )
        expect( state.status ).toEqual('checking')

    })

});