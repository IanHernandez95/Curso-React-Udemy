import { configureStore } from "@reduxjs/toolkit"
import { act, renderHook, waitFor } from "@testing-library/react"
import { Provider } from "react-redux"
import { calendarApi } from "../../src/api"
import { useAuthStore } from "../../src/hooks/useAuthStore"
import { authSlice } from "../../src/store"
import { initialState, notAuthenticatedState } from "../fixtures/authStates"
import { testUserCredential } from "../fixtures/testUser"


const getMockStore = ( initialState ) => {
    return configureStore({
        reducer:{
            auth: authSlice.reducer
        },
        preloadedState: {
            auth: {...initialState}
        }
    })
}



describe('Pruebas en useAuthStore', () => {

    beforeEach( () => localStorage.clear() )

    test('debe de regresar los valores por defecto', () => {

        const mockStore = getMockStore({...initialState})

        const { result } = renderHook( () => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={ mockStore }>{ children }</Provider>
        } );

        expect( result.current ).toEqual({
            errorMessage: undefined,
            status: 'checking',
            user: {},
            startLogin: expect.any(Function) ,
            startRegister: expect.any(Function) ,
            checkAuthToken: expect.any(Function) ,
            startLogout: expect.any(Function) 
        })

    });

    test('startLogin debe de realizar el login correctamente', async() => {

        const mockStore = getMockStore({ ...notAuthenticatedState })
        const { result } = renderHook( () => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={ mockStore }>{ children }</Provider>
        } );

        await act( async() => {
            await result.current.startLogin( testUserCredential )
        } )

        const { errorMessage, status, user } = result.current
        expect({ errorMessage, status, user }).toEqual({
            errorMessage: undefined,
            status: 'authenticated',
            user: { name: 'Tester', uid: '63a324ee0ecea06e91352d47' }
        })

        expect( localStorage.getItem('token')).toEqual( expect.any(String) )
        expect( localStorage.getItem('token-init-date')).toEqual( expect.any(String) )

    });

    test('startLogin debe de fallar la autenticacion', async() => {

        const mockStore = getMockStore({ ...notAuthenticatedState })
        const { result } = renderHook( () => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={ mockStore }>{ children }</Provider>
        });

        await act( async() => {
            await result.current.startLogin({ email:'algo@gogle.com', password: '123456789'})
        });

        const { errorMessage, status, user } = result.current
        expect({ errorMessage, status, user }).toEqual({
            errorMessage: expect.any(String),
            status: 'not-authenticated',
            user: {}
        })
        expect(localStorage.getItem('token')).toBe(null)
        expect(localStorage.getItem('token-init-date')).toBe(null)

        await waitFor(
            () => expect( result.current.errorMessage ).toBe(undefined)
        ); 

    });

    test('starRegister debe de crear un usuario', async() => {

        const newUser = { email:'algo@gogle.com', password: '123456789', name: 'Test User 2'};
        const mockStore = getMockStore({ ...notAuthenticatedState });
        const { result } = renderHook( () => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={ mockStore }>{ children }</Provider>
        });

        const spy = jest.spyOn( calendarApi, 'post' ).mockReturnValue({
            data: {
                ok: true,
                uid: 'algun-id',
                name: 'algun-name',
                token: 'algun-token'
            }
        });

        await act( async() => {
            await result.current.startRegister( newUser )
        });

        const { errorMessage, status, user } = result.current
        expect({ errorMessage, status, user }).toEqual( {
            errorMessage: undefined,
            status: 'authenticated',
            user: { name: 'algun-name', uid: 'algun-id' }
        });

        spy.mockRestore();

    });
    
    test('starRegister debe de fallar', async() => {

        const mockStore = getMockStore({ ...notAuthenticatedState });
        const { result } = renderHook( () => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={ mockStore }>{ children }</Provider>
        });


        await act( async() => {
            await result.current.startRegister( testUserCredential )
        });

        const { errorMessage, status, user } = result.current
        expect({ errorMessage, status, user }).toEqual( {
        errorMessage: "Existe un usuario con ese correo",
        status: "not-authenticated",
        user: {}
        });

    });

    test('chectAuthToken debe de falla si no hay token', async() => {

        const mockStore = getMockStore({ ...initialState });
        const { result } = renderHook( () => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={ mockStore }>{ children }</Provider>
        });


        await act( async() => {
            await result.current.checkAuthToken()
        });

        const { errorMessage, status, user } = result.current
        expect({ errorMessage, status, user }).toEqual({
            errorMessage: undefined,
            status: 'not-authenticated',
            user: {}
        })
    });

    test('checAuthToken debe de autenticar el usuario si hay un token', async() => {

        const { data } = await calendarApi.post('/auth', testUserCredential)
        localStorage.setItem('token', data.token)

        const mockStore = getMockStore({ ...initialState });
        const { result } = renderHook( () => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={ mockStore }>{ children }</Provider>
        });


        await act( async() => {
            await result.current.checkAuthToken()
        });

        const { errorMessage, status, user } = result.current
        expect({ errorMessage, status, user }).toEqual({
            errorMessage: undefined,
            status: 'authenticated',
            user:  {
                name: "Tester",
                uid: "63a324ee0ecea06e91352d47",
            }
        })
        
    })

})